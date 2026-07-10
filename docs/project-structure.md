# Estrutura do projeto

Visão dos diretórios de topo do repositório e sua finalidade. Para a arquitetura em camadas, veja [architecture.md](architecture.md).

```txt
finova/
├── app/                  # Next.js App Router: rotas, layouts, views e styleguide
├── components/
│   ├── ui/               # Primitivos do Design System (shadcn/Radix)
│   └── finova/           # Composições de produto (shell, sidebar, drawers)
├── features/             # Domínios de produto (dados tipados + cálculos)
│   └── dashboard/        # Fonte única do Resumo (types, data, utils)
├── lib/                  # Utilitários + camada de dados mock (facades)
├── public/               # Assets estáticos (SVGs)
├── prompts/              # Prompts de workflow para agentes de IA
├── docs/                 # Documentação técnica (esta pasta)
├── AGENTS.md             # Regras de engenharia e Design System
├── CLAUDE.md             # Reexporta AGENTS.md
├── README.md             # Boilerplate do create-next-app
├── components.json       # Configuração do shadcn/ui
├── next.config.ts        # Configuração do Next.js (mínima)
├── tsconfig.json         # TypeScript + alias @/*
├── eslint.config.mjs     # ESLint 9 (flat config)
└── postcss.config.mjs    # Tailwind v4 via PostCSS
```

## `app/`

Contém as rotas do App Router. Detalhes em [routing.md](routing.md).

- **Rotas de produto:** [`/`](../app/page.tsx), [`transacoes/`](../app/transacoes), [`cartoes/`](../app/cartoes), [`alertas/`](../app/alertas), [`relatorios/`](../app/relatorios), [`categorias/`](../app/categorias), [`configuracoes/`](../app/configuracoes).
- **Padrão página/view:** cada rota tem `page.tsx` (Server Component com `metadata`) e um `*-view.tsx` (Client Component com a UI). Veja [ADR-003](decisions/ADR-003-page-view-split.md).
- **Componentes locais de rota:** quando uma rota precisa de componentes próprios, eles ficam em `app/[rota]/components/` — como em [`app/configuracoes/components/`](../app/configuracoes/components).
- **Styleguide:** [`app/styleguide/`](../app/styleguide) tem layout próprio, uma página de tokens, um catálogo de ícones e showcases em `components/[nome]/`.
- **Layout raiz:** [`app/layout.tsx`](../app/layout.tsx) define fontes (Inter, Geist Mono), idioma `pt`, tema `dark` e envolve a árvore em `AppProviders`.
- **Estilos globais:** [`app/globals.css`](../app/globals.css) é a fonte de verdade dos tokens (veja [design-system.md](design-system.md)).

## `components/`

- [`components/ui/`](../components/ui) — 35 primitivos do Design System (Button, Card, Table, Drawer, etc.). Inventário em [components.md](components.md).
- [`components/finova/`](../components/finova) — composições de produto: `FinovaPageShell`, `FinovaAppSidebar`, `FinovaEmptyState`, `NovaTransacaoDrawer`, `NovoCartaoDrawer`.
- [`components/app-providers.tsx`](../components/app-providers.tsx) — providers globais (atualmente apenas `TooltipProvider`).

## `features/`

Domínios de produto com dados tipados e cálculos reutilizáveis (sem UI):

| Pasta | Responsabilidade |
|---------|------------------|
| [`dashboard/`](../features/dashboard) | Fonte única do Resumo: `types/`, `data/dashboard-mock.ts` (`DASHBOARD_MONTHS`), `utils/dashboard-calculations.ts`, barrel `index.ts`. |

## `lib/`

Utilitários e a camada de dados mock (veja [ADR-004](decisions/ADR-004-mock-data-layer.md)):

| Arquivo | Responsabilidade |
|---------|------------------|
| [`utils.ts`](../lib/utils.ts) | `cn()` — combina `clsx` + `tailwind-merge`. |
| [`currency.ts`](../lib/currency.ts) | Formatação BRL, conversão de centavos e máscara de input. |
| [`transacoes-mock.ts`](../lib/transacoes-mock.ts) | Tipos `Transaction`, formulário, validação, `buildTransacoesList`, templates. |
| [`cartoes-mock.ts`](../lib/cartoes-mock.ts) | Tipos de cartão corporativo, resumo de fatura, validação e factory do drawer. |
| [`resumo-mock.ts`](../lib/resumo-mock.ts) | Facade do dashboard Resumo; reexporta `features/dashboard`. |
| [`configuracoes-mock.ts`](../lib/configuracoes-mock.ts) | Perfil, empresa, notificações, opções de select e aparência. |

## `public/`

Assets estáticos servidos pelo Next.js (arquivos SVG do boilerplate).

## `prompts/`

Prompts de workflow para agentes de IA, organizados em três fases:

- `prompt1.md` — setup do Design System (extrair tokens, inicializar shadcn, gerar `globals.css` e styleguide).
- `prompt2.md` — desenvolvimento de componentes (instalar via shadcn, customizar, criar showcase, atualizar `navigation.ts`).
- `prompt3.md` — desenvolvimento de páginas (mapear design para componentes, construir em `app/[rota]/`).

Os padrões consolidados a partir desses prompts estão em [conventions.md](conventions.md).

## Arquivos de configuração da raiz

| Arquivo | Papel |
|---------|-------|
| [`components.json`](../components.json) | Config do shadcn: style `radix-maia`, `cssVariables: true`, ícones `hugeicons`, aliases `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`. |
| [`tsconfig.json`](../tsconfig.json) | `strict: true`, `moduleResolution: "bundler"`, alias `@/*` → raiz do projeto. |
| [`next.config.ts`](../next.config.ts) | Configuração mínima (objeto vazio). |
| [`eslint.config.mjs`](../eslint.config.mjs) | Flat config estendendo `eslint-config-next` (core-web-vitals + typescript). |
| [`postcss.config.mjs`](../postcss.config.mjs) | Habilita Tailwind v4. Não há `tailwind.config.js` — o tema é declarado em `globals.css`. |

> O alias `@/hooks` está declarado em `components.json`, mas a pasta `hooks/` ainda não existe no projeto.
