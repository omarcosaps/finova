# Changelog

Principais evoluções do Finova. O formato segue, de forma simplificada, o [Keep a Changelog](https://keepachangelog.com/). As entradas são derivadas do histórico do repositório (Pull Requests) e agrupadas por tipo.

O projeto está na versão `0.1.0` ([package.json](../package.json)). Enquanto não há releases versionadas, as mudanças ficam sob `[0.1.0] — em desenvolvimento`.

## [0.1.0] — em desenvolvimento

### Added

- Design System: tokens em `globals.css`, styleguide de tokens e catálogo de ícones.
- Componentes de UI ao longo do desenvolvimento, incluindo Sheet, Switch, Command (com `cmdk`) e Date Picker, cada um com showcase no styleguide e entrada em [navigation.ts](../app/styleguide/navigation.ts).
- Módulo Resumo (dashboard com KPIs, fluxo de caixa, limites e alertas).
- Módulo Configurações com componentes próprios de seção e formulário.
- `NovaTransacaoDrawer` para criação de transações.
- `CartaoDrawer` para criação e edição de cartões corporativos.
- Empty states dedicados (`FinovaEmptyState`) para Alertas, Relatórios e Categorias.
- Exportação de transações em PDF na view de Transações.
- Gestão de foto de perfil em Configurações (`AlterarFotoPerfilDialog`), com validação e preview.
- Resumo: visão de contas a pagar e a receber no fluxo de caixa.

### Changed

- `NovaTransacaoDrawer` passou a usar `CurrencyInput` e teve a estrutura de campos revista.
- Refino de layout e estilos de sidebar e views.
- Ajustes no componente Switch (estilos e cor do thumb ativo).
- Simplificações de UI: remoção de `DrawerDescription` no `NovaTransacaoDrawer` e de `FieldSet`/`FieldLegend` desnecessários no drawer de cartões.
- Remoção do ícone e simplificação do `KpiCard` no Resumo, e do `ConfiguracoesSectionCard`.
- Atualização de dependências e do tratamento de datas.
- `NovoCartaoDrawer` substituído por `CartaoDrawer`, unificando criação e edição de cartões.
- Resumo migrado para o modelo de dados do dashboard; seletor de período passou de `DropdownMenu` para `Select`.
- `SidebarBrand` simplificado: logo/símbolo opcional.

### Fixed

- Ícones de direção (entrada/saída) nas transações corrigidos e atualizados no registry de ícones.

> Para o estado atual de cada módulo, veja [modules.md](modules.md) e [roadmap.md](roadmap.md). Ao introduzir mudanças relevantes, adicione uma entrada aqui.
