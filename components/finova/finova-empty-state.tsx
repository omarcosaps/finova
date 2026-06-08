"use client"

import Link from "next/link"

import { DsIcon, Icons, type IconName } from "@/app/styleguide/icons"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export type FinovaEmptyVariant =
  | "resumo"
  | "alertas"
  | "relatorios"
  | "categorias"
  | "configuracoes"

type EmptyAction = {
  label: string
  href?: string
  variant?: "default" | "outline"
}

type EmptyConfig = {
  icon: IconName
  title: string
  description: string
  primary: EmptyAction
  secondary?: EmptyAction
}

const EMPTY_CONFIG: Record<FinovaEmptyVariant, EmptyConfig> = {
  resumo: {
    icon: "gridView",
    title: "Sem dados no resumo",
    description:
      "Quando houver transações e movimentos, o panorama financeiro aparece aqui.",
    primary: { label: "Ver transações", href: "/transacoes" },
    secondary: { label: "Meus cartões", href: "/cartoes", variant: "outline" },
  },
  alertas: {
    icon: "notification",
    title: "Nenhum alerta",
    description:
      "Configure limites e notificações para receber avisos sobre gastos e faturas.",
    primary: { label: "Configurar alertas" },
    secondary: { label: "Ver transações", href: "/transacoes", variant: "outline" },
  },
  relatorios: {
    icon: "pieChart",
    title: "Nenhum relatório",
    description:
      "Gere relatórios de despesas, categorias e fluxo de caixa quando houver dados.",
    primary: { label: "Gerar relatório" },
    secondary: { label: "Exportar transações", href: "/transacoes", variant: "outline" },
  },
  categorias: {
    icon: "tag",
    title: "Nenhuma categoria",
    description:
      "Organize transações com categorias personalizadas para análises mais claras.",
    primary: { label: "Nova categoria" },
    secondary: { label: "Importar categorias", variant: "outline" },
  },
  configuracoes: {
    icon: "settings",
    title: "Preferências não configuradas",
    description:
      "Ajuste notificações, limites e preferências da conta quando estiverem disponíveis.",
    primary: { label: "Explorar opções" },
  },
}

type FinovaEmptyStateProps = {
  variant: FinovaEmptyVariant
}

function EmptyActionButton({ action }: { action: EmptyAction }) {
  if (action.href) {
    return (
      <Button
        asChild
        type="button"
        variant={action.variant ?? "default"}
        size="default"
      >
        <Link href={action.href}>{action.label}</Link>
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant={action.variant ?? "default"}
      size="default"
    >
      {action.label}
    </Button>
  )
}

export function FinovaEmptyState({ variant }: FinovaEmptyStateProps) {
  const config = EMPTY_CONFIG[variant]

  return (
    <Empty className="min-h-[20rem] flex-1 border border-dashed border-border bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <DsIcon icon={Icons[config.icon]} aria-hidden />
        </EmptyMedia>
        <EmptyTitle>{config.title}</EmptyTitle>
        <EmptyDescription>{config.description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent
        className={
          config.secondary
            ? "flex-row justify-center gap-2"
            : undefined
        }
      >
        <EmptyActionButton action={config.primary} />
        {config.secondary ? (
          <EmptyActionButton action={config.secondary} />
        ) : null}
      </EmptyContent>
    </Empty>
  )
}
