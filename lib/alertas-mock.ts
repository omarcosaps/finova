export type AlertaRegraId =
  | "limites-gasto"
  | "vencimento-faturas"
  | "transacoes-altas"

export type AlertaRegraLimitesGasto = {
  id: "limites-gasto"
  enabled: boolean
  percent: number
}

export type AlertaRegraVencimentoFaturas = {
  id: "vencimento-faturas"
  enabled: boolean
  days: number
}

export type AlertaRegraTransacoesAltas = {
  id: "transacoes-altas"
  enabled: boolean
  amountCents: number
}

export type ConfigurarAlertasFormValues = {
  "limites-gasto": AlertaRegraLimitesGasto
  "vencimento-faturas": AlertaRegraVencimentoFaturas
  "transacoes-altas": AlertaRegraTransacoesAltas
}

export type ConfigurarAlertasFieldErrors = Partial<
  Record<AlertaRegraId, string>
>

export type AlertaRegraMeta = {
  id: AlertaRegraId
  label: string
  description: string
}

export const ALERTA_REGRAS_META: readonly AlertaRegraMeta[] = [
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
]

const PERCENT_ERROR = "Informe um percentual entre 1 e 100."
const DAYS_ERROR = "Informe os dias de antecedência (1 a 30)."
const AMOUNT_ERROR = "Informe um valor maior que zero."

function isIntegerInRange(value: number, min: number, max: number): boolean {
  return Number.isInteger(value) && value >= min && value <= max
}

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

  if (values["limites-gasto"].enabled) {
    if (!isIntegerInRange(values["limites-gasto"].percent, 1, 100)) {
      errors["limites-gasto"] = PERCENT_ERROR
    }
  }

  if (values["vencimento-faturas"].enabled) {
    if (!isIntegerInRange(values["vencimento-faturas"].days, 1, 30)) {
      errors["vencimento-faturas"] = DAYS_ERROR
    }
  }

  if (values["transacoes-altas"].enabled) {
    if (!(values["transacoes-altas"].amountCents > 0)) {
      errors["transacoes-altas"] = AMOUNT_ERROR
    }
  }

  return errors
}

export function getAlertasEmptyTitle(options: {
  hasSaved: boolean
  rules: ConfigurarAlertasFormValues
}): string {
  if (!options.hasSaved) {
    return "Nenhum alerta"
  }

  const hasEnabled = Object.values(options.rules).some((rule) => rule.enabled)
  return hasEnabled ? "Nenhum alerta disparado" : "Nenhum alerta"
}
