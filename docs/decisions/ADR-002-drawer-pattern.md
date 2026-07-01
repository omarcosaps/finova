# ADR-002 — Drawer controlado como padrão de formulário modal

**Status:** Aceito

## Contexto

O produto precisa de formulários contextuais (nova transação, novo cartão) sem navegar para uma página separada. Era necessário um padrão consistente para esses fluxos.

## Decisão

Usar o [Drawer](../../components/ui/drawer.tsx) (wrapper sobre `vaul`) com `direction="right"` como padrão para formulários modais, sempre em modo controlado pelo componente pai.

Os dois drawers de feature seguem o mesmo contrato:

```45:49:components/finova/nova-transacao-drawer.tsx
type NovaTransacaoDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (transaction: Transaction, form: NovaTransacaoFormValues) => void
}
```

Comportamento comum a [NovaTransacaoDrawer](../../components/finova/nova-transacao-drawer.tsx) e [NovoCartaoDrawer](../../components/finova/novo-cartao-drawer.tsx):

1. Estado `open` controlado pelo pai (`useState`).
2. Estado do formulário interno ao drawer.
3. Reset do formulário ao fechar (`handleOpenChange`).
4. Foco no primeiro campo ao abrir (`useEffect`).
5. Validação via funções de [lib/*-mock.ts](../../lib).
6. Submit mock com pequeno delay; `onSubmit` opcional + `console.log`.
7. Composição `Drawer → DrawerContent → DrawerHeader → form → DrawerFooter`, com campos via `Field`/`FieldGroup`.

## Consequências

- Fluxos de criação são previsíveis e reutilizam o mesmo esqueleto.
- A validação vive na camada mock ([ADR-004](ADR-004-mock-data-layer.md)), separada da UI.
- Como o submit é mock, a persistência real ainda precisa ser conectada quando houver backend (veja [roadmap.md](../roadmap.md)).
- O padrão está documentado também em [state-management.md](../state-management.md) e no showcase `/styleguide/components/drawer`.
