# Task: Lógica de filtro por período

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 1](../plan.md#phase-1-lógica-de-filtro)
**Status**: DONE
**Priority**: P0 (Critical)

## Objective

Criar funções puras que convertem um label de período em intervalo de datas e filtram transações por `occurredAt`, atendendo FR-1, FR-2 e EC-4.

## Context

Ver [research-estado-atual.md](../notes/research-estado-atual.md). O mock já expõe `occurredAt` como ISO string; a view ainda não usa filtro.

## Scope

### In Scope

- Arquivo `lib/transacoes-period.ts`
- Tipo `TransacoesPeriodLabel` (ou reexport de dashboard se compatível)
- `getPeriodDateRange(label, referenceDate?)`
- `filterTransactionsByPeriod(transactions, period)`
- Comparação por data local (YYYY-MM-DD)

### Out of Scope

- Alterações na view
- Testes automatizados (opcional nesta entrega; manual OK)

## Implementation Details

```typescript
// lib/transacoes-period.ts (esboço)
export const TRANSACOES_PERIOD_LABELS = [
  "Este Mês",
  "Mês passado",
  "Últimos 3 meses",
] as const

export type TransacoesPeriodLabel = (typeof TRANSACOES_PERIOD_LABELS)[number]

export function getPeriodDateRange(
  period: TransacoesPeriodLabel,
  referenceDate = new Date()
): { start: string; end: string } {
  // start/end como YYYY-MM-DD inclusive
}

export function filterTransactionsByPeriod<T extends { occurredAt: string }>(
  items: T[],
  period: TransacoesPeriodLabel,
  referenceDate?: Date
): T[] {
  const { start, end } = getPeriodDateRange(period, referenceDate)
  return items.filter((item) => {
    const day = item.occurredAt.slice(0, 10)
    return day >= start && day <= end
  })
}
```

### Key Considerations

- "Últimos 3 meses": incluir mês atual + 2 anteriores (alinhar com dashboard se possível)
- `referenceDate` opcional facilita testes manuais e futuros unit tests
- Não importar React neste módulo

## Acceptance Criteria

- [x] Três labels produzem intervalos corretos para uma data de referência fixa
- [x] Transação no primeiro e último dia do intervalo é incluída
- [x] Transação fora do intervalo é excluída
- [x] Função é pura (sem side effects)

## Files to Modify

| File | Changes |
|------|---------|
| `lib/transacoes-period.ts` | Novo — lógica de filtro |

## Dependencies

### Blocked By

- [x] Spec aprovada (draft suficiente para iniciar)

### Blocks

- [02-integracao-transacoes-view.md](02-integracao-transacoes-view.md)

## Testing

- [x] Teste manual com console.log em datas conhecidas do mock
- [ ] (Opcional) Unit test em `lib/transacoes-period.test.ts`

## Notes

- Comparar implementação com `features/dashboard/utils/dashboard-calculations.ts` antes de duplicar lógica
