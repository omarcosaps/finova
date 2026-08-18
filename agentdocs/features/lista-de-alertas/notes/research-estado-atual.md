# Research: Empty state vs regras salvas em `/alertas`

**Date**: 2026-08-17
**Related spec**: [spec.md](../spec.md)

## Question

Por que, após configurar alertas, a tela principal não lista as regras salvas? O que já existe para reutilizar, e o que esta feature MUST NOT confundir com inbox de disparos?

## Summary

O comportamento é **esperado**, não um bug. A feature [configurar-alertas](../../configurar-alertas/spec.md) persiste `savedRules` + `hasSaved` em `AlertasView` e só altera o título do empty (“Nenhum alerta disparado” após save com regras ligadas). A lista de configurações ficou Non-Goal. Esta entrega cobre exatamente esse gap: listar as **regras habilitadas** salvas, sem inbox do Resumo.

## Findings

### Tela `/alertas` após `configurar-alertas`

[`app/alertas/alertas-view.tsx`](../../../../app/alertas/alertas-view.tsx) já tem:

- `drawerOpen`, `savedRules` (defaults até o 1º save), `hasSaved`
- Header com botão “Configurar alertas”
- `FinovaEmptyState` **sempre** renderizado, com `title={getAlertasEmptyTitle(...)}` e `onPrimaryAction` abrindo o drawer
- `ConfigurarAlertasDrawer` controlado, `onSubmit` só seta estado

Não há ramo condicional lista vs empty. As regras salvas não aparecem na UI.

**Key Points:**
- Estado já é suficiente para alimentar a lista; não precisa de store novo.
- `getAlertasEmptyTitle` devolve “Nenhum alerta disparado” quando `hasSaved` e há regra `enabled` — copy de inbox, que esta feature substitui pela lista.

### Mock existente

[`lib/alertas-mock.ts`](../../../../lib/alertas-mock.ts) já define tipos, `ALERTA_REGRAS_META` (label + description na ordem FR-3), defaults, validação e `getAlertasEmptyTitle`. Falta:

- Derivar itens da lista a partir de `savedRules` (só `enabled`)
- Formatadores de limiar (`80% do orçamento`, `3 dias de antecedência`, `R$ 1.000,00`)
- Predicado empty vs lista (`hasSaved` + pelo menos uma `enabled`)

**Key Points:**
- Extender o mock (ADR-004), não criar `lib/` paralelo.
- Monetário MUST usar `formatBRL` de [`lib/currency.ts`](../../../../lib/currency.ts) (centavos na camada, string na UI).
- Ordem da lista MUST seguir `ALERTA_REGRAS_META` / FR-3 de `configurar-alertas`.
- Ícones como union no mock (`wallet` / `creditCard` / `trendingUp`), sem importar `@/app/styleguide` na camada `lib/` (nenhum mock atual importa `app/`).

### Padrões de lista no produto

| Padrão | Onde | Reutilizar? |
|--------|------|-------------|
| Card de alerta (dot + título + `timeLabel`) | [`resumo-view.tsx`](../../../../app/resumo-view.tsx) widget Alertas | Layout (`flex gap-3 rounded-lg border p-3`), **não** `data.alerts` nem variantes destructive/warning |
| Linha de notificação (label + description + Switch) | [`configuracoes-view.tsx`](../../../../app/configuracoes/configuracoes-view.tsx) | Não: Switch na lista é Non-Goal; edição continua no drawer |

Ícones já no registry:

| Regra | `IconName` |
|-------|------------|
| `limites-gasto` | `wallet` |
| `vencimento-faturas` | `creditCard` |
| `transacoes-altas` | `trendingUp` |

### Drawer — reutilizar, não alterar

[`configurar-alertas-drawer.tsx`](../../../../components/finova/configurar-alertas-drawer.tsx) já cobre ligar/desligar, limiares, validação, rascunho e submit mock. Clicar num item da lista MUST só abrir o mesmo drawer.

## Recommendations

1. **Condicional na view**: `shouldShowAlertasLista({ hasSaved, rules })` → lista; senão empty com título **“Nenhum alerta”**.
2. **Helpers puros no mock existente**: itens + format de limiar; UI só renderiza.
3. **Componente `AlertasRegrasList`**: um botão por regra habilitada; `onSelect` abre o drawer. Sem Switch na linha.

## Open Questions

Resolvidas na inicialização:

- Lista de regras vs inbox de disparos → **regras configuradas habilitadas**.
- Switch na lista → **Não**.
- Copy “Nenhum alerta disparado” → **descontinuado** nesta tela.

## Sources

- [`app/alertas/alertas-view.tsx`](../../../../app/alertas/alertas-view.tsx)
- [`lib/alertas-mock.ts`](../../../../lib/alertas-mock.ts)
- [configurar-alertas/spec.md](../../configurar-alertas/spec.md)
- [`lib/currency.ts`](../../../../lib/currency.ts) — `formatBRL`

## Next Steps

- [x] Gravado na spec (Draft)
- [x] Plano: mock helpers → lista UI → integração na view
