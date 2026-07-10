import type {
  DashboardMonthSnapshot,
  DashboardPeriodLabel,
  DashboardPeriodViewModel,
} from "@/features/dashboard/types/dashboard"
import {
  aggregateBudgetLimits,
  buildAlerts,
  buildBudgetLimits,
  buildCashFlowSeries,
  buildKpis,
  buildRecentTransactions,
  cashFlowDescriptionFor,
  changeComparisonLabelFor,
  mergeInfoAlerts,
  mergeTransactions,
  sumSnapshots,
} from "@/features/dashboard/utils/dashboard-calculations"

/**
 * Série mensal canônica (única fonte de verdade).
 * Âncora do produto mock: fevereiro/2026 (“Este Mês”).
 *
 * Fev: receitas 28.350 / despesas 14.850 / lucro 13.500 / saldo 42.500
 * Jan: anteriores implícitos de Fev (+4,2% / −2,1%)
 * Dez: anteriores implícitos de Jan (+3,5% / +1,5%)
 */
export const DASHBOARD_MONTHS: DashboardMonthSnapshot[] = [
  {
    id: "2025-10",
    monthLabel: "Out",
    year: 2025,
    saldoCents: 3_100_000,
    receitasCents: 4_252_500,
    despesasCents: 2_227_500,
    budgetLimits: [
      { id: "estoque", label: "Estoque", spentCents: 680_000, limitCents: 900_000 },
      { id: "marketing", label: "Marketing", spentCents: 210_000, limitCents: 300_000 },
      { id: "operacional", label: "Operacional", spentCents: 400_000, limitCents: 500_000 },
    ],
    transactions: [],
    infoAlerts: [],
  },
  {
    id: "2025-11",
    monthLabel: "Nov",
    year: 2025,
    saldoCents: 3_250_000,
    receitasCents: 3_240_000,
    despesasCents: 1_701_000,
    budgetLimits: [
      { id: "estoque", label: "Estoque", spentCents: 650_000, limitCents: 900_000 },
      { id: "marketing", label: "Marketing", spentCents: 200_000, limitCents: 300_000 },
      { id: "operacional", label: "Operacional", spentCents: 390_000, limitCents: 500_000 },
    ],
    transactions: [],
    infoAlerts: [],
  },
  {
    id: "2025-12",
    monthLabel: "Dez",
    year: 2025,
    saldoCents: 3_434_344,
    receitasCents: 2_628_501,
    despesasCents: 1_494_438,
    budgetLimits: [
      { id: "estoque", label: "Estoque", spentCents: 810_000, limitCents: 900_000 },
      { id: "marketing", label: "Marketing", spentCents: 240_000, limitCents: 300_000 },
      { id: "operacional", label: "Operacional", spentCents: 480_000, limitCents: 500_000 },
    ],
    transactions: [
      {
        id: "tx-dez-1",
        description: "Fechamento de vendas — Dez",
        occurredAt: "2025-12-28T16:00:00",
        amountCents: 510_000,
        direction: "in",
      },
    ],
    infoAlerts: [
      {
        id: "info-dez-1",
        title: "Meta anual de receita atingida",
        occurredAt: "2025-12-20T10:00:00",
      },
    ],
  },
  {
    id: "2026-01",
    monthLabel: "Jan",
    year: 2026,
    saldoCents: 3_777_778,
    receitasCents: 2_720_729,
    despesasCents: 1_516_855,
    budgetLimits: [
      { id: "estoque", label: "Estoque", spentCents: 630_000, limitCents: 900_000 },
      { id: "marketing", label: "Marketing", spentCents: 210_000, limitCents: 300_000 },
      {
        id: "operacional",
        label: "Operacional",
        spentCents: 400_000,
        limitCents: 500_000,
        variant: "warning",
      },
    ],
    transactions: [
      {
        id: "tx-jan-1",
        description: "Venda Loja Online — Pix",
        occurredAt: "2026-01-28T11:20:00",
        amountCents: 342_000,
        direction: "in",
      },
      {
        id: "tx-jan-2",
        description: "Fornecedor Beta",
        occurredAt: "2026-01-27T15:40:00",
        amountCents: 380_000,
        direction: "out",
      },
      {
        id: "tx-jan-3",
        description: "Assinatura SaaS",
        occurredAt: "2026-01-26T09:00:00",
        amountCents: 98_000,
        direction: "out",
      },
    ],
    infoAlerts: [
      {
        id: "info-jan-1",
        title: "Receita acima da meta semanal",
        occurredAt: "2026-01-25T12:00:00",
      },
      {
        id: "info-jan-2",
        title: "Fatura gerada: Cartão Black",
        occurredAt: "2026-01-22T09:00:00",
      },
    ],
  },
  {
    id: "2026-02",
    monthLabel: "Fev",
    year: 2026,
    saldoCents: 4_250_000,
    receitasCents: 2_835_000,
    despesasCents: 1_485_000,
    budgetLimits: [
      { id: "estoque", label: "Estoque", spentCents: 720_000, limitCents: 900_000 },
      {
        id: "marketing",
        label: "Marketing",
        spentCents: 240_000,
        limitCents: 300_000,
        variant: "warning",
      },
      { id: "operacional", label: "Operacional", spentCents: 480_000, limitCents: 500_000 },
    ],
    transactions: [
      {
        id: "tx-fev-1",
        description: "Fornecedor Alpha",
        occurredAt: "2026-02-12T14:30:00",
        amountCents: 420_000,
        direction: "out",
      },
      {
        id: "tx-fev-2",
        description: "Venda PDV — Cartão",
        occurredAt: "2026-02-12T09:15:00",
        amountCents: 185_000,
        direction: "in",
      },
      {
        id: "tx-fev-3",
        description: "Agência Marketing",
        occurredAt: "2026-02-11T16:45:00",
        amountCents: 120_000,
        direction: "out",
      },
    ],
    infoAlerts: [
      {
        id: "info-fev-1",
        title: "Fatura paga: Cartão Black",
        occurredAt: "2026-02-12T09:30:00",
      },
    ],
  },
  {
    id: "2026-03",
    monthLabel: "Mar",
    year: 2026,
    saldoCents: 4_250_000,
    receitasCents: 1_944_000,
    despesasCents: 1_012_500,
    budgetLimits: [
      { id: "estoque", label: "Estoque", spentCents: 500_000, limitCents: 900_000 },
      { id: "marketing", label: "Marketing", spentCents: 150_000, limitCents: 300_000 },
      { id: "operacional", label: "Operacional", spentCents: 300_000, limitCents: 500_000 },
    ],
    transactions: [],
    infoAlerts: [],
  },
  {
    id: "2026-04",
    monthLabel: "Abr",
    year: 2026,
    saldoCents: 4_250_000,
    receitasCents: 3_564_000,
    despesasCents: 1_863_000,
    budgetLimits: [
      { id: "estoque", label: "Estoque", spentCents: 720_000, limitCents: 900_000 },
      { id: "marketing", label: "Marketing", spentCents: 240_000, limitCents: 300_000 },
      { id: "operacional", label: "Operacional", spentCents: 400_000, limitCents: 500_000 },
    ],
    transactions: [],
    infoAlerts: [],
  },
  {
    id: "2026-05",
    monthLabel: "Mai",
    year: 2026,
    saldoCents: 4_250_000,
    receitasCents: 2_511_000,
    despesasCents: 1_296_000,
    budgetLimits: [
      { id: "estoque", label: "Estoque", spentCents: 600_000, limitCents: 900_000 },
      { id: "marketing", label: "Marketing", spentCents: 180_000, limitCents: 300_000 },
      { id: "operacional", label: "Operacional", spentCents: 350_000, limitCents: 500_000 },
    ],
    transactions: [],
    infoAlerts: [],
  },
  {
    id: "2026-06",
    monthLabel: "Jun",
    year: 2026,
    saldoCents: 4_250_000,
    receitasCents: 3_321_000,
    despesasCents: 1_741_500,
    budgetLimits: [
      { id: "estoque", label: "Estoque", spentCents: 700_000, limitCents: 900_000 },
      { id: "marketing", label: "Marketing", spentCents: 220_000, limitCents: 300_000 },
      { id: "operacional", label: "Operacional", spentCents: 420_000, limitCents: 500_000 },
    ],
    transactions: [],
    infoAlerts: [],
  },
  {
    id: "2026-07",
    monthLabel: "Jul",
    year: 2026,
    saldoCents: 4_250_000,
    receitasCents: 2_106_000,
    despesasCents: 1_093_500,
    budgetLimits: [
      { id: "estoque", label: "Estoque", spentCents: 550_000, limitCents: 900_000 },
      { id: "marketing", label: "Marketing", spentCents: 160_000, limitCents: 300_000 },
      { id: "operacional", label: "Operacional", spentCents: 320_000, limitCents: 500_000 },
    ],
    transactions: [],
    infoAlerts: [],
  },
  {
    id: "2026-08",
    monthLabel: "Ago",
    year: 2026,
    saldoCents: 4_250_000,
    receitasCents: 3_847_500,
    despesasCents: 2_025_000,
    budgetLimits: [
      { id: "estoque", label: "Estoque", spentCents: 750_000, limitCents: 900_000 },
      { id: "marketing", label: "Marketing", spentCents: 250_000, limitCents: 300_000 },
      { id: "operacional", label: "Operacional", spentCents: 450_000, limitCents: 500_000 },
    ],
    transactions: [],
    infoAlerts: [],
  },
  {
    id: "2026-09",
    monthLabel: "Set",
    year: 2026,
    saldoCents: 4_250_000,
    receitasCents: 2_916_000,
    despesasCents: 1_539_000,
    budgetLimits: [
      { id: "estoque", label: "Estoque", spentCents: 680_000, limitCents: 900_000 },
      { id: "marketing", label: "Marketing", spentCents: 200_000, limitCents: 300_000 },
      { id: "operacional", label: "Operacional", spentCents: 400_000, limitCents: 500_000 },
    ],
    transactions: [],
    infoAlerts: [],
  },
]

