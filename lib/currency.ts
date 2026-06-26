const brDecimal = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const brCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
})

/** Formata centavos para exibição no input (sem símbolo R$). */
export function formatCentsForInput(cents: number): string {
  return brDecimal.format(cents / 100)
}

/** Formata centavos para exibição read-only com símbolo R$. */
export function formatBRL(cents: number): string {
  return brCurrency.format(cents / 100)
}

/** Extrai dígitos e converte para centavos (máscara cent-based). */
export function digitsToCents(digits: string): number {
  const cleaned = digits.replace(/\D/g, "")
  if (!cleaned) return 0
  return Number.parseInt(cleaned, 10)
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
