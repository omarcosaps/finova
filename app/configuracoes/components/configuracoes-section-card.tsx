import type { ReactNode } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ConfiguracoesSectionCardProps = {
  title: string
  description?: string
  titleClassName?: string
  children: ReactNode
}

export function ConfiguracoesSectionCard({
  title,
  description,
  titleClassName,
  children,
}: ConfiguracoesSectionCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-border">
        <div className="min-w-0 space-y-1">
          <CardTitle className={cn(titleClassName)}>{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </div>
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  )
}
