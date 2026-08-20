# Task: CurrencyInput com draft LTR

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 2](../plan.md#phase-2-currencyinput)
**Status**: DONE
**Priority**: P0 (Critical)

## Objective

Reescrever o `CurrencyInput` para usar o draft LTR, normalizar no blur e abrir o teclado decimal no mobile, sem mudar a API pública.

## Scope

### In Scope

- Estado `draft` + `isFocused`
- Keydown: dígito, `,` / `.`, Backspace / Delete
- Select-all + dígito substitui o valor
- onChange: paste via `sanitizeCurrencyDraft`
- onBlur: `formatCentsForInput` se cents > 0
- `inputMode` default `"decimal"`
- Remover `useLayoutEffect` que força o cursor ao fim

### Out of Scope

- Alterar drawers
- Styleguide

## Implementation Details

```tsx
const [draft, setDraft] = React.useState(() =>
  valueCents > 0 ? formatCentsForInput(valueCents) : ""
)

const commitDraft = (nextDraft: string) => {
  setDraft(nextDraft)
  onValueCentsChange(draftToCents(nextDraft))
}
```

- Enquanto focado, exibir `draft`.
- Quando não focado, sync de `valueCents` (abrir edição / reset do form).
- Atalhos (Ctrl/Meta/Alt) e teclas de navegação continuam permitidos.

## Acceptance Criteria

- [x] API `valueCents` / `onValueCentsChange` inalterada
- [x] Sem `setSelectionRange` forçado
- [x] Blur formata 2 casas
- [x] `inputMode` default `decimal`

## Files to Modify

| File | Changes |
|------|---------|
| `components/ui/currency-input.tsx` | Draft LTR, blur, paste, inputMode |

## Dependencies

### Blocked By

- [x] [01-helpers-currency-ltr.md](01-helpers-currency-ltr.md)

### Blocks

- [03-qa-drawers.md](03-qa-drawers.md)

## Testing

- [x] QA manual na Phase 3
