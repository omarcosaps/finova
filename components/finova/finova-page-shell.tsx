"use client"

import * as React from "react"

import {
  FinovaAppSidebar,
  type FinovaNavKey,
} from "@/components/finova/finova-app-sidebar"

type FinovaPageShellProps = {
  activeItem: FinovaNavKey
  ariaLabel: string
  children: React.ReactNode
}

export function FinovaPageShell({
  activeItem,
  ariaLabel,
  children,
}: FinovaPageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <div className="shrink-0 border-b border-border md:w-[260px] md:border-b-0 md:border-r">
        <FinovaAppSidebar
          activeItem={activeItem}
          className="h-auto min-h-0 w-full md:h-screen md:min-h-screen"
        />
      </div>

      <main
        className="flex min-w-0 flex-1 flex-col p-6 md:p-8"
        aria-label={ariaLabel}
      >
        {children}
      </main>
    </div>
  )
}
