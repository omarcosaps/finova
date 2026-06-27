import * as React from "react"

import { DsIcon, Icons } from "@/app/styleguide/icons"
import { cn } from "@/lib/utils"

const inputClassName =
  "h-9 w-full min-w-0 rounded-4xl border border-input bg-input/30 px-3 py-1 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"

const dateInputClassName =
  "pr-9 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-y-0 [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:z-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-9 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(function Input({ className, type, ...props }, ref) {
  const dataSlot = props["data-slot"] ?? "input"
  const isGroupControl = dataSlot === "input-group-control"

  if (type === "date") {
    return (
      <div
        className={cn(
          "relative w-full min-w-0",
          isGroupControl && "flex-1"
        )}
      >
        <input
          ref={ref}
          type={type}
          data-slot={dataSlot}
          className={cn(inputClassName, dateInputClassName, className)}
          {...props}
        />
        <DsIcon
          icon={Icons.calendar}
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
      </div>
    )
  }

  return (
    <input
      ref={ref}
      type={type}
      data-slot={dataSlot}
      className={cn(inputClassName, className)}
      {...props}
    />
  )
})

export { Input }
