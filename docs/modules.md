# Módulos

Módulos de produto do Finova, seu estado atual e os componentes/dados que utilizam. As rotas e arquivos estão em [routing.md](routing.md); os componentes, em [components.md](components.md).

Legenda de status:

- **Completo (mock):** UI implementada e funcional sobre dados mock.
- **Parcial:** UI implementada, mas com ações ou persistência não funcionais.
- **Placeholder:** rota existe, exibindo apenas um empty state.

| Módulo | Rota | Status |
|--------|------|--------|
| Resumo | `/` | Completo (mock) |
| Transações | `/transacoes` | Parcial |
| Cartões | `/cartoes` | Parcial |
| Configurações | `/configuracoes` | Parcial |
| Alertas | `/alertas` | Placeholder |
| Relatórios | `/relatorios` | Placeholder |
| Categorias | `/categorias` | Placeholder |

## Resumo

- **Objetivo:** dashboard financeiro com panorama geral.
- **Tela:** [resumo-view.tsx](../app/resumo-view.tsx) — KPIs (saldo, receitas, despesas, lucro), gráfico de fluxo de caixa, limites de gasto, últimas transações e prévia de alertas.
- **Componentes:** `FinovaPageShell`, `NovaTransacaoDrawer`, `Card`, `Chart`, `Progress`, `Badge`, `Button`, `DropdownMenu`, `DsIcon`.
- **Dados:** [`features/dashboard/`](../features/dashboard) — série mensal canônica (`DASHBOARD_MONTHS`), cálculos em `dashboard-calculations.ts` e view-model via `getDashboardPeriodData`. [`lib/resumo-mock.ts`](../lib/resumo-mock.ts) reexporta a API para compatibilidade.
- **Status:** completo (mock). O seletor de período deriva KPIs, gráfico, limites, transações e alertas da fonte única; o drawer de nova transação apenas registra em `console.log` (sem `onSubmit`).

## Transações

- **Objetivo:** listagem e criação de transações.
- **Tela:** [transacoes-view.tsx](../app/transacoes/transacoes-view.tsx) — tabela paginada (7 por página sobre 142 registros gerados), toolbar com Filtrar, Exportar e Nova transação.
- **Componentes:** `FinovaAppSidebar` (layout inline), `NovaTransacaoDrawer`, `Table`, `Badge`, `Button`, `DropdownMenu`.
- **Dados:** [transacoes-mock.ts](../lib/transacoes-mock.ts) — `buildTransacoesList`, `TRANSACOES_TEMPLATE`, validação e factory do formulário.
- **Status:** parcial. Funciona: paginação e adicionar transação ao estado local via drawer. Não funciona: Filtrar, Exportar e seletor de período.

## Cartões

- **Objetivo:** gestão de cartões corporativos e fatura.
- **Tela:** [cartoes-view.tsx](../app/cartoes/cartoes-view.tsx) — preview de cartões físico/virtual, resumo de fatura, barra de uso de limite e últimas transações do cartão.
- **Componentes:** `FinovaAppSidebar` (layout inline), `NovoCartaoDrawer`, `Card`, `Badge`, `Button`, `DsIcon`.
- **Dados:** [cartoes-mock.ts](../lib/cartoes-mock.ts) — `CARTOES_PREVIEW`, `FATURA_RESUMO`, `ULTIMAS_TRANSACOES_CARTAO`, validação e factory do drawer.
- **Status:** parcial. Funciona: adicionar cartão ao estado local via drawer. Não funciona: pagar fatura, gerar boleto e configurações do cartão.

## Configurações

- **Objetivo:** preferências de perfil, empresa, notificações e aparência.
- **Tela:** [configuracoes-view.tsx](../app/configuracoes/configuracoes-view.tsx) — seções de perfil, empresa, notificações (switches), aparência (tema/compacto) e zona de perigo.
- **Componentes:** locais em [app/configuracoes/components/](../app/configuracoes/components) (`ConfiguracoesSectionCard`, `ConfiguracoesFormRow`, `ConfiguracoesThemeSelector`) + `FinovaPageShell`, `Input`, `Select`, `Switch`, `Avatar`, `AlertDialog`, `Button`.
- **Dados:** [configuracoes-mock.ts](../lib/configuracoes-mock.ts) — perfil, empresa, notificações, moedas e períodos fiscais.
- **Status:** parcial. Formulários são controlados em React; Salvar faz `console.log`. Não funciona: persistência real, troca de tema global, alterar foto/senha e excluir conta.

## Alertas

- **Objetivo:** central de alertas financeiros.
- **Tela:** [alertas-view.tsx](../app/alertas/alertas-view.tsx) — header + `FinovaEmptyState` na variante `alertas`.
- **Status:** placeholder. O Resumo já exibe alertas mock em um widget, mas a rota dedicada está vazia. O badge `3` na sidebar é fixo.

## Relatórios

- **Objetivo:** relatórios de despesas, categorias e fluxo de caixa.
- **Tela:** [relatorios-view.tsx](../app/relatorios/relatorios-view.tsx) — header + `FinovaEmptyState` na variante `relatorios`.
- **Status:** placeholder. As ações "Gerar relatório" e "Exportar transações" são UI sem lógica.

## Categorias

- **Objetivo:** organização de transações por categorias personalizadas.
- **Tela:** [categorias-view.tsx](../app/categorias/categorias-view.tsx) — header + `FinovaEmptyState` na variante `categorias`.
- **Status:** placeholder. Categorias aparecem como badges na tabela de transações (mock), mas não há CRUD.

## Observação: shell inconsistente

Resumo, Alertas, Relatórios, Categorias e Configurações usam [`FinovaPageShell`](../components/finova/finova-page-shell.tsx). Já **Transações** e **Cartões** reimplementam o layout sidebar + main inline, chamando `FinovaAppSidebar` diretamente. Unificar esse layout está registrado em [roadmap.md](roadmap.md).

## Styleguide

Não é um módulo de produto, mas de documentação interna do Design System. Veja [design-system.md](design-system.md) e as rotas em [routing.md](routing.md).
