# Implementation Plan: Lista de alertas (regras configuradas)

**Spec**: [spec.md](spec.md)
**Status**: Complete
**Last Updated**: 2026-08-17

## Approach Summary

Estender `lib/alertas-mock.ts` com helpers puros (filtro de habilitadas, copy de limiar, predicado empty vs lista) e um componente `AlertasRegrasList` no padrão visual dos cards de alerta do Resumo (ícone + título + subtítulo). `AlertasView` passa a escolher lista ou `FinovaEmptyState` com base em `hasSaved` + regras `enabled`. O drawer existente não muda; clicar no item chama o mesmo `handleOpenDrawer`. Sem backend e sem inbox de disparos.

## Architecture

### Components

| Component | Purpose | New/Modified |
|-----------|---------|--------------|
| `lib/alertas-mock.ts` | Itens da lista, format de limiar, `shouldShowAlertasLista` | Modified |
| `AlertasRegrasList` | Render da lista clicável | New |
| `AlertasView` | Condicional empty vs lista; `onSelect` abre drawer | Modified |
| `ConfigurarAlertasDrawer` | Sem mudança de contrato | Unchanged |
| `FinovaEmptyState` | Sem mudança de API | Unchanged |

### Data Model

Reusa os tipos de `configurar-alertas`. Acrescentar apenas a view-model da lista:

```typescript
type AlertaRegraListaItem = {
  id: AlertaRegraId
  label: string
  thresholdLabel: string
  icon: "wallet" | "creditCard" | "trendingUp"
}
```

Estado em `AlertasView` permanece:

```typescript
drawerOpen: boolean
savedRules: ConfigurarAlertasFormValues
hasSaved: boolean
```

### API Design

Sem endpoints. Contrato da lista:

```
AlertasRegrasList
  items: AlertaRegraListaItem[]
  onSelect?: (id: AlertaRegraId) => void
```

Helpers no mock:

```
getEnabledAlertaRegras(rules): AlertaRegraListaItem[]
formatAlertaRegraThreshold(rule): string
shouldShowAlertasLista({ hasSaved, rules }): boolean
```

`getAlertasEmptyTitle` MUST devolver só “Nenhum alerta” (FR-6).

### System Diagram

```
┌─────────────────────────┐
│      AlertasView        │
│  savedRules / hasSaved  │
│  drawerOpen             │
└───────────┬─────────────┘
            │
            ▼
 shouldShowAlertasLista?
     │              │
    yes             no
     │              │
     ▼              ▼
┌─────────────┐  ┌──────────────────┐
│ AlertasRegras│  │ FinovaEmptyState │
│ List         │  │ “Nenhum alerta”  │
│ onSelect ────┼──┤ onPrimaryAction  │
└──────┬──────┘  └────────┬─────────┘
       │                  │
       └────────┬─────────┘
                ▼
     ┌─────────────────────┐
     │ ConfigurarAlertas   │
     │ Drawer (inalterado) │
     └─────────────────────┘
```

## Implementation Phases

### Phase 1: Helpers no mock

**Goal**: Funções puras testáveis para lista, limiar e predicado empty vs lista.

- [x] Tipo `AlertaRegraListaItem` + mapa id → ícone
- [x] `formatAlertaRegraThreshold` — FR-3 (plural de dias, `formatBRL`)
- [x] `getEnabledAlertaRegras` — só `enabled`, ordem FR-2
- [x] `shouldShowAlertasLista` — FR-1 / FR-6
- [x] Ajustar `getAlertasEmptyTitle` para não devolver “Nenhum alerta disparado”

### Phase 2: Componente da lista

**Goal**: UI da lista alinhada ao DS e NFR-2 / NFR-3.

- [x] Criar `components/finova/alertas-regras-list.tsx`
- [x] Um `button` por item: ícone + label + `thresholdLabel`
- [x] `onSelect(id)` ao clicar; `aria-label` com o label da regra
- [x] Lista semântica (`ul` / `li`) com `aria-label` da região

### Phase 3: Integração na view

**Goal**: Empty some após save com regras ligadas; lista atualiza no submit.

- [x] `shouldShowAlertasLista` em `AlertasView`
- [x] Render `AlertasRegrasList` vs `FinovaEmptyState`
- [x] `onSelect` e header compartilham `handleOpenDrawer`
- [x] Empty com título fixo “Nenhum alerta” (FR-6)

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| O que listar | Regras habilitadas salvas | Decisão de produto; não inbox |
| Onde viver a lógica | Estender `lib/alertas-mock.ts` | ADR-004; já é a fonte das regras |
| Editor | Drawer existente, sem Switch na linha | Um único lugar de edição; evita drift |
| Ícones no mock | Union local, sem import de `app/styleguide` | `lib/` não importa `app/` hoje |
| Layout | Item tipo Resumo (`rounded-lg border p-3`) | Consistência; sem componente Item novo |
| Copy empty com regras ligadas | Lista substitui; “Nenhum alerta disparado” some | FR-6 |
| Abrir por item | Mesmo drawer completo | Escopo; sem deep-link de regra |

## Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Usuário ainda espera inbox de disparos | Medium | Medium | Spec/non-goal; lista mostra limiares, não avisos |
| `getAlertasEmptyTitle` “Nenhum alerta disparado” reaparece | Medium | Low | Helper sempre “Nenhum alerta” |
| Layout divergir do Resumo (cores de variant) | Low | Medium | Reusar estrutura, **não** `ALERT_STYLES` |
| Clicar no item vs header com handlers distintos | Low | Low | Um único `handleOpenDrawer` |

## Testing Strategy

### Unit Tests (opcional nesta entrega)

- `getEnabledAlertaRegras`: 0 / 1 / 3 itens; ordem; ignora `enabled: false`
- `formatAlertaRegraThreshold`: 80%, 1 dia, 3 dias, `R$ 1.000,00`
- `shouldShowAlertasLista`: nunca salvou / salvou com ligadas / salvou todas off

### Manual Verification

- Sem save → empty “Nenhum alerta”
- Save defaults (3 ligadas) → 3 itens; empty some
- Desligar duas, salvar → 1 item
- Save todas off → empty de volta
- Clicar item abre drawer; fechar sem salvar não muda a lista
- Header continua abrindo o drawer
- “Ver transações” no empty
- `/relatorios` e `/categorias` inalterados
- “Nenhum alerta disparado” não aparece

## Rollout Plan

1. **Dev**: Helpers + lista + condicional em `/alertas`
2. **Review**: Spec, DS (ícones/tokens), regressão do empty
3. **Future**: Inbox de disparos; sync com Configurações; badge da sidebar

## Success Metrics

- Todos os critérios de aceite da spec atendidos
- Zero regressão no drawer de configurar alertas e nos empty states de Relatórios/Categorias

## Changelog

### 2026-08-17

- Plano inicial a partir da spec Draft e de [notes/research-estado-atual.md](notes/research-estado-atual.md)
- Phase 1 concluída (task 01)
- Phase 2 concluída (task 02)
- Phase 3 concluída (task 03)