const CURRENT_MONTH_ID = "2026-02"
const ANCHOR_DATE_ISO = "2026-02-12T14:30:00"

const CHART_MONTH_ORDER = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
] as const

function requireMonth(id: string): DashboardMonthSnapshot {
  const month = DASHBOARD_MONTHS.find((item) => item.id === id)
  if (!month) {
    throw new Error(`Dashboard month not found: ${id}`)
  }
  return month
}

function previousMonth(id: string): DashboardMonthSnapshot {
  const index = DASHBOARD_MONTHS.findIndex((item) => item.id === id)
  if (index <= 0) {
    throw new Error(`Dashboard previous month unavailable for: ${id}`)
  }
  return DASHBOARD_MONTHS[index - 1]!
}

/**
 * Eixo Jan–Dez para o gráfico.
 * Out–Dez usam os snapshots de 2025 (histórico/projeção no mesmo eixo anual da demo).
 */
function buildYearCashFlowMonths(): DashboardMonthSnapshot[] {
  const byLabel: Record<(typeof CHART_MONTH_ORDER)[number], DashboardMonthSnapshot> = {
    Out: requireMonth("2025-10"),
    Nov: requireMonth("2025-11"),
    Dez: requireMonth("2025-12"),
    Jan: requireMonth("2026-01"),
    Fev: requireMonth("2026-02"),
    Mar: requireMonth("2026-03"),
    Abr: requireMonth("2026-04"),
    Mai: requireMonth("2026-05"),
    Jun: requireMonth("2026-06"),
    Jul: requireMonth("2026-07"),
    Ago: requireMonth("2026-08"),
    Set: requireMonth("2026-09"),
  }

  return CHART_MONTH_ORDER.map((label) => ({
    ...byLabel[label],
    monthLabel: label,
  }))
}

