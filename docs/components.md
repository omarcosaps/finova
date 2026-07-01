# Componentes

Inventário dos componentes reutilizáveis do Finova. Os tokens e princípios que eles seguem estão em [design-system.md](design-system.md). As demonstrações interativas ficam em [`/styleguide/components/*`](../app/styleguide), indexadas por [`navigation.ts`](../app/styleguide/navigation.ts).

Para não duplicar código, as props abaixo listam apenas as principais (variantes CVA e props de composição). A assinatura completa está em cada arquivo.

## Primitivos — `components/ui/`

São 35 primitivos baseados em shadcn/ui e Radix. A coluna "Showcase" indica se existe página dedicada no styleguide.

### Formulários e entrada

| Componente | Arquivo | Props principais | Showcase |
|-----------|---------|------------------|----------|
| Button | [button.tsx](../components/ui/button.tsx) | `variant` (default, outline, secondary, ghost, destructive, link), `size` (default, xs, sm, lg, icon), `asChild` | Sim |
| Input | [input.tsx](../components/ui/input.tsx) | props nativas de `<input>` | Não |
| Textarea | [textarea.tsx](../components/ui/textarea.tsx) | props nativas | Não |
| Label | [label.tsx](../components/ui/label.tsx) | props nativas | Não |
| Checkbox | [checkbox.tsx](../components/ui/checkbox.tsx) | props do Radix Checkbox | Sim |
| Switch | [switch.tsx](../components/ui/switch.tsx) | `size` (sm, default) | Sim |
| Radio Group | [radio-group.tsx](../components/ui/radio-group.tsx) | `RadioGroup`, `RadioGroupItem` | Sim |
| Select | [select.tsx](../components/ui/select.tsx) | composição Radix; `size` no Trigger | Sim |
| Field | [field.tsx](../components/ui/field.tsx) | `Field`, `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldLabel`, `FieldError`; `orientation` | Sim |
| Input Group | [input-group.tsx](../components/ui/input-group.tsx) | `InputGroupAddon`, `InputGroupButton`, `InputGroupText` | Não |
| Currency Input | [currency-input.tsx](../components/ui/currency-input.tsx) | `valueCents`, `onValueCentsChange`, `showPrefix?` | Não |
| Date Picker | [date-picker.tsx](../components/ui/date-picker.tsx) | `value?`, `onChange?`, `placeholder?`, `disabled?` | Sim |
| Calendar | [calendar.tsx](../components/ui/calendar.tsx) | props do `react-day-picker` | Não |

### Layout e superfícies

| Componente | Arquivo | Props principais | Showcase |
|-----------|---------|------------------|----------|
| Card | [card.tsx](../components/ui/card.tsx) | `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction`; `size` (default, sm) | Sim |
| Separator | [separator.tsx](../components/ui/separator.tsx) | `orientation` | Não |
| Empty | [empty.tsx](../components/ui/empty.tsx) | `EmptyHeader`, `EmptyMedia` (`variant`: default, icon), `EmptyTitle`, `EmptyDescription`, `EmptyContent` | Sim |
| Sidebar | [sidebar.tsx](../components/ui/sidebar.tsx) | `variant` (default, finova); `SidebarBrand`, `SidebarNav`, `SidebarNavList`, `SidebarNavBadge`, `SidebarUser`, `SidebarAvatar`, `SidebarSeparator` | Sim |
| Breadcrumb | [breadcrumb.tsx](../components/ui/breadcrumb.tsx) | composição de navegação | Sim |
| Accordion | [accordion.tsx](../components/ui/accordion.tsx) | `type`, `collapsible` (Radix) | Sim |

### Overlays e feedback

| Componente | Arquivo | Props principais | Showcase |
|-----------|---------|------------------|----------|
| Dialog | [dialog.tsx](../components/ui/dialog.tsx) | composição Radix; `showCloseButton?` no Content | Sim |
| Alert Dialog | [alert-dialog.tsx](../components/ui/alert-dialog.tsx) | `AlertDialogAction`, `AlertDialogCancel`; `size` no Content | Sim |
| Drawer | [drawer.tsx](../components/ui/drawer.tsx) | wrapper sobre `vaul`; `direction` | Sim |
| Sheet | [sheet.tsx](../components/ui/sheet.tsx) | `side` (top, right, bottom, left); `showCloseButton?` | Sim |
| Popover | [popover.tsx](../components/ui/popover.tsx) | composição Radix | Não |
| Tooltip | [tooltip.tsx](../components/ui/tooltip.tsx) | `TooltipProvider`, `TooltipTrigger`, `TooltipContent` | Sim |
| Alert | [alert.tsx](../components/ui/alert.tsx) | `variant` (default, destructive) | Não |
| Badge | [badge.tsx](../components/ui/badge.tsx) | `variant` (default, secondary, destructive, outline, ghost, link), `asChild` | Não |
| Progress | [progress.tsx](../components/ui/progress.tsx) | `variant` (default, accent, success, warning, destructive), `value` | Sim |

