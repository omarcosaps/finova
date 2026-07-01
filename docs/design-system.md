# Design System

O Design System do Finova é a fonte de verdade da interface. As regras de uso ("Design System First", reutilização de componentes, uso de tokens) estão em [`AGENTS.md`](../AGENTS.md) e não são repetidas aqui.

Este documento descreve **onde** os tokens vivem e **como** o sistema está organizado. Os valores exatos e as demonstrações interativas ficam nas fontes de verdade:

- **Tokens:** [`app/globals.css`](../app/globals.css) — declarados em CSS com `@theme inline` e valores em OKLCH.
- **Documentação viva:** [`/styleguide`](../app/styleguide) — página de tokens (`Design Tokens`), catálogo de ícones e showcases de componentes.
- **Configuração:** [`components.json`](../components.json) — style `radix-maia`, `cssVariables: true`, ícones `hugeicons`.

Não existe `tailwind.config.js`; o tema é declarado inteiramente em `globals.css` via `@import "tailwindcss"` + `@theme inline`.

## Cores

As cores são definidas como CSS variables em `:root` (light) e `.dark`, e expostas ao Tailwind pelo bloco `@theme inline`. Grupos existentes em [`app/globals.css`](../app/globals.css):

- **Semânticas (shadcn):** `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`.
- **Sidebar:** `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-border`, `--sidebar-ring` (+ variantes `-foreground`).
- **Charts:** `--chart-1` … `--chart-5` (escala verde).
- **Status:** `--success`, `--warning`, `--info` (+ `-foreground`).
- **Escalas de referência:** `--neutral-50` … `--neutral-900` (zinc-like) e `--brand-50` … `--brand-900` (verde de marca, ~`#4ADE80`).

O accent verde `#4ADE80` é a cor de marca (usada em charts, foco e brand). A `--primary` inverte por tema: preenchimento escuro no light e quase branco no dark.

> As escalas `--neutral-*` e `--brand-*` estão declaradas para documentação, mas **não** são mapeadas no `@theme inline`. Elas não geram classes utilitárias como `bg-brand-500`; para uso direto, referenciar `var(--brand-500)`.

## Tipografia

Definida em [`app/layout.tsx`](../app/layout.tsx) e exposta em `globals.css`:

- **Inter** → `--font-sans` (também usada como `--font-heading`).
- **Geist Mono** → `--font-geist-mono` (mapeada como `--font-mono`).

A hierarquia visual (H1–H4, body, muted) é demonstrada em [`/styleguide`](../app/styleguide).

## Spacing

Não há tokens de spacing dedicados; o sistema usa a escala padrão do Tailwind. Padrões recorrentes na base: `gap-6`, `gap-7`, `p-6`, `p-8`. O [Card](../components/ui/card.tsx) usa um token local `--card-spacing` (`--spacing(6)`, `--spacing(4)` no tamanho `sm`).

## Radius

Derivado de uma base única em [`app/globals.css`](../app/globals.css):

- `--radius: 0.5rem` (8px).
- Derivados no `@theme`: `--radius-sm` (×0.6), `--radius-md` (×0.8), `--radius-lg` (×1.0), `--radius-xl` (×1.4), `--radius-2xl` (×1.8), `--radius-3xl` (×2.2), `--radius-4xl` (×2.6).

Componentes usam bastante `rounded-4xl` (controles em formato pílula) e `rounded-2xl` (cards e superfícies).

## Sombras

A UI é predominantemente flat. Em vez de `box-shadow`, o padrão de contorno é `ring-1 ring-border/60`. Superfícies de overlay usam `bg-black/80` com `backdrop-blur`.

## Componentes

Os primitivos ficam em [`components/ui/`](../components/ui) e as composições de produto em [`components/finova/`](../components/finova). O inventário completo (finalidade, props, onde é usado) está em [components.md](components.md). As demos interativas estão em [`/styleguide/components/*`](../app/styleguide), indexadas por [`navigation.ts`](../app/styleguide/navigation.ts).

## Divergência conhecida

A variante `finova` do [`Sidebar`](../components/ui/sidebar.tsx) usa valores hexadecimais fixos (por exemplo `#0A0A0A`, `#4ADE80`, `#262626`, `#A3A3A3`) em vez das CSS variables `--sidebar-*`. É uma exceção real ao princípio "usar tokens" do [`AGENTS.md`](../AGENTS.md), herdada da referência visual — documentada aqui para que futuras evoluções possam alinhá-la aos tokens. Veja também [roadmap.md](roadmap.md).
