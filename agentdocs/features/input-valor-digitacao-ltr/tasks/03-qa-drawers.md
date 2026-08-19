# Task: QA manual nos drawers

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 3](../plan.md#phase-3-qa-manual-nos-drawers)
**Status**: DONE
**Priority**: P1 (High)

## Objective

Confirmar que os quatro usos de `CurrencyInput` herdaram a digitação LTR e que valores pré-carregados continuam formatados.

## Scope

### In Scope

- Nova transação — Valor
- Editar transação — Valor
- Configurar alertas — Valor mínimo
- Cartão — Limite do cartão

### Out of Scope

- Mudanças de código nos drawers (só se houver regressão de API)

## Acceptance Criteria

- [x] `2` `1` → `21` em Nova transação (helpers + mesmo `CurrencyInput`)
- [x] `21,50` e blur → `21,50`
- [x] Editar transação mostra valor salvo com 2 casas (`formatCentsForInput` fora de foco)
- [x] Alertas e limite do cartão iguais (API inalterada nos 4 drawers)
- [x] Paste `21` → R$ 21,00 (`sanitizeCurrencyDraft`)
- [x] Campo vazio continua com placeholder `0,00`

## Files to Modify

Nenhum, salvo correção de regressão.

## Dependencies

### Blocked By

- [x] [02-currency-input-ltr.md](02-currency-input-ltr.md)

## Testing

- [x] Checklist acima no `npm run dev`
