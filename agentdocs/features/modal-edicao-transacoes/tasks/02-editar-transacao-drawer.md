# Task: Componente EditarTransacaoDrawer

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 2](../plan.md#phase-2-drawer-de-edição)
**Status**: DONE
**Priority**: P0 (Critical)

## Objective

Criar drawer controlado de edição reutilizando componentes do Design System e espelhando estrutura do `NovaTransacaoDrawer`, com sync de formulário ao abrir (padrão `CartaoDrawer`), atendendo FR-2, FR-4, FR-8, FR-9, NFR-2, NFR-3.

## Context

Após task 01, importar helpers de `lib/transacoes-mock.ts`. Consultar Styleguide Drawer e campos equivalentes no create drawer.

## Scope

### In Scope

- Arquivo `components/finova/editar-transacao-drawer.tsx`
- Props: `open`, `onOpenChange`, `transaction: Transaction | null`, `onSubmit?`
- Formulário com 5 campos: direção, descrição, valor, categoria, data
- Validação via `validateEdicaoTransacaoForm`
- Submit via `updateTransactionFromForm` + delay mock
- Reset/sync ao abrir e fechar
- Foco em `#editar-tx-descricao`

### Out of Scope

- Integração na `TransacoesView` (task 03)
- Campos `sourceId`, `notes`
- Dialog / Modal central

## Implementation Details

```typescript
type EditarTransacaoDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction: Transaction | null
  onSubmit?: (
    transaction: Transaction,
    form: EdicaoTransacaoFormValues
  ) => void
}
```

### Estrutura UI (espelhar NovaTransacaoDrawer)

```
Drawer (direction="right")
└── DrawerContent (sm:max-w-lg)
    ├── DrawerHeader — "Editar transação"
    └── form
        ├── FieldGroup
        │   ├── FieldSet — RadioGroup direção
        │   ├── Field — descrição (Input)
        │   ├── Field — valor (CurrencyInput)
        │   └── grid 2 cols — categoria (Select) + data (DatePicker)
        └── DrawerFooter — Cancelar | Salvar alterações
```

### Sync ao abrir (padrão CartaoDrawer)

```typescript
const [wasOpen, setWasOpen] = React.useState(false)

if (open && !wasOpen && transaction) {
  setWasOpen(true)
  setForm(getEdicaoFormValuesFromTransaction(transaction))
  setErrors({})
  setIsSubmitting(false)
} else if (!open && wasOpen) {
  setWasOpen(false)
}
```

### Key Considerations

- IDs de campo prefixados `editar-tx-*` (não colidir com `nova-tx-*`)
- `handleDirectionChange` idêntico ao create drawer (FR-4)
- Se `transaction` for `null`, não renderizar form ou retornar null
- COPY: título "Editar transação", submit "Salvar alterações", saving "Salvando…"
- `console.log("Editar transação (mock):", { transaction, form })` no submit

## Acceptance Criteria

- [x] Drawer abre com campos pré-preenchidos quando `transaction` é passada
- [x] Validação exibe `FieldError` por campo inválido
- [x] Trocar direção atualiza categorias e limpa categoria inválida
- [x] Cancelar fecha drawer sem chamar `onSubmit`
- [x] Salvar chama `onSubmit` com transação atualizada (mesmo `id`)
- [x] Foco inicial no campo descrição
- [x] Usa apenas componentes do Design System existentes

## Files to Modify

| File | Changes |
|------|---------|
| `components/finova/editar-transacao-drawer.tsx` | Novo componente |

## Dependencies

### Blocked By

- [01-mock-edicao-logica.md](01-mock-edicao-logica.md)

### Blocks

- [03-integracao-transacoes-view.md](03-integracao-transacoes-view.md)

## Testing

- [ ] Manual: montar Story/isolado temporário ou integrar cedo na view para smoke test
- [ ] Manual: abrir/fechar/reabrir mesma transação (EC-8)
- [ ] Manual: tab order e aria-invalid nos campos com erro

## Notes

- Consultar `app/styleguide/components/drawer/page.tsx` antes de implementar
- Não adicionar `DrawerDescription` (padrão recente do projeto — ver changelog)
