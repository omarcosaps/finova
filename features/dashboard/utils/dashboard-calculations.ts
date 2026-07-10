import { formatBRL } from "@/lib/currency"

import type {
  BudgetProgressVariant,
  ChangeTone,
  DashboardAlert,
  DashboardAlertVariant,
  DashboardBudgetLimit,
  DashboardBudgetSeed,
  DashboardCashFlowMonth,
  DashboardInfoAlertSeed,
  DashboardKpi,
  DashboardMonthSnapshot,
  DashboardPeriodLabel,
  DashboardPeriodViewModel,
  DashboardRecentTransaction,
  DashboardTransactionSeed,
  TransactionDirection,
} from "@/features/dashboard/types/dashboard"

const CASH_FLOW_UNIT_CENTS = 40_500

/** Lucro líquido = receitas − despesas. */
export function calcNetProfitCents(receitasCents: number, despesasCents: number) {
  return receitasCents - despesasCents
}

/** Variação percentual entre período atual e anterior. */
export function calcPercentChange(current: number, previous: number): number {
  if (previous === 0) return current === 0 ? 0 : 100
  return ((current - previous) / previous) * 100
}

export function formatPercentChangeLabel(percent: number): string {
  const rounded = Math.round(percent * 10) / 10
  const sign = rounded > 0 ? "+" : ""
  return `${sign}${rounded.toFixed(1)}%`
}

/**
 * Tom da variação:
 * - receitas/lucro/saldo: alta = success, queda = destructive
 * - despesas: queda = success, alta = destructive
 */
export function changeToneForMetric(
  metric: "saldo" | "receitas" | "despesas" | "lucro",
  percentChange: number
): ChangeTone {
  if (metric === "despesas") {
    return percentChange <= 0 ? "success" : "destructive"
  }
  return percentChange >= 0 ? "success" : "destructive"
}

export function calcBudgetUsagePercent(spentCents: number, limitCents: number) {
  if (limitCents <= 0) return 0
  return Math.round((spentCents / limitCents) * 100)
}

export function budgetVariantFromUsage(usagePercent: number): BudgetProgressVariant {
  if (usagePercent >= 90) return "destructive"
  // > 80 evita marcar exatamente 80% como warning (Estoque 80% permanece accent).
  if (usagePercent > 80) return "warning"
  return "accent"
}

export function formatCompactThousands(cents: number): string {
  const reais = cents / 100
  const thousands = reais / 1000
  const formatted = Number.isInteger(thousands)
    ? String(thousands)
    : thousands.toFixed(1)
  return `${formatted}k`
}

export function formatBudgetSpentLabel(cents: number): string {
  return `R$ ${formatCompactThousands(cents)}`
}

export function formatBudgetLimitLabel(cents: number): string {
  return formatCompactThousands(cents)
}

export function centsToCashFlowUnits(cents: number): number {
  return Math.round(cents / CASH_FLOW_UNIT_CENTS)
}

export function buildBudgetLimits(
  seeds: readonly DashboardBudgetSeed[]
): DashboardBudgetLimit[] {
  return seeds.map((seed) => {
    const value = calcBudgetUsagePercent(seed.spentCents, seed.limitCents)
    return {
      id: seed.id,
      label: seed.label,
      spentLabel: formatBudgetSpentLabel(seed.spentCents),
      limitLabel: formatBudgetLimitLabel(seed.limitCents),
      value,
      variant: seed.variant ?? budgetVariantFromUsage(value),
    }
  })
}

function parseLocalDate(iso: string): Date {
  // Interpreta "YYYY-MM-DDTHH:mm:ss" como horário local (evita drift de UTC).
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(iso)
  if (!match) return new Date(iso)
  const [, y, m, d, hh, mm, ss] = match
  return new Date(
    Number(y),
    Number(m) - 1,
    Number(d),
    Number(hh),
    Number(mm),
    Number(ss ?? "0")
  )
}

function localDayKey(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function formatClock(date: Date): string {
  const hh = String(date.getHours()).padStart(2, "0")
  const mm = String(date.getMinutes()).padStart(2, "0")
  return `${hh}:${mm}`
}

const MONTH_SHORT_PT = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
] as const

/** Labels relativos quando o mês âncora é o “atual” do mock (Este Mês). */
export function formatRelativeTransactionTime(
  occurredAt: string,
  anchorDateIso: string
): string {
  const occurred = parseLocalDate(occurredAt)
  const anchor = parseLocalDate(anchorDateIso)
  const occurredDay = localDayKey(occurred)
  const anchorDay = localDayKey(anchor)

  const yesterday = new Date(anchor)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayDay = localDayKey(yesterday)

  const clock = formatClock(occurred)

  if (occurredDay === anchorDay) return `Hoje, ${clock}`
  if (occurredDay === yesterdayDay) return `Ontem, ${clock}`

  return formatAbsoluteShortTime(occurredAt)
}

