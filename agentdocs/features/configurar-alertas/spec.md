# Feature: Configurar alertas

## Status

- [x] Draft
- [ ] Review
- [ ] Approved
- [x] In Progress
- [x] Complete

## Overview

A rota `/alertas` é um placeholder: empty state com o CTA **Configurar alertas** sem ação. Esta feature abre um drawer de **regras** (ligar/desligar tipos + limiares) a partir desse CTA e de um botão no header, persistindo o resultado em estado mock local. A inbox de avisos disparados e o sync com Configurações > Notificações ficam fora desta entrega.

> **Nota de nomenclatura:** o slug `configurar-alertas` descreve a ação de produto. A implementação MUST usar **Drawer** (`direction="right"`), não `Dialog`, conforme [ADR-002](../../../docs/decisions/ADR-002-drawer-pattern.md).

## Goals

- Permitir configurar regras de alerta sem sair de `/alertas`.
- Cobrir três tipos alinhados ao copy da tela (gastos e faturas), com limiares editáveis.
- Reutilizar o Design System (`Drawer`, `Switch`, `Field`, `Input`, `CurrencyInput`, `Button`) e o padrão de mock em `lib/` ([ADR-004](../../../docs/decisions/ADR-004-mock-data-layer.md)).
- Manter o empty state (não há inbox nesta entrega), atualizando o título após o primeiro save com regras habilitadas.

## Non-Goals

- Lista/inbox de alertas disparados (incluindo reutilizar `data.alerts` do Resumo).
- Badge `3` da sidebar dinâmico.
- Sync com Configurações > Notificações (estado isolado).
- Relatório semanal, resumo diário ou qualquer canal real (push, e-mail).
- Editar valores dos limites de orçamento do dashboard.
- Backend, API ou persistência além do estado React da view.
- Empty states de Relatórios/Categorias ganharem ação (só a prop opcional, sem ligar os CTAs).

## User Stories

### Gestor financeiro

- Como gestor, quero abrir “Configurar alertas” a partir do empty state, para definir quando serei avisado sobre gastos e faturas.
- Como gestor, quero ligar ou desligar cada tipo e ajustar o limiar (%, dias, valor), para adequar os avisos ao meu limite de atenção.
- Como gestor, quero reabrir a configuração pelo header, para alterar regras depois do primeiro save sem depender só do empty state.

### Desenvolvedor / agente

- Como implementador, quero tipos e validação puros em `lib/alertas-mock.ts`, para não acoplar regras à view.
- Como implementador, quero um drawer com contrato `open` / `onOpenChange` / `rules` / `onSubmit`, alinhado aos drawers existentes.

## Requirements

### Functional Requirements

1. **[FR-1]** O CTA primário do empty state variante `alertas` MUST abrir o drawer de configuração.
2. **[FR-2]** O header de `/alertas` MUST exibir um botão “Configurar alertas” que abre o mesmo drawer.
3. **[FR-3]** O drawer MUST listar exatamente três regras, nesta ordem:
   - `limites-gasto` — “Limites de gasto”; limiar em **percentual inteiro** do orçamento (1–100).
   - `vencimento-faturas` — “Vencimento de faturas”; limiar em **dias de antecedência** (1–30).
   - `transacoes-altas` — “Transações altas”; limiar em **centavos** (valor > 0).
4. **[FR-4]** Cada regra MUST ter um `Switch` (habilitada/desabilitada) e um campo de limiar. Com a regra desabilitada, o limiar MUST ficar `disabled` e MUST NOT ser validado.
5. **[FR-5]** Defaults do formulário (primeira abertura sem save) MUST ser:
   - `limites-gasto`: enabled `true`, `percent: 80`
   - `vencimento-faturas`: enabled `true`, `days: 3`
   - `transacoes-altas`: enabled `true`, `amountCents: 100000` (R$ 1.000)
6. **[FR-6]** Ao abrir o drawer, os campos MUST refletir o último estado **salvo** (ou os defaults se ainda não houve save). Rascunho de uma sessão anterior MUST NOT reaparecer.
7. **[FR-7]** Salvar MUST validar apenas regras habilitadas; erros MUST aparecer via `FieldError` junto ao limiar inválido. Formulário inválido MUST NOT chamar `onSubmit`.
8. **[FR-8]** Após save bem-sucedido, as regras MUST persistir no estado local de `AlertasView`; o drawer MUST fechar. Submit MUST simular latência (~300 ms) e `isSubmitting`, com `console.log` do payload mock.
9. **[FR-9]** Cancelar ou fechar o drawer MUST descartar alterações não salvas.
10. **[FR-10]** Enquanto não houver save, o título do empty state MUST ser “Nenhum alerta”. Após o primeiro save: se pelo menos uma regra estiver habilitada, o título MUST ser “Nenhum alerta disparado”; se todas estiverem desabilitadas, MUST voltar a “Nenhum alerta”. A descrição e o CTA secundário (“Ver transações”) MUST permanecer.
11. **[FR-11]** `FinovaEmptyState` MUST aceitar `onPrimaryAction?` opcional. Sem a prop, o comportamento atual (botão sem ação, ou `href` quando existir) MUST ser preservado para as demais variantes.

