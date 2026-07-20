import { DsIcon, Icons } from "@/app/styleguide/icons"
import { cn } from "@/lib/utils"

type TransactionDirectionIndicatorProps = {
  direction: "in" | "out"
  className?: string
}

export function TransactionDirectionIndicator({
  direction,
  className,
}: TransactionDirectionIndicatorProps) {
  const isOut = direction === "out"

  return (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full",
        isOut ? "bg-destructive/10" : "bg-success/10",
        className
      )}
      aria-hidden
    >
      <DsIcon
        icon={isOut ? Icons.arrowDown : Icons.arrowUp}
        className={cn(
          "size-3.5",
          isOut ? "text-destructive" : "text-success-foreground"
        )}
      />
    </div>
  )
}
