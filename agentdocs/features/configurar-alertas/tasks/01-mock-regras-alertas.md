# Task: Lógica mock de regras de alerta

**Feature**: [../spec.md](../spec.md)
**Plan Phase**: [Phase 1](../plan.md#phase-1-lógica-mock-de-regras)
**Status**: DONE
**Priority**: P0 (Critical)

## Objective

Criar tipos e funções puras em `lib/alertas-mock.ts` para defaults, validação de limiares e o título do empty state, atendendo FR-3, FR-4 (parte validação), FR-5, FR-7, FR-10 e EC-1 a EC-5.

## Context

Ver [research-estado-atual.md](../notes/research-estado-atual.md). Não importar `configuracoes-mock.ts` — estado isolado. Espelhar só os IDs/labels dos três tipos financeiros.

## Scope

### In Scope

- Arquivo `lib/alertas-mock.ts`
- Tipos `AlertaRegraId`, `ConfigurarAlertasFormValues`, `ConfigurarAlertasFieldErrors`
- `ALERTA_REGRAS_META` (id, label, description) para a UI copiar copy consistente
- `getDefaultConfigurarAlertasFormValues()`
- `validateConfigurarAlertasForm(values)`
- `getAlertasEmptyTitle({ hasSaved, rules })`

### Out of Scope

- Componentes UI
- Persistência / React state
- Sync com Configurações
- Testes automatizados (opcional)

## Implementation Details

```typescript
export const ALERTA_REGRAS_META = [
  {
    id: "limites-gasto",
    label: "Limites de gasto",
    description: "Avisos quando o gasto se aproximar do limite.",
  },
  {
    id: "vencimento-faturas",
    label: "Vencimento de faturas",
    description: "Lembrete antes do vencimento das faturas.",
  },
  {
    id: "transacoes-altas",
    label: "Transações altas",
    description: "Notificação imediata para valores elevados.",
  },
] as const

export function getDefaultConfigurarAlertasFormValues(): ConfigurarAlertasFormValues {
  return {
    "limites-gasto": { id: "limites-gasto", enabled: true, percent: 80 },
    "vencimento-faturas": { id: "vencimento-faturas", enabled: true, days: 3 },
    "transacoes-altas": {
      id: "transacoes-altas",
      enabled: true,
      amountCents: 100_000,
    },
  }
}

export function validateConfigurarAlertasForm(
  values: ConfigurarAlertasFormValues
): ConfigurarAlertasFieldErrors {
  const errors: ConfigurarAlertasFieldErrors = {}
  // Só validar se enabled
  // percent: inteiro 1–100 → "Informe um percentual entre 1 e 100."
  // days: inteiro 1–30 → "Informe os dias de antecedência (1 a 30)."
  // amountCents: > 0 → "Informe um valor maior que zero."
  return errors
}

export function getAlertasEmptyTitle(options: {
  hasSaved: boolean
  rules: ConfigurarAlertasFormValues
}): string {
  if (!options.hasSaved) return "Nenhum alerta"
  const hasEnabled = Object.values(options.rules).some((rule) => rule.enabled)
  return hasEnabled ? "Nenhum alerta disparado" : "Nenhum alerta"
}
```

### Key Considerations

- Validar **apenas** regras `enabled` (EC-5).
- Todas desabilitadas → `{}` (save ok, EC-4).
- Percent e days MUST ser inteiros (rejeitar 80.5).
- Não formatar moeda aqui; `amountCents` permanece número.
- Copy de `transacoes-altas` no meta: “Transações altas” (o limiar é o campo, não o label fixo “acima de R$ 1.000”).

## Acceptance Criteria

- [x] Defaults batem com FR-5
- [x] `validateConfigurarAlertasForm` cobre EC-1, EC-2, EC-3
- [x] Regra desabilitada com limiar inválido não gera erro (EC-5)
- [x] Todas off → sem erros (EC-4)
- [x] `getAlertasEmptyTitle` cobre nunca salvou / salvou com ligadas / salvou todas off (FR-10)

## Files to Modify

| File | Changes |
|------|---------|
| `lib/alertas-mock.ts` | Novo arquivo — tipos, defaults, validação, título |

## Dependencies

### Blocked By

- Nenhuma

### Blocks

- [02-configurar-alertas-drawer.md](02-configurar-alertas-drawer.md)

## Testing

- [x] Opcional: unit tests dos três helpers
- [x] Manual: chamar as funções no REPL/teste isolado se o drawer ainda não existir

## Notes

- Convenção ADR-004: um mock por domínio em `lib/`.
- Mensagens de erro MUST ser exatamente as da spec (EC-1 a EC-3).
