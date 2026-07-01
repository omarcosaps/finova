# Roadmap

Panorama das funcionalidades com base no estado real da codebase. O status detalhado por módulo está em [modules.md](modules.md); o histórico de evoluções em [changelog.md](changelog.md).

## Concluídas

- Design System com tokens, styleguide de tokens e 24 showcases de componentes ([design-system.md](design-system.md), [components.md](components.md)).
- Catálogo de ícones (Hugeicons) com `DsIcon` e registro central.
- Módulo Resumo completo sobre dados mock.
- Módulos Transações e Cartões (UI + criação via drawer, sobre estado local).
- Módulo Configurações (formulários controlados, sobre dados mock).
- Drawers Nova Transação e Novo Cartão (padrão de [ADR-002](decisions/ADR-002-drawer-pattern.md)).
- Camada de dados mock por domínio ([ADR-004](decisions/ADR-004-mock-data-layer.md)).

## Em andamento / parcial

Módulos com UI, mas com ações ou persistência incompletas:

- **Transações:** filtros e exportação (botões sem lógica).
- **Cartões:** pagar fatura, gerar boleto e configurações do cartão.
- **Configurações:** persistência real, troca de tema global, alterar foto/senha e excluir conta.

## Planejadas

Itens inferidos de placeholders e lacunas reais do código — não de suposições de produto:

- **Alertas, Relatórios e Categorias:** as rotas existem apenas com empty state ([FinovaEmptyState](../components/finova/finova-empty-state.tsx)); falta implementar o conteúdo.
- **Camada de dados remota:** hoje tudo é mock em `lib/` e estado efêmero; não há backend, API routes ou persistência ([architecture.md](architecture.md), [state-management.md](state-management.md)).
- **Autenticação:** não existe login nem `middleware.ts`; o usuário é mock.
- **Unificar o shell:** Transações e Cartões reimplementam o layout sidebar inline em vez de usar [FinovaPageShell](../components/finova/finova-page-shell.tsx) ([modules.md](modules.md)).
- **Alinhar a sidebar aos tokens:** a variante `finova` usa hex fixos em vez de CSS variables ([design-system.md](design-system.md)).

Este roadmap deve ser revisado conforme os módulos evoluem.
