import { formatBRL } from "@/lib/currency"
import type { Transaction } from "@/lib/transacoes-mock"

export type ExportTransacoesPdfParams = {
  /** Transações a incluir no relatório (geralmente as exibidas na tela). */
  transactions: Transaction[]
  /** Período filtrado exibido na tela, se aplicável. */
  period?: string
}

const brDate = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
})

function formatRowDate(iso: string): string {
  return brDate.format(new Date(iso))
}

function typeLabel(direction: Transaction["direction"]): string {
  return direction === "in" ? "Receita" : "Despesa"
}

function signedAmount(t: Transaction): string {
  const value = formatBRL(t.amountCents)
  return t.direction === "out" ? `- ${value}` : `+ ${value}`
}

function fileTimestamp(now: Date): string {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, "0")
  const d = String(now.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

/**
 * Gera um PDF "Relatório de Transações" com os dados informados e dispara o
 * download automático. Isolado como utilitário reutilizável; a lógica só roda
 * no cliente (importa jspdf sob demanda).
 */
export async function exportTransacoesToPdf({
  transactions,
  period,
}: ExportTransacoesPdfParams): Promise<void> {
  const { jsPDF } = await import("jspdf")
  const autoTable = (await import("jspdf-autotable")).default

  const now = new Date()
  const doc = new jsPDF({ unit: "pt", format: "a4" })
  const marginX = 40
  let cursorY = 48

  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  doc.text("Relatório de Transações", marginX, cursorY)

  cursorY += 22
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.setTextColor(110)
  doc.text(`Gerado em: ${brDate.format(now)}`, marginX, cursorY)

  if (period) {
    cursorY += 16
    doc.text(`Período: ${period}`, marginX, cursorY)
  }

  const totals = transactions.reduce(
    (acc, t) => {
      if (t.direction === "in") acc.income += t.amountCents
      else acc.expense += t.amountCents
      return acc
    },
    { income: 0, expense: 0 }
  )
  const balance = totals.income - totals.expense

  doc.setTextColor(0)

  autoTable(doc, {
    startY: cursorY + 18,
    margin: { left: marginX, right: marginX },
    head: [["Data", "Descrição", "Categoria", "Tipo", "Valor"]],
    body: transactions.map((t) => [
      formatRowDate(t.occurredAt),
      t.description,
      t.category,
      typeLabel(t.direction),
      signedAmount(t),
    ]),
    styles: { fontSize: 9, cellPadding: 6 },
    headStyles: { fillColor: [24, 24, 27], textColor: 255, fontStyle: "bold" },
    columnStyles: { 4: { halign: "right" } },
    theme: "striped",
  })

  const finalY =
    (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable
      ?.finalY ?? cursorY + 18
  let summaryY = finalY + 28

  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")
  doc.text(`Total de receitas: ${formatBRL(totals.income)}`, marginX, summaryY)
  summaryY += 18
  doc.text(`Total de despesas: ${formatBRL(totals.expense)}`, marginX, summaryY)
  summaryY += 18
  doc.setFont("helvetica", "bold")
  doc.text(`Saldo final: ${formatBRL(balance)}`, marginX, summaryY)

  doc.save(`relatorio-transacoes-${fileTimestamp(now)}.pdf`)
}
