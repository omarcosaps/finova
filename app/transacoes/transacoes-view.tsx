"use client"

import * as React from "react"

import { DsIcon, Icons } from "@/app/styleguide/icons"
import { FinovaAppSidebar } from "@/components/finova/finova-app-sidebar"
import { NovaTransacaoDrawer } from "@/components/finova/nova-transacao-drawer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  buildTransacoesList,
  formatBRL,
  formatTransacaoData,
  type Transaction,
  TRANSACOES_TOTAL,
} from "@/lib/transacoes-mock"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 7

const PERIOD_LABELS = ["Este Mês", "Mês passado", "Últimos 3 meses"] as const

const thBase =
  "px-4 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase"

function DirectionCell({ t }: { t: Transaction }) {
  const isOut = t.direction === "out"
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          isOut ? "bg-destructive/10" : "bg-success/10"
        )}
        aria-hidden
      >
        <DsIcon
          icon={isOut ? Icons.arrowUpRight : Icons.arrowDownLeft}
          className={cn(
            "size-3.5",
            isOut ? "text-destructive" : "text-success-foreground"
          )}
        />
      </div>
      <span className="min-w-0 truncate text-sm text-foreground">
        {t.description}
      </span>
    </div>
  )
}

export function TransacoesView() {
  const [page, setPage] = React.useState(0)
  const [period, setPeriod] = React.useState<(typeof PERIOD_LABELS)[number]>(
    "Este Mês"
  )
  const [novaTransacaoOpen, setNovaTransacaoOpen] = React.useState(false)
  const [transactions, setTransactions] = React.useState(() =>
    buildTransacoesList(TRANSACOES_TOTAL)
  )

  const pageCount = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE))
  const safePage = Math.min(
    Math.max(0, page),
    Math.max(0, pageCount - 1)
  )
  const start = safePage * PAGE_SIZE
  const slice = transactions.slice(start, start + PAGE_SIZE)
  const canPrev = safePage > 0
  const canNext = safePage < pageCount - 1

  return (
    <div className="flex h-screen overflow-hidden flex-col bg-background text-foreground md:flex-row">
      <div className="shrink-0 border-b border-border md:flex md:h-full md:w-[260px] md:flex-col md:border-b-0 md:border-r">
        <FinovaAppSidebar
          activeItem="transacoes"
          className="h-auto min-h-0 w-full md:h-full"
        />
      </div>

      <main
        className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-6 md:p-8"
        aria-label="Transações e movimentos"
      >
        <header className="flex flex-col gap-4 pb-6 md:flex-row md:items-start md:justify-between md:pb-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Transações
            </h1>
            <p className="text-sm text-muted-foreground">
              Visualize e gerencie todas as entradas e saídas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <Button type="button" variant="outline" size="default">
              <DsIcon icon={Icons.filter} className="size-4" data-icon="inline-start" />
              Filtrar
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" size="default">
                  <DsIcon
                    icon={Icons.calendar}
                    className="size-4"
                    data-icon="inline-start"
                  />
                  {period}
                  <DsIcon
                    icon={Icons.chevronDown}
                    className="size-4 opacity-80"
                    data-icon="inline-end"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-48">
                {PERIOD_LABELS.map((label) => (
                  <DropdownMenuItem
                    key={label}
                    onSelect={() => setPeriod(label)}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button type="button" variant="default" size="lg">
              <DsIcon
                icon={Icons.download}
                className="size-4"
                data-icon="inline-start"
              />
              Exportar
            </Button>
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={() => setNovaTransacaoOpen(true)}
            >
              <DsIcon
                icon={Icons.add}
                className="size-4"
                data-icon="inline-start"
              />
              Nova Transação
            </Button>
          </div>
        </header>

        <NovaTransacaoDrawer
          open={novaTransacaoOpen}
          onOpenChange={setNovaTransacaoOpen}
          onSubmit={(transaction) => {
            setTransactions((prev) => [transaction, ...prev])
            setPage(0)
          }}
        />

        <div className="overflow-hidden rounded-2xl border border-border bg-card p-1 ring-1 ring-border/60">
          <Table>
            <TableCaption className="sr-only">
              Lista de transações com data, descrição, categoria e valor
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className={cn("w-[1%]", thBase)}>Data</TableHead>
                <TableHead className={cn("min-w-[200px]", thBase)}>
                  Descrição
                </TableHead>
                <TableHead
                  className={cn("w-[1%] whitespace-nowrap", thBase)}
                >
                  Categoria
                </TableHead>
                <TableHead
                  className={cn("w-[1%] text-right", thBase)}
                >
                  Valor
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slice.map((t) => {
                const isOut = t.direction === "out"
                const signed = isOut
                  ? `- ${formatBRL(t.amountCents)}`
                  : `+ ${formatBRL(t.amountCents)}`
                return (
                  <TableRow key={t.id}>
                    <TableCell className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
                      {formatTransacaoData(t.occurredAt)}
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <DirectionCell t={t} />
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <Badge variant="outline">{t.category}</Badge>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "px-4 py-4 text-right text-sm font-normal tabular-nums",
                        isOut ? "text-destructive" : "text-success-foreground"
                      )}
                    >
                      {signed}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          <div className="flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando {slice.length} de {transactions.length} transações
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="default"
                disabled={!canPrev}
                onClick={() => setPage(safePage - 1)}
              >
                <DsIcon
                  icon={Icons.arrowLeft}
                  className="size-4"
                  data-icon="inline-start"
                />
                Anterior
              </Button>
              <Button
                type="button"
                variant="outline"
                size="default"
                disabled={!canNext}
                onClick={() => setPage(safePage + 1)}
              >
                Próxima
                <DsIcon
                  icon={Icons.arrowRight}
                  className="size-4"
                  data-icon="inline-end"
                />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
