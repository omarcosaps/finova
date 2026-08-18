# Feature: Lista de alertas (regras configuradas)

## Status

- [x] Draft
- [ ] Review
- [ ] Approved
- [x] In Progress
- [x] Complete

## Overview

Após salvar regras no drawer de `/alertas`, a tela continua no empty state: a feature [configurar-alertas](../configurar-alertas/spec.md) persistiu `savedRules` mas deixou a lista como Non-Goal. Esta entrega substitui o empty pela **lista das regras habilitadas** (label + limiar), reabrindo o mesmo drawer ao clicar no item. Inbox de avisos disparados permanece fora de escopo.

## Goals

- Exibir na tela principal as regras configuradas e habilitadas depois do primeiro save.
- Manter o empty state quando ainda não houve save ou quando todas as regras estão desligadas.
- Reutilizar `savedRules` / `hasSaved`, `ConfigurarAlertasDrawer`, `ALERTA_REGRAS_META` e o Design System (`DsIcon`, tokens, padrão de card do Resumo).

## Non-Goals

- Inbox de alertas disparados (incluindo reutilizar `data.alerts` / `DashboardAlert` do Resumo).
- Switch na lista — edição continua só no `ConfigurarAlertasDrawer`.
- Focar ou pré-selecionar uma regra específica ao abrir o drawer pelo item.
- Badge `3` da sidebar dinâmico.
- Sync com Configurações > Notificações.
- Backend, API ou persistência além do estado React já existente na view.
- Alterar o contrato ou o formulário do drawer.

## User Stories

### Gestor financeiro

- Como gestor, quero ver na tela principal as regras que acabei de salvar, para confirmar limites e tipos ativos sem reabrir o drawer.
- Como gestor, quero clicar numa regra da lista para reabrir a configuração, para ajustar o limiar sem procurar só o botão do header.
- Como gestor, quero voltar ao empty “Nenhum alerta” se desligar todas as regras, para o estado da tela refletir que nada está ativo.

### Desenvolvedor / agente

- Como implementador, quero helpers puros no mock existente para filtrar regras habilitadas e formatar limiares, para a view não duplicar copy.
- Como implementador, quero um componente de lista desacoplado do drawer, para a view só decidir empty vs lista.

## Requirements

### Functional Requirements

1. **[FR-1]** Com `hasSaved === true` e pelo menos uma regra `enabled`, `AlertasView` MUST renderizar a lista de regras e MUST NOT renderizar `FinovaEmptyState`.
2. **[FR-2]** A lista MUST incluir somente regras com `enabled: true`, na ordem de [configurar-alertas FR-3](../configurar-alertas/spec.md): `limites-gasto`, `vencimento-faturas`, `transacoes-altas`.
3. **[FR-3]** Cada item MUST exibir: ícone do Design System (NFR-1), `label` de `ALERTA_REGRAS_META`, e o limiar formatado:
   - `limites-gasto`: `"{percent}% do orçamento"` (ex.: `80% do orçamento`)
   - `vencimento-faturas`: `"{days} dia(s) de antecedência"` no singular/plural correto em pt-BR (`1 dia de antecedência`, `3 dias de antecedência`)
   - `transacoes-altas`: valor via `formatBRL(amountCents)` (ex.: `R$ 1.000,00`)
4. **[FR-4]** Clicar num item MUST abrir o `ConfigurarAlertasDrawer` já existente (mesmo handler do botão do header e do CTA do empty). O drawer MUST mostrar o último estado **salvo**, sem rascunho.
5. **[FR-5]** Após um save bem-sucedido, a lista MUST refletir o novo `savedRules` imediatamente (itens que passaram a `enabled` aparecem; os que foram desligados saem).
6. **[FR-6]** Se `hasSaved === false`, ou se todas as regras estiverem desabilitadas, a view MUST mostrar `FinovaEmptyState` variante `alertas` com título **“Nenhum alerta”**. Descrição, CTA primário (“Configurar alertas”) e CTA secundário (“Ver transações”) MUST permanecer. O copy **“Nenhum alerta disparado”** MUST NOT ser usado nesta tela.
7. **[FR-7]** O botão “Configurar alertas” do header MUST continuar abrindo o mesmo drawer, com ou sem lista visível.

### Non-Functional Requirements

