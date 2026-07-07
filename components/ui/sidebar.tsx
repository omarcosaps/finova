import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type SidebarVariant = "default" | "finova"

const SidebarContext = React.createContext<{ variant: SidebarVariant }>({
  variant: "finova",
})

function useSidebarVariant() {
  return React.useContext(SidebarContext)
}

const sidebarVariants = cva(
  "flex h-full min-h-0 w-[260px] shrink-0 flex-col gap-6 overflow-hidden px-4 py-6",
  {
    variants: {
      variant: {
        default: "bg-sidebar text-sidebar-foreground",
        finova: "bg-[#0A0A0A] text-white",
      },
    },
    defaultVariants: {
      variant: "finova",
    },
  }
)

function Sidebar({
  className,
  variant = "finova",
  ...props
}: React.ComponentProps<"aside"> & VariantProps<typeof sidebarVariants>) {
  return (
    <SidebarContext.Provider value={{ variant: variant ?? "finova" }}>
      <aside
        data-slot="sidebar"
        data-variant={variant}
        className={cn(sidebarVariants({ variant }), className)}
        {...props}
      />
    </SidebarContext.Provider>
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex shrink-0 flex-col gap-4", className)}
      {...props}
    />
  )
}

function SidebarBrand({
  className,
  logo,
  title,
  ...props
}: React.ComponentProps<"div"> & {
  logo?: React.ReactNode
  title: string
}) {
  return (
    <div
      data-slot="sidebar-brand"
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      {logo ? (
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl",
            "bg-[#4ADE80] text-neutral-950 [&_svg]:size-5"
          )}
        >
          {logo}
        </div>
      ) : null}
      <span className="text-lg font-semibold tracking-tight">{title}</span>
    </div>
  )
}

function SidebarNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="sidebar-nav"
      className={cn("min-h-0 shrink-0", className)}
      {...props}
    />
  )
}

function SidebarNavList({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-nav-list"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

const sidebarNavItemVariants = cva(
  "flex w-full min-w-0 cursor-pointer items-center gap-3 rounded-lg border-0 px-3 py-2.5 text-left text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] data-[variant=default]:focus-visible:ring-sidebar-ring data-[variant=default]:focus-visible:ring-offset-sidebar",
  {
    variants: {
      variant: {
        default:
          "text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&_[data-slot=sidebar-nav-item-icon]]:text-muted-foreground hover:[&_[data-slot=sidebar-nav-item-icon]]:text-sidebar-accent-foreground",
        defaultActive:
          "bg-sidebar-accent font-medium text-sidebar-accent-foreground [&_[data-slot=sidebar-nav-item-icon]]:text-sidebar-accent-foreground",
        finova:
          "text-white hover:bg-white/5 [&_[data-slot=sidebar-nav-item-icon]]:text-[#A3A3A3] hover:[&_[data-slot=sidebar-nav-item-icon]]:text-white",
        finovaActive:
          "bg-[#262626] text-white [&_[data-slot=sidebar-nav-item-icon]]:text-white",
      },
    },
  }
)

function SidebarNavItem({
  className,
  active = false,
  icon,
  badge,
  href,
  children,
  ...props
}: Omit<React.ComponentProps<"button">, "type"> &
  Omit<React.ComponentProps<"a">, "href" | "type"> & {
    active?: boolean
    icon?: React.ReactNode
    badge?: React.ReactNode
    href?: string
  }) {
  const { variant } = useSidebarVariant()
  const stateKey =
    variant === "finova"
      ? active
        ? "finovaActive"
        : "finova"
      : active
        ? "defaultActive"
        : "default"

  const content = (
    <>
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
    </>
  )

  const itemClassName = cn(
    sidebarNavItemVariants({ variant: stateKey }),
    className
  )

  if (href !== undefined) {
    return (
      <li data-slot="sidebar-nav-item-root">
        <a
          data-slot="sidebar-nav-item"
          data-variant={variant}
          data-active={active ? "true" : undefined}
          aria-current={active ? "page" : undefined}
          href={href}
          className={itemClassName}
          {...props}
        >
          {content}
        </a>
      </li>
    )
  }

  return (
    <li data-slot="sidebar-nav-item-root">
      <button
        type="button"
        data-slot="sidebar-nav-item"
        data-variant={variant}
        data-active={active ? "true" : undefined}
        aria-current={active ? "page" : undefined}
        className={itemClassName}
        {...props}
      >
        {content}
      </button>
    </li>
  )
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<"div">) {
  const { variant } = useSidebarVariant()
  return (
    <div
      data-slot="sidebar-separator"
      role="separator"
      className={cn(
        "h-px w-full shrink-0",
        variant === "finova" ? "bg-[#262626]" : "bg-sidebar-border",
        className
      )}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("mt-auto flex shrink-0 flex-col gap-4", className)}
      {...props}
    />
  )
}

function SidebarUser({
  className,
  avatar,
  name,
  subtitle,
  ...props
}: React.ComponentProps<"div"> & {
  avatar: React.ReactNode
  name: string
  subtitle: string
}) {
  const { variant } = useSidebarVariant()
  return (
    <div
      data-slot="sidebar-user"
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      <div className="shrink-0">{avatar}</div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{name}</p>
        <p
          className={cn(
            "truncate text-xs",
            variant === "finova" ? "text-[#A3A3A3]" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      </div>
    </div>
  )
}

function SidebarNavBadge({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="sidebar-nav-badge"
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-neutral-950",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

function SidebarAvatar({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-avatar"
      className={cn(
        "flex size-10 items-center justify-center rounded-full bg-[#262626] text-sm font-semibold text-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  Sidebar,
  SidebarAvatar,
  SidebarBrand,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
  SidebarNavBadge,
  SidebarNavItem,
  SidebarNavList,
  sidebarNavItemVariants,
  SidebarSeparator,
  SidebarUser,
  useSidebarVariant,
}
