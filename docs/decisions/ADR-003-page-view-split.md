# ADR-003 — Separação `page.tsx` (server) e `*-view.tsx` (client)

**Status:** Aceito

## Contexto

O App Router do Next.js favorece Server Components para metadata e carregamento, mas as telas do Finova são interativas (estado local, drawers, formulários). Era preciso um padrão claro de fronteira entre server e client.

## Decisão

Cada rota de produto é composta por dois arquivos:

- `page.tsx` — Server Component fino, responsável por exportar `metadata` e renderizar a view.
- `*-view.tsx` — Client Component (`"use client"`) com toda a UI e o estado.

Esse padrão se repete em todas as rotas de produto listadas em [routing.md](../routing.md), por exemplo [app/page.tsx](../../app/page.tsx) + [resumo-view.tsx](../../app/resumo-view.tsx) e [app/transacoes/page.tsx](../../app/transacoes/page.tsx) + [transacoes-view.tsx](../../app/transacoes/transacoes-view.tsx).

## Consequências

- A fronteira server/client é explícita e consistente entre rotas.
- Metadata fica isolada do código interativo.
- Componentes específicos de uma rota podem morar em `app/[rota]/components/` (ex.: [app/configuracoes/components/](../../app/configuracoes/components)).
- O padrão está refletido nas convenções de nomenclatura em [conventions.md](../conventions.md).