### Dados e navegação

| Componente | Arquivo | Props principais | Showcase |
|-----------|---------|------------------|----------|
| Table | [table.tsx](../components/ui/table.tsx) | `TableHeader`, `TableBody`, `TableRow`, `TableCell` | Sim |
| Data Table | [data-table.tsx](../components/ui/data-table.tsx) | `columns`, `data`, `searchPlaceholder?`, `showSearch?`, `showColumnToggle?`, `getRowId?` | Sim |
| Pagination | [pagination.tsx](../components/ui/pagination.tsx) | `PaginationContent`, `PaginationLink`, `PaginationPrevious`, `PaginationNext` | Sim |
| Dropdown Menu | [dropdown-menu.tsx](../components/ui/dropdown-menu.tsx) | composição Radix (`Item`, `CheckboxItem`, `Sub`) | Não |
| Command | [command.tsx](../components/ui/command.tsx) | wrapper sobre `cmdk` (`CommandInput`, `CommandList`, `CommandItem`) | Sim |

### Visualização

| Componente | Arquivo | Props principais | Showcase |
|-----------|---------|------------------|----------|
| Chart | [chart.tsx](../components/ui/chart.tsx) | `ChartContainer` (`config`), `ChartTooltipContent`, `ChartLegendContent` (wrapper Recharts) | Sim |
| Avatar | [avatar.tsx](../components/ui/avatar.tsx) | `AvatarImage`, `AvatarFallback`, `AvatarBadge`, `AvatarGroup` | Sim |

## Composições de produto — `components/finova/`

| Componente | Arquivo | Props | Onde é usado |
|-----------|---------|-------|--------------|
| FinovaPageShell | [finova-page-shell.tsx](../components/finova/finova-page-shell.tsx) | `activeItem: FinovaNavKey`, `ariaLabel`, `children` | Resumo, Alertas, Relatórios, Categorias, Configurações |
| FinovaAppSidebar | [finova-app-sidebar.tsx](../components/finova/finova-app-sidebar.tsx) | `activeItem: FinovaNavKey`, `className?` | Usado pelo `FinovaPageShell` e, inline, por Transações e Cartões |
| FinovaEmptyState | [finova-empty-state.tsx](../components/finova/finova-empty-state.tsx) | `variant` (resumo, alertas, relatorios, categorias, configuracoes) | Alertas, Relatórios, Categorias |
| NovaTransacaoDrawer | [nova-transacao-drawer.tsx](../components/finova/nova-transacao-drawer.tsx) | `open`, `onOpenChange`, `onSubmit?` | Resumo, Transações |
| NovoCartaoDrawer | [novo-cartao-drawer.tsx](../components/finova/novo-cartao-drawer.tsx) | `open`, `onOpenChange`, `onSubmit?` | Cartões |

Os dois drawers seguem o mesmo contrato e comportamento (estado controlado pelo pai, reset ao fechar, validação via `lib/*-mock.ts`, submit mock). Esse padrão está registrado em [ADR-002](decisions/ADR-002-drawer-pattern.md).

## Componentes locais de rota — `app/configuracoes/components/`

| Componente | Arquivo | Props |
|-----------|---------|-------|
| ConfiguracoesSectionCard | [configuracoes-section-card.tsx](../app/configuracoes/components/configuracoes-section-card.tsx) | `title`, `description?`, `titleClassName?`, `children` |
| ConfiguracoesFormRow | [configuracoes-form-row.tsx](../app/configuracoes/components/configuracoes-form-row.tsx) | `label`, `description?`, `htmlFor?`, `controlClassName?`, `children` |
| ConfiguracoesThemeSelector | [configuracoes-theme-selector.tsx](../app/configuracoes/components/configuracoes-theme-selector.tsx) | `value` (dark, light), `onChange` |

## Infraestrutura

| Componente | Arquivo | Papel |
|-----------|---------|-------|
| AppProviders | [app-providers.tsx](../components/app-providers.tsx) | Providers globais; hoje apenas `TooltipProvider`. |
| DsIcon / Icons | [ds-icon.tsx](../app/styleguide/icons/ds-icon.tsx) | Wrapper de ícones Hugeicons (stroke padrão) + registro central. |
