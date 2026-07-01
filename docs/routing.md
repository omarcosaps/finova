# Rotas

O Finova usa o App Router do Next.js. Não há route groups, `middleware.ts`, route handlers (`route.ts`) nem rotas de autenticação. As rotas se dividem em **produto** e **styleguide**.

## Layouts

| Layout | Arquivo | Escopo |
|--------|---------|--------|
| Root | [app/layout.tsx](../app/layout.tsx) | Toda a aplicação: fontes (Inter, Geist Mono), `lang="pt"`, tema `dark` no `<html>`, `AppProviders`. |
| Styleguide | [app/styleguide/layout.tsx](../app/styleguide/layout.tsx) | `/styleguide/*`: sidebar de navegação do Design System + `<main>`. |

As rotas de produto **não** têm um layout compartilhado em `app/`. O shell (sidebar + main) é montado manualmente por [`FinovaPageShell`](../components/finova/finova-page-shell.tsx) em cada view.

## Rotas de produto

| Rota | Page | View |
|------|------|------|
| `/` | [app/page.tsx](../app/page.tsx) | [resumo-view.tsx](../app/resumo-view.tsx) |
| `/transacoes` | [app/transacoes/page.tsx](../app/transacoes/page.tsx) | [transacoes-view.tsx](../app/transacoes/transacoes-view.tsx) |
| `/cartoes` | [app/cartoes/page.tsx](../app/cartoes/page.tsx) | [cartoes-view.tsx](../app/cartoes/cartoes-view.tsx) |
| `/alertas` | [app/alertas/page.tsx](../app/alertas/page.tsx) | [alertas-view.tsx](../app/alertas/alertas-view.tsx) |
| `/relatorios` | [app/relatorios/page.tsx](../app/relatorios/page.tsx) | [relatorios-view.tsx](../app/relatorios/relatorios-view.tsx) |
| `/categorias` | [app/categorias/page.tsx](../app/categorias/page.tsx) | [categorias-view.tsx](../app/categorias/categorias-view.tsx) |
| `/configuracoes` | [app/configuracoes/page.tsx](../app/configuracoes/page.tsx) | [configuracoes-view.tsx](../app/configuracoes/configuracoes-view.tsx) |

Cada `page.tsx` é um Server Component que exporta `metadata` (título com o template `%s | Finova`) e renderiza a view client. Veja [ADR-003](decisions/ADR-003-page-view-split.md). O status funcional de cada rota está em [modules.md](modules.md).

## Rotas de styleguide

O styleguide tem 26 rotas: a página de tokens, o catálogo de ícones e 24 showcases de componentes.

| Rota | Arquivo |
|------|---------|
| `/styleguide` | [app/styleguide/page.tsx](../app/styleguide/page.tsx) |
| `/styleguide/icons` | [app/styleguide/icons/page.tsx](../app/styleguide/icons/page.tsx) |
| `/styleguide/components/[nome]` | `app/styleguide/components/[nome]/page.tsx` |

Os 24 showcases (`accordion`, `alert-dialog`, `avatar`, `breadcrumb`, `button`, `card`, `chart`, `checkbox`, `command`, `data-table`, `date-picker`, `dialog`, `drawer`, `empty`, `field`, `pagination`, `progress`, `radio-group`, `select`, `sheet`, `sidebar`, `switch`, `table`, `tooltip`) são listados em [`app/styleguide/navigation.ts`](../app/styleguide/navigation.ts).

## Navegação

A navegação principal do produto é renderizada por [`FinovaAppSidebar`](../components/finova/finova-app-sidebar.tsx). O item ativo é controlado pelo tipo `FinovaNavKey`:

```23:40:components/finova/finova-app-sidebar.tsx
export type FinovaNavKey =
  | "resumo"
  | "transacoes"
  | "cartoes"
  | "alertas"
  | "relatorios"
  | "categorias"
  | "configuracoes"

const NAV_HREFS: Record<FinovaNavKey, string> = {
  resumo: "/",
  transacoes: "/transacoes",
  cartoes: "/cartoes",
  alertas: "/alertas",
  relatorios: "/relatorios",
  categorias: "/categorias",
  configuracoes: "/configuracoes",
}
```

A sidebar exibe um badge fixo `3` em Alertas e um usuário mock ("Ana Boutik") no rodapé. Configurações aparece em uma seção de conta separada.