export function formatAbsoluteShortTime(occurredAt: string): string {
  const date = parseLocalDate(occurredAt)
  const day = date.getDate()
  const month = MONTH_SHORT_PT[date.getMonth()]
  return `${day} ${month}, ${formatClock(date)}`
}

export function formatRelativeAlertTime(
  occurredAt: string,
  anchorDateIso: string
): string {
  const occurred = parseLocalDate(occurredAt)
  const anchor = parseLocalDate(anchorDateIso)
  const diffMs = anchor.getTime() - occurred.getTime()
  const hours = Math.round(diffMs / (1000 * 60 * 60))

  if (hours >= 1 && hours < 48) {
    return `Há ${hours} hora${hours === 1 ? "" : "s"}`
  }

  return formatAbsoluteShortTime(occurredAt).split(",")[0] ?? formatAbsoluteShortTime(occurredAt)
}

export function buildRecentTransactions(
  transactions: readonly DashboardTransactionSeed[],
  options: { relativeToAnchor: boolean; anchorDateIso: string; limit?: number }
): DashboardRecentTransaction[] {
  const limit = options.limit ?? 3
  const sorted = [...transactions].sort(
    (a, b) => parseLocalDate(b.occurredAt).getTime() - parseLocalDate(a.occurredAt).getTime()
  )

  return sorted.slice(0, limit).map((tx) => ({
    id: tx.id,
    description: tx.description,
    amountCents: tx.amountCents,
    direction: tx.direction,
    timeLabel: options.relativeToAnchor
      ? formatRelativeTransactionTime(tx.occurredAt, options.anchorDateIso)
      : formatAbsoluteShortTime(tx.occurredAt),
  }))
}

function alertFromBudget(limit: DashboardBudgetLimit): DashboardAlert | null {
  if (limit.value >= 100) {
    return {
      id: `budget-${limit.id}-exceeded`,
      title: `Limite excedido: ${limit.label}`,
      timeLabel: "",
      variant: "destructive",
    }
  }
  if (limit.value >= 90 || limit.variant === "destructive") {
    return {
      id: `budget-${limit.id}-critical`,
      title: `${limit.label} próximo do limite (${limit.value}%)`,
      timeLabel: "",
      variant: "warning",
    }
  }
  if (limit.variant === "warning") {
    return {
      id: `budget-${limit.id}-warning`,
      title: `${limit.label} chegando ao limite`,
      timeLabel: "",
      variant: "warning",
    }
  }
  return null
}

export function buildAlerts(options: {
  budgetLimits: readonly DashboardBudgetLimit[]
  infoAlerts: readonly DashboardInfoAlertSeed[]
  anchorDateIso: string
  useRelativeTimes: boolean
}): DashboardAlert[] {
  const fromBudgets = options.budgetLimits
    .map((limit) => ({ limit, alert: alertFromBudget(limit) }))
    .filter(
      (item): item is { limit: DashboardBudgetLimit; alert: DashboardAlert } =>
        item.alert !== null
    )
    .sort((a, b) => b.limit.value - a.limit.value)
    .map(({ alert }) => {
      const occurredAt = shiftHours(
        options.anchorDateIso,
        fromBudgetsIndexHours(alert.id)
      )
      return {
        ...alert,
        timeLabel: options.useRelativeTimes
          ? formatRelativeAlertTime(occurredAt, options.anchorDateIso)
          : (formatAbsoluteShortTime(occurredAt).split(",")[0] ??
            formatAbsoluteShortTime(occurredAt)),
      }
    })

  const fromInfo = options.infoAlerts.map((info) => ({
    id: info.id,
    title: info.title,
    timeLabel: options.useRelativeTimes
      ? formatRelativeAlertTime(info.occurredAt, options.anchorDateIso)
      : (formatAbsoluteShortTime(info.occurredAt).split(",")[0] ??
        formatAbsoluteShortTime(info.occurredAt)),
    variant: "info" as DashboardAlertVariant,
  }))

  const severity: Record<DashboardAlertVariant, number> = {
    destructive: 0,
    warning: 1,
    info: 2,
  }

  return [...fromBudgets, ...fromInfo]
    .sort((a, b) => severity[a.variant] - severity[b.variant])
    .slice(0, 3)
}

function fromBudgetsIndexHours(alertId: string): number {
  // Ordem visual da demo: Operacional (crítico) → Marketing → demais
  if (alertId.includes("operacional")) return 2
  if (alertId.includes("marketing")) return 4
  if (alertId.includes("estoque")) return 6
  return 3
}

