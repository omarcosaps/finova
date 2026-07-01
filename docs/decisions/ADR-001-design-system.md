# ADR-001 — Design System com shadcn/ui + Tailwind v4 + styleguide interno

**Status:** Aceito

## Contexto

O Finova precisa de uma interface consistente e escalável, com uma única fonte de verdade para tokens e componentes. O projeto é, inclusive, nomeado `design-system` em [package.json](../../package.json).

## Decisão

Adotar shadcn/ui (style `radix-maia`) sobre Radix UI e Tailwind CSS v4 como base do Design System, com um styleguide interno como documentação viva.

Evidências na codebase:

- [components.json](../../components.json): `style: "radix-maia"`, `cssVariables: true`, `iconLibrary: "hugeicons"`.
- [app/globals.css](../../app/globals.css): tokens em CSS via `@theme inline` e valores OKLCH; sem `tailwind.config.js`.
- [components/ui/](../../components/ui): 35 primitivos com variantes via `class-variance-authority`.
- [app/styleguide/](../../app/styleguide): página de tokens + 24 showcases indexados por [navigation.ts](../../app/styleguide/navigation.ts).

## Consequências

- Existe uma fonte de verdade única para tokens ([globals.css](../../app/globals.css)) e uma referência visual navegável ([/styleguide](../../app/styleguide)).
- Novos componentes seguem o fluxo Styleguide → Componentes → Implementação do [`AGENTS.md`](../../AGENTS.md).
- A variante `finova` do [Sidebar](../../components/ui/sidebar.tsx) usa hex fixos em vez de tokens — divergência conhecida registrada em [design-system.md](../design-system.md).
- As escalas `--neutral-*` / `--brand-*` existem para documentação, mas não geram classes utilitárias por não estarem no `@theme inline`.
