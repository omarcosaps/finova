# Implementation Plan: Drawer de edição não abre

**Spec**: [spec.md](spec.md)
**Status**: Draft
**Last Updated**: 2026-08-03

## Approach Summary

1. **Verificar ambiente**: confirmar que `main` (ou branch de trabalho) contém o merge da PR #40.
2. **Corrigir mount do drawer**: alinhar `EditarTransacaoDrawer` ao padrão `CartaoDrawer` — Drawer sempre montado, controle via prop `open`.
3. **Hardening mock**: defaults defensivos em `getEdicaoFormValuesFromTransaction` para `sourceId`/`notes`.
4. **Regressão manual**: checklist em `/transacoes` documentado em progress log.

## Architecture

### Diagnóstico em duas frentes

```
┌─────────────────────────────────────┐
│ Ambiente local tem PR #40?          │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       NO              YES
       │               │
       ▼               ▼
 merge/rebase      Código integrado
 main              mas drawer não abre
                       │
                       ▼
              Fix EditarTransacaoDrawer
              (remover return null)
              + defaults mock
```

### Mudança principal (RC-2)

**Antes:**

```tsx
if (!transaction) return null
return <Drawer open={open} ...>
```

**Depois (alinhar CartaoDrawer):**

```tsx
const isActive = open && transaction != null

return (
  <Drawer open={isActive} onOpenChange={handleOpenChange} direction="right">
    {/* form renderizado só se transaction; ou disabled state */}
  </Drawer>
)
```

Sync `wasOpen` MUST considerar `transaction?.id` para re-popular ao trocar linha.

## Implementation Phases

### Phase 1: Sincronização e verificação

- [ ] `git fetch origin && git checkout main && git pull` (ou merge main na branch atual)
- [ ] Confirmar existência de `editar-transacao-drawer.tsx` e handlers na view
- [ ] Reproduzir bug com dev server + console aberto

### Phase 2: Fix do drawer

- [ ] Remover `return null` antecipado em `EditarTransacaoDrawer`
- [ ] Usar `open={open && transaction != null}` no Root
- [ ] Guard interno no form/submit: `if (!transaction) return`
- [ ] Ajustar sync `wasOpen` para reagir a mudança de `transaction.id`

### Phase 3: Hardening mock (opcional, baixo risco)

- [ ] `getEdicaoFormValuesFromTransaction`: `sourceId: transaction.sourceId ?? "conta-corrente"`, `notes: transaction.notes ?? ""`

### Phase 4: Verificação

- [ ] Manual: clique, teclado, mutual exclusion, salvar/cancelar
- [ ] Lint nos arquivos alterados
- [ ] Progress log com resultados

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Mount do Drawer | Sempre montado | Consistência Vaul com CartaoDrawer/NovaTransacaoDrawer |
| Branch base | `main` pós PR #40 | Feature já mergeada |
| Escopo | Fix mínimo | Não reimplementar feature inteira |
| Defaults mock | Fallback conta-corrente | Evita crash em sessões stale |

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Branch local sem feature | Alto | Phase 1 obrigatória antes de codar |
| Form vazio com drawer montado | Baixo | Guard no submit + condicional no body |
| Regressão a11y | Médio | Re-testar Enter/Space após fix |

## Testing Strategy

### Manual (obrigatório)

1. Abrir `/transacoes` → clicar linha → drawer visível
2. Tab + Enter na linha → drawer abre
3. Clicar outra linha com drawer aberto → dados atualizam
4. Nova Transação + edit → exclusão mútua
5. Console limpo

### Automatizado (opcional)

- Smoke script tsx para `getEdicaoFormValuesFromTransaction` com transaction parcial

## Success Metrics

- Critérios de aceite da spec atendidos
- Bug reportado pelo usuário não reproduzível em `main` após fix

## Changelog

### 2026-08-03

- Plano criado após investigação: RC-1 (branch desatualizada) + RC-2 (return null no drawer)
