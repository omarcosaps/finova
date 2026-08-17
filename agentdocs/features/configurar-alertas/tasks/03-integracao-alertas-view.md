# Task: Integrar drawer na AlertasView e empty state

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 3](../plan.md#phase-3-integração-na-view-e-empty-state)
**Status**: DONE
**Priority**: P0 (Critical)

## Objective

Conectar `ConfigurarAlertasDrawer` a `/alertas`: CTA do empty state e botão do header abrem o drawer; `onSubmit` persiste regras no estado local e atualiza o título do empty (FR-1, FR-2, FR-8, FR-10, FR-11, EC-8, EC-9).

## Context

`AlertasView` hoje só renderiza header + `FinovaEmptyState variant="alertas"`. O CTA primário não tem handler. Relatórios e Categorias compartilham `FinovaEmptyState` — a extensão MUST ser opcional.

## Scope

### In Scope

- `FinovaEmptyState`: props opcionais `onPrimaryAction?` e `title?`
- Estado em `AlertasView`: `drawerOpen`, `savedRules`, `hasSaved`
- Botão “Configurar alertas” no header
- Render de `ConfigurarAlertasDrawer`
- `onSubmit`: salvar rules + `hasSaved = true`
- Título do empty via `getAlertasEmptyTitle`

### Out of Scope

- Inbox / lista de alertas disparados
- Badge da sidebar
- Sync com Configurações
- Ligar CTAs de Relatórios/Categorias

## Implementation Details

### FinovaEmptyState

```typescript
type FinovaEmptyStateProps = {
  variant: FinovaEmptyVariant
  onPrimaryAction?: () => void
  title?: string
}
```

Em `EmptyActionButton`:

- Se `action.href` → `Link` (inalterado).
- Senão se `onPrimaryAction` → `<Button onClick={onPrimaryAction}>`.
- Senão → botão sem ação (comportamento atual).

`EmptyTitle` usa `title ?? config.title`. Não passar `onPrimaryAction` nas outras rotas (EC-8).

### AlertasView

```tsx
const [drawerOpen, setDrawerOpen] = React.useState(false)
const [savedRules, setSavedRules] = React.useState(
  getDefaultConfigurarAlertasFormValues
)
const [hasSaved, setHasSaved] = React.useState(false)

const handleOpenDrawer = () => {
  setDrawerOpen(true)
}

const emptyTitle = getAlertasEmptyTitle({ hasSaved, rules: savedRules })

// header: flex como Configurações — título/subtítulo à esquerda, Button à direita
// Button header: "Configurar alertas" → handleOpenDrawer

<FinovaEmptyState
  variant="alertas"
  title={emptyTitle}
  onPrimaryAction={handleOpenDrawer}
/>

<ConfigurarAlertasDrawer
  open={drawerOpen}
  onOpenChange={setDrawerOpen}
  rules={savedRules}
  onSubmit={(rules) => {
    setSavedRules(rules)
    setHasSaved(true)
  }}
/>
```

### Key Considerations

- Header atual é `space-y-1`; passar a `flex flex-col gap-4 … md:flex-row md:items-start md:justify-between` (espelhar `configuracoes-view.tsx`).
- CTA secundário “Ver transações” permanece via `href` (EC-9).
- `page.tsx` de Alertas permanece Server Component; só a view é client.
- Não alterar copy da `description` do empty nesta entrega (FR-10 fala só do título).
- `hasSaved` começa `false` mesmo com defaults ligados (open question da spec).

## Acceptance Criteria

- [x] CTA do empty abre o drawer
- [x] Botão do header abre o mesmo drawer
- [x] Salvar atualiza estado e fecha o drawer (fechamento no drawer; view recebe `onSubmit`)
- [x] Antes do 1º save o título é “Nenhum alerta”
- [x] Após save com alguma regra ligada o título é “Nenhum alerta disparado”
- [x] Após save com todas off o título é “Nenhum alerta”
- [x] Cancelar não muda título nem `savedRules`
- [x] `/relatorios` e `/categorias` inalterados
- [x] “Ver transações” navega para `/transacoes`

## Files to Modify

| File | Changes |
|------|---------|
| `components/finova/finova-empty-state.tsx` | `onPrimaryAction?`, `title?`, click no primário |
| `app/alertas/alertas-view.tsx` | Estado, header button, empty, drawer |

## Dependencies

### Blocked By

- [02-configurar-alertas-drawer.md](02-configurar-alertas-drawer.md)

### Blocks

- Nenhuma nesta feature (sem task 04)

## Testing

- [ ] Manual: fluxo empty → drawer → save → título
- [ ] Manual: header → drawer
- [ ] Manual: EC-4 todas off
- [ ] Manual: EC-6 rascunho descartado
- [ ] Manual: `/relatorios` e `/categorias` (EC-8)
- [ ] Manual: link “Ver transações” (EC-9)

## Notes

- Seguir `AGENTS.md`: diagnóstico antes de implementar se houver desvio da spec.
- Após a sessão, criar `progress/session-001.md`.
