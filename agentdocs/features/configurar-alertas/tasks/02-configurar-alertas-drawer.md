# Task: Componente ConfigurarAlertasDrawer

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 2](../plan.md#phase-2-drawer-de-configuração)
**Status**: DONE
**Priority**: P0 (Critical)

## Objective

Criar drawer controlado de regras de alerta reutilizando o Design System e o sync `wasOpen` do `CartaoDrawer`, atendendo FR-3, FR-4, FR-6, FR-7, FR-8, FR-9, NFR-2, NFR-3.

## Context

Após task 01, importar helpers de `lib/alertas-mock.ts`. Espelhar estrutura de `NovaTransacaoDrawer` / `CartaoDrawer`. Consultar Styleguide Drawer e Switch.

## Scope

### In Scope

- Arquivo `components/finova/configurar-alertas-drawer.tsx`
- Props: `open`, `onOpenChange`, `rules`, `onSubmit?`
- Três blocos de regra (Switch + limiar)
- Validação via `validateConfigurarAlertasForm`
- Submit mock com delay ~300 ms + `console.log`
- Reset/sync ao abrir e fechar
- Foco em `#alerta-regra-limites-gasto`

### Out of Scope

- Integração em `AlertasView` (task 03)
- Alterar `FinovaEmptyState`
- Dialog / Modal central
- Inbox de avisos

## Implementation Details

```typescript
type ConfigurarAlertasDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  rules: ConfigurarAlertasFormValues
  onSubmit?: (rules: ConfigurarAlertasFormValues) => void
}
```

### Estrutura UI

```
Drawer (direction="right")
└── DrawerContent (sm:max-w-lg)
    ├── DrawerHeader — "Configurar alertas"
    └── form
        ├── FieldGroup
        │   └── 3× bloco regra
        │       ├── label + description + Switch
        │       └── limiar (disabled se !enabled)
        └── DrawerFooter — Cancelar | Salvar
```

Limiares:

| Regra | Controle | Detalhe |
|-------|----------|---------|
| `limites-gasto` | `Input` | inteiro; sufixo visual “%” se o DS permitir sem componente novo; senão `FieldDescription` “Percentual do orçamento” |
| `vencimento-faturas` | `Input` | inteiro; descrição “Dias antes do vencimento” |
| `transacoes-altas` | `CurrencyInput` | centavos; mesmo padrão do create de transação |

### Sync ao abrir (padrão CartaoDrawer)

```typescript
const [wasOpen, setWasOpen] = React.useState(false)

if (open && !wasOpen) {
  setWasOpen(true)
  setForm(rules)
  setErrors({})
  setIsSubmitting(false)
} else if (!open && wasOpen) {
  setWasOpen(false)
}
```

Ao fechar (`handleOpenChange(false)`): não precisa resetar form além do próximo open (FR-6 / EC-6).

### Key Considerations

- IDs: `alerta-regra-limites-gasto`, `alerta-regra-vencimento-faturas`, `alerta-regra-transacoes-altas` (Switches); limiares `alerta-limiar-*`.
- `Switch` com `aria-describedby` apontando para a description (padrão Configurações).
- Limiar `disabled={!rule.enabled}` + não validar se off (FR-4).
- COPY: título “Configurar alertas”, submit “Salvar”, saving “Salvando…”, cancelar “Cancelar”.
- `console.log("Configurar alertas (mock):", rules)` no submit.
- Não adicionar `DrawerDescription` (padrão recente do projeto).
- Composição: `Drawer → DrawerContent → DrawerHeader → form → DrawerFooter`.

## Acceptance Criteria

- [x] Drawer abre com as três regras e limiares preenchidos a partir de `rules`
- [x] Switch desliga o limiar (`disabled`)
- [x] Validação exibe `FieldError` só em regras habilitadas
- [x] Cancelar fecha sem chamar `onSubmit`
- [x] Salvar válido chama `onSubmit` com o form e fecha via `onOpenChange(false)` após o delay
- [x] Foco inicial no Switch de limites de gasto
- [x] Reabrir após editar e cancelar mostra `rules` do pai, não o rascunho (EC-6)
- [x] Usa apenas componentes do Design System existentes

## Files to Modify

| File | Changes |
|------|---------|
| `components/finova/configurar-alertas-drawer.tsx` | Novo componente |

## Dependencies

### Blocked By

- [01-mock-regras-alertas.md](01-mock-regras-alertas.md)

### Blocks

- [03-integracao-alertas-view.md](03-integracao-alertas-view.md)

## Testing

- [ ] Manual: montar cedo na view (task 03) ou smoke isolado
- [ ] Manual: tab order Switch → limiar em cada regra
- [ ] Manual: `aria-invalid` no limiar com erro
- [ ] Manual: EC-6 abrir/alterar/fechar/reabrir

## Notes

- Consultar `app/styleguide/components/drawer/page.tsx` e `app/styleguide/components/switch/page.tsx` antes de implementar.
- Reutilizar `Field` / `FieldError` / `FieldLabel` como nos outros drawers.
