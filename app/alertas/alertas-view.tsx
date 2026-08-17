"use client"

import * as React from "react"

import { ConfigurarAlertasDrawer } from "@/components/finova/configurar-alertas-drawer"
import { FinovaEmptyState } from "@/components/finova/finova-empty-state"
import { FinovaPageShell } from "@/components/finova/finova-page-shell"
import { Button } from "@/components/ui/button"
import {
  getAlertasEmptyTitle,
  getDefaultConfigurarAlertasFormValues,
  type ConfigurarAlertasFormValues,
} from "@/lib/alertas-mock"

export function AlertasView() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [savedRules, setSavedRules] = React.useState(
    getDefaultConfigurarAlertasFormValues
  )
  const [hasSaved, setHasSaved] = React.useState(false)

  const emptyTitle = getAlertasEmptyTitle({
    hasSaved,
    rules: savedRules,
  })

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
  }

  const handleSubmitRules = (rules: ConfigurarAlertasFormValues) => {
    setSavedRules(rules)
    setHasSaved(true)
  }

  return (
    <FinovaPageShell activeItem="alertas" ariaLabel="Alertas e notificações">
      <header className="flex flex-col gap-4 pb-6 md:flex-row md:items-start md:justify-between md:pb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Alertas
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe avisos sobre limites, faturas e movimentações.
          </p>
        </div>

        <Button
          type="button"
          variant="default"
          size="lg"
          onClick={handleOpenDrawer}
        >
          Configurar alertas
        </Button>
      </header>

      <FinovaEmptyState
        variant="alertas"
        title={emptyTitle}
        onPrimaryAction={handleOpenDrawer}
      />

      <ConfigurarAlertasDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        rules={savedRules}
        onSubmit={handleSubmitRules}
      />
    </FinovaPageShell>
  )
}