### Non-Functional Requirements

1. **[NFR-1]** UI MUST usar tokens e componentes existentes; sem cor ou spacing hardcoded fora do sistema.
2. **[NFR-2]** Drawer MUST ser controlado pelo pai (`open` / `onOpenChange`), conforme ADR-002.
3. **[NFR-3]** Foco MUST ir para o primeiro `Switch` ao abrir o drawer.
4. **[NFR-4]** Persistência MUST ser apenas client-side (estado React); sem chamadas de rede.
5. **[NFR-5]** Valores monetários MUST permanecer em centavos na camada mock e ser formatados na UI via `CurrencyInput` / `lib/currency.ts`.

## Edge Cases

| ID | Cenário | Comportamento esperado |
|----|---------|------------------------|
| EC-1 | Percentual 0, > 100, vazio ou não inteiro (regra habilitada) | Erro: "Informe um percentual entre 1 e 100." |
| EC-2 | Dias 0, > 30, vazio ou não inteiro (regra habilitada) | Erro: "Informe os dias de antecedência (1 a 30)." |
| EC-3 | Valor zero ou negativo (regra habilitada) | Erro: "Informe um valor maior que zero." |
| EC-4 | Todas as regras desabilitadas | Permitir save; persistir; título do empty = "Nenhum alerta" |
| EC-5 | Limiar inválido em regra **desabilitada** | Ignorar; save ok |
| EC-6 | Abrir, alterar, fechar sem salvar, reabrir | Formulário com último salvo (ou defaults), não o rascunho |
| EC-7 | Salvar sem alterar defaults | Permitir; passa a contar como save (FR-10) |
| EC-8 | `FinovaEmptyState` em Relatórios/Categorias (sem `onPrimaryAction`) | CTAs primários continuam sem ação; sem regressão de layout |
| EC-9 | CTA secundário “Ver transações” | Continua navegando para `/transacoes` |

## Acceptance Criteria

- [x] Clicar em “Configurar alertas” no empty state abre o drawer.
- [x] Clicar em “Configurar alertas” no header abre o mesmo drawer.
- [x] As três regras aparecem com Switch + limiar (%, dias, R$).
- [x] Limiar de regra desligada fica desabilitado e não bloqueia o save.
- [x] Validação impede save com limiar inválido em regra ligada, com `FieldError`.
- [x] Salvar todas desligadas é permitido e restaura o título “Nenhum alerta”.
- [x] Após o primeiro save com pelo menos uma regra ligada, o título vira “Nenhum alerta disparado”.
- [x] Cancelar/fechar não persiste rascunho; reabrir mostra o último salvo.
- [x] Relatórios e Categorias não mudam de comportamento.
- [x] Nenhuma chamada de rede; `console.log` no submit mock.

## Dependencies

- `app/alertas/alertas-view.tsx` — tela placeholder
- `components/finova/finova-empty-state.tsx` — CTA morto; precisa de `onPrimaryAction?`
- `components/finova/nova-transacao-drawer.tsx` / `cartao-drawer.tsx` — referência ADR-002 e sync `wasOpen`
- `components/ui/switch.tsx` + styleguide Switch
- `docs/decisions/ADR-002-drawer-pattern.md`
- `docs/decisions/ADR-004-mock-data-layer.md`

## Open Questions

- [x] **Inbox nesta entrega?** → **Não.** Empty state permanece; só o título muda após save (FR-10).
- [x] **Sync com Configurações?** → **Não.** Mock isolado em `lib/alertas-mock.ts`.
- [x] **Copy inicial vs. defaults habilitados?** → Defaults do form vêm ligados (FR-5), mas o título “Nenhum alerta disparado” só após o **primeiro save** com alguma regra habilitada.
- [x] **Digests (relatório semanal / resumo diário)?** → Fora de escopo.

## References

- Pesquisa: [notes/research-estado-atual.md](notes/research-estado-atual.md)
- Tela: `app/alertas/alertas-view.tsx`
- Empty: `components/finova/finova-empty-state.tsx`
- Overlap (não reutilizar estado): `lib/configuracoes-mock.ts`, `app/configuracoes/configuracoes-view.tsx`
- Styleguide: `app/styleguide/components/drawer/page.tsx`, `app/styleguide/components/switch/page.tsx`
