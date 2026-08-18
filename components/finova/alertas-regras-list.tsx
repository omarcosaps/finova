"use client"

import { DsIcon, Icons } from "@/app/styleguide/icons"
import {
  type AlertaRegraId,
  type AlertaRegraListaItem,
} from "@/lib/alertas-mock"
import { cn } from "@/lib/utils"

type AlertasRegrasListProps = {
  items: AlertaRegraListaItem[]
  onSelect?: (id: AlertaRegraId) => void
}

export function AlertasRegrasList({
  items,
  onSelect,
}: AlertasRegrasListProps) {
  const handleSelect = (id: AlertaRegraId) => {
    onSelect?.(id)
  }

  return (
    <ul
      className="flex flex-col gap-3"
      aria-label="Regras de alerta configuradas"
    >
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            aria-label={`Configurar ${item.label}`}
            onClick={() => handleSelect(item.id)}
            className={cn(
              "flex w-full items-start gap-3 rounded-lg border border-border p-3 text-left transition-colors",
              "hover:bg-muted/50",
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            )}
          >
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground"
              aria-hidden
            >
              <DsIcon icon={Icons[item.icon]} className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {item.label}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {item.thresholdLabel}
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}
