# Research: Estado atual da tela de Transações

**Date**: 2026-08-03
**Related spec**: [spec.md](../spec.md)

## Resumo

A UI de período já existe, mas a filtragem não está implementada.

## Arquivos relevantes

| Arquivo | Observação |
|---------|------------|
| `app/transacoes/transacoes-view.tsx` | `period` state na linha 56; usado só em export PDF (linha 136) |
| `lib/transacoes-mock.ts` | `Transaction.occurredAt` ISO; `buildTransacoesList(n)` gera lista |
| `lib/export-transacoes-pdf.ts` | Recebe `{ transactions, period }` |
| `features/dashboard/` | Padrão similar de `DashboardPeriodLabel` |

## Gap identificado

```tsx
// transacoes-view.tsx — period não filtra transactions
const slice = transactions.slice(start, start + PAGE_SIZE)
// export usa slice (página atual), não filtered completo
void exportTransacoesToPdf({ transactions: slice, period })
```

## Botão "Filtrar"

- Renderizado na linha 98–101
- Sem `onClick` — placeholder para filtros avançados futuros
- **Fora de escopo** desta feature (spec Non-Goals)

## Componentes DS disponíveis

- `DropdownMenu` — já em uso para período
- `DatePicker` — styleguide em `app/styleguide/components/date-picker/page.tsx`
- `Empty` — verificar `components/ui/empty` para estado vazio

## Recomendação

Priorizar Phase 1 (função pura) antes de tocar na view, para facilitar testes e handoff entre agentes.
