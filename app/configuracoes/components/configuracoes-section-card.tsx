import type { ReactNode } from "react"
import type { IconSvgElement } from "@hugeicons/react"

import { DsIcon } from "@/app/styleguide/icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ConfiguracoesSectionCardProps = {
  icon: IconSvgElement
  title: string
  description?: string
  titleClassName?: string
  children: ReactNode
}

export function ConfiguracoesSectionCard({
  icon,
  title,
  description,
  titleClassName,
  children,
}: ConfiguracoesSectionCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-border">
        <div className="flex items-start gap-3">
          <DsIcon
            icon={icon}
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <div className="min-w-0 space-y-1">
            <CardTitle className={cn(titleClassName)}>{title}</CardTitle>
            {description ? <CardDescription>{description}</CardDescription> : null}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  )
}
