# Task: Componente AlertasRegrasList

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 2](../plan.md#phase-2-componente-da-lista)
**Status**: DONE
**Priority**: P0 (Critical)

## Objective

Criar o componente de lista das regras habilitadas com layout tipo item (ícone + título + limiar), clicável para abrir o drawer, atendendo FR-3, FR-4 (contrato `onSelect`), NFR-1, NFR-2 e NFR-3.

## Context

Após task 01, importar `AlertaRegraListaItem` de `lib/alertas-mock.ts`. Espelhar a estrutura visual dos cards de alerta em `resumo-view.tsx` (`flex items-start gap-3 rounded-lg border p-3`), trocando o dot colorido por `DsIcon`. Sem Switch. Sem `ALERT_STYLES`.

## Scope

### In Scope

- Arquivo `components/finova/alertas-regras-list.tsx`
- Props `items` + `onSelect?`
- Um `button` por item; lista `ul`/`li`
- Ícone via `DsIcon` + `Icons[item.icon]`

### Out of Scope

- Helpers do mock (task 01)
- Condicional empty vs lista na view (task 03)
- Alterar o drawer
- Foto/thumbnail de produto

## Implementation Details

```typescript
type AlertasRegrasListProps = {
  items: AlertaRegraListaItem[]
  onSelect?: (id: AlertaRegraId) => void
}
```

`aria-label={`Configurar ${item.label}`}` no botão. Ícone `aria-hidden`.

## Acceptance Criteria

- [x] Cada item mostra ícone + label + `thresholdLabel`.
- [x] Clique dispara `onSelect(id)`.
- [x] Itens são botões focáveis com `aria-label` contendo o nome da regra.
- [x] Sem Switch, sem cores de variant destructive/warning do Resumo.
- [x] Sem integração na rota nesta task.

## Files to Modify

| File | Changes |
|------|---------|
| `components/finova/alertas-regras-list.tsx` | New — lista clicável |

## Dependencies

### Blocked By

- [x] [01-mock-lista-regras](01-mock-lista-regras.md)

### Blocks

- [03-integracao-alertas-view](03-integracao-alertas-view.md)

## Testing

- [x] Typecheck após criar o arquivo
- [ ] Verificação visual na task 03

## Notes

- Registry: `app/styleguide/icons` — não adicionar ícones novos.
- Referência de layout: `app/resumo-view.tsx` (widget Alertas), não os dados.
