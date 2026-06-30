"use client"

import * as React from "react"
import Link from "next/link"

import { DsIcon, Icons } from "@/app/styleguide/icons"
import { FinovaAppSidebar } from "@/components/finova/finova-app-sidebar"
import { NovoCartaoDrawer } from "@/components/finova/novo-cartao-drawer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  CARTOES_PREVIEW,
  FATURA_RESUMO,
  ULTIMAS_TRANSACOES_CARTAO,
  type CorporateCard,
  formatBRL,
  formatTransacaoData,
  formatVencimentoCurto,
  getLimitUsagePercents,
} from "@/lib/cartoes-mock"
import { cn } from "@/lib/utils"

function maskCardNumber(lastFour: string) {
  return `**** **** **** ${lastFour}`
}

function CartoesPreviewCard({ card }: { card: CorporateCard }) {
  const isPhysical = card.kind === "physical"

  return (
    <div
      className={cn(
        "relative flex min-h-[11rem] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-muted/90 p-5 ring-1 ring-border/80",
        !isPhysical && "min-h-[10rem]"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {card.topLabels[0]}
          </span>
          {isPhysical ? (
            <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-foreground">
              {card.topLabels[1]}
            </span>
          ) : (
            <>
              <span className="text-[10px] font-medium text-muted-foreground">
                {card.topLabels[1]}
              </span>
              {card.online ? (
                <Badge variant="outline" className="h-5 text-[10px]">
                  ONLINE
                </Badge>
              ) : null}
            </>
          )}
        </div>
        {isPhysical ? (
          <DsIcon
            icon={Icons.creditCard}
            className="size-5 shrink-0 text-muted-foreground"
            aria-hidden
          />
        ) : null}
      </div>

      <p className="font-mono text-lg tracking-[0.2em] text-foreground tabular-nums">
        {maskCardNumber(card.lastFour)}
      </p>

      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Titular
          </p>
          <p className="truncate text-sm font-medium text-foreground">
            {card.cardholderLabel}
          </p>
        </div>
        {isPhysical && card.expiry ? (
          <div className="shrink-0 text-right">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Validade
            </p>
            <p className="text-sm font-medium tabular-nums text-foreground">
              {card.expiry}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function LimitUsageBar({
  utilizedPercent,
  availablePercent,
}: {
  utilizedPercent: number
  availablePercent: number
}) {
  const u = Math.max(0, utilizedPercent)
  const a = Math.max(0, availablePercent)
  const sum = u + a
  const uFlex = sum > 0 ? u : 0
  const aFlex = sum > 0 ? a : 1

  return (
    <div className="mt-6 space-y-2">
      <div
        className="flex h-3 overflow-hidden rounded-full bg-muted ring-1 ring-border/60"
        role="group"
        aria-label="Uso do limite do cartão"
      >
        <div
          className="min-w-px bg-foreground transition-[flex-grow] duration-300"
          style={{ flexGrow: uFlex }}
        />
        <div
          className="min-w-px bg-success-foreground transition-[flex-grow] duration-300"
          style={{ flexGrow: aFlex }}
        />
      </div>
      <div className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
        <span>Utilizado ({u}%)</span>
        <span>Disponível ({a}%)</span>
      </div>
    </div>
  )
}

function FaturaStatColumn({
  label,
  value,
  sublabel,
  valueClassName,
}: {
  label: string
  value: string
  sublabel: string
  valueClassName?: string
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "text-xl font-semibold tabular-nums tracking-tight text-foreground md:text-2xl",
          valueClassName
        )}
      >
        {value}
      </p>
      <p className="text-sm text-muted-foreground">{sublabel}</p>
    </div>
  )
}

export function CartoesView() {
  const [novoCartaoOpen, setNovoCartaoOpen] = React.useState(false)
  const [cards, setCards] = React.useState(() => [...CARTOES_PREVIEW])
  const { utilized, availablePct } = getLimitUsagePercents(FATURA_RESUMO)

  return (
    <div className="flex h-screen overflow-hidden flex-col bg-background text-foreground md:flex-row">
      <div className="shrink-0 border-b border-border md:flex md:h-full md:w-[260px] md:flex-col md:border-b-0 md:border-r">
        <FinovaAppSidebar
          activeItem="cartoes"
          className="h-auto min-h-0 w-full md:h-full"
        />
      </div>

      <main
        className="flex min-h-0 min-w-0 flex-1 flex-col gap-8 overflow-y-auto p-6 md:p-8"
        aria-label="Meus cartões e fatura"
      >
        <header className="flex flex-col gap-4 pb-0 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Meus Cartões
            </h1>
            <p className="text-sm text-muted-foreground">
              Gerencie seus cartões corporativos, limites e faturas.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <Button type="button" variant="outline" size="default">
              <DsIcon
                icon={Icons.settings}
                className="size-4"
                data-icon="inline-start"
              />
              Configurações
            </Button>
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={() => setNovoCartaoOpen(true)}
            >
              <DsIcon
                icon={Icons.add}
                className="size-4"
                data-icon="inline-start"
              />
              Novo cartão
            </Button>
          </div>
        </header>

        <NovoCartaoDrawer
          open={novoCartaoOpen}
          onOpenChange={setNovoCartaoOpen}
          onSubmit={(card) => setCards((prev) => [card, ...prev])}
        />

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start xl:gap-10">
          <section
            aria-label="Cartões corporativos"
            className="flex flex-col gap-4 lg:sticky lg:top-8 lg:self-start lg:gap-6"
          >
            {cards.map((c) => (
              <CartoesPreviewCard key={c.id} card={c} />
            ))}
          </section>

          <div className="flex min-w-0 flex-col gap-8">
            <Card className="overflow-hidden">
              <CardHeader className="border-b border-border">
                <CardTitle>{`Resumo da fatura (final ${FATURA_RESUMO.focusedLastFour})`}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <FaturaStatColumn
                    label="Fatura atual"
                    value={formatBRL(FATURA_RESUMO.currentInvoiceCents)}
                    sublabel={formatVencimentoCurto(FATURA_RESUMO.dueDate)}
                  />
                  <FaturaStatColumn
                    label="Limite disponível"
                    value={formatBRL(FATURA_RESUMO.availableLimitCents)}
                    sublabel={`Limite total: ${formatBRL(FATURA_RESUMO.totalLimitCents)}.`}
                    valueClassName="text-success-foreground"
                  />
                </div>
                <LimitUsageBar
                  utilizedPercent={utilized}
                  availablePercent={availablePct}
                />
              </CardContent>
              <CardFooter className="flex w-full flex-row gap-3 border-t border-border [.border-t]:pt-6">
                <Button
                  type="button"
                  variant="default"
                  size="lg"
                  className="min-w-0 flex-1"
                >
                  <DsIcon
                    icon={Icons.tick}
                    className="size-4"
                    data-icon="inline-start"
                  />
                  Pagar fatura
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="min-w-0 flex-1"
                >
                  <DsIcon
                    icon={Icons.download}
                    className="size-4"
                    data-icon="inline-start"
                  />
                  Gerar boleto
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="@container/card-header flex flex-row flex-wrap items-center justify-between gap-2 border-b border-border [.border-b]:pb-6">
                <CardTitle>Últimas transações</CardTitle>
                <Link
                  href="/transacoes"
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Ver todas
                </Link>
              </CardHeader>
              <CardContent className="px-0 pt-0">
                <ul className="divide-y divide-border">
                  {ULTIMAS_TRANSACOES_CARTAO.map((tx) => (
                    <li
                      key={tx.id}
                      className="flex items-center gap-4 px-6 py-4"
                    >
                      <div
                        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted"
                        aria-hidden
                      >
                        <DsIcon
                          icon={Icons.creditCard}
                          className="size-4 text-muted-foreground"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {tx.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatTransacaoData(tx.occurredAt)}
                        </p>
                      </div>
                      <p className="shrink-0 text-right text-sm font-normal tabular-nums text-foreground">
                        {formatBRL(tx.amountCents)}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
