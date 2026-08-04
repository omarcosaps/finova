# Implementation Plan: Filtro por período na listagem de Transações

**Spec**: [spec.md](spec.md)
**Status**: Draft
**Last Updated**: 2026-08-03

## Approach Summary

Implementar uma função pura `filterTransactionsByPeriod(transactions, period)` em `lib/` (ou `features/transacoes/`) que recebe o array completo e retorna o subconjunto filtrado. Em `TransacoesView`, derivar `filteredTransactions` via `useMemo` a partir de `transactions` e `period`, e usar esse array para paginação, contador, tabela e exportação PDF. Alinhar labels de período com o dashboard quando possível, sem alterar backend.

## Architecture

### Components

| Component | Purpose | New/Modified |
|-----------|---------|--------------|
| `filterTransactionsByPeriod` | Lógica de intervalo por label de período | New |
| `getPeriodDateRange` | Resolve label → `{ start, end }` em datas locais | New |
| `TransacoesView` | Conectar filtro, empty state, export | Modified |
| `exportTransacoesToPdf` | Já aceita `transactions` + `period` | Unchanged (caller muda payload) |

### Data Model

Sem alteração de schema. Filtro opera sobre:

```typescript
type Transaction = {
  id: string
  occurredAt: string // ISO 8601
  description: string
  category: string
  amountCents: number
  direction: "in" | "out"
}
```

Estado local em `TransacoesView`:

```typescript
period: "Este Mês" | "Mês passado" | "Últimos 3 meses"
transactions: Transaction[]        // fonte completa (mock + novas)
filteredTransactions: Transaction[] // derivado
```

### System Diagram

```
┌─────────────────────┐
│  buildTransacoesList │
│  + NovaTransacao     │
└──────────┬──────────┘
           │ transactions[]
           ▼
┌─────────────────────┐     period
│ filterByPeriod()    │◀──────────── DropdownMenu
└──────────┬──────────┘
           │ filtered[]
           ▼
┌─────────────────────┐
│ paginate → Table    │
│ exportTransacoesPdf │
│ Empty (se len=0)    │
└─────────────────────┘
```

## Implementation Phases

### Phase 1: Lógica de filtro

**Goal**: Funções puras testáveis para intervalos de período.

- [ ] Criar `lib/transacoes-period.ts` (ou `features/transacoes/utils/period-filter.ts`)
- [ ] Implementar `getPeriodDateRange(label, referenceDate?)`
- [ ] Implementar `filterTransactionsByPeriod(transactions, period)`
- [ ] Cobrir EC-4 (timezone local) com comparação YYYY-MM-DD

### Phase 2: Integração na view

**Goal**: UI reflete filtro em tempo real.

- [ ] `useMemo` para `filteredTransactions`
- [ ] Paginação e contador usam array filtrado
- [ ] Reset `page` para 0 em `onSelect` do período
- [ ] Export PDF passa `filteredTransactions` inteiro

### Phase 3: Estados e polish

**Goal**: Empty state e consistência visual.

- [ ] Empty state quando `filteredTransactions.length === 0`
- [ ] Verificar acessibilidade (aria-live no contador ou região vazia)
- [ ] Revisão visual contra Styleguide

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Onde colocar lógica | `lib/transacoes-period.ts` | Coeso com `transacoes-mock.ts`; fácil de testar |
| Labels de período | Reutilizar union type do dashboard se compatível | Consistência entre dashboard e transações |
| Filtro customizado | Fora de escopo | Botão "Filtrar" fica para feature futura |
| Backend | Não alterar | Regra do projeto: frontend only |

## Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Divergência de labels dashboard vs transações | Medium | Medium | Extrair tipo compartilhado ou mapear explicitamente |
| Mock sem datas distribuídas nos 3 meses | Medium | High | Validar `buildTransacoesList`; ajustar mock se necessário |
| Export PDF grande | Low | Low | Mock limitado; OK para MVP |

## Testing Strategy

### Unit Tests

- `getPeriodDateRange` para cada label em data fixa (mock `Date`)
- `filterTransactionsByPeriod` inclui/exclui fronteiras de mês
- EC-3: lista vazia retorna `[]`

### Manual Verification

- Trocar os 3 períodos na UI e validar contagem
- Criar transação hoje e confirmar visibilidade em "Este Mês"
- Exportar PDF e conferir quantidade de linhas

## Rollout Plan

1. **Dev**: Implementar com mock local
2. **Review**: Validar contra spec e Styleguide
3. **Future**: Substituir mock por query com query params quando houver API

## Success Metrics

- Todos os critérios de aceite da spec atendidos
- Zero regressão na criação de nova transação e paginação

## Changelog

### 2026-08-03

- Plano inicial criado a partir da spec e análise de `transacoes-view.tsx`
