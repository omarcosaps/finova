import { formatBRL, formatTransacaoData } from "@/lib/transacoes-mock"

export type CardInvoiceSummary = {
  /** Valor atual da fatura em centavos. */
  currentInvoiceCents: number
  /** Limite disponível em centavos. */
  availableLimitCents: number
  /** Limite total em centavos. */
  totalLimitCents: number
  /** Últimos 4 dígitos do cartão em foco (título da fatura). */
  focusedLastFour: string
  /** Data de vencimento ISO (YYYY-MM-DD). */
  dueDate: string
}

export type CardRecentTransaction = {
  id: string
  name: string
  occurredAt: string
  amountCents: number
}

export type CorporateCardKind = "physical" | "virtual"

export type CardBrand =
  | "visa"
  | "mastercard"
  | "elo"
  | "amex"
  | "hipercard"
  | "outros"

export const CARTAO_BANDEIRAS: ReadonlyArray<{
  value: CardBrand
  label: string
}> = [
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "Mastercard" },
  { value: "elo", label: "Elo" },
  { value: "amex", label: "American Express" },
  { value: "hipercard", label: "Hipercard" },
  { value: "outros", label: "Outros" },
]

export type NovoCartaoFormValues = {
  name: string
  limitCents: number
  closingDay: string
  dueDay: string
  brand: CardBrand | ""
}

export type NovoCartaoFieldErrors = Partial<
  Record<keyof NovoCartaoFormValues, string>
>

export type CorporateCard = {
  id: string
  kind: CorporateCardKind
  cardholderLabel: string
  lastFour: string
  /** Rótulos superiores (ex.: CORPORATE, Black). */
  topLabels: [string, string] | readonly [string, string]
  /** Só físico: validade MM/AA */
  expiry?: string
  /** Só virtual: estado online no mock */
  online?: boolean
  brand?: CardBrand
  limitCents?: number
  closingDay?: number
  dueDay?: number
}

let mockCardCounter = 0

export function getDefaultNovoCartaoFormValues(): NovoCartaoFormValues {
  return {
    name: "",
    limitCents: 0,
    closingDay: "",
    dueDay: "",
    brand: "",
  }
}

function parseDayField(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  if (!/^\d+$/.test(trimmed)) return null
  return Number.parseInt(trimmed, 10)
}

function validateDayField(
  value: string,
  fieldLabel: string
): string | undefined {
  const day = parseDayField(value)
  if (day === null) {
    return `Informe o dia de ${fieldLabel}.`
  }
  if (day < 1 || day > 31) {
    return `O dia de ${fieldLabel} deve estar entre 1 e 31.`
  }
  return undefined
}

export function validateNovoCartaoForm(
  values: NovoCartaoFormValues
): NovoCartaoFieldErrors {
  const errors: NovoCartaoFieldErrors = {}

  if (!values.name.trim()) {
    errors.name = "Informe o nome do cartão."
  }

  if (values.limitCents <= 0) {
    errors.limitCents = "Informe um limite maior que zero."
  }

  const closingError = validateDayField(values.closingDay, "fechamento")
  if (closingError) {
    errors.closingDay = closingError
  }

  const dueError = validateDayField(values.dueDay, "vencimento")
  if (dueError) {
    errors.dueDay = dueError
  }

  if (!values.brand) {
    errors.brand = "Selecione a bandeira do cartão."
  }

  return errors
}

function generateMockLastFour() {
  return String(Math.floor(1000 + Math.random() * 9000))
}

export function createCorporateCardFromForm(
  values: NovoCartaoFormValues,
  id?: string
): CorporateCard {
  mockCardCounter += 1
  const name = values.name.trim()
  const displayLabel =
    name.length > 20 ? `${name.slice(0, 17)}…` : name

  return {
    id: id ?? `card-new-${Date.now()}-${mockCardCounter}`,
    kind: "physical",
    cardholderLabel: name,
    lastFour: generateMockLastFour(),
    topLabels: ["FINOVA CORPORATE", displayLabel],
    expiry: "12/30",
    brand: values.brand as CardBrand,
    limitCents: values.limitCents,
    closingDay: parseDayField(values.closingDay) ?? undefined,
    dueDay: parseDayField(values.dueDay) ?? undefined,
  }
}

/** Alinhado ao mock visual: total R$ 25.000, fatura R$ 9.870, disponível R$ 15.130 (~39% / ~61%). */
export const FATURA_RESUMO: CardInvoiceSummary = {
  currentInvoiceCents: 987_000,
  availableLimitCents: 1_513_000,
  totalLimitCents: 2_500_000,
  focusedLastFour: "9212",
  dueDate: "2026-03-15",
}

export const CARTOES_PREVIEW: CorporateCard[] = [
  {
    id: "pc-9212",
    kind: "physical",
    cardholderLabel: "Ana Boutik",
    lastFour: "9212",
    topLabels: ["FINOVA CORPORATE", "Black"],
    expiry: "12/28",
  },
  {
    id: "vc-4055",
    kind: "virtual",
    cardholderLabel: "Ana Boutik",
    lastFour: "4055",
    topLabels: ["VIRTUAL", "Marketing & Ads"],
    online: true,
  },
]

export const ULTIMAS_TRANSACOES_CARTAO: CardRecentTransaction[] = [
  {
    id: "cc-1",
    name: "Fornecedor Alpha (Estoque)",
    occurredAt: "2026-02-12T14:30:00",
    amountCents: 420_000,
  },
  {
    id: "cc-2",
    name: "Agência Marketing Digital",
    occurredAt: "2026-02-11T16:45:00",
    amountCents: 120_000,
  },
  {
    id: "cc-3",
    name: "Assinatura Software CRM",
    occurredAt: "2026-02-10T09:15:00",
    amountCents: 249_900,
  },
]

const monthShortFmt = new Intl.DateTimeFormat("pt-BR", { month: "long" })

function parseIsoLocal(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number)
  return new Date(y!, m! - 1, d!)
}

/** Ex.: “Vence em: 15 de março.” */
export function formatVencimentoCurto(isoDate: string) {
  const date = parseIsoLocal(isoDate)
  const day = date.getDate()
  const monthRaw = monthShortFmt.format(date)
  const month = monthRaw.replace(/\.$/, "").toLowerCase()
  return `Vence em: ${day} de ${month}.`
}

export function getLimitUsagePercents(summary: CardInvoiceSummary) {
  const { totalLimitCents, availableLimitCents } = summary
  if (totalLimitCents <= 0) return { utilized: 0, availablePct: 100 }
  const usedCents = Math.max(0, totalLimitCents - availableLimitCents)
  const utilized = Math.round((usedCents / totalLimitCents) * 100)
  const availablePct = Math.max(0, 100 - utilized)
  return { utilized, availablePct }
}

const dueDateFmt = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
})

export function formatFaturaVencimento(isoDate: string) {
  const date = parseIsoLocal(isoDate)
  const raw = dueDateFmt.format(date)
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}

export { formatBRL, formatTransacaoData }
