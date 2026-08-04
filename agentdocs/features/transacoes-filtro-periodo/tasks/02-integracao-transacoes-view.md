# Task: Integrar filtro na TransacoesView

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 2](../plan.md#phase-2-integração-na-view)
**Status**: DONE
**Priority**: P0 (Critical)

## Objective

Conectar `filterTransactionsByPeriod` à tela de transações: paginação, contador e exportação devem usar o array filtrado (FR-3, FR-4, FR-5).

## Context

Após a task 01, importar as funções em `transacoes-view.tsx` e substituir uso direto de `transactions` na paginação.

## Scope

### In Scope

- `useMemo` para `filteredTransactions`
- Paginação sobre `filteredTransactions`
- Reset `setPage(0)` ao trocar período no `DropdownMenuItem`
- Export PDF com `filteredTransactions` (não `slice`)
- Remover duplicação de `PERIOD_LABELS` se tipo centralizado existir

### Out of Scope

- Empty state (task 03)
- Botão "Filtrar"

## Implementation Details

```tsx
const filteredTransactions = React.useMemo(
  () => filterTransactionsByPeriod(transactions, period),
  [transactions, period]
)

const pageCount = Math.max(1, Math.ceil(filteredTransactions.length / PAGE_SIZE))
const slice = filteredTransactions.slice(start, start + PAGE_SIZE)

// onSelect período:
onSelect={() => {
  setPeriod(label)
  setPage(0)
}}

// export:
void exportTransacoesToPdf({ transactions: filteredTransactions, period })
```

### Key Considerations

- `safePage` já faz clamp — validar com lista filtrada menor que página atual
- Nova transação via drawer: continua em `transactions`; filtro derivado automaticamente

## Acceptance Criteria

- [x] Trocar período atualiza linhas visíveis na tabela
- [x] Contador mostra total filtrado
- [x] Paginação funciona sobre subset filtrado
- [x] Export inclui todas as transações do período, não só a página

## Files to Modify

| File | Changes |
|------|---------|
| `app/transacoes/transacoes-view.tsx` | Integrar filtro e ajustar export |
| `lib/transacoes-period.ts` | Import (criado na task 01) |

## Dependencies

### Blocked By

- [x] [01-filtro-periodo-logica.md](01-filtro-periodo-logica.md)

### Blocks

- [03-estados-ui-acessibilidade.md](03-estados-ui-acessibilidade.md)

## Testing

- [x] Manual: alternar os 3 períodos e verificar contagem
- [ ] Manual: export PDF com > PAGE_SIZE transações no período

## Notes

- Seguir `AGENTS.md`: reutilizar componentes existentes, sem hardcode de cores
