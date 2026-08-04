# Feature: Edição de transações na listagem

## Status

- [x] Draft
- [ ] Review
- [ ] Approved
- [ ] In Progress
- [x] Complete

## Overview

A tela de Transações (`/transacoes`) permite **criar** transações via `NovaTransacaoDrawer`, mas não oferece forma de **editar** uma transação existente na tabela. Esta feature adiciona um drawer lateral de edição (padrão modal do Finova, conforme [ADR-002](../../../docs/decisions/ADR-002-drawer-pattern.md)), acionado a partir de uma linha da listagem, permitindo alterar descrição, valor, categoria, data e direção (receita/despesa). Persistência permanece em mock local no estado React da view.

> **Nota de nomenclatura:** o slug `modal-edicao-transacoes` reflete a intenção de produto (formulário modal). A implementação MUST usar **Drawer** (`direction="right"`), não `Dialog`, alinhado ao `NovaTransacaoDrawer` e ao `CartaoDrawer`.

## Goals

- Permitir editar transações da listagem sem sair da página.
- Reutilizar componentes do Design System (`Drawer`, `Field`, `Input`, `CurrencyInput`, `Select`, `DatePicker`, `RadioGroup`, `Button`).
- Seguir o mesmo esqueleto e contrato controlado do `NovaTransacaoDrawer` / `CartaoDrawer` (modo edit).
- Atualizar o array local `transactions` após salvar, refletindo imediatamente na tabela, paginação, filtro por período e exportação PDF.

## Non-Goals

- Excluir transações (delete) — escopo futuro.
- Editar campos extras do formulário de criação (`sourceId`, `notes`) — não existem no modelo `Transaction` atual.
- Integração com backend ou API real.
- Edição inline na célula da tabela.
- Edição a partir do Resumo (`/`) — apenas `/transacoes` nesta entrega.
- Undo / histórico de alterações.
- Validação de conflito entre usuários (dados locais).

## User Stories

### Gestor financeiro

- Como gestor, quero clicar em uma transação na listagem e corrigir a descrição ou valor, para manter o extrato consistente.
- Como gestor, quero alterar a data ou categoria de uma transação, para classificar corretamente um lançamento.
- Como gestor, quero trocar receita por despesa (ou vice-versa) e ver a categoria atualizada conforme o tipo, para evitar erros de classificação.

### Desenvolvedor / agente

- Como implementador, quero funções puras de mapeamento e validação em `lib/transacoes-mock.ts`, para reutilizar quando houver API real.
- Como implementador, quero um drawer de edição com contrato previsível (`open`, `onOpenChange`, `transaction`, `onSubmit`), para integrar sem acoplar a view.

## Requirements

### Functional Requirements

1. **[FR-1]** Cada linha da tabela de transações MUST ser acionável (clique) para abrir o drawer de edição com os dados da transação selecionada.
2. **[FR-2]** O drawer MUST exibir e permitir editar: **descrição**, **valor**, **categoria**, **data** e **direção** (receita/despesa).
3. **[FR-3]** Ao abrir o drawer, os campos MUST ser pré-preenchidos com os valores atuais da transação.
4. **[FR-4]** Ao trocar a direção, a lista de categorias MUST atualizar conforme `TRANSACAO_CATEGORIAS`; se a categoria atual for inválida para o novo tipo, o campo categoria MUST ser limpo (mesmo comportamento do `NovaTransacaoDrawer`).
5. **[FR-5]** O botão de salvar MUST validar o formulário antes de persistir; erros MUST aparecer nos campos via `FieldError`.
6. **[FR-6]** Após salvar com sucesso, a transação MUST ser atualizada no estado local mantendo o mesmo `id`; a tabela MUST refletir a alteração sem recarregar a página.
7. **[FR-7]** Se a data editada colocar a transação fora do período filtrado ativo, a linha MUST desaparecer da listagem atual (comportamento derivado do filtro existente).
8. **[FR-8]** Cancelar ou fechar o drawer MUST descartar alterações não salvas e limpar a seleção.
9. **[FR-9]** Submit MUST simular latência (~300 ms) e estado `isSubmitting`, como no padrão mock existente.

