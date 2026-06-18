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
    <div className="flex h-screen overflow-hidden flex-col bg-background text-foreground md:flex-row">
      <div className="shrink-0 border-b border-border md:flex md:h-full md:w-[260px] md:flex-col md:border-b-0 md:border-r">
        <FinovaAppSidebar
          activeItem={activeItem}
          className="h-auto min-h-0 w-full md:h-full"
        />
      </div>

      <main
        className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-6 md:p-8"
        aria-label={ariaLabel}
      >
        {children}
      </main>
    </div>
  )
}
