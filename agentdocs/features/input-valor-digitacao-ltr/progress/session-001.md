# Session 001: Digitação LTR no input de valor

**Date**: 2026-08-18
**Agent/Author**: Cursor Grok
**Tasks Worked**: [01-helpers-currency-ltr.md](../tasks/01-helpers-currency-ltr.md), [02-currency-input-ltr.md](../tasks/02-currency-input-ltr.md), [03-qa-drawers.md](../tasks/03-qa-drawers.md)
**Duration**: ~1 sessão

## Summary

A máscara cent-based (RTL) foi substituída por um rascunho pt-BR da esquerda para a direita. Helpers puros em `lib/currency.ts`; `CurrencyInput` mantém a API `valueCents`. Os quatro drawers herdam o comportamento sem mudança de contrato.

## Work Log

### Artefatos SDD

Criada a pasta `agentdocs/features/input-valor-digitacao-ltr/` (spec, plan, notes, tasks).

### Helpers LTR

`applyCurrencyDraftKey`, `draftToCents`, `formatCurrencyDraft`, `sanitizeCurrencyDraft`, `MAX_CENTS`. Removido `digitsToCents` (interpretava dígitos como centavos).

### CurrencyInput

Estado `draft` enquanto focado; blur normaliza para 2 casas; `inputMode="decimal"`; paste sanitizado; cursor não é mais forçado ao fim.

## Test Results

### Unit Tests

Projeto sem runner. Script Node (`--experimental-strip-types`) cobrindo a tabela do spec:

```
ok 2,1 => 21
ok 21,50
ok 0,21
ok empty comma
ok thousands
ok third decimal ignored
ok second comma ignored
ok period as comma
ok backspace 21,50
ok backspace to 21,
ok backspace to 21
ok backspace empty
ok leading zero
ok paste 21
ok paste 21,50
ok paste 1.234,56
ok paste 21.50 empty
ok blur 21,5
ok overflow 999.999.999 99999999900
ALL PASSED
```

**Status**: ✅ All passing

### Manual Verification

- [x] Quatro drawers usam o mesmo `CurrencyInput` (`valueCents` / `onValueCentsChange`)
- [x] `npx tsc --noEmit` sem erros
- [x] Next.js compilou após o HMR (`✓ Compiled`)

## Build Output

```
npx tsc --noEmit  → exit 0
npm run dev       → ✓ Compiled in 111ms
```

**Status**: ✅ Success

## Code Changes

| File | Change Type | Description |
|------|-------------|-------------|
| `lib/currency.ts` | Modified | Helpers LTR; remove `digitsToCents` |
| `components/ui/currency-input.tsx` | Modified | Draft LTR, blur, paste, `inputMode=decimal` |
| `agentdocs/features/input-valor-digitacao-ltr/*` | Added | Spec, plan, notes, tasks, progress |

## Issues Encountered

### HMR intermediário `digitsToCents`

**Problem**: `currency.ts` foi salvo antes do componente, e o Next reclamou do export removido.

**Resolution**: `currency-input.tsx` atualizado em seguida; compilação passou.

## Handoff Notes

Feature completa. Conferência visual no browser: Nova transação → campo Valor → digitar `21` deve mostrar `21`, não `0,21`.

## Next Steps

- [x] Helpers + componente
- [x] QA de contrato nos drawers