### Non-Functional Requirements

1. **[NFR-1]** UI MUST usar tokens e componentes existentes; sem valores hardcoded de cor ou spacing fora do sistema.
2. **[NFR-2]** Drawer MUST ser controlado pelo pai (`open` / `onOpenChange`), conforme ADR-002.
3. **[NFR-3]** Foco MUST ir para o campo descrição ao abrir o drawer.
4. **[NFR-4]** Linhas acionáveis MUST ter affordance visual (`cursor-pointer`, hover) e suporte a teclado (`Enter` / `Space` na linha focada).

## Edge Cases

| ID | Cenário | Comportamento esperado |
|----|---------|------------------------|
| EC-1 | Salvar sem alterações | Permitir submit; transação permanece equivalente |
| EC-2 | Valor zero ou negativo | Erro de validação: "Informe um valor maior que zero." |
| EC-3 | Descrição vazia | Erro: "Informe a descrição." |
| EC-4 | Categoria vazia ou inválida para direção | Erro de validação correspondente |
| EC-5 | Data vazia | Erro: "Selecione a data." |
| EC-6 | Trocar direção com categoria incompatível | Limpar categoria; exigir nova seleção |
| EC-7 | Editar transação na última página e data muda período | Linha some; paginação faz clamp via `safePage` existente |
| EC-8 | Abrir edição, fechar, reabrir mesma transação | Formulário repopulado com dados persistidos (não rascunho anterior) |
| EC-9 | Dois drawers abertos | Impossível — apenas um drawer de edição por vez; criação e edição não coexistem abertos |

## Acceptance Criteria

- [x] Clicar em uma linha da tabela abre o drawer "Editar transação" com dados corretos.
- [x] Campos editáveis: descrição, valor, categoria, data, direção.
- [x] Validação impede salvar formulário inválido com mensagens nos campos.
- [x] Salvar atualiza a linha na tabela (descrição, badge de categoria, valor com sinal/cor, data formatada).
- [x] Trocar direção atualiza opções de categoria e reseta categoria inválida.
- [x] Cancelar fecha o drawer sem alterar a transação.
- [x] Transação editada fora do período ativo deixa de aparecer na listagem filtrada.
- [x] Linha da tabela é navegável por teclado e acionável com Enter/Space.
- [x] Nenhuma chamada de rede; persistência apenas no estado local.

## Dependencies

- `lib/transacoes-mock.ts` — tipo `Transaction`, categorias, validação existente
- `app/transacoes/transacoes-view.tsx` — listagem, estado `transactions`, filtro por período
- `components/finova/nova-transacao-drawer.tsx` — referência de estrutura e campos
- `components/finova/cartao-drawer.tsx` — referência de modo edit (`wasOpen`, sync ao abrir)
- `docs/decisions/ADR-002-drawer-pattern.md` — padrão Drawer controlado
- Feature concluída: [transacoes-filtro-periodo](../transacoes-filtro-periodo/spec.md) — filtro por período já integrado

## Open Questions

- [ ] **Entrada na UI:** clique na linha inteira vs. botão/ícone "Editar" dedicado? → **Decidido: clique na linha inteira** (com affordance hover); ícone dedicado fica como melhoria futura se design solicitar.
- [ ] **Componente único vs. separado:** estender `NovaTransacaoDrawer` com `mode` ou criar `EditarTransacaoDrawer`? → **Decidido: componente separado** — campos de edição são subconjunto do create; evita condicionais no drawer de criação usado também em `/`.
- [ ] **Preservar horário em `occurredAt`:** ao editar só a data, manter hora original ou fixar `T12:00:00`? → **Decidido: preservar hora existente** (`slice(11)`); se ausente, fallback `T12:00:00`.

## References

- Listagem: `app/transacoes/transacoes-view.tsx`
- Mock: `lib/transacoes-mock.ts`
- Create drawer: `components/finova/nova-transacao-drawer.tsx`
- Edit pattern (cartões): `components/finova/cartao-drawer.tsx`
- Styleguide Drawer: `app/styleguide/components/drawer/page.tsx`
