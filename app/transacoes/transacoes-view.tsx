"use client"

import * as React from "react"

import { DsIcon, Icons } from "@/app/styleguide/icons"
import { EditarTransacaoDrawer } from "@/components/finova/editar-transacao-drawer"
import { FinovaAppSidebar } from "@/components/finova/finova-app-sidebar"
import { NovaTransacaoDrawer } from "@/components/finova/nova-transacao-drawer"
import { TransactionDirectionIndicator } from "@/components/finova/transaction-direction-indicator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
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
import { exportTransacoesToPdf } from "@/lib/export-transacoes-pdf"
import {
  buildTransacoesList,
  formatBRL,
  formatTransacaoData,
  type Transaction,
  TRANSACOES_TOTAL,
} from "@/lib/transacoes-mock"
import {
  filterTransactionsByPeriod,
  TRANSACOES_PERIOD_LABELS,
  type TransacoesPeriodLabel,
} from "@/lib/transacoes-period"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 7

const thBase =
  "px-4 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase"

function DirectionCell({ t }: { t: Transaction }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <TransactionDirectionIndicator direction={t.direction} />
      <span className="min-w-0 truncate text-sm text-foreground">
        {t.description}
      </span>
    </div>
  )
}

export function TransacoesView() {
  const [page, setPage] = React.useState(0)
  const [period, setPeriod] = React.useState<TransacoesPeriodLabel>("Este Mês")
  const [novaTransacaoOpen, setNovaTransacaoOpen] = React.useState(false)
  const [edicaoOpen, setEdicaoOpen] = React.useState(false)
  const [transacaoEmEdicao, setTransacaoEmEdicao] =
    React.useState<Transaction | null>(null)
  const [transactions, setTransactions] = React.useState(() =>
    buildTransacoesList(TRANSACOES_TOTAL)
  )

  const handleNovaTransacaoOpenChange = (open: boolean) => {
    if (open) {
      setEdicaoOpen(false)
      setTransacaoEmEdicao(null)
    }
    setNovaTransacaoOpen(open)
  }

  const handleOpenNovaTransacao = () => {
    setEdicaoOpen(false)
    setTransacaoEmEdicao(null)
    setNovaTransacaoOpen(true)
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setNovaTransacaoOpen(false)
    setTransacaoEmEdicao(transaction)
    setEdicaoOpen(true)
  }

  const handleEdicaoOpenChange = (open: boolean) => {
    setEdicaoOpen(open)
    if (!open) {
      setTransacaoEmEdicao(null)
    }
  }

  const filteredTransactions = React.useMemo(
    () => filterTransactionsByPeriod(transactions, period),
    [transactions, period]
  )

  const pageCount = Math.max(
    1,
    Math.ceil(filteredTransactions.length / PAGE_SIZE)
  )
  const safePage = Math.min(
    Math.max(0, page),
    Math.max(0, pageCount - 1)
  )
  const start = safePage * PAGE_SIZE
  const slice = filteredTransactions.slice(start, start + PAGE_SIZE)
  const hasResults = filteredTransactions.length > 0
  const canPrev = hasResults && safePage > 0
  const canNext = hasResults && safePage < pageCount - 1

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
                {TRANSACOES_PERIOD_LABELS.map((label) => (
                  <DropdownMenuItem
                    key={label}
                    onSelect={() => {
                      setPeriod(label)
                      setPage(0)
                    }}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              type="button"
              variant="default"
              size="lg"
              disabled={!hasResults}
              onClick={() =>
                void exportTransacoesToPdf({
                  transactions: filteredTransactions,
                  period,
                })
              }
            >
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
              onClick={handleOpenNovaTransacao}
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
          onOpenChange={handleNovaTransacaoOpenChange}
          onSubmit={(transaction) => {
            setTransactions((prev) => [transaction, ...prev])
            setPage(0)
          }}
        />

        <EditarTransacaoDrawer
          open={edicaoOpen}
          onOpenChange={handleEdicaoOpenChange}
          transaction={transacaoEmEdicao}
          onSubmit={(updated) => {
            setTransactions((prev) =>
              prev.map((item) => (item.id === updated.id ? updated : item))
            )
          }}
        />

        <div
          className="overflow-hidden rounded-2xl border border-border bg-card p-1 ring-1 ring-border/60"
          aria-label="Resultados de transações"
        >
          {hasResults ? (
            <Table>
              <TableCaption className="sr-only">
                Lista de transações com data, descrição, categoria e valor.
                Cada linha é editável; use Tab para focar e Enter ou Espaço para
                abrir a edição.
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
                    <TableRow
                      key={t.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`Editar transação: ${t.description}, ${formatBRL(t.amountCents)}`}
                      className={cn(
                        "cursor-pointer transition-colors",
                        "hover:bg-muted/50",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      )}
                      onClick={() => handleEditTransaction(t)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault()
                          handleEditTransaction(t)
                        }
                      }}
                    >
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
          ) : (
            <Empty className="min-h-[20rem] border-0 bg-transparent">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <DsIcon icon={Icons.calendar} aria-hidden />
                </EmptyMedia>
                <EmptyTitle>Nenhuma transação neste período</EmptyTitle>
                <EmptyDescription>
                  Não encontramos movimentos em &ldquo;{period}&rdquo;. Tente
                  outro intervalo ou cadastre uma nova transação.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  type="button"
                  variant="default"
                  size="default"
                  onClick={handleOpenNovaTransacao}
                >
                  <DsIcon
                    icon={Icons.add}
                    className="size-4"
                    data-icon="inline-start"
                  />
                  Nova Transação
                </Button>
              </EmptyContent>
            </Empty>
          )}

          <div className="flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-sm text-muted-foreground"
              aria-live="polite"
              aria-atomic="true"
            >
              Mostrando {slice.length} de {filteredTransactions.length}{" "}
              transações
            </p>
            {hasResults ? (
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
            ) : null}
          </div>
        </div>
      </main>
    </div>
  )
}
