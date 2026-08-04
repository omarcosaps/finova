# Research: Estado atual — edição de transações

**Date**: 2026-08-03
**Related spec**: [spec.md](../spec.md)

## Resumo

A listagem em `/transacoes` exibe transações paginadas e filtradas por período, com criação via `NovaTransacaoDrawer`. **Não existe** fluxo de edição: linhas da tabela são estáticas (sem `onClick`, sem menu de ações).

## Arquivos relevantes

| Arquivo | Observação |
|---------|------------|
| `app/transacoes/transacoes-view.tsx` | Estado `transactions`; filtro via `filterTransactionsByPeriod`; sem seleção de linha |
| `lib/transacoes-mock.ts` | `Transaction`, `NovaTransacaoFormValues`, `validateNovaTransacaoForm`, `createTransactionFromForm` |
| `components/finova/nova-transacao-drawer.tsx` | Referência de UI create — 7 campos incl. `sourceId` e `notes` |
| `components/finova/cartao-drawer.tsx` | **Padrão edit existente** — `mode: create \| edit`, sync `wasOpen`, `getNovoCartaoFormValuesFromCard`, `updateCorporateCardFromForm` |
| `docs/decisions/ADR-002-drawer-pattern.md` | Drawer controlado, reset ao fechar, foco no primeiro campo |

## Gap identificado

```tsx
// transacoes-view.tsx — TableRow sem interação
<TableRow key={t.id}>
  <TableCell>...</TableCell>
</TableRow>
```

```typescript
// transacoes-mock.ts — Transaction não inclui sourceId/notes
export type Transaction = {
  id: string
  occurredAt: string
  description: string
  category: string
  amountCents: number
  direction: TransactionDirection
}
```

Formulário de edição MUST ser subconjunto: descrição, valor, categoria, data, direção.

## Padrões reutilizáveis

### NovaTransacaoDrawer (create)

- Composição: `Drawer → DrawerContent → DrawerHeader → form → DrawerFooter`
- `handleDirectionChange` limpa categoria inválida
- `validateNovaTransacaoForm` + `createTransactionFromForm`
- Submit: delay 300 ms, `onSubmit` opcional, `console.log`

### CartaoDrawer (create + edit)

- Prop `mode` e entidade `card` para edit
- Sync form na abertura via flag `wasOpen` (render-time reset)
- `getNovoCartaoFormValuesFromCard` / `updateCorporateCardFromForm`
- COPY object para títulos e labels de submit

## Componentes DS disponíveis

| Componente | Uso na edição |
|------------|---------------|
| `Drawer` | Container modal lateral |
| `Field`, `FieldGroup`, `FieldSet`, `FieldLegend` | Layout de campos |
| `Input` | Descrição |
| `CurrencyInput` | Valor |
| `Select` | Categoria |
| `DatePicker` | Data |
| `RadioGroup` | Direção receita/despesa |
| `Button` | Cancelar / Salvar |

Styleguide: `app/styleguide/components/drawer/page.tsx`, `date-picker/page.tsx`.

## Integração com filtro por período

Feature [transacoes-filtro-periodo](../../transacoes-filtro-periodo/spec.md) já concluída:

- `filteredTransactions` derivado de `transactions` + `period`
- Editar `occurredAt` pode mover transação para fora do período → linha some (comportamento esperado FR-7)
- `safePage` faz clamp de paginação

## Recomendação

1. Phase 1: helpers mock (`EdicaoTransacaoFormValues`, validate, update) antes da UI.
2. Phase 2: `EditarTransacaoDrawer` copiando estrutura do create drawer, sync estilo CartaoDrawer.
3. Phase 3: integrar na view com linha acionável.
4. Não estender `NovaTransacaoDrawer` nesta entrega — usado também em `app/resumo-view.tsx` sem necessidade de edit.
