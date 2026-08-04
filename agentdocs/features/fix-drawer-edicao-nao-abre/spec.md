# Bugfix: Drawer de edição não abre ao clicar na transação

## Status

- [x] Draft
- [ ] Review
- [ ] Approved
- [ ] In Progress
- [ ] Complete

## Overview

Usuários reportam que, ao clicar em uma transação na listagem `/transacoes`, o drawer de edição não abre. A feature foi entregue na PR #40 (`modal-edicao-transacoes`) e mergeada em `origin/main`, porém ambientes locais desatualizados ou um anti-padrão no `EditarTransacaoDrawer` podem explicar o comportamento.

Este bugfix garante que **clicar ou acionar via teclado uma linha da tabela abre o drawer de edição** de forma confiável.

## Goals

- Clique na linha MUST abrir `EditarTransacaoDrawer` com a transação selecionada.
- Teclado (Enter/Space) MUST manter o mesmo comportamento.
- Drawer MUST seguir padrão de mount do `CartaoDrawer` / `NovaTransacaoDrawer` (Vaul sempre montado).
- Ambientes locais MUST poder sincronizar com `main` sem perda da integração.

## Non-Goals

- Alterar campos do formulário de edição.
- Backend ou API real.
- Refatorar `NovaTransacaoDrawer` para modo unificado create/edit.

## Root Causes (investigação)

Ver [research-causa-raiz.md](notes/research-causa-raiz.md).

| ID | Causa | Fix |
|----|-------|-----|
| **RC-1** | Branch local sem merge da PR #40 — integração ausente em `transacoes-view.tsx` | Sincronizar com `main` + verificar arquivos |
| **RC-2** | `EditarTransacaoDrawer` faz `return null` quando `transaction === null`, desmontando Vaul | Manter Drawer montado; `open={open && !!transaction}` |
| **RC-3** | Erro runtime por `Transaction` sem `sourceId`/`notes` em sessão antiga | Defaults defensivos em `getEdicaoFormValuesFromTransaction` |

## Requirements

### Functional Requirements

1. **[FR-1]** Clicar em qualquer linha visível da tabela MUST chamar `handleEditTransaction` e abrir o drawer.
2. **[FR-2]** O drawer MUST exibir título "Editar transação" e campos pré-preenchidos.
3. **[FR-3]** Enter/Space na linha focada MUST abrir o drawer (regressão a11y).
4. **[FR-4]** Apenas um drawer (create ou edit) MUST estar aberto por vez (EC-9 da feature original).

### Non-Functional Requirements

1. **[NFR-1]** `EditarTransacaoDrawer` MUST permanecer montado no DOM (sem `return null` no Root).
2. **[NFR-2]** Solução MUST reutilizar componentes existentes; sem novo padrão de modal.
3. **[NFR-3]** Fix MUST incluir verificação manual documentada em progress log.

## Edge Cases

| ID | Cenário | Comportamento esperado |
|----|---------|------------------------|
| EC-1 | Dev em branch anterior ao merge | Documentar necessidade de `git pull origin main` |
| EC-2 | Clique rápido em linhas diferentes | Drawer re-sync com nova transação (padrão `wasOpen`) |
| EC-3 | Transação sem `sourceId` legado | Fallback `"conta-corrente"` no mapper |
| EC-4 | Nova transação aberta + clique na tabela | Fecha create, abre edit |

## Acceptance Criteria

- [ ] Em `main` atualizado, clicar linha abre drawer visível em ≤ 300 ms
- [ ] Console do browser sem erros ao abrir edição
- [ ] `EditarTransacaoDrawer` não usa `return null` antes do `<Drawer>`
- [ ] `transacoes-view.tsx` contém import, estado, handlers e `onClick` na `TableRow`
- [ ] Enter/Space na linha abre drawer
- [ ] Nova transação + edição mutual exclusion preservada

## Dependencies

- Feature original: PR #40 / `modal-edicao-transacoes`
- `components/finova/editar-transacao-drawer.tsx`
- `app/transacoes/transacoes-view.tsx`
- Padrão: `components/finova/cartao-drawer.tsx`, ADR-002

## References

- PR #40: feat/modal-edicao-transacoes (merged)
- Research: [notes/research-causa-raiz.md](notes/research-causa-raiz.md)
