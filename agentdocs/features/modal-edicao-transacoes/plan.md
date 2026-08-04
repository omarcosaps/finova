# Implementation Plan: Edição de transações na listagem

**Spec**: [spec.md](spec.md)
**Status**: Draft
**Last Updated**: 2026-08-03

## Approach Summary

Adicionar camada mock para formulário de edição (subconjunto dos campos de criação), criar `EditarTransacaoDrawer` espelhando a estrutura do `NovaTransacaoDrawer` e o sync de abertura do `CartaoDrawer`, e integrar em `TransacoesView` com linhas clicáveis que abrem o drawer e atualizam o array `transactions` via `onSubmit`. Sem backend; validação e factory permanecem em `lib/transacoes-mock.ts` (ADR-004).

## Architecture

### Components

| Component | Purpose | New/Modified |
|-----------|---------|--------------|
| `EdicaoTransacaoFormValues` | Tipo do formulário de edição (5 campos) | New (type) |
| `getEdicaoFormValuesFromTransaction` | `Transaction` → valores iniciais do form | New |
| `validateEdicaoTransacaoForm` | Validação sem `sourceId`/`notes` | New |
| `updateTransactionFromForm` | Mescla form validado em `Transaction` existente | New |
| `EditarTransacaoDrawer` | Drawer controlado de edição | New |
| `TransacoesView` | Linha clicável, estado de seleção, update | Modified |

### Data Model

Sem alteração no tipo `Transaction`:

```typescript
type Transaction = {
  id: string
  occurredAt: string // ISO 8601
  description: string
  category: string
  amountCents: number
  direction: "in" | "out"
}

type EdicaoTransacaoFormValues = {
  direction: TransactionDirection
  description: string
  amountCents: number
  category: string
  /** YYYY-MM-DD */
  date: string
}
```

Estado adicional em `TransacoesView`:

```typescript
edicaoOpen: boolean
transacaoEmEdicao: Transaction | null

// handlers
handleRowActivate(transaction) → set transacaoEmEdicao + edicaoOpen
onSubmit(updated) → setTransactions(map by id) + close drawer
```

### System Diagram

```
┌──────────────────────┐
│  TransacoesView      │
│  transactions[]      │
│  filtered (period)   │
└──────────┬───────────┘
           │ click row
           ▼
┌──────────────────────┐     getEdicaoFormValuesFromTransaction
│ EditarTransacaoDrawer│◀────────────────────────────────────
│  (controlled open)   │
└──────────┬───────────┘
           │ onSubmit
           ▼
┌──────────────────────┐
│ updateTransaction    │
│ FromForm(tx, form)   │
└──────────┬───────────┘
           │ same id
           ▼
┌──────────────────────┐
│ setTransactions     │
│ → table re-render   │
│ → filter re-derive  │
└──────────────────────┘
```

## Implementation Phases

### Phase 1: Lógica mock de edição

**Goal**: Funções puras para mapear, validar e aplicar edição.

- [ ] Definir `EdicaoTransacaoFormValues` em `lib/transacoes-mock.ts`
- [ ] `getEdicaoFormValuesFromTransaction(transaction)`
- [ ] `validateEdicaoTransacaoForm(values)` — reutilizar regras de descrição, valor, categoria, data (sem sourceId/notes)
- [ ] `updateTransactionFromForm(existing, values)` — preservar `id` e hora de `occurredAt`

### Phase 2: Drawer de edição

**Goal**: UI do formulário seguindo padrão ADR-002.

- [ ] Criar `components/finova/editar-transacao-drawer.tsx`
- [ ] Props: `open`, `onOpenChange`, `transaction`, `onSubmit?`
- [ ] Sync form ao abrir (padrão `wasOpen` do `CartaoDrawer`)
- [ ] Campos: direção, descrição, valor, categoria, data
- [ ] Submit mock com delay 300 ms + `console.log`
- [ ] Foco em `#editar-tx-descricao` ao abrir

### Phase 3: Integração na listagem

**Goal**: Acionar edição e persistir no estado local.

- [ ] Estado `edicaoOpen` + `transacaoEmEdicao` em `TransacoesView`
- [ ] `TableRow` clicável com `onClick` / `onKeyDown` (Enter, Space)
- [ ] Renderizar `EditarTransacaoDrawer` ao lado do `NovaTransacaoDrawer`
- [ ] `onSubmit`: `setTransactions(prev => prev.map(...))`
- [ ] Garantir EC-9: fechar drawer de criação se abrir edição (ou vice-versa) — apenas um open

### Phase 4: Polish e acessibilidade

**Goal**: Affordance, feedback e consistência visual.

- [ ] Hover/focus na linha (`hover:bg-muted/50`, `focus-visible:ring`)
- [ ] `role="button"` + `tabIndex={0}` + `aria-label` descritivo na linha
- [ ] Revisão contra Styleguide (Drawer, Field, DatePicker)
- [ ] Verificar contador e paginação após edição que remove item do período

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Drawer vs Dialog | Drawer `direction="right"` | ADR-002; consistência com create |
| Componente | `EditarTransacaoDrawer` separado | Campos diferentes do create; menor risco em `/` e Resumo |
| Validação | Nova função dedicada | Create exige `sourceId`; edit não |
| Sync ao abrir | Padrão `wasOpen` (CartaoDrawer) | Evita stale form ao trocar transação |
| `occurredAt` | Preservar hora original | EC implícito; display usa hora existente |
| Entrada UI | Clique na linha | Spec FR-1; sem coluna extra de ações nesta entrega |
| Backend | Não alterar | Frontend only |

## Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Duplicação de markup entre create e edit drawers | Medium | High | Aceitar duplicação controlada; extrair shared fields só se custo justificar |
| Clique na linha conflita com seleção de texto | Low | Medium | `user-select-none` na row ou ignorar se não reportado |
| Edição remove item da página atual | Low | Medium | `safePage` já existe; validar manualmente EC-7 |
| Dois drawers abertos | Low | Low | Fechar create ao abrir edit (ou mutual exclusive state) |

## Testing Strategy

### Unit Tests (opcional nesta entrega)

- `getEdicaoFormValuesFromTransaction` extrai data YYYY-MM-DD de ISO
- `updateTransactionFromForm` preserva `id` e hora
- `validateEdicaoTransacaoForm` cobre EC-2 a EC-5

### Manual Verification

- Abrir edição de transação receita e despesa
- Alterar cada campo e confirmar na tabela
- Trocar direção e validar reset de categoria
- Editar data para fora do período e confirmar desaparecimento
- Tab + Enter na linha abre drawer
- Cancelar não persiste alterações

## Rollout Plan

1. **Dev**: Mock local + drawer + integração em `/transacoes`
2. **Review**: Validar spec, ADR-002 e Styleguide
3. **Future**: Endpoint PATCH + optimistic update; considerar unificar drawers com `mode`

## Success Metrics

- Todos os critérios de aceite da spec atendidos
- Zero regressão em criação de transação, filtro por período e exportação PDF

## Changelog

### 2026-08-03

- Plano inicial criado a partir da spec e análise de `transacoes-view.tsx`, `nova-transacao-drawer.tsx` e `cartao-drawer.tsx`
