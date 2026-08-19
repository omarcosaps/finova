# Implementation Plan: Input de valor — digitação LTR

**Spec**: [spec.md](spec.md)
**Status**: Complete
**Last Updated**: 2026-08-18

## Approach Summary

Trocar a máscara cent-based (shift left de centavos) por um **rascunho de texto pt-BR** enquanto o usuário digita. Cada tecla atualiza o draft; o draft é convertido para centavos e enviado via `onValueCentsChange`. A API dos drawers não muda.

O draft é necessário porque estados intermediários (`21,`) não cabem em `valueCents` sem perder a vírgula. Fora de foco, o campo volta a `formatCentsForInput`.

## Architecture

### Components

| Component | Purpose | New/Modified |
|-----------|---------|--------------|
| `lib/currency.ts` | Helpers LTR: draft, parse, format, paste | Modified |
| `CurrencyInput` | Estado `draft`, teclas, blur, `inputMode=decimal` | Modified |
| Drawers (4) | Continuam passando `valueCents` | Unchanged |

### Data Model

- Persistido: `valueCents: number` (inalterado).
- Local no input: `draft: string` (ex.: `"21,"`, `"1.234,5"`).
- `isFocused: boolean` para não sobrescrever o draft com o valor formatado em 2 casas.

### System Diagram

```
┌─────────┐     ┌──────────────────┐     ┌────────────┐
│ Tecla / │────▶│ apply/sanitize   │────▶│ draft      │
│ paste   │     │ (lib/currency.ts)│     │ (string)   │
└─────────┘     └──────────────────┘     └─────┬──────┘
                                               │ draftToCents
                                               ▼
                                         ┌────────────┐
                                         │ valueCents │
                                         │ (drawers)  │
                                         └────────────┘
```

## Implementation Phases

### Phase 1: Helpers em `lib/currency.ts`

**Goal**: Funções puras cobrindo FR-1 a FR-9.

- [x] `MAX_CENTS` exportado
- [x] `formatCurrencyDraft`
- [x] `draftToCents`
- [x] `applyCurrencyDraftKey`
- [x] `sanitizeCurrencyDraft` (paste / onChange)
- [x] Remover uso de `digitsToCents` como caminho de digitação

### Phase 2: `CurrencyInput`

**Goal**: Componente usa draft LTR; blur normaliza; `inputMode=decimal`.

- [x] Estado `draft` + sync quando não focado
- [x] Keydown: dígito, vírgula/ponto, backspace/delete
- [x] onChange: paste sanitizado
- [x] onBlur: 2 casas se cents > 0
- [x] Remover `setSelectionRange` forçado no fim

### Phase 3: QA manual nos drawers

**Goal**: Confirmar o mesmo comportamento nos 4 usos.

- [x] Nova transação, editar transação, alertas, limite do cartão

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Estado durante digitação | Draft string local | Permite `21,` sem perder o separador |
| Contrato com drawers | Continua `valueCents` | Sem regressão de formulário/validação |
| Ponto do teclado | Tratado como vírgula | Teclado físico US / `inputMode=decimal` |
| Overflow | Ignora a tecla | Não altera um valor já no limite |
| `digitsToCents` | Deixa de ser usado no input | Interpretava dígitos como centavos (RTL) |

## Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Mobile só dispara `onChange` | Médio | Médio | Sanitizar no `onChange` além do keydown |
| Milhar + backspace nativo (`1.234` → `1.23`) | Alto | Alto | Interceptar Backspace no draft lógico |
| Edição com valor pré-carregado | Médio | Baixo | Sync `draft` a partir de `valueCents` quando não focado |

## Testing Strategy

### Unit Tests

Projeto sem runner de testes. Validar helpers com script Node pontual (FR-1–FR-7, EC-1–EC-9).

### Manual Verification

- Digitação `2` → `21` → `21,50` em Nova transação
- `0,21` em Valor mínimo (alertas)
- Abrir Editar transação / cartão com valor existente
- Colar `21`

## Rollout Plan

1. Entrega única no frontend; todos os `CurrencyInput` herdam o comportamento.

## Success Metrics

- Usuário digita `21` e vê `21`, não `0,21`.
- Nenhum drawer precisa de adaptação de API.

## Changelog

### 2026-08-18

- Plano inicial criado a partir do spec aprovado (digitação natural com vírgula).
- Implementação concluída (helpers LTR + CurrencyInput + QA de contrato).
