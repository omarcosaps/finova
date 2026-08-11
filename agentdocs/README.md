# Agentdocs — Finova

Artefatos de **spec-driven development** para features do Finova. Gerenciados pela skill instalada em `.cursor/skills/pjordan-claude-toolkit-spec-driven-development/`.

## Não confundir com `.cursor/agents/`

| Pasta | O que é |
|-------|---------|
| `agentdocs/` | Specs, plans, tasks e progress **por feature** (artefatos de trabalho) |
| `.cursor/agents/` | Definições de **subagentes** do Cursor (personas como code-reviewer) |
| `.cursor/rules/` | Regras persistentes do Agent |
| `.cursor/skills/` | Workflows invocáveis (`/review`, `/fix-issue`, spec-driven) |

## Estrutura

```
agentdocs/features/<feature-slug>/
├── spec.md          # O que construir
├── plan.md          # Como construir
├── tasks/           # Trabalho atômico (01-, 02-, …)
├── notes/           # Pesquisa e decisões
└── progress/        # Logs de sessão (session-NNN.md)
```

## Features

| Slug | Status | Descrição |
|------|--------|-----------|
| [transacoes-filtro-periodo](features/transacoes-filtro-periodo/spec.md) | Complete | Filtro por período na listagem de Transações |
| [modal-edicao-transacoes](features/modal-edicao-transacoes/spec.md) | Complete | Edição de transações via drawer na listagem `/transacoes` |
| [fix-drawer-edicao-nao-abre](features/fix-drawer-edicao-nao-abre/spec.md) | Draft | Bugfix: drawer de edição não abre ao clicar na transação |

## Como usar

1. Peça ao agente: *"Implemente a task 01 de transacoes-filtro-periodo"* ou *"Continue spec-driven em transacoes-filtro-periodo"*.
2. O agente deve carregar contexto nesta ordem: **spec → plan → último progress → task**.
3. Ao concluir uma sessão, criar `progress/session-NNN.md` com resultados e handoff.

## Convenções Finova

- **Frontend only** — sem alterações de backend salvo pedido explícito.
- Seguir `AGENTS.md` (Design System, diagnóstico antes de implementar).
- Slugs em kebab-case; tasks numeradas com prefixo `01-`, `02-`.
