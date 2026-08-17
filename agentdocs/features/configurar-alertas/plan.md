# Implementation Plan: Configurar alertas

**Spec**: [spec.md](spec.md)
**Status**: Complete
**Last Updated**: 2026-08-16

## Approach Summary

Criar uma camada mock isolada (`lib/alertas-mock.ts`) com tipos, defaults e validação das três regras; um `ConfigurarAlertasDrawer` no padrão ADR-002 (controlado, `direction="right"`, sync `wasOpen`); e integrar em `AlertasView` com estado local + CTA do empty state + botão no header. Estender `FinovaEmptyState` com `onPrimaryAction?` e override opcional de `title`, sem alterar Relatórios/Categorias. Sem backend e sem sync com Configurações.

## Architecture

### Components

| Component | Purpose | New/Modified |
|-----------|---------|--------------|
| `lib/alertas-mock.ts` | Tipos, defaults, validação, helper de título | New |
| `ConfigurarAlertasDrawer` | Formulário de regras no Drawer | New |
| `AlertasView` | Estado salvo, open, header, empty | Modified |
| `FinovaEmptyState` | `onPrimaryAction?` + `title?` opcional | Modified |

### Data Model

```typescript
type AlertaRegraId =
  | "limites-gasto"
  | "vencimento-faturas"
  | "transacoes-altas"

type AlertaRegraLimitesGasto = {
  id: "limites-gasto"
  enabled: boolean
  percent: number
}

type AlertaRegraVencimentoFaturas = {
  id: "vencimento-faturas"
  enabled: boolean
  days: number
}

type AlertaRegraTransacoesAltas = {
  id: "transacoes-altas"
  enabled: boolean
  amountCents: number
}

type ConfigurarAlertasFormValues = {
  "limites-gasto": AlertaRegraLimitesGasto
  "vencimento-faturas": AlertaRegraVencimentoFaturas
  "transacoes-altas": AlertaRegraTransacoesAltas
}

type ConfigurarAlertasFieldErrors = {
  "limites-gasto"?: string
  "vencimento-faturas"?: string
  "transacoes-altas"?: string
}
```

Estado em `AlertasView`:

```typescript
drawerOpen: boolean
savedRules: ConfigurarAlertasFormValues  // sempre os defaults até o 1º save
hasSaved: boolean                         // FR-10
```

### API Design

Sem endpoints. Contrato do drawer:

```
ConfigurarAlertasDrawer
  open: boolean
  onOpenChange: (open: boolean) => void
  rules: ConfigurarAlertasFormValues
  onSubmit?: (rules: ConfigurarAlertasFormValues) => void
```

### System Diagram

```
┌─────────────────────┐
│    AlertasView      │
│  savedRules         │
│  hasSaved           │
│  drawerOpen         │
└──────────┬──────────┘
           │ CTA empty + botão header
           ▼
┌─────────────────────┐     getDefault / rules salvas
│ ConfigurarAlertas   │◀────────────────────────────────
│ Drawer (controlled) │
└──────────┬──────────┘
           │ validateConfigurarAlertasForm
           │ delay 300ms + console.log
           ▼
┌─────────────────────┐
│ onSubmit(rules)     │
│ setSavedRules       │
│ setHasSaved(true)   │
│ empty title FR-10   │
└─────────────────────┘
```

## Implementation Phases

### Phase 1: Lógica mock de regras

**Goal**: Funções puras testáveis para defaults, validação e copy do empty.

- [x] Criar `lib/alertas-mock.ts`
- [x] `getDefaultConfigurarAlertasFormValues()` — FR-5
- [x] `validateConfigurarAlertasForm(values)` — só regras `enabled` (EC-1 a EC-5)
- [x] `getAlertasEmptyTitle({ hasSaved, rules })` — FR-10

### Phase 2: Drawer de configuração

**Goal**: UI do formulário seguindo ADR-002.

- [x] Criar `components/finova/configurar-alertas-drawer.tsx`
- [x] Props controladas + sync `wasOpen` ao abrir com `rules`
- [x] Três blocos: Switch + limiar (`Input` %, `Input` dias, `CurrencyInput`)
- [x] Submit mock 300 ms + `console.log`
- [x] Foco no primeiro Switch (`#alerta-regra-limites-gasto`)

### Phase 3: Integração na view e empty state

**Goal**: CTA e header abrem o drawer; empty reflete FR-10.

- [x] Estender `FinovaEmptyState`: `onPrimaryAction?`, `title?`
- [x] Estado e handlers em `AlertasView`
- [x] Botão no header (padrão flex de Configurações)
- [x] Título do empty via `getAlertasEmptyTitle`

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Onde viver o mock | `lib/alertas-mock.ts` novo | ADR-004; isolamento vs Configurações |
| Drawer vs Dialog | Drawer `direction="right"` | ADR-002 |
| Sync ao abrir | `wasOpen` como `CartaoDrawer` | EC-6: último salvo, não rascunho |
| Empty state | Estender `FinovaEmptyState` | Reutilizar; Relatórios/Categorias intactos |
| Copy após save | Helper puro `getAlertasEmptyTitle` | FR-10 testável sem UI |
| `hasSaved` separado | boolean além das rules | Defaults ligados não mudam o empty antes do 1º save |
| Digests | Fora | Spec Non-Goals |
| Backend | Não alterar | Frontend only |

## Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| `onPrimaryAction` quebra empty de outras rotas | High | Low | Prop opcional; EC-8 na verificação manual |
| Confusão com switches de Configurações | Medium | Medium | Spec/non-goal; não importar `configuracoes-mock` |
| Campos %/dias como string no Input | Medium | Medium | Validar inteiro na camada mock; filtrar dígitos na UI |
| Usuário espera ver a inbox após salvar | Medium | High | Copy “Nenhum alerta disparado” deixa explícito que não há avisos ainda |

## Testing Strategy

### Unit Tests (opcional nesta entrega)

- `validateConfigurarAlertasForm` cobre EC-1 a EC-5
- `getAlertasEmptyTitle` cobre nunca salvou / salvou com ligadas / salvou todas off
- Defaults FR-5

### Manual Verification

- Abrir pelo empty e pelo header
- Desligar uma regra e confirmar limiar disabled
- Tentar save com % 0 e valor 0
- Save todas off → título “Nenhum alerta”
- Save com ligadas → “Nenhum alerta disparado”
- Fechar sem salvar e reabrir (EC-6)
- `/relatorios` e `/categorias` inalterados
- “Ver transações” continua navegando

## Rollout Plan

1. **Dev**: Mock + drawer + integração em `/alertas`
2. **Review**: Spec, ADR-002, Styleguide Switch/Drawer
3. **Future**: Inbox de disparos; sync com Configurações; badge da sidebar

## Success Metrics

- Todos os critérios de aceite da spec atendidos
- Zero regressão nos empty states de Relatórios e Categorias

## Changelog

### 2026-08-16

- Plano inicial a partir da spec Draft e de [notes/research-estado-atual.md](notes/research-estado-atual.md)