1. **[NFR-1]** Ícones MUST vir só do registry existente: `limites-gasto` → `wallet`, `vencimento-faturas` → `creditCard`, `transacoes-altas` → `trendingUp`. MUST NOT usar foto/thumbnail de produto.
2. **[NFR-2]** Layout MUST ser tipo item (ícone à esquerda, título + subtítulo do limiar), alinhado ao card de alerta do Resumo (`flex`, `gap-3`, `rounded-lg`, `border`, `p-3`, tokens `foreground` / `muted-foreground` / `border`). Sem cor ou spacing hardcoded fora do sistema.
3. **[NFR-3]** Cada item MUST ser um controle focável (`button`) com nome acessível contendo o label da regra.
4. **[NFR-4]** Lógica de filtro, ordem e copy de limiar MUST viver em funções puras em `lib/alertas-mock.ts` (ADR-004). Persistência continua só no estado React da view (sem rede).
5. **[NFR-5]** Valores monetários MUST permanecer em centavos no mock e ser formatados na string de limiar via `formatBRL`.

## Edge Cases

| ID | Cenário | Comportamento esperado |
|----|---------|------------------------|
| EC-1 | Nunca salvou (`hasSaved === false`) | Empty “Nenhum alerta”; defaults do form não geram lista |
| EC-2 | Primeiro save com as três regras ligadas | Lista com 3 itens na ordem FR-2; empty some |
| EC-3 | Save com apenas uma regra ligada | Lista com 1 item |
| EC-4 | Save com todas desligadas | Empty “Nenhum alerta”; lista some |
| EC-5 | Abrir drawer pela lista, alterar, fechar sem salvar | Lista inalterada; reabrir drawer mostra último salvo |
| EC-6 | Save que desliga uma regra e liga outra | Lista atualiza na hora (FR-5) |
| EC-7 | Clicar no header com a lista visível | Abre o mesmo drawer (FR-7) |
| EC-8 | CTA “Ver transações” no empty (EC-1 / EC-4) | Continua navegando para `/transacoes` |
| EC-9 | Relatórios / Categorias | Sem mudança em `FinovaEmptyState` além do já existente |

## Acceptance Criteria

- [x] Sem save, `/alertas` continua no empty “Nenhum alerta”.
- [x] Após save com pelo menos uma regra ligada, o empty some e a lista mostra só as habilitadas, na ordem correta.
- [x] Cada item tem ícone DS + label + limiar formatado (%, dias com plural, `R$`).
- [x] Clicar no item abre o mesmo drawer do header.
- [x] Fechar o drawer sem salvar não muda a lista.
- [x] Save com todas off restaura o empty “Nenhum alerta”.
- [x] O texto “Nenhum alerta disparado” não aparece mais nesta tela.
- [x] Relatórios e Categorias inalterados; sem chamada de rede.

## Dependencies

- Feature [configurar-alertas](../configurar-alertas/spec.md) — drawer, mock, estado `savedRules` / `hasSaved`
- `app/alertas/alertas-view.tsx` — condicional empty vs lista
- `lib/alertas-mock.ts` — helpers de lista e limiar
- `lib/currency.ts` — `formatBRL`
- `app/styleguide/icons` — `DsIcon` / `Icons`
- Padrão visual: cards de alerta em `app/resumo-view.tsx` (layout, não dados)

## Open Questions

- [x] **Lista de regras vs inbox de disparos?** → **Regras configuradas habilitadas** (decisão de produto na inicialização).
- [x] **Switch na linha?** → **Não.** Drawer continua sendo o editor.
- [x] **Copy “Nenhum alerta disparado”?** → **Descontinuado** nesta tela (FR-6). `getAlertasEmptyTitle` MUST passar a devolver só “Nenhum alerta”.
- [x] **Abrir o drawer já focado na regra clicada?** → **Não** nesta entrega.

## References

- Pesquisa: [notes/research-estado-atual.md](notes/research-estado-atual.md)
- Spec anterior: [../configurar-alertas/spec.md](../configurar-alertas/spec.md)
- Tela: `app/alertas/alertas-view.tsx`
- Mock: `lib/alertas-mock.ts`
- Drawer: `components/finova/configurar-alertas-drawer.tsx`
- ADR-004: `docs/decisions/ADR-004-mock-data-layer.md`