function shiftHours(iso: string, hoursBack: number): string {
  const date = parseLocalDate(iso)
  date.setHours(date.getHours() - hoursBack)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`
}

export function buildKpis(options: {
  current: Pick<
    DashboardMonthSnapshot,
    "saldoCents" | "receitasCents" | "despesasCents"
  >
  previous: Pick<
    DashboardMonthSnapshot,
    "saldoCents" | "receitasCents" | "despesasCents"
  >
}): DashboardKpi[] {
  const currentLucro = calcNetProfitCents(
    options.current.receitasCents,
    options.current.despesasCents
  )
  const previousLucro = calcNetProfitCents(
    options.previous.receitasCents,
    options.previous.despesasCents
  )

  const metrics = [
    {
      id: "saldo" as const,
      label: "Saldo Atual",
      valueCents: options.current.saldoCents,
      previousCents: options.previous.saldoCents,
    },
    {
      id: "receitas" as const,
      label: "Receitas",
      valueCents: options.current.receitasCents,
      previousCents: options.previous.receitasCents,
    },
    {
      id: "despesas" as const,
      label: "Despesas",
      valueCents: options.current.despesasCents,
      previousCents: options.previous.despesasCents,
    },
    {
      id: "lucro" as const,
      label: "Lucro Líquido",
      valueCents: currentLucro,
      previousCents: previousLucro,
    },
  ]

  return metrics.map((metric) => {
    const percent = calcPercentChange(metric.valueCents, metric.previousCents)
    return {
      id: metric.id,
      label: metric.label,
      valueCents: metric.valueCents,
      changeLabel: formatPercentChangeLabel(percent),
      changeTone: changeToneForMetric(metric.id, percent),
    }
  })
}

export function buildCashFlowSeries(
  months: readonly DashboardMonthSnapshot[],
  highlightedIds: readonly string[]
): DashboardCashFlowMonth[] {
  const highlight = new Set(highlightedIds)
  return months.map((month) => ({
    month: month.monthLabel,
    receitas: centsToCashFlowUnits(month.receitasCents),
    despesas: centsToCashFlowUnits(month.despesasCents),
    highlighted: highlight.has(month.id),
  }))
}

export function sumSnapshots(
  months: readonly DashboardMonthSnapshot[]
): Pick<DashboardMonthSnapshot, "saldoCents" | "receitasCents" | "despesasCents"> {
  return {
    saldoCents: months[months.length - 1]?.saldoCents ?? 0,
    receitasCents: months.reduce((acc, m) => acc + m.receitasCents, 0),
    despesasCents: months.reduce((acc, m) => acc + m.despesasCents, 0),
  }
}

export function aggregateBudgetLimits(
  months: readonly DashboardMonthSnapshot[]
): DashboardBudgetSeed[] {
  const byId = new Map<string, DashboardBudgetSeed>()

  for (const month of months) {
    for (const budget of month.budgetLimits) {
      const existing = byId.get(budget.id)
      if (!existing) {
        byId.set(budget.id, { ...budget })
        continue
      }
      byId.set(budget.id, {
        id: existing.id,
        label: existing.label,
        spentCents: existing.spentCents + budget.spentCents,
        limitCents: existing.limitCents + budget.limitCents,
        // Agregados usam só o % derivado (sem override mensal).
      })
    }
  }

  return [...byId.values()]
}

export function mergeTransactions(
  months: readonly DashboardMonthSnapshot[]
): DashboardTransactionSeed[] {
  return months.flatMap((month) => month.transactions)
}

export function mergeInfoAlerts(
  months: readonly DashboardMonthSnapshot[]
): DashboardInfoAlertSeed[] {
  return months.flatMap((month) => month.infoAlerts)
}

export function formatKpiValue(cents: number) {
  return formatBRL(cents)
}

export function formatTransactionAmount(
  cents: number,
  direction: TransactionDirection
) {
  const prefix = direction === "in" ? "+ " : "- "
  return `${prefix}${formatBRL(cents)}`
}

export function changeComparisonLabelFor(
  period: DashboardPeriodLabel
): string {
  if (period === "Últimos 3 meses") {
    return "em relação ao trimestre anterior"
  }
  return "em relação ao mês anterior"
}

export function cashFlowDescriptionFor(
  period: DashboardPeriodLabel,
  year: number
): string {
  if (period === "Últimos 3 meses") {
    return `Últimos 3 meses — ${year}`
  }
  return `Receitas x Despesas — ${year}`
}

export type { DashboardPeriodViewModel }
