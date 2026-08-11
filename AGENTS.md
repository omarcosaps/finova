<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Finova — Agent Instructions

Finova é um sistema financeiro (Next.js, React, TypeScript) com Design System e Styleguide próprios.

## Princípios

1. **Design System é a fonte de verdade** — Styleguide → Componentes → Implementação.
2. **Frontend only** — sem backend salvo pedido explícito.
3. **Reutilizar antes de criar** — nunca assumir que um componente não existe.
4. **Diagnóstico antes de código** — Diagnóstico → Estratégia → Arquivos impactados → Regressões.

Prioridades: reutilização → consistência → escalabilidade → performance → acessibilidade.

## Onde estão as regras detalhadas

| Camada | Caminho | Uso |
|--------|---------|-----|
| Rules | [`.cursor/rules/`](.cursor/rules/) | Constraints persistentes (workflow, Design System, convenções) |
| Skills | [`.cursor/skills/`](.cursor/skills/) | Workflows sob demanda (`/review`, `/fix-issue`, spec-driven) |
| Agents | [`.cursor/agents/`](.cursor/agents/) | Subagentes especializados (review, auditoria de design) |
| Specs | [`agentdocs/`](agentdocs/) | Artefatos SDD por feature (spec/plan/tasks) — não confundir com `.cursor/agents/` |
| Docs | [`docs/conventions.md`](docs/conventions.md) | Convenções observáveis da codebase |

`CLAUDE.md` aponta para este arquivo.
