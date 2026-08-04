# Task: Affordance visual e acessibilidade na listagem

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 4](../plan.md#phase-4-polish-e-acessibilidade)
**Status**: DONE
**Priority**: P1 (High)

## Objective

Garantir que linhas acionáveis tenham feedback visual claro e sejam operáveis por teclado e leitores de tela, atendendo NFR-4 e critérios de aceite de acessibilidade.

## Context

Task 03 adiciona clique na linha. Esta task refina hover, focus, ARIA e revisa drawer contra Styleguide.

## Scope

### In Scope

- Estilos hover/focus na `TableRow` acionável (`hover:bg-muted/50`, `focus-visible:outline` ou ring token)
- `tabIndex={0}` na linha
- `role="button"` na linha (ou padrão equivalente acessível)
- `aria-label` descritivo: ex. `Editar transação: {description}, {formatBRL(amount)}`
- `onKeyDown`: Enter e Space acionam edição (prevenir scroll com Space)
- Revisão de labels/ids no `EditarTransacaoDrawer` (`aria-invalid`, `aria-describedby`)
- Validar contraste e focus visible no drawer footer

### Out of Scope

- Tooltip "Clique para editar"
- Coluna dedicada com ícone de lápis
- Anunciar sucesso de save via toast (não existe no escopo)

## Implementation Details

```tsx
<TableRow
  key={t.id}
  role="button"
  tabIndex={0}
  aria-label={`Editar transação: ${t.description}, ${formatBRL(t.amountCents)}`}
  className={cn(
    "cursor-pointer transition-colors",
    "hover:bg-muted/50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  )}
  onClick={() => handleEditTransaction(t)}
  onKeyDown={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleEditTransaction(t)
    }
  }}
>
```

### Key Considerations

- `TableCaption` existente pode mencionar que linhas são editáveis (opcional, sr-only)
- Não quebrar layout da tabela com ring offset — testar em dark mode se aplicável
- Drawer: confirmar foco trap padrão do componente `Drawer` (vaul)
- Paginação: após edit, verificar anúncio do contador via `aria-live="polite"` já existente

## Acceptance Criteria

- [x] Hover na linha indica interatividade
- [x] Tab foca linhas da tabela na ordem visual
- [x] Enter/Space na linha focada abre drawer de edição
- [x] Screen reader anuncia propósito da linha via `aria-label`
- [x] Campos inválidos no drawer têm `aria-invalid` e erro associado
- [x] Focus visible atende contraste do Design System

## Files to Modify

| File | Changes |
|------|---------|
| `app/transacoes/transacoes-view.tsx` | ARIA e estilos na TableRow |
| `components/finova/editar-transacao-drawer.tsx` | Revisão a11y se gaps encontrados |

## Dependencies

### Blocked By

- [03-integracao-transacoes-view.md](03-integracao-transacoes-view.md)

### Blocks

- Nenhuma

## Testing

- [ ] Manual: navegar tabela só com teclado (Tab, Enter)
- [ ] Manual: VoiceOver/NVDA — label da linha e erros de campo
- [ ] Manual: inspecionar focus ring em linha e botões do drawer
- [ ] Revisão visual contra Styleguide Table + Drawer

## Notes

- Consultar `AGENTS.md` seção Accessibility antes de fechar a feature
- Se `role="button"` na `tr` gerar warning de HTML, considerar wrapper interno ou documentar exceção na progress session
