"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const progressIndicatorVariants = cva(
  "size-full flex-1 transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary",
        accent: "bg-accent",
        success: "bg-success",
        warning: "bg-warning",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Progress({
  className,
  indicatorClassName,
  variant,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressIndicatorVariants> & {
    indicatorClassName?: string
  }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        data-variant={variant ?? "default"}
        className={cn(progressIndicatorVariants({ variant }), indicatorClassName)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress, progressIndicatorVariants }
