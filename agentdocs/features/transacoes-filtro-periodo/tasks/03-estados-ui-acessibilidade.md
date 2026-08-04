# Task: Estado vazio e acessibilidade

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 3](../plan.md#phase-3-estados-e-polish)
**Status**: DONE
**Priority**: P1 (High)

## Objective

Exibir estado vazio amigável quando o período filtrado não tiver transações (FR-6, EC-1) e garantir feedback acessível ao usuário.

## Context

Com filtro ativo, períodos como "Mês passado" podem retornar zero linhas dependendo do mock. A tabela não deve aparecer vazia sem contexto.

## Scope

### In Scope

- Consultar `components/ui/empty` e Styleguide
- Renderizar Empty quando `filteredTransactions.length === 0`
- Mensagem contextual mencionando o período selecionado
- Ocultar paginação quando não houver resultados
- `aria-live="polite"` no contador ou região de resultados (se aplicável)

### Out of Scope

- CTA para "Limpar filtros" (não há filtros avançados ainda)
- Ilustrações customizadas

## Implementation Details

```tsx
{filteredTransactions.length === 0 ? (
  <Empty
    title="Nenhuma transação neste período"
    description={`Não encontramos movimentos em "${period}". Tente outro intervalo ou cadastre uma nova transação.`}
  />
) : (
  /* Table + pagination existentes */
)}
```

### Key Considerations

- Manter layout do card (`rounded-2xl border`) consistente
- Botões "Nova Transação" e seletor de período permanecem acessíveis no header
- Validar contraste e focus no componente Empty

## Acceptance Criteria

- [x] Período sem dados mostra Empty, não tabela vazia
- [x] Contador exibe "0 de 0" ou equivalente claro
- [x] Paginação oculta/desabilitada sem resultados
- [x] Navegação por teclado preservada

## Files to Modify

| File | Changes |
|------|---------|
| `app/transacoes/transacoes-view.tsx` | Condicional Empty |
| `components/ui/empty.tsx` | Apenas se precisar compor (preferir uso direto) |

## Dependencies

### Blocked By

- [x] [02-integracao-transacoes-view.md](02-integracao-transacoes-view.md)

### Blocks

- Nenhuma

## Testing

- [ ] Manual: forçar período vazio (ajustar mock temporariamente ou escolher label sem dados)
- [ ] Manual: tab through header + empty region

## Notes

- Consultar Styleguide → Components → Empty antes de implementar
