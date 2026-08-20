# Research: Máscara atual do CurrencyInput

**Date**: 2026-08-18
**Related**: [spec.md](../spec.md)

## Question

Por que o campo Valor digita de trás para frente, e o que precisa mudar sem quebrar os drawers?

## Summary

A máscara é implementação própria (sem `react-number-format` / IMask). O estado é `valueCents`; cada dígito faz `valueCents * 10 + dígito`. Paste usa `digitsToCents` (todos os dígitos = centavos). Quatro drawers já usam `CurrencyInput` — a correção deve ficar no componente + `lib/currency.ts`.

## Findings

### Componente

[`components/ui/currency-input.tsx`](../../../../components/ui/currency-input.tsx):

- `next = valueCents * 10 + Number(event.key)`
- Backspace: `Math.floor(valueCents / 10)`
- `useLayoutEffect` força o cursor para o fim
- `inputMode` default `numeric` (sem vírgula no teclado mobile)

### Helpers

[`lib/currency.ts`](../../../../lib/currency.ts):

- `formatCentsForInput` — sempre 2 casas (exibição fora de foco)
- `digitsToCents` — RTL / cent-based; só usado pelo input
- `parseValorToCents` — decimal pt-BR, mas rejeita `<= 0`; não usado no input

### Usos

| Drawer | Label |
|--------|--------|
| `nova-transacao-drawer.tsx` | Valor |
| `editar-transacao-drawer.tsx` | Valor |
| `configurar-alertas-drawer.tsx` | Valor mínimo |
| `cartao-drawer.tsx` | Limite do cartão |

## Recommendations

1. **Draft local** enquanto focado, para estados como `21,`.
2. **Helpers puros** em `lib/currency.ts` (`applyCurrencyDraftKey`, `draftToCents`, `sanitizeCurrencyDraft`).
3. **Não alterar** a API `valueCents` dos drawers.

## Next Steps

- [x] Spec e plan
- [x] Implementar helpers e componente
