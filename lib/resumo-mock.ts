/**
 * Facade de compatibilidade do dashboard Resumo.
 * Fonte de verdade: `features/dashboard/`.
 */
export {
  DASHBOARD_PERIOD_LABELS as RESUMO_PERIOD_LABELS,
  getDashboardPeriodData as getResumoPeriodData,
  formatKpiValue,
  formatTransactionAmount,
  calcNetProfitCents,
  calcPercentChange,
  buildKpis,
  buildBudgetLimits,
  buildAlerts,
  buildCashFlowSeries,
  DASHBOARD_MONTHS,
} from "@/features/dashboard"

export type {
  ChangeTone,
  DashboardPeriodLabel as ResumoPeriodLabel,
  DashboardPeriodViewModel as ResumoPeriodData,
  DashboardKpi as ResumoKpi,
  DashboardCashFlowMonth as CashFlowMonth,
  DashboardBudgetLimit as BudgetLimit,
  DashboardRecentTransaction as RecentTransaction,
  DashboardAlertVariant as ResumoAlertVariant,
  DashboardAlert as ResumoAlert,
} from "@/features/dashboard"
