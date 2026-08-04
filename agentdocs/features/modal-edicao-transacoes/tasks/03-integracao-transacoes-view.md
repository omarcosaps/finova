# Task: Integrar edição na TransacoesView

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 3](../plan.md#phase-3-integração-na-listagem)
**Status**: DONE
**Priority**: P0 (Critical)

## Objective

Conectar `EditarTransacaoDrawer` à listagem: linhas acionáveis abrem o drawer com a transação selecionada e `onSubmit` atualiza o estado local, atendendo FR-1, FR-6, FR-7, FR-8, EC-9.

## Context

`TransacoesView` já gerencia `transactions`, filtro por período, paginação e `NovaTransacaoDrawer`. Adicionar fluxo paralelo de edição sem quebrar create/export/filter.

## Scope

### In Scope

- Estado `edicaoOpen: boolean` e `transacaoEmEdicao: Transaction | null`
- Handler `handleEditTransaction(transaction)`
- `TableRow` com clique para abrir edição
- Render `EditarTransacaoDrawer` com props controladas
- `onSubmit`: `setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t))`
- Mutual exclusion: abrir edição fecha create drawer (EC-9)

### Out of Scope

- Affordance hover/focus detalhada (task 04)
- Edição a partir de `/` (Resumo)
- Coluna de ações com ícone

## Implementation Details

```tsx
const [edicaoOpen, setEdicaoOpen] = React.useState(false)
const [transacaoEmEdicao, setTransacaoEmEdicao] =
  React.useState<Transaction | null>(null)

const handleEditTransaction = (transaction: Transaction) => {
  setNovaTransacaoOpen(false) // EC-9
  setTransacaoEmEdicao(transaction)
  setEdicaoOpen(true)
}

const handleEdicaoOpenChange = (open: boolean) => {
  setEdicaoOpen(open)
  if (!open) {
    setTransacaoEmEdicao(null)
  }
}

// TableRow
<TableRow
  key={t.id}
  className="cursor-pointer ..."
  onClick={() => handleEditTransaction(t)}
  // teclado na task 04
>

<EditarTransacaoDrawer
  open={edicaoOpen}
  onOpenChange={handleEdicaoOpenChange}
  transaction={transacaoEmEdicao}
  onSubmit={(updated) => {
    setTransactions((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    )
  }}
/>
```

### Key Considerations

- Não resetar `page` após edit — salvo se lista filtrada ficar vazia na página ( `safePage` trata)
- Export PDF e contador usam `filteredTransactions` — atualização automática via derive
- `transacaoEmEdicao` MUST ser limpa ao fechar drawer (FR-8)
- Evitar propagação de clique se futuramente houver botões dentro da row

## Acceptance Criteria

- [x] Clicar linha abre drawer com dados da transação correta
- [x] Salvar atualiza linha visível (descrição, categoria, valor, data)
- [x] Cancelar/fechar não altera `transactions`
- [x] Editar data para fora do período remove linha da view filtrada
- [x] Abrir edição com create aberto fecha o create drawer
- [x] Abrir create com edição aberta fecha o edit drawer
- [x] Nova transação e export continuam funcionando

## Files to Modify

| File | Changes |
|------|---------|
| `app/transacoes/transacoes-view.tsx` | Estado, handlers, row click, drawer |

## Dependencies

### Blocked By

- [02-editar-transacao-drawer.md](02-editar-transacao-drawer.md)

### Blocks

- [04-estados-ui-acessibilidade.md](04-estados-ui-acessibilidade.md)

## Testing

- [ ] Manual: editar transação na página 2 e confirmar persistência visual
- [ ] Manual: editar data — transação sai do período "Este Mês"
- [ ] Manual: alternar entre Nova Transação e editar linha
- [ ] Manual: export PDF após edição reflete dados novos

## Notes

- Seguir `AGENTS.md`: diagnóstico antes de implementar se houver desvio da spec
