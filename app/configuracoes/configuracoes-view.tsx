"use client"

import { FinovaEmptyState } from "@/components/finova/finova-empty-state"
import { FinovaPageShell } from "@/components/finova/finova-page-shell"

export function ConfiguracoesView() {
  return (
    <FinovaPageShell activeItem="configuracoes" ariaLabel="Configurações da conta">
      <header className="space-y-1 pb-6 md:pb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Configurações
        </h1>
        <p className="text-sm text-muted-foreground">
          Preferências da conta, notificações e limites.
        </p>
      </header>
      <FinovaEmptyState variant="configuracoes" />
    </FinovaPageShell>
  )
}
