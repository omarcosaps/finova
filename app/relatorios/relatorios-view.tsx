"use client"

import { FinovaEmptyState } from "@/components/finova/finova-empty-state"
import { FinovaPageShell } from "@/components/finova/finova-page-shell"

export function RelatoriosView() {
  return (
    <FinovaPageShell activeItem="relatorios" ariaLabel="Relatórios financeiros">
      <header className="space-y-1 pb-6 md:pb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Relatórios
        </h1>
        <p className="text-sm text-muted-foreground">
          Análises de despesas, categorias e fluxo de caixa.
        </p>
      </header>
      <FinovaEmptyState variant="relatorios" />
    </FinovaPageShell>
  )
}
