import type { DashboardPeriodLabel } from "@/features/dashboard/types/dashboard"

export {
  DASHBOARD_PERIOD_LABELS as TRANSACOES_PERIOD_LABELS,
  type DashboardPeriodLabel as TransacoesPeriodLabel,
} from "@/features/dashboard/types/dashboard"

export type PeriodDateRange = {
  /** YYYY-MM-DD inclusive */
  start: string
  /** YYYY-MM-DD inclusive */
  end: string
}

function toLocalYmd(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function startOfLocalMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfLocalMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/** Extrai YYYY-MM-DD de `occurredAt` (ISO local). */
export function occurredAtToYmd(occurredAt: string): string {
  return occurredAt.slice(0, 10)
}

export function isDateInPeriod(ymd: string, range: PeriodDateRange): boolean {
  return ymd >= range.start && ymd <= range.end
}

/**
 * Resolve um label de período em intervalo de datas locais inclusivo.
 * - "Este Mês": mês calendário da data de referência
 * - "Mês passado": mês calendário anterior
 * - "Últimos 3 meses": mês atual + dois meses anteriores
 */
export function getPeriodDateRange(
  period: DashboardPeriodLabel,
  referenceDate: Date = new Date()
): PeriodDateRange {
  switch (period) {
    case "Este Mês": {
      const start = startOfLocalMonth(referenceDate)
      const end = endOfLocalMonth(referenceDate)
      return { start: toLocalYmd(start), end: toLocalYmd(end) }
    }
    case "Mês passado": {
      const prev = new Date(
        referenceDate.getFullYear(),
        referenceDate.getMonth() - 1,
        1
      )
      return {
        start: toLocalYmd(startOfLocalMonth(prev)),
        end: toLocalYmd(endOfLocalMonth(prev)),
      }
    }
    case "Últimos 3 meses": {
      const start = startOfLocalMonth(
        new Date(
          referenceDate.getFullYear(),
          referenceDate.getMonth() - 2,
          1
        )
      )
      const end = endOfLocalMonth(referenceDate)
      return { start: toLocalYmd(start), end: toLocalYmd(end) }
    }
    default: {
      const _exhaustive: never = period
      return _exhaustive
    }
  }
}

export function filterTransactionsByPeriod<T extends { occurredAt: string }>(
  items: T[],
  period: DashboardPeriodLabel,
  referenceDate: Date = new Date()
): T[] {
  const range = getPeriodDateRange(period, referenceDate)
  return items.filter((item) =>
    isDateInPeriod(occurredAtToYmd(item.occurredAt), range)
  )
}
