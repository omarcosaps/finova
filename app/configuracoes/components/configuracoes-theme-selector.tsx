"use client"

import * as React from "react"

import { DsIcon, Icons } from "@/app/styleguide/icons"
import { cn } from "@/lib/utils"

type ThemeValue = "dark" | "light"

type ConfiguracoesThemeSelectorProps = {
  value: ThemeValue
  onChange: (value: ThemeValue) => void
}

export function ConfiguracoesThemeSelector({
  value,
  onChange,
}: ConfiguracoesThemeSelectorProps) {
  const selectTheme = (theme: ThemeValue) => {
    onChange(theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
  }

  return (
    <div
      className="grid grid-cols-2 gap-3"
      role="group"
      aria-label="Selecionar tema"
    >
      {(
        [
          { id: "dark" as const, label: "Escuro", icon: Icons.moon },
          { id: "light" as const, label: "Claro", icon: Icons.sun },
        ] as const
      ).map(({ id, label, icon }) => {
        const isSelected = value === id

        return (
          <button
            key={id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => selectTheme(id)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
              isSelected
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-input/30 text-muted-foreground hover:bg-input/50 hover:text-foreground"
            )}
          >
            <DsIcon icon={icon} className="size-4" aria-hidden />
            {label}
          </button>
        )
      })}
    </div>
  )
}
