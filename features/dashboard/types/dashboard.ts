export type ChangeTone = "success" | "destructive"

export type TransactionDirection = "in" | "out"

export type BudgetProgressVariant = "accent" | "warning" | "destructive"

export type DashboardAlertVariant = "destructive" | "warning" | "info"

export const DASHBOARD_PERIOD_LABELS = [
  "Este Mês",
  "Mês passado",
  "Últimos 3 meses",
] as const

export type DashboardPeriodLabel = (typeof DASHBOARD_PERIOD_LABELS)[number]

/** Snapshot mensal canônico — única fonte de verdade do dashboard. */
export type DashboardMonthSnapshot = {
  /** YYYY-MM */
  id: string
  monthLabel: string
  year: number
  saldoCents: number
  receitasCents: number
  despesasCents: number
  budgetLimits: DashboardBudgetSeed[]
  transactions: DashboardTransactionSeed[]
  /** Alertas informativos (não derivados de limites). */
  infoAlerts: DashboardInfoAlertSeed[]
}

export type DashboardBudgetSeed = {
  id: string
  label: string
  spentCents: number
  limitCents: number
  /** Sobrescreve a variante derivada do % (ex.: Marketing em 80% como warning). */
  variant?: BudgetProgressVariant
}

export type DashboardTransactionSeed = {
  id: string
  description: string
  /** ISO 8601 local */
  occurredAt: string
  amountCents: number
  direction: TransactionDirection
}

export type DashboardInfoAlertSeed = {
  id: string
  title: string
  /** ISO 8601 local */
  occurredAt: string
}

/** View-model consumido pela tela Resumo. */
export type DashboardPeriodViewModel = {
  period: DashboardPeriodLabel
  kpis: DashboardKpi[]
  cashFlow: DashboardCashFlowPoint[]
  cashFlowDescription: string
  changeComparisonLabel: string
  budgetLimits: DashboardBudgetLimit[]
  recentTransactions: DashboardRecentTransaction[]
  alerts: DashboardAlert[]
}

export type DashboardKpi = {
  id: string
  label: string
  valueCents: number
  changeLabel: string
  changeTone: ChangeTone
}

/** Ponto do gráfico de fluxo — label depende da granularidade (semana ou mês). */
export type DashboardCashFlowPoint = {
  label: string
  /** Centavos — mesma unidade dos KPIs. */
  receitas: number
  /** Centavos — mesma unidade dos KPIs. */
  despesas: number
  highlighted?: boolean
}

/** @deprecated Use `DashboardCashFlowPoint`. */
export type DashboardCashFlowMonth = DashboardCashFlowPoint

export type DashboardBudgetLimit = {
  id: string
  label: string
  spentLabel: string
  limitLabel: string
  value: number
  variant: BudgetProgressVariant
}

export type DashboardRecentTransaction = {
  id: string
  description: string
  timeLabel: string
  amountCents: number
  direction: TransactionDirection
}

export type DashboardAlert = {
  id: string
  title: string
  timeLabel: string
  variant: DashboardAlertVariant
}
