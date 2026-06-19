import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type ConfiguracoesFormRowProps = {
  label: string
  description?: string
  htmlFor?: string
  controlClassName?: string
  children: ReactNode
}

export function ConfiguracoesFormRow({
  label,
  description,
  htmlFor,
  controlClassName,
  children,
}: ConfiguracoesFormRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-border pb-6 last:border-0 last:pb-0",
        "md:flex-row md:items-center md:justify-between"
      )}
    >
      <div className="min-w-0 space-y-0.5 md:max-w-[45%]">
        {htmlFor ? (
          <label
            htmlFor={htmlFor}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        ) : (
          <p className="text-sm font-medium text-foreground">{label}</p>
        )}
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div
        className={cn(
          "w-full shrink-0 md:w-auto md:min-w-[min(100%,16rem)] md:max-w-[55%]",
          controlClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
