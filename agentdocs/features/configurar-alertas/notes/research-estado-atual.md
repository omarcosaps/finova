# Research: Estado atual de Alertas e overlap de configuração

**Date**: 2026-08-16
**Related spec**: [spec.md](../spec.md)

## Question

O que existe hoje para “Configurar alertas”, o que está morto na UI, e o que **não** deve ser reutilizado nesta entrega?

## Summary

`/alertas` é placeholder: empty state com CTA **Configurar alertas** sem `href` nem `onClick`. Configurações já tem switches de notificação (incluindo limites, faturas e transações altas) e o Resumo já lista 3 alertas mock — ambos ficam isolados desta feature. O padrão a seguir é Drawer ADR-002 + mock em `lib/`.

## Findings

### Tela `/alertas`

[`app/alertas/alertas-view.tsx`](../../../../app/alertas/alertas-view.tsx) usa `FinovaPageShell` + header (“Alertas” / “Acompanhe avisos sobre limites, faturas e movimentações.”) + `FinovaEmptyState variant="alertas"`. Sem estado, sem drawer, sem mock próprio.

**Key Points:**
- Header ainda não tem ação (diferente de Transações/Configurações, que colocam botão à direita).
- Copy do header descreve **inbox** (“acompanhe avisos”); o CTA descreve **configuração**. Esta feature cobre só o CTA.

### Empty state — botão morto

Em [`finova-empty-state.tsx`](../../../../components/finova/finova-empty-state.tsx):

```46:52:components/finova/finova-empty-state.tsx
  alertas: {
    icon: "notification",
    title: "Nenhum alerta",
    description:
      "Configure limites e notificações para receber avisos sobre gastos e faturas.",
    primary: { label: "Configurar alertas" },
```

`EmptyAction` aceita `href?`. Sem `href`, `EmptyActionButton` renderiza um `<Button>` **sem handler**:

```97:105:components/finova/finova-empty-state.tsx
  return (
    <Button
      type="button"
      variant={action.variant ?? "default"}
      size="default"
    >
      {action.label}
    </Button>
  )
```

`FinovaEmptyStateProps` hoje é só `{ variant }`. Relatórios e Categorias também têm CTAs sem `href`; a extensão `onPrimaryAction?` MUST ser opcional para não quebrá-los.

**Key Points:**
- Secundário “Ver transações” já navega para `/transacoes` — manter.
- Título “Nenhum alerta” é o copy inicial; após salvar regras habilitadas, a spec pede “Nenhum alerta disparado”.

### Configurações > Notificações (overlap, isolado)

[`lib/configuracoes-mock.ts`](../../../../lib/configuracoes-mock.ts) define:

| id | Label | defaultEnabled | Nesta feature? |
|----|--------|----------------|----------------|
| `limites-gasto` | Limites de gasto | true | Sim (regra + limiar %) |
| `vencimento-faturas` | Vencimento de faturas | true | Sim (regra + dias) |
| `transacoes-altas` | Transações acima de R$ 1.000 | true | Sim (regra + valor em centavos) |
| `relatorio-semanal` | Relatório semanal por e-mail | false | Não (digest) |
| `resumo-diario` | Resumo diário | false | Não (digest) |

Estado vive só em `ConfiguracoesView` (`NotificacaoState`). Salvar faz `console.log`. **Não há store compartilhado.**

**Key Points:**
- IDs e labels dos 3 tipos financeiros podem ser **espelhados** no mock de alertas, sem importar `configuracoes-mock`.
- Sync entre telas é Non-Goal (decisão de produto desta inicialização).

### Resumo e sidebar (fora de escopo)

- Widget “Alertas” em [`resumo-view.tsx`](../../../../app/resumo-view.tsx) consome `data.alerts` (`buildAlerts` em `features/dashboard/utils/dashboard-calculations.ts`): limites ≥90%/100% + `infoAlerts`, slice de 3.
- Badge `3` em [`finova-app-sidebar.tsx`](../../../../components/finova/finova-app-sidebar.tsx) é **fixo**.
- Inbox / badge dinâmico / reutilizar `DashboardAlert` ficam para feature futura.

### Padrões a reutilizar

| Padrão | Onde | Uso nesta feature |
|--------|------|-------------------|
| Drawer controlado `direction="right"` | [ADR-002](../../../../docs/decisions/ADR-002-drawer-pattern.md), `nova-transacao-drawer.tsx` | Formulário de regras |
| Sync ao abrir (`wasOpen`) | `cartao-drawer.tsx` | Repopular com último salvo (não rascunho) |
| Mock + validação pura | [ADR-004](../../../../docs/decisions/ADR-004-mock-data-layer.md) | Novo `lib/alertas-mock.ts` |
| Header com ação à direita | `configuracoes-view.tsx` | Botão “Configurar alertas” |
| Switch + label + description | `configuracoes-view.tsx` seção Notificações, styleguide Switch | Cada regra no drawer |
| `CurrencyInput` + valores em centavos | `nova-transacao-drawer.tsx`, `lib/currency.ts` | Limiar de transações altas |

## Comparison

| Critério | Ligar CTA a `/configuracoes` | Drawer de regras em `/alertas` | Inbox + config |
|----------|------------------------------|--------------------------------|----------------|
| Atende o CTA | Parcial (sem limiares) | Sim | Sim, mas escopo maior |
| Isolamento | N/A | Sim (decisão) | Cruzaria Resumo |
| Inbox | Não | Não (Non-Goal) | Sim |

## Recommendations

1. **Estender `FinovaEmptyState`** com `onPrimaryAction?` e overrides opcionais de `title`/`description` — não criar empty state só para Alertas.
2. **Novo `lib/alertas-mock.ts`** em vez de estender `configuracoes-mock.ts`, para honrar isolamento.
3. **Drawer dedicado** `configurar-alertas-drawer.tsx` (convenção `{acao}-drawer.tsx`), não Dialog.

## Open Questions

Resolvidas na spec:

- Copy do empty após salvar → “Nenhum alerta disparado” se houver regra habilitada salva.
- Defaults do form (habilitadas + limiares) vs. copy inicial (“Nenhum alerta” até o primeiro save).
- Digests de e-mail fora desta feature.

## Sources

- [`app/alertas/alertas-view.tsx`](../../../../app/alertas/alertas-view.tsx)
- [`components/finova/finova-empty-state.tsx`](../../../../components/finova/finova-empty-state.tsx)
- [`lib/configuracoes-mock.ts`](../../../../lib/configuracoes-mock.ts)
- [`docs/modules.md`](../../../../docs/modules.md) — Alertas = placeholder
- [`docs/decisions/ADR-002-drawer-pattern.md`](../../../../docs/decisions/ADR-002-drawer-pattern.md)
- [`docs/decisions/ADR-004-mock-data-layer.md`](../../../../docs/decisions/ADR-004-mock-data-layer.md)

## Next Steps

- [x] Gravado na spec (Draft)
- [x] Plano mock → drawer → integração
