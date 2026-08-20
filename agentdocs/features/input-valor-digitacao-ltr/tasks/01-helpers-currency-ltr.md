# Task: Helpers LTR em lib/currency.ts

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 1](../plan.md#phase-1-helpers-em-libcurrencyts)
**Status**: DONE
**Priority**: P0 (Critical)

## Objective

Expor funções puras para rascunho pt-BR, conversão para centavos, teclas e paste, cobrindo FR-1 a FR-9 e EC-1 a EC-9.

## Scope

### In Scope

- Exportar `MAX_CENTS`
- `formatCurrencyDraft`, `draftToCents`, `applyCurrencyDraftKey`, `sanitizeCurrencyDraft`
- Deixar `digitsToCents` de ser o caminho de digitação/paste (remover se ficar sem uso)

### Out of Scope

- Componente `CurrencyInput`
- Drawers
- Testes automatizados no runner do projeto (não existe)

## Implementation Details

- Parte inteira: dígitos da esquerda para a direita; milhar via `Intl` pt-BR.
- Vírgula/ponto: no máximo um; decimal no máximo 2 dígitos.
- Campo vazio + vírgula → `0,`.
- `draftToCents("")` e `draftToCents("0,")` → `0` (não `null`).
- Overflow: retornar o draft anterior (tecla ignorada).
- Paste: `"21"` → draft `"21"` (2100 centavos); `"1.234,56"` → decimal pt-BR.

## Acceptance Criteria

- [x] `applyCurrencyDraftKey("", "2")` + `"1"` → `"21"`
- [x] Vírgula após `21` → `"21,"`
- [x] `draftToCents("0,21") === 21`
- [x] `sanitizeCurrencyDraft("21")` não vira centavos RTL
- [x] Terceiro decimal ignorado

## Files to Modify

| File | Changes |
|------|---------|
| `lib/currency.ts` | Helpers LTR; `MAX_CENTS`; remover `digitsToCents` se órfão |

## Dependencies

### Blocked By

- [x] Spec aprovada

### Blocks

- [02-currency-input-ltr.md](02-currency-input-ltr.md)

## Testing

- [x] Script Node pontual cobrindo a tabela do spec
