import { formatBRL } from "@/lib/transacoes-mock"

export type ChangeTone = "success" | "destructive"

export type ResumoKpi = {
  id: string
  label: string
  valueCents: number
  changeLabel: string
  changeTone: ChangeTone
}

export type CashFlowMonth = {
  month: string
  receitas: number
  despesas: number
  highlighted?: boolean
}

export type BudgetLimit = {
  id: string
  label: string
  spentLabel: string
  limitLabel: string
  value: number
  variant: "accent" | "warning" | "destructive"
}

export type RecentTransaction = {
  id: string
  description: string
  timeLabel: string
  amountCents: number
  direction: "in" | "out"
}

export type ResumoAlertVariant = "destructive" | "warning" | "info"

export type ResumoAlert = {
  id: string
  title: string
  timeLabel: string
  variant: ResumoAlertVariant
}

export const RESUMO_KPIS: ResumoKpi[] = [
  {
    id: "saldo",
    label: "Saldo Atual",
    valueCents: 4_250_000,
    changeLabel: "+12.5%",
    changeTone: "success",
  },
  {
    id: "receitas",
    label: "Receitas",
    valueCents: 2_835_000,
    changeLabel: "+4.2%",
    changeTone: "success",
  },
  {
    id: "despesas",
    label: "Despesas",
    valueCents: 1_485_000,
    changeLabel: "-2.1%",
    changeTone: "destructive",
  },
  {
    id: "lucro",
    label: "Lucro Líquido",
    valueCents: 1_350_000,
    changeLabel: "+8.4%",
    changeTone: "success",
  },
]

export const CASH_FLOW_DATA: CashFlowMonth[] = [
  { month: "Jan", receitas: 40, despesas: 24 },
  { month: "Fev", receitas: 70, despesas: 42, highlighted: true },
  { month: "Mar", receitas: 45, despesas: 27 },
  { month: "Abr", receitas: 90, despesas: 54 },
  { month: "Mai", receitas: 65, despesas: 39 },
  { month: "Jun", receitas: 85, despesas: 51 },
  { month: "Jul", receitas: 50, despesas: 30 },
  { month: "Ago", receitas: 100, despesas: 60 },
  { month: "Set", receitas: 75, despesas: 45 },
  { month: "Out", receitas: 110, despesas: 66 },
  { month: "Nov", receitas: 85, despesas: 51 },
  { month: "Dez", receitas: 120, despesas: 72 },
]

export const BUDGET_LIMITS: BudgetLimit[] = [
  {
    id: "estoque",
    label: "Estoque",
    spentLabel: "R$ 8k",
    limitLabel: "10k",
    value: 80,
    variant: "accent",
  },
  {
    id: "marketing",
    label: "Marketing",
    spentLabel: "R$ 2.4k",
    limitLabel: "3k",
    value: 80,
    variant: "warning",
  },
  {
    id: "operacional",
    label: "Operacional",
    spentLabel: "R$ 4.8k",
    limitLabel: "5k",
    value: 96,
    variant: "destructive",
  },
]

export const RECENT_TRANSACTIONS: RecentTransaction[] = [
  {
    id: "rt-1",
    description: "Venda PDV — Cartão",
    timeLabel: "Hoje, 14:30",
    amountCents: 185_000,
    direction: "in",
  },
  {
    id: "rt-2",
    description: "Fornecedor Alpha",
    timeLabel: "Hoje, 09:15",
    amountCents: 420_000,
    direction: "out",
  },
  {
    id: "rt-3",
    description: "Agência Marketing",
    timeLabel: "Ontem, 16:45",
    amountCents: 120_000,
    direction: "out",
  },
]

export const RESUMO_ALERTS: ResumoAlert[] = [
  {
    id: "alert-1",
    title: "Limite excedido: Operacional",
    timeLabel: "Há 2 horas",
    variant: "destructive",
  },
  {
    id: "alert-2",
    title: "Marketing chegando ao limite",
    timeLabel: "Há 4 horas",
    variant: "warning",
  },
  {
    id: "alert-3",
    title: "Fatura paga: Cartão Black",
    timeLabel: "Há 5 horas",
    variant: "info",
  },
]

export const RESUMO_PERIOD_LABELS = [
  "Este Mês",
  "Mês passado",
  "Últimos 3 meses",
] as const

export type ResumoPeriodLabel = (typeof RESUMO_PERIOD_LABELS)[number]

export function formatKpiValue(cents: number) {
  return formatBRL(cents)
}

export function formatTransactionAmount(cents: number, direction: "in" | "out") {
  const prefix = direction === "in" ? "+ " : "- "
  return `${prefix}${formatBRL(cents)}`
}
