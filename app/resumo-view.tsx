"use client"

import { FinovaEmptyState } from "@/components/finova/finova-empty-state"
import { FinovaPageShell } from "@/components/finova/finova-page-shell"

export function ResumoView() {
  return (
    <FinovaPageShell activeItem="resumo" ariaLabel="Resumo financeiro">
      <header className="space-y-1 pb-6 md:pb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Resumo
        </h1>
        <p className="text-sm text-muted-foreground">
          Panorama financeiro da sua conta corporativa.
        </p>
      </header>
      <FinovaEmptyState variant="resumo" />
    </FinovaPageShell>
  )
}
