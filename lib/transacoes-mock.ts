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

export type NovaTransacaoFormValues = {
  direction: TransactionDirection
  description: string
  amountCents: number
  category: string
  /** YYYY-MM-DD */
  date: string
  sourceId: string
  notes: string
}

export type NovaTransacaoFieldErrors = Partial<
  Record<keyof NovaTransacaoFormValues, string>
>

export const TRANSACAO_CATEGORIAS: Record<
  TransactionDirection,
  readonly string[]
> = {
  in: ["Receitas", "Vendas", "Serviços", "Outras receitas"],
  out: ["Estoque", "Marketing", "Operacional", "Pessoal", "Outras despesas"],
}

/** IDs alinhados a `CARTOES_PREVIEW` em cartoes-mock.ts */
export const TRANSACAO_ORIGENS = [
  { value: "conta-corrente", label: "Conta Corrente Finova" },
  { value: "pc-9212", label: "Cartão Corporativo •••• 9212" },
  { value: "vc-4055", label: "Cartão Virtual •••• 4055" },
] as const

export function getDefaultNovaTransacaoFormValues(): NovaTransacaoFormValues {
  const today = new Date()
  return {
    direction: "out",
    description: "",
    amountCents: 0,
    category: "",
    date: today.toISOString().slice(0, 10),
    sourceId: "",
    notes: "",
  }
}

export function validateNovaTransacaoForm(
  values: NovaTransacaoFormValues
): NovaTransacaoFieldErrors {
  const errors: NovaTransacaoFieldErrors = {}

  if (!values.description.trim()) {
    errors.description = "Informe a descrição."
  }

  if (values.amountCents <= 0) {
    errors.amountCents = "Informe um valor maior que zero."
  }

  if (!values.category) {
    errors.category = "Selecione uma categoria."
  } else if (
    !TRANSACAO_CATEGORIAS[values.direction].includes(values.category)
  ) {
    errors.category = "Categoria inválida para o tipo selecionado."
  }

  if (!values.date) {
    errors.date = "Selecione a data."
  }

  if (!values.sourceId) {
    errors.sourceId = "Selecione a conta ou cartão."
  }

  return errors
}

let mockTxCounter = 0

export function createTransactionFromForm(
  values: NovaTransacaoFormValues,
  id?: string
): Transaction {
  const amountCents = values.amountCents
  mockTxCounter += 1

  return {
    id: id ?? `tx-new-${Date.now()}-${mockTxCounter}`,
    occurredAt: `${values.date}T12:00:00`,
    description: values.description.trim(),
    category: values.category,
    amountCents,
    direction: values.direction,
  }
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

export { formatBRL } from "@/lib/currency"
