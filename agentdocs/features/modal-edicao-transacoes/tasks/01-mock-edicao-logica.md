# Task: Lógica mock de edição de transação

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 1](../plan.md#phase-1-lógica-mock-de-edição)
**Status**: DONE
**Priority**: P0 (Critical)

## Objective

Criar tipos e funções puras em `lib/transacoes-mock.ts` para mapear `Transaction` ↔ formulário de edição, validar e aplicar alterações, atendendo FR-3, FR-5 e preservação de `id`/hora (Open Question decidida).

## Context

Ver [research-estado-atual.md](../notes/research-estado-atual.md). O modelo `Transaction` não inclui `sourceId` nem `notes`; o formulário de edição MUST conter apenas os 5 campos da spec.

## Scope

### In Scope

- Tipo `EdicaoTransacaoFormValues`
- Tipo `EdicaoTransacaoFieldErrors`
- `getEdicaoFormValuesFromTransaction(transaction)`
- `validateEdicaoTransacaoForm(values)`
- `updateTransactionFromForm(existing, values)`

### Out of Scope

- Componentes UI
- Alterações em `NovaTransacaoFormValues` ou validação de create
- Testes automatizados (opcional)

## Implementation Details

```typescript
// lib/transacoes-mock.ts (esboço)

export type EdicaoTransacaoFormValues = {
  direction: TransactionDirection
  description: string
  amountCents: number
  category: string
  date: string // YYYY-MM-DD
}

export type EdicaoTransacaoFieldErrors = Partial<
  Record<keyof EdicaoTransacaoFormValues, string>
>

export function getEdicaoFormValuesFromTransaction(
  transaction: Transaction
): EdicaoTransacaoFormValues {
  return {
    direction: transaction.direction,
    description: transaction.description,
    amountCents: transaction.amountCents,
    category: transaction.category,
    date: transaction.occurredAt.slice(0, 10),
  }
}

export function validateEdicaoTransacaoForm(
  values: EdicaoTransacaoFormValues
): EdicaoTransacaoFieldErrors {
  // Mesmas regras de description, amountCents, category, date
  // de validateNovaTransacaoForm — sem sourceId
}

export function updateTransactionFromForm(
  existing: Transaction,
  values: EdicaoTransacaoFormValues
): Transaction {
  const timePart = existing.occurredAt.length >= 19
    ? existing.occurredAt.slice(11)
    : "12:00:00"
  return {
    ...existing,
    direction: values.direction,
    description: values.description.trim(),
    amountCents: values.amountCents,
    category: values.category,
    occurredAt: `${values.date}T${timePart}`,
  }
}
```

### Key Considerations

- Reutilizar mensagens de erro existentes em `validateNovaTransacaoForm` para consistência (EC-2 a EC-5)
- `getEdicaoFormValuesFromTransaction` MUST ser determinístico (sem side effects)
- Não importar React neste módulo

## Acceptance Criteria

- [x] `getEdicaoFormValuesFromTransaction` extrai data e campos corretamente de uma `Transaction` mock
- [x] `validateEdicaoTransacaoForm` rejeita descrição vazia, valor ≤ 0, categoria inválida/ausente, data ausente
- [x] `updateTransactionFromForm` retorna novo objeto com mesmo `id`
- [x] `updateTransactionFromForm` preserva hora de `occurredAt` ao mudar só a data
- [x] Funções são puras (sem mutação do argumento `existing`)

## Files to Modify

| File | Changes |
|------|---------|
| `lib/transacoes-mock.ts` | Novos tipos e funções de edição |

## Dependencies

### Blocked By

- [x] Spec em draft (suficiente para iniciar)

### Blocks

- [02-editar-transacao-drawer.md](02-editar-transacao-drawer.md)

## Testing

- [x] Manual: `console.log` com transação template e form editado
- [ ] (Opcional) Unit tests em `lib/transacoes-mock.test.ts`

## Notes

- Referência de update: `updateCorporateCardFromForm` em `lib/cartoes-mock.ts`
