# Task: Integrar lista vs empty na AlertasView

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 3](../plan.md#phase-3-integração-na-view)
**Status**: DONE
**Priority**: P0 (Critical)

## Objective

Conectar `AlertasRegrasList` a `/alertas`: após save com regras habilitadas, mostrar a lista; caso contrário, o empty “Nenhum alerta”. Clique no item e no header abrem o mesmo drawer (FR-1, FR-4, FR-5, FR-6, FR-7).

## Context

`AlertasView` hoje sempre renderiza `FinovaEmptyState` com `title={getAlertasEmptyTitle(...)}`. Estado `savedRules` / `hasSaved` / `drawerOpen` e `ConfigurarAlertasDrawer` já existem — não recriar. Relatórios/Categorias não devem ser tocados.

## Scope

### In Scope

- Condicional `shouldShowAlertasLista` em `AlertasView`
- Render `AlertasRegrasList` com `getEnabledAlertaRegras(savedRules)`
- `onSelect` → `handleOpenDrawer` (mesmo do header)
- Empty só no ramo contrário, título “Nenhum alerta”

### Out of Scope

- Mudar contrato do drawer
- Inbox / `data.alerts`
- Badge da sidebar
- Switch na lista
- Ligar CTAs de Relatórios/Categorias

## Implementation Details

```tsx
const showLista = shouldShowAlertasLista({
  hasSaved,
  rules: savedRules,
})

{showLista ? (
  <AlertasRegrasList
    items={getEnabledAlertaRegras(savedRules)}
    onSelect={handleSelectRegra}
  />
) : (
  <FinovaEmptyState
    variant="alertas"
    title="Nenhum alerta"
    onPrimaryAction={handleOpenDrawer}
  />
)}
```

`handleSelectRegra` abre o drawer completo (sem deep-link de regra).

## Acceptance Criteria

- [x] Sem save: empty “Nenhum alerta”; CTA e “Ver transações” ok (EC-1, EC-8).
- [x] Save com ≥1 ligada: lista; empty some (EC-2, EC-3).
- [x] Save todas off: empty de volta (EC-4).
- [x] Clique no item abre o drawer; fechar sem salvar não muda a lista (EC-5).
- [x] Header continua abrindo o drawer com a lista visível (EC-7).
- [x] “Nenhum alerta disparado” não aparece (FR-6).
- [x] Relatórios/Categorias inalterados (EC-9).

## Files to Modify

| File | Changes |
|------|---------|
| `app/alertas/alertas-view.tsx` | Condicional lista vs empty; `onSelect` |

## Dependencies

### Blocked By

- [x] [01-mock-lista-regras](01-mock-lista-regras.md)
- [x] [02-alertas-regras-list](02-alertas-regras-list.md)

### Blocks

- (nenhuma)

## Testing

- [x] Checklist manual da spec (Acceptance Criteria)
- [x] `npx tsc --noEmit`

## Notes

- Drawer e empty de outras rotas MUST permanecer intactos.
- Após a sessão de implementação, gravar `progress/session-001.md`.