function buildMonthPeriodView(
  monthId: string,
  period: DashboardPeriodLabel
): DashboardPeriodViewModel {
  const current = requireMonth(monthId)
  const previous = previousMonth(monthId)
  const budgetLimits = buildBudgetLimits(current.budgetLimits)
  const useRelative = period === "Este Mês"
  const alertAnchor = useRelative
    ? ANCHOR_DATE_ISO
    : `${monthId}-28T12:00:00`

  return {
    period,
    kpis: buildKpis({ current, previous }),
    cashFlow: buildCashFlowSeries(buildYearCashFlowMonths(), [monthId]),
    cashFlowDescription: cashFlowDescriptionFor(period, 2026),
    changeComparisonLabel: changeComparisonLabelFor(period),
    budgetLimits,
    recentTransactions: buildRecentTransactions(current.transactions, {
      relativeToAnchor: useRelative,
      anchorDateIso: ANCHOR_DATE_ISO,
      limit: 3,
    }),
    alerts: buildAlerts({
      budgetLimits,
      infoAlerts: current.infoAlerts,
      anchorDateIso: alertAnchor,
      useRelativeTimes: useRelative,
    }),
  }
}

function buildQuarterPeriodView(): DashboardPeriodViewModel {
  const quarter = [
    requireMonth("2025-12"),
    requireMonth("2026-01"),
    requireMonth("2026-02"),
  ]
  const currentTotals = sumSnapshots(quarter)
  const previousTotals = {
    saldoCents: requireMonth("2025-12").saldoCents,
    receitasCents: Math.round(currentTotals.receitasCents / 1.058),
    despesasCents: Math.round(currentTotals.despesasCents / 0.988),
  }

  const budgetLimits = buildBudgetLimits(aggregateBudgetLimits(quarter))
  const transactions = mergeTransactions(quarter)
  const infoAlerts = mergeInfoAlerts(quarter)

  return {
    period: "Últimos 3 meses",
    kpis: buildKpis({ current: currentTotals, previous: previousTotals }),
    cashFlow: buildCashFlowSeries(buildYearCashFlowMonths(), [
      "2025-12",
      "2026-01",
      "2026-02",
    ]),
    cashFlowDescription: cashFlowDescriptionFor("Últimos 3 meses", 2026),
    changeComparisonLabel: changeComparisonLabelFor("Últimos 3 meses"),
    budgetLimits,
    recentTransactions: buildRecentTransactions(transactions, {
      relativeToAnchor: false,
      anchorDateIso: ANCHOR_DATE_ISO,
      limit: 3,
    }),
    alerts: buildAlerts({
      budgetLimits,
      infoAlerts: [
        {
          id: "info-q-lucro",
          title: "Lucro trimestral acima da meta",
          occurredAt: "2026-02-01T10:00:00",
        },
        ...infoAlerts,
      ],
      anchorDateIso: ANCHOR_DATE_ISO,
      useRelativeTimes: false,
    }),
  }
}

export function getDashboardPeriodData(
  period: DashboardPeriodLabel
): DashboardPeriodViewModel {
  switch (period) {
    case "Este Mês":
      return buildMonthPeriodView(CURRENT_MONTH_ID, period)
    case "Mês passado":
      return buildMonthPeriodView("2026-01", period)
    case "Últimos 3 meses":
      return buildQuarterPeriodView()
    default: {
      const _exhaustive: never = period
      return _exhaustive
    }
  }
}

export { CURRENT_MONTH_ID, ANCHOR_DATE_ISO }
