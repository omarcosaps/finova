# Convenções

Padrões adotados no Finova. As regras de engenharia e do Design System são a fonte de verdade em [`AGENTS.md`](../AGENTS.md); aqui consolidamos os padrões observáveis na codebase sem duplicar aquele conteúdo.

## Nomenclatura

- **Rotas** em português: `/transacoes`, `/cartoes`, `/configuracoes`.
- **Views** por rota: `{rota}-view.tsx` (ex.: `resumo-view.tsx`, `cartoes-view.tsx`).
- **Composições de produto:** prefixo `finova-` em [components/finova/](../components/finova) (ex.: `finova-page-shell.tsx`).
- **Drawers de feature:** `{acao}-drawer.tsx` (ex.: `nova-transacao-drawer.tsx`).
- **Mocks:** `{dominio}-mock.ts` em [lib/](../lib).
- **Tipos** em PascalCase; IDs de mock em kebab-case.
- **Alias de import:** `@/*` aponta para a raiz do projeto ([tsconfig.json](../tsconfig.json)).

## Organização de features e componentes

- Cada rota de produto = `page.tsx` (Server Component com `metadata`) + `*-view.tsx` (Client Component). Veja [ADR-003](decisions/ADR-003-page-view-split.md).
- Componentes usados por uma única rota ficam em `app/[rota]/components/` (ex.: [app/configuracoes/components/](../app/configuracoes/components)).
- Primitivos reutilizáveis ficam em [components/ui/](../components/ui); composições de domínio em [components/finova/](../components/finova).

## Reutilização de componentes

Antes de criar um componente, verificar se já existe em `components/ui`, `components/finova` ou no [styleguide](../app/styleguide). A ordem obrigatória do [`AGENTS.md`](../AGENTS.md) é **Styleguide → Componentes → Implementação**: reutilizar, compor ou estender antes de criar algo novo. O inventário completo está em [components.md](components.md).

## Design System

- Usar tokens de [globals.css](../app/globals.css), spacing, tipografia e cores semânticas do sistema (veja [design-system.md](design-system.md)).
- Evitar valores hardcoded e CSS duplicado.
- Novos componentes de Design System devem ter showcase no styleguide e entrada em [navigation.ts](../app/styleguide/navigation.ts) (conforme `prompts/prompt2.md`).

## Server vs Client Components

- `page.tsx` permanece Server Component (metadata, sem interatividade).
- Views e componentes interativos declaram `"use client"`.
- O styleguide é majoritariamente client, por conter demos interativas.

## Formatação e localização

- Textos em pt-BR.
- Valores monetários em centavos, formatados para BRL por [currency.ts](../lib/currency.ts).
- Datas via `date-fns` / `Intl` com locale pt-BR.

## Branches e commits

Padrões observados no histórico do repositório:

- **Branches:** prefixos `feat/`, `fix/`, `refactor/`, `update/`, `chore/` seguidos de descrição em kebab-case (ex.: `feat/new-credit-card-flow`).
- **Commits:** estilo Conventional Commits — `feat:`, `refactor:`, `chore:`, `fix:` no início da mensagem.
- **Integração:** mudanças chegam à branch principal via Pull Request (merge commits `Merge pull request #NN`).

O histórico consolidado está em [changelog.md](changelog.md).

## Workflow para agentes de IA

Os prompts de [prompts/](../prompts) descrevem o fluxo em três fases (Design System → componentes → páginas) e o uso do shadcn MCP para instalar/validar componentes. Ao trabalhar no projeto, siga o workflow obrigatório do [`AGENTS.md`](../AGENTS.md): ler a codebase, identificar componentes e tokens existentes, consultar o styleguide e avaliar impactos antes de implementar.
