"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigation } from "./navigation"

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed top-0 left-0 flex h-screen w-64 flex-col gap-6 overflow-y-auto border-r border-border bg-card p-6">
        <Link
          href="/styleguide"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Design System
        </Link>

        <nav className="flex flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-0.5">
                {section.items.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-muted-foreground/70">
                    Coming in Prompt 2
                  </li>
                ) : (
                  section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm transition-colors",
                          pathname === item.href
                            ? "bg-muted font-medium text-foreground"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="ml-64 flex-1 overflow-auto">{children}</main>
    </div>
  )
}
