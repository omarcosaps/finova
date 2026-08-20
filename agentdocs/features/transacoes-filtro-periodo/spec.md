# Feature: Filtro por período na listagem de Transações

## Status

- [x] Draft
- [ ] Review
- [ ] Approved
- [ ] In Progress
- [x] Complete

## Overview

A tela de Transações (`/transacoes`) já exibe um seletor de período ("Este Mês", "Mês passado", "Últimos 3 meses"), mas o valor selecionado **não filtra** a tabela — é usado apenas no rótulo da exportação PDF. Esta feature conecta o seletor de período à listagem, filtra transações pelo campo `occurredAt` e mantém paginação, exportação e estados vazios consistentes com o Design System do Finova.

## Goals

- Filtrar a listagem de transações conforme o período selecionado no dropdown existente.
- Resetar a paginação ao trocar o período.
- Manter exportação PDF alinhada ao conjunto filtrado (não apenas à página visível).
- Reutilizar padrões já usados no dashboard (`DASHBOARD_PERIOD_LABELS`, lógica de período).

## Non-Goals

- Filtros avançados por categoria, direção ou valor — escopo futuro. O placeholder "Filtrar" foi removido da toolbar.
- Integração com backend ou API real (dados permanecem em mock local).
- Persistir período na URL ou localStorage nesta entrega.
- Filtro por intervalo customizado (DatePicker range) — apenas os três presets existentes.

## User Stories

### Gestor financeiro

- Como gestor, quero selecionar "Mês passado" e ver apenas transações daquele mês, para conciliar movimentos sem rolar a lista inteira.
- Como gestor, quero que a exportação PDF reflita o período filtrado, para compartilhar relatórios corretos.

### Desenvolvedor / agente

- Como implementador, quero lógica de filtro isolada e testável, para reutilizar quando houver API real.

## Requirements

### Functional Requirements

1. **[FR-1]** Ao selecionar um período no dropdown, a tabela MUST exibir somente transações cujo `occurredAt` caia dentro desse intervalo.
2. **[FR-2]** Os três períodos MUST ser: "Este Mês" (mês calendário atual), "Mês passado" (mês calendário anterior) e "Últimos 3 meses" (rolling 3 meses incluindo o mês atual).
3. **[FR-3]** Ao trocar o período, a paginação MUST resetar para a página 1.
4. **[FR-4]** O contador "Mostrando X de Y transações" MUST refletir o total **filtrado**, não o total bruto.
5. **[FR-5]** A exportação PDF MUST usar todas as transações do período filtrado (não só a página atual).
6. **[FR-6]** Se não houver transações no período, MUST exibir estado vazio claro (componente `Empty` ou equivalente do Design System).

### Non-Functional Requirements

1. **[NFR-1]** Filtragem MUST ocorrer no client sobre o array em memória; sem chamadas de rede nesta entrega.
2. **[NFR-2]** UI MUST usar tokens e componentes existentes (`Button`, `DropdownMenu`, `Table`, `Empty`).
3. **[NFR-3]** Troca de período MUST ser perceptível em < 100 ms com ~500 transações mock (sem re-render desnecessário).

## Edge Cases

| ID | Cenário | Comportamento esperado |
|----|---------|------------------------|
| EC-1 | Período sem transações | Estado vazio + contador "0 de 0" |
| EC-2 | Nova transação criada no drawer | Incluir na lista se `occurredAt` estiver no período ativo; senão não aparece até trocar período |
| EC-3 | Página atual > total após filtro | Clamp automático para última página válida (já parcialmente implementado via `safePage`) |
| EC-4 | Transação na fronteira do mês | Usar comparação por data local (YYYY-MM-DD), não UTC puro |

## Acceptance Criteria

- [x] Selecionar "Este Mês" reduz a tabela a transações do mês corrente.
- [x] Selecionar "Mês passado" mostra apenas o mês anterior.
- [x] Selecionar "Últimos 3 meses" inclui transações dos últimos 3 meses calendário.
- [x] Trocar período volta para página 1.
- [x] Exportar PDF inclui todas as transações filtradas, com rótulo de período correto.
- [x] Período vazio exibe mensagem amigável usando componente do Design System.
- [x] Placeholder "Filtrar" removido da toolbar (filtros avançados continuam fora de escopo).

## Dependencies

- `lib/transacoes-mock.ts` — tipo `Transaction`, `buildTransacoesList`
- `app/transacoes/transacoes-view.tsx` — UI existente
- `features/dashboard/types/dashboard.ts` — labels de período (avaliar reutilização)
- `components/ui/empty` — estado vazio (verificar no Styleguide)

## Open Questions

- [ ] Reutilizar `DashboardPeriodLabel` ou manter `PERIOD_LABELS` local em transações?
- [ ] Exportação PDF: incluir transações filtradas ou manter comportamento atual (só página)? → **Decidido: filtradas (FR-5)**

## References

- Código atual: `app/transacoes/transacoes-view.tsx`
- Mock: `lib/transacoes-mock.ts`
- Padrão de período no dashboard: `features/dashboard/`
- Styleguide DatePicker: `app/styleguide/components/date-picker/page.tsx` (referência futura)
