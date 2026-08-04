# Task: Corrigir abertura do drawer de edição

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 1–2](../plan.md#implementation-phases)
**Status**: PENDING
**Priority**: P0 (Critical)

## Objective

Garantir que clicar (ou Enter/Space) em uma linha da tabela em `/transacoes` abre o `EditarTransacaoDrawer`, corrigindo RC-1 (integração ausente) e RC-2 (desmontagem do Vaul Root).

## Context

Ver [research-causa-raiz.md](../notes/research-causa-raiz.md).

**Antes de codar**, confirmar branch contém merge da PR #40 (`18188d6`). Se não contiver, fazer merge/rebase de `origin/main` primeiro — pode ser a causa integral do bug.

## Scope

### In Scope

- Sincronizar branch com `main` se integração ausente
- `components/finova/editar-transacao-drawer.tsx` — remover `return null`, mount contínuo do Drawer
- `lib/transacoes-mock.ts` — defaults defensivos em `getEdicaoFormValuesFromTransaction` (RC-3)
- Verificação manual documentada em `progress/session-001.md`

### Out of Scope

- Novos campos no formulário
- Alterações em backend
- Refatoração unificada create/edit drawer

## Implementation Details

### 1. Verificar integração na view

`app/transacoes/transacoes-view.tsx` MUST conter:

```tsx
import { EditarTransacaoDrawer } from "@/components/finova/editar-transacao-drawer"

const [edicaoOpen, setEdicaoOpen] = React.useState(false)
const [transacaoEmEdicao, setTransacaoEmEdicao] =
  React.useState<Transaction | null>(null)

const handleEditTransaction = (transaction: Transaction) => {
  setNovaTransacaoOpen(false)
  setTransacaoEmEdicao(transaction)
  setEdicaoOpen(true)
}

<EditarTransacaoDrawer
  open={edicaoOpen}
  onOpenChange={handleEdicaoOpenChange}
  transaction={transacaoEmEdicao}
  onSubmit={...}
/>

<TableRow
  onClick={() => handleEditTransaction(t)}
  onKeyDown={...}
  ...
/>
```

Se ausente → restaurar a partir de `origin/main` (não reimplementar do zero).

### 2. Fix mount do drawer

```tsx
// editar-transacao-drawer.tsx

// REMOVER:
// if (!transaction) return null

const isOpen = open && transaction != null

return (
  <Drawer open={isOpen} onOpenChange={handleOpenChange} direction="right">
    {transaction ? (
      // form existente
    ) : null}
  </Drawer>
)
```

Ajustar sync `wasOpen` para incluir `transaction?.id`:

```tsx
if (open && !wasOpen && transaction) {
  setWasOpen(true)
  setForm(getEdicaoFormValuesFromTransaction(transaction))
  ...
} else if ((!open || !transaction) && wasOpen) {
  setWasOpen(false)
}
```

Referência: `components/finova/cartao-drawer.tsx` (nunca retorna null no Root).

### 3. Defaults mock (RC-3)

```tsx
export function getEdicaoFormValuesFromTransaction(transaction: Transaction) {
  return {
    ...
    sourceId: transaction.sourceId ?? "conta-corrente",
    notes: transaction.notes ?? "",
  }
}
```

## Acceptance Criteria

- [ ] Clicar linha abre drawer visível
- [ ] Enter/Space na linha abre drawer
- [ ] Sem `return null` antes do `<Drawer>` Root
- [ ] Console sem erros ao abrir
- [ ] Mutual exclusion create/edit preservada
- [ ] Lint OK nos arquivos alterados
- [ ] `progress/session-001.md` criado com resultados do teste manual

## Files to Modify

| File | Changes |
|------|---------|
| `app/transacoes/transacoes-view.tsx` | Restaurar/confirmar integração (se RC-1) |
| `components/finova/editar-transacao-drawer.tsx` | Fix mount Vaul |
| `lib/transacoes-mock.ts` | Defaults defensivos (opcional RC-3) |
| `agentdocs/.../progress/session-001.md` | Log de verificação |

## Dependencies

### Blocked By

- [x] Spec em draft

### Blocks

- Nenhuma

## Testing

- [ ] Manual: `/transacoes` — clique, teclado, trocar linha, salvar/cancelar
- [ ] Manual: hard refresh após deploy local
- [ ] `npx eslint` nos arquivos alterados

## Notes

- Se após merge de `main` o bug desaparecer sem alteração de código, documentar RC-1 como causa confirmada e aplicar apenas hardening RC-2/RC-3 como prevenção.
