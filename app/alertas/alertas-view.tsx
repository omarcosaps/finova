"use client"

import { FinovaEmptyState } from "@/components/finova/finova-empty-state"
import { FinovaPageShell } from "@/components/finova/finova-page-shell"

export function AlertasView() {
  return (
    <FinovaPageShell activeItem="alertas" ariaLabel="Alertas e notificações">
      <header className="space-y-1 pb-6 md:pb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Alertas
        </h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe avisos sobre limites, faturas e movimentações.
        </p>
      </header>
      <FinovaEmptyState variant="alertas" />
    </FinovaPageShell>
  )
}
