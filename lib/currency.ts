const brDecimal = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const brCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
})

const brInteger = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 0,
})

/** Limite do input: R$ 999.999.999,99 */
export const MAX_CENTS = 999_999_999_99

type CurrencyDraftParts = {
  integerDigits: string
  hasComma: boolean
  decimalDigits: string
}

/** Formata centavos para exibição no input (sem símbolo R$). */
export function formatCentsForInput(cents: number): string {
  return brDecimal.format(cents / 100)
}

/** Formata centavos para exibição read-only com símbolo R$. */
export function formatBRL(cents: number): string {
  return brCurrency.format(cents / 100)
}

/** Converte string formatada (ex.: "R$ 1.234,56" ou "12,34") em centavos. */
export function parseValorToCents(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  let normalized = trimmed.replace(/R\$\s?/g, "").trim()

  if (normalized.includes(",")) {
    normalized = normalized.replace(/\./g, "").replace(",", ".")
  }

  const num = Number.parseFloat(normalized)
  if (Number.isNaN(num) || num <= 0) return null
  return Math.round(num * 100)
}

function normalizeIntegerDigits(digits: string): string {
  if (!digits) return ""
  const stripped = digits.replace(/^0+/, "")
  return stripped === "" ? "0" : stripped
}

function parseDraftParts(draft: string): CurrencyDraftParts {
  const cleaned = draft.replace(/R\$\s?/gi, "").trim()
  const commaIndex = cleaned.indexOf(",")
  const hasComma = commaIndex !== -1
  const integerPart = hasComma ? cleaned.slice(0, commaIndex) : cleaned
  const decimalPart = hasComma ? cleaned.slice(commaIndex + 1) : ""

  return {
    integerDigits: integerPart.replace(/\D/g, ""),
    hasComma,
    decimalDigits: decimalPart.replace(/\D/g, ""),
  }
}

function draftToCentsFromParts(parts: CurrencyDraftParts): number {
  if (!parts.integerDigits && !parts.decimalDigits) return 0
  const integer = Number.parseInt(parts.integerDigits || "0", 10)
  const fraction = Number.parseInt(
    parts.decimalDigits.padEnd(2, "0").slice(0, 2) || "0",
    10
  )
  return integer * 100 + fraction
}

function formatParts(parts: CurrencyDraftParts): string {
  const integerDigits = normalizeIntegerDigits(parts.integerDigits)
  if (!integerDigits && !parts.hasComma) return ""

  const integerDisplay = brInteger.format(
    Number.parseInt(integerDigits || "0", 10)
  )

  if (!parts.hasComma) return integerDisplay
  return `${integerDisplay},${parts.decimalDigits.slice(0, 2)}`
}

function isWithinMax(parts: CurrencyDraftParts): boolean {
  return draftToCentsFromParts(parts) <= MAX_CENTS
}

/** Formata o rascunho de digitação (milhar na parte inteira, sem forçar 2 decimais). */
export function formatCurrencyDraft(draft: string): string {
  return formatParts(parseDraftParts(draft))
}

/** Converte o rascunho pt-BR em centavos. Aceita vazio, `21,` e `0,21`. */
export function draftToCents(draft: string): number {
  return draftToCentsFromParts(parseDraftParts(draft))
}

function applyBackspace(draft: string): string {
  const parts = parseDraftParts(draft)

  if (parts.decimalDigits.length > 0) {
    return formatParts({
      ...parts,
      decimalDigits: parts.decimalDigits.slice(0, -1),
    })
  }

  if (parts.hasComma) {
    return formatParts({
      ...parts,
      hasComma: false,
    })
  }

  if (!parts.integerDigits) return ""

  return formatParts({
    integerDigits: parts.integerDigits.slice(0, -1),
    hasComma: false,
    decimalDigits: "",
  })
}

function applySeparator(draft: string): string {
  const parts = parseDraftParts(draft)
  if (parts.hasComma) return formatParts(parts)

  return formatParts({
    integerDigits: parts.integerDigits || "0",
    hasComma: true,
    decimalDigits: "",
  })
}

function applyDigit(draft: string, digit: string): string {
  const parts = parseDraftParts(draft)

  if (parts.hasComma) {
    if (parts.decimalDigits.length >= 2) return formatParts(parts)

    const next = {
      ...parts,
      decimalDigits: parts.decimalDigits + digit,
    }
    if (!isWithinMax(next)) return formatParts(parts)
    return formatParts(next)
  }

  const next = {
    integerDigits: normalizeIntegerDigits(parts.integerDigits + digit),
    hasComma: false,
    decimalDigits: "",
  }
  if (!isWithinMax(next)) return formatParts(parts)
  return formatParts(next)
}

/** Aplica dígito, vírgula/ponto ou backspace ao rascunho LTR. */
export function applyCurrencyDraftKey(draft: string, key: string): string {
  if (key === "Backspace" || key === "Delete") return applyBackspace(draft)
  if (key === "," || key === ".") return applySeparator(draft)
  if (/^\d$/.test(key)) return applyDigit(draft, key)
  return formatCurrencyDraft(draft)
}

const usDecimalPaste = /^\d+\.\d{1,2}$/

/** Sanitiza paste / onChange para rascunho pt-BR (não interpreta dígitos como centavos). */
export function sanitizeCurrencyDraft(raw: string, previous = ""): string {
  const stripped = raw.replace(/R\$\s?/gi, "").trim()
  if (!stripped) return ""

  if (!stripped.includes(",") && previous === "" && usDecimalPaste.test(stripped)) {
    const [integerPart, decimalPart] = stripped.split(".")
    const next = {
      integerDigits: normalizeIntegerDigits(integerPart),
      hasComma: true,
      decimalDigits: decimalPart.slice(0, 2),
    }
    if (!isWithinMax(next)) return formatCurrencyDraft(previous)
    return formatParts(next)
  }

  if (stripped.includes(",")) {
    const parts = parseDraftParts(stripped)
    const next = {
      integerDigits: normalizeIntegerDigits(parts.integerDigits) || "0",
      hasComma: true,
      decimalDigits: parts.decimalDigits.slice(0, 2),
    }
    if (!isWithinMax(next)) return formatCurrencyDraft(previous)
    return formatParts(next)
  }

  const next = {
    integerDigits: normalizeIntegerDigits(stripped.replace(/\D/g, "")),
    hasComma: false,
    decimalDigits: "",
  }
  if (!next.integerDigits) return ""
  if (!isWithinMax(next)) return formatCurrencyDraft(previous)
  return formatParts(next)
}
