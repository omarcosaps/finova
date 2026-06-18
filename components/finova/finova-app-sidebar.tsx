"use client"

import * as React from "react"
import Link from "next/link"

import { DsIcon, Icons } from "@/app/styleguide/icons"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarAvatar,
  SidebarBrand,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
  SidebarNavBadge,
  SidebarNavList,
  SidebarSeparator,
  SidebarUser,
  sidebarNavItemVariants,
  useSidebarVariant,
} from "@/components/ui/sidebar"

export type FinovaNavKey =
  | "resumo"
  | "transacoes"
  | "cartoes"
  | "alertas"
  | "relatorios"
  | "categorias"
  | "configuracoes"

const NAV_HREFS: Record<FinovaNavKey, string> = {
  resumo: "/",
  transacoes: "/transacoes",
  cartoes: "/cartoes",
  alertas: "/alertas",
  relatorios: "/relatorios",
  categorias: "/categorias",
  configuracoes: "/configuracoes",
}

type FinovaNavItemLinkProps = {
  href: string
  active: boolean
  icon: React.ReactNode
  children: React.ReactNode
  badge?: React.ReactNode
}

function FinovaNavItemLink({
  href,
  active,
  icon,
  badge,
  children,
}: FinovaNavItemLinkProps) {
  const { variant } = useSidebarVariant()
  const stateKey =
    variant === "finova"
      ? active
        ? "finovaActive"
        : "finova"
      : active
        ? "defaultActive"
        : "default"

  return (
    <li data-slot="sidebar-nav-item-root">
      <Link
        data-slot="sidebar-nav-item"
        data-variant={variant}
        data-active={active ? "true" : undefined}
        aria-current={active ? "page" : undefined}
        href={href}
        className={cn(sidebarNavItemVariants({ variant: stateKey }))}
        scroll={!href.startsWith("#")}
      >
        {icon ? (
          <span data-slot="sidebar-nav-item-icon" className="shrink-0">
            {icon}
          </span>
        ) : null}
        <span className="min-w-0 flex-1 truncate">{children}</span>
        {badge ? (
          <span className="shrink-0" data-slot="sidebar-nav-item-badge">
            {badge}
          </span>
        ) : null}
      </Link>
    </li>
  )
}

type FinovaAppSidebarProps = {
  activeItem: FinovaNavKey
  className?: string
}

export function FinovaAppSidebar({ activeItem, className }: FinovaAppSidebarProps) {
  return (
    <Sidebar variant="finova" className={className}>
      <SidebarHeader>
        <SidebarBrand
          title="Finova"
          logo={<DsIcon icon={Icons.wallet} />}
        />
      </SidebarHeader>

      <SidebarNav aria-label="Principal" className="min-h-0 flex-1">
        <SidebarNavList>
          <FinovaNavItemLink
            href={NAV_HREFS.resumo}
            active={activeItem === "resumo"}
            icon={<DsIcon icon={Icons.gridView} />}
          >
            Resumo
          </FinovaNavItemLink>
          <FinovaNavItemLink
            href={NAV_HREFS.transacoes}
            active={activeItem === "transacoes"}
            icon={<DsIcon icon={Icons.arrowLeftRight} />}
          >
            Transações
          </FinovaNavItemLink>
          <FinovaNavItemLink
            href={NAV_HREFS.cartoes}
            active={activeItem === "cartoes"}
            icon={<DsIcon icon={Icons.creditCard} />}
          >
            Cartões
          </FinovaNavItemLink>
          <FinovaNavItemLink
            href={NAV_HREFS.alertas}
            active={activeItem === "alertas"}
            icon={<DsIcon icon={Icons.notification} />}
            badge={<SidebarNavBadge>3</SidebarNavBadge>}
          >
            Alertas
          </FinovaNavItemLink>
          <FinovaNavItemLink
            href={NAV_HREFS.relatorios}
            active={activeItem === "relatorios"}
            icon={<DsIcon icon={Icons.pieChart} />}
          >
            Relatórios
          </FinovaNavItemLink>
          <FinovaNavItemLink
            href={NAV_HREFS.categorias}
            active={activeItem === "categorias"}
            icon={<DsIcon icon={Icons.tag} />}
          >
            Categorias
          </FinovaNavItemLink>
        </SidebarNavList>
      </SidebarNav>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarNav aria-label="Conta">
          <SidebarNavList>
            <FinovaNavItemLink
              href={NAV_HREFS.configuracoes}
              active={activeItem === "configuracoes"}
              icon={<DsIcon icon={Icons.settings} />}
            >
              Configurações
            </FinovaNavItemLink>
          </SidebarNavList>
        </SidebarNav>
        <SidebarUser
          avatar={<SidebarAvatar>AB</SidebarAvatar>}
          name="Ana Boutik"
          subtitle="Admin"
        />
      </SidebarFooter>
    </Sidebar>
  )
}
