"use client"

import * as React from "react"
import Link from "next/link"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { DsIcon, Icons } from "@/app/styleguide/icons"
import { FinovaPageShell } from "@/components/finova/finova-page-shell"
import { NovaTransacaoDrawer } from "@/components/finova/nova-transacao-drawer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DASHBOARD_PERIOD_LABELS,
  formatKpiValue,
  formatTransactionAmount,
  getDashboardPeriodData,
  periodHeaderDescription,
  type DashboardAlertVariant,
  type DashboardKpi,
  type DashboardPeriodLabel,
  type DashboardRecentTransaction,
} from "@/features/dashboard"
import { cn } from "@/lib/utils"

const cashFlowChartConfig = {
  receitas: {
    label: "Receitas",
    color: "var(--color-chart-1)",
  },
  despesas: {
    label: "Despesas",
    color: "var(--color-muted-foreground)",
  },
} satisfies ChartConfig

const ALERT_STYLES: Record<
  DashboardAlertVariant,
  { container: string; dot: string }
> = {
  destructive: {
    container: "bg-destructive/5 border-destructive/20",
    dot: "bg-destructive",
  },
  warning: {
    container: "bg-warning/5 border-warning/20",
    dot: "bg-warning",
  },
  info: {
    container: "bg-secondary/50 border-border",
    dot: "bg-accent",
  },
}

function KpiCard({
  kpi,
  changeComparisonLabel,
}: {
  kpi: DashboardKpi
  changeComparisonLabel: string
}) {
  return (
    <Card className="flex h-32 flex-col justify-between gap-0 py-6">
      <CardHeader className="space-y-0 px-6 pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {kpi.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-0">
        <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
          {formatKpiValue(kpi.valueCents)}
        </p>
        <p
          className={cn(
            "mt-1 text-xs font-medium tabular-nums",
            kpi.changeTone === "success"
              ? "text-success-foreground"
              : "text-destructive"
          )}
        >
          {kpi.changeLabel}{" "}
          <span className="text-muted-foreground">{changeComparisonLabel}</span>
        </p>
      </CardContent>
    </Card>
  )
}

function TransactionRow({
  transaction,
}: {
  transaction: DashboardRecentTransaction
}) {
  const isIn = transaction.direction === "in"

  return (
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full",
            isIn ? "bg-success/10 text-success-foreground" : "bg-secondary text-muted-foreground"
          )}
          aria-hidden
        >
          <DsIcon
            icon={isIn ? Icons.arrowDownLeft : Icons.arrowUpRight}
            className="size-3.5"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {transaction.description}
          </p>
          <p className="text-xs text-muted-foreground">{transaction.timeLabel}</p>
        </div>
      </div>
      <span
        className={cn(
          "shrink-0 text-sm font-medium tabular-nums",
          isIn ? "text-success-foreground" : "text-foreground"
        )}
      >
        {formatTransactionAmount(transaction.amountCents, transaction.direction)}
      </span>
    </div>
  )
}

export function ResumoView() {
  const [period, setPeriod] = React.useState<DashboardPeriodLabel>("Este Mês")
  const [novaTransacaoOpen, setNovaTransacaoOpen] = React.useState(false)
  const data = getDashboardPeriodData(period)

  return (
    <FinovaPageShell activeItem="resumo" ariaLabel="Resumo financeiro">
      <header className="flex flex-col gap-4 pb-6 md:flex-row md:items-start md:justify-between md:pb-8">
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Resumo Financeiro
          </h1>
          <p className="text-sm text-muted-foreground">
            {periodHeaderDescription(period)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <Select
            value={period}
            onValueChange={(value) =>
              setPeriod(value as DashboardPeriodLabel)
            }
          >
            <SelectTrigger
              aria-label="Período do resumo"
              className="min-w-44"
            >
              <DsIcon
                icon={Icons.calendar}
                className="size-4 text-muted-foreground"
              />
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent position="popper" align="end">
              {DASHBOARD_PERIOD_LABELS.map((label) => (
                <SelectItem key={label} value={label}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="default"
            size="lg"
            onClick={() => setNovaTransacaoOpen(true)}
          >
            <DsIcon icon={Icons.add} className="size-4" data-icon="inline-start" />
            Nova Transação
          </Button>
        </div>
      </header>

      <NovaTransacaoDrawer
        open={novaTransacaoOpen}
        onOpenChange={setNovaTransacaoOpen}
      />

      <section
        aria-label="Indicadores financeiros"
        className="mb-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        {data.kpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            kpi={kpi}
            changeComparisonLabel={data.changeComparisonLabel}
          />
        ))}
      </section>

      <section
        aria-label="Fluxo de caixa e limites de gasto"
        className="mb-6 grid gap-6 lg:grid-cols-3"
      >
        <Card className="overflow-hidden lg:col-span-2">
          <CardHeader className="border-b border-border">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1.5">
                <CardTitle>Fluxo de Caixa</CardTitle>
                <CardDescription>{data.cashFlowDescription}</CardDescription>
              </div>
              <div
                className="flex items-center gap-4 text-xs text-muted-foreground"
                aria-hidden
              >
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-sm bg-chart-1" />
                  <span>Receitas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-sm bg-muted-foreground" />
                  <span>Despesas</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartContainer
              config={cashFlowChartConfig}
              className="h-52 w-full aspect-auto"
              aria-label={`Gráfico de receitas e despesas: ${data.cashFlowDescription}`}
            >
              <BarChart
                accessibilityLayer
                data={data.cashFlow}
                margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={({ x, y, payload }) => {
                    const item = data.cashFlow.find(
                      (m) => m.month === payload.value
                    )
                    return (
                      <text
                        x={x}
                        y={y}
                        dy={12}
                        textAnchor="middle"
                        className={cn(
                          "fill-muted-foreground font-mono text-xs",
                          item?.highlighted &&
                            "fill-foreground font-semibold"
                        )}
                      >
                        {payload.value}
                      </text>
                    )
                  }}
                />
                <YAxis hide domain={[0, "auto"]} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="receitas"
                  fill="var(--color-receitas)"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
                <Bar
                  dataKey="despesas"
                  fill="var(--color-despesas)"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border">
            <CardTitle>Limites de Gasto</CardTitle>
            <CardDescription>Orçamento por categoria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {data.budgetLimits.map((budget) => (
              <div key={budget.id}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-foreground">
                    {budget.label}
                  </span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {budget.spentLabel} / {budget.limitLabel}
                  </span>
                </div>
                <Progress
                  value={budget.value}
                  variant={budget.variant}
                  aria-label={`${budget.label}: ${budget.value}% do orçamento utilizado`}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section
        aria-label="Transações recentes e alertas"
        className="grid gap-6 lg:grid-cols-3"
      >
        <Card className="overflow-hidden lg:col-span-2">
          <CardHeader className="border-b border-border">
            <CardTitle>Últimas Transações</CardTitle>
            <CardAction>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/transacoes">Ver Todas</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="px-0 pt-0">
            <div className="divide-y divide-border">
              {data.recentTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border">
            <CardTitle>Alertas</CardTitle>
            <CardAction>
              <Badge variant="destructive">3 novos</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {data.alerts.map((alert) => {
              const styles = ALERT_STYLES[alert.variant]
              return (
                <div
                  key={alert.id}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-3",
                    styles.container
                  )}
                >
                  <span
                    className={cn(
                      "mt-1 size-2 shrink-0 rounded-full",
                      styles.dot
                    )}
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {alert.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {alert.timeLabel}
                    </p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </section>
    </FinovaPageShell>
  )
}
