# Task: Helpers da lista de regras no mock

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 1](../plan.md#phase-1-helpers-no-mock)
**Status**: DONE
**Priority**: P0 (Critical)

## Objective

Estender `lib/alertas-mock.ts` com tipo de item, formatação de limiar, filtro das regras habilitadas e predicado empty vs lista, atendendo FR-1, FR-2, FR-3, FR-6 e NFR-4 / NFR-5.

## Context

Ver [research-estado-atual.md](../notes/research-estado-atual.md). Reusar tipos e `ALERTA_REGRAS_META` já existentes. Não importar `configuracoes-mock` nem `DashboardAlert`. Monetário via `formatBRL` em `lib/currency.ts`.

## Scope

### In Scope

- Tipo `AlertaRegraListaItem`
- Mapa estático id → ícone (`wallet` / `creditCard` / `trendingUp`)
- `formatAlertaRegraThreshold(rule)`
- `getEnabledAlertaRegras(rules)`
- `shouldShowAlertasLista({ hasSaved, rules })`
- Ajuste de `getAlertasEmptyTitle` para não devolver “Nenhum alerta disparado”

### Out of Scope

- Componentes UI (task 02)
- Integração em `AlertasView` (task 03)
- Alterar validação / defaults / drawer
- Testes automatizados (opcional)

## Implementation Details

Ícones: union `AlertaRegraListaIcon` no mock, **sem** importar `IconName` de `@/app/styleguide` (ADR-004: `lib/` não depende de `app/`). A UI da task 02 usa `Icons[item.icon]`.

```typescript
export type AlertaRegraListaItem = {
  id: AlertaRegraId
  label: string
  thresholdLabel: string
  icon: AlertaRegraListaIcon
}
```

### Key Considerations

- Ordem MUST vir de `ALERTA_REGRAS_META`, não de `Object.values`.
- Plural de dias em pt-BR: `1` → “dia”; demais inteiros → “dias”.
- Assinatura de `getAlertasEmptyTitle` mantida para a view atual (task 03 ainda usa).

## Acceptance Criteria

- [x] `getEnabledAlertaRegras` devolve só `enabled`, na ordem FR-2, com `label` de `ALERTA_REGRAS_META` e `icon` correto.
- [x] Limiares: `80% do orçamento`, `1 dia de antecedência`, `3 dias de antecedência`, `formatBRL` para centavos.
- [x] `shouldShowAlertasLista` é false sem save e com todas off; true com save + ≥1 ligada.
- [x] `getAlertasEmptyTitle` não devolve “Nenhum alerta disparado”.
- [x] Sem alteração de UI nesta task.

## Files to Modify

| File | Changes |
|------|---------|
| `lib/alertas-mock.ts` | Tipo, ícones, três helpers, simplificar título do empty |

## Dependencies

### Blocked By

- [x] Feature `configurar-alertas` (mock existente)

### Blocks

- [02-alertas-regras-list](02-alertas-regras-list.md)
- [03-integracao-alertas-view](03-integracao-alertas-view.md)

## Testing

- [x] Asserções ad hoc via `npx tsx`
- [x] `npx tsc --noEmit`

## Notes

- ADR-004: lógica na camada mock, não na view.
- Não criar arquivo mock novo.
- Desvio vs rascunho da task: sem `import type { IconName } from "@/app/styleguide/icons"` — union local.
