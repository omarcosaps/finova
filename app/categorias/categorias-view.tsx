"use client"

import { FinovaEmptyState } from "@/components/finova/finova-empty-state"
import { FinovaPageShell } from "@/components/finova/finova-page-shell"

export function CategoriasView() {
  return (
    <FinovaPageShell activeItem="categorias" ariaLabel="Categorias de transações">
      <header className="space-y-1 pb-6 md:pb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Categorias
        </h1>
        <p className="text-sm text-muted-foreground">
          Organize e classifique as suas transações.
        </p>
      </header>
      <FinovaEmptyState variant="categorias" />
    </FinovaPageShell>
  )
}
