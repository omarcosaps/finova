export type TransactionDirection = "in" | "out"

export type Transaction = {
  id: string
  /** ISO 8601 instant (local interpretation for display). */
  occurredAt: string
  description: string
  category: string
  amountCents: number
  direction: TransactionDirection
}

/** 7 linhas de referência (Figma 2949:419); reutilizadas em ciclo para preencher 142. */
export const TRANSACOES_TOTAL = 142

export const TRANSACOES_TEMPLATE: Transaction[] = [
  {
    id: "1",
    occurredAt: "2026-02-12T14:30:00",
    description: "Fornecedor Alpha (Estoque)",
    category: "Estoque",
    amountCents: 420_000,
    direction: "out",
  },
  {
    id: "2",
    occurredAt: "2026-02-12T09:15:00",
    description: "Venda PDV - Cartão de Crédito",
    category: "Receitas",
    amountCents: 185_000,
    direction: "in",
  },
  {
    id: "3",
    occurredAt: "2026-02-11T16:45:00",
    description: "Agência Marketing Digital",
    category: "Marketing",
    amountCents: 120_000,
    direction: "out",
  },
  {
    id: "4",
    occurredAt: "2026-02-11T11:20:00",
    description: "Venda Loja Online - Pix",
    category: "Receitas",
    amountCents: 342_000,
    direction: "in",
  },
  {
    id: "5",
    occurredAt: "2026-02-10T15:00:00",
    description: "Conta de Luz",
    category: "Operacional",
    amountCents: 45_000,
    direction: "out",
  },
  {
    id: "6",
    occurredAt: "2026-02-10T10:10:00",
    description: "Venda PDV - Dinheiro",
    category: "Receitas",
    amountCents: 98_000,
    direction: "in",
  },
  {
    id: "7",
    occurredAt: "2026-02-09T13:40:00",
    description: "Serviço de Limpeza",
    category: "Operacional",
    amountCents: 30_000,
    direction: "out",
  },
]

export function buildTransacoesList(total: number = TRANSACOES_TOTAL): Transaction[] {
  const tm = TRANSACOES_TEMPLATE
  const out: Transaction[] = []
  for (let i = 0; i < total; i++) {
    const t = tm[i % tm.length]!
    out.push({
      ...t,
      id: `tx-${i + 1}`,
    })
  }
  return out
}

const brDateTime = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
})

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
})

export function formatTransacaoData(iso: string) {
  const d = new Date(iso)
  const parts = brDateTime.formatToParts(d)
  const day = parts.find((p) => p.type === "day")?.value ?? ""
  const month = parts.find((p) => p.type === "month")?.value ?? ""
  const hour = parts.find((p) => p.type === "hour")?.value ?? ""
  const minute = parts.find((p) => p.type === "minute")?.value ?? ""
  const m = month.replace(/\./g, "")
  const monthLabel = m.charAt(0).toUpperCase() + m.slice(1)
  return `${day} ${monthLabel}, ${hour}:${minute}`
}

export function formatBRL(cents: number) {
  return money.format(cents / 100)
}
