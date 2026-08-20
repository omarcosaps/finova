# Session 005: Remoção do placeholder Filtrar

**Date**: 2026-08-19
**Agent/Author**: Finova Agent (Cursor)
**Tasks Worked**: follow-up fora das tasks 01–03 (pedido explícito de UI)
**Duration**: ~15 min

## Summary

Removido o botão placeholder **Filtrar** da toolbar de `/transacoes`. O controle não tinha handler; o filtro real continua no dropdown de período.

## Work Log

- Removido o `Button` outline "Filtrar" em `app/transacoes/transacoes-view.tsx`
- Período, Exportar e Nova Transação intactos
- Docs alinhadas: spec (non-goal + AC) e `docs/modules.md`

## Test Results

**Status**: ✅ Lint OK (0 errors; 3 warnings pré-existentes fora deste diff)

Validação: toolbar sem Filtrar; dropdown de período, export e criação permanecem.

## Code Changes

| File | Change Type | Description |
|------|-------------|-------------|
| `app/transacoes/transacoes-view.tsx` | Modified | Remove botão Filtrar |
| `agentdocs/.../spec.md` | Modified | Non-goal e AC do placeholder |
| `docs/modules.md` | Modified | Toolbar e status de Transações |

## Handoff Notes

Feature `transacoes-filtro-periodo` permanece Complete. Filtros avançados (categoria, direção, valor) continuam fora de escopo e **não** devem ser reintroduzidos como botão morto.

PR: https://github.com/omarcosaps/finova/pull/46
