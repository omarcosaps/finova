# Architecture Decision Records (ADRs)

Registros das decisões de arquitetura do Finova. Cada ADR documenta uma decisão **observável na codebase** — o contexto que a motivou, a decisão em si e suas consequências.

Só registramos decisões verificáveis no código atual. Escolhas ainda não tomadas (por exemplo, qual backend adotar) não viram ADR até existirem.

| ADR | Título | Status |
|-----|--------|--------|
| [ADR-001](ADR-001-design-system.md) | Design System com shadcn/ui + Tailwind v4 + styleguide interno | Aceito |
| [ADR-002](ADR-002-drawer-pattern.md) | Drawer controlado como padrão de formulário modal | Aceito |
| [ADR-003](ADR-003-page-view-split.md) | Separação `page.tsx` (server) e `*-view.tsx` (client) | Aceito |
| [ADR-004](ADR-004-mock-data-layer.md) | Camada de dados mock em `lib/` | Aceito |

## Formato

Cada ADR segue a estrutura: **Contexto → Decisão → Consequências**. Novos ADRs devem ser numerados sequencialmente e adicionados a esta tabela.
