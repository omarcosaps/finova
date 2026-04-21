"use client"

import * as React from "react"
import { FinovaAppSidebar } from "@/components/finova/finova-app-sidebar"

function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(true)

  const toggle = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(document.documentElement.classList.contains("dark"))
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-muted-foreground">Preview theme</span>
      <div className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5">
        <button
          type="button"
          onClick={() => {
            document.documentElement.classList.remove("dark")
            setIsDark(false)
          }}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            !isDark
              ? "bg-card text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Light
        </button>
        <button
          type="button"
          onClick={() => {
            document.documentElement.classList.add("dark")
            setIsDark(true)
          }}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            isDark
              ? "bg-card text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Dark
        </button>
      </div>
      <button
        type="button"
        onClick={toggle}
        className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Toggle
      </button>
    </div>
  )
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-xs leading-relaxed">
      <code className="font-mono text-foreground">{children}</code>
    </pre>
  )
}

export default function SidebarShowcasePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Sidebar
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Barra lateral de app com marca, navegação principal, separador, ações
          secundárias e bloco de utilizador. Variante{" "}
          <code className="font-mono text-xs">finova</code> segue o tema escuro
          da referência (fundo <code className="font-mono text-xs">#0A0A0A</code>
          , item ativo <code className="font-mono text-xs">#262626</code>
          , acento <code className="font-mono text-xs">#4ADE80</code>). A variante{" "}
          <code className="font-mono text-xs">default</code> usa tokens{" "}
          <code className="font-mono text-xs">sidebar-*</code>.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Finova</h2>
        <p className="text-sm text-muted-foreground">
          Navegação com ícones (Hugeicons), item ativo, badge de notificação e
          perfil com iniciais.
        </p>
        <div className="inline-flex rounded-2xl border border-border bg-neutral-950 p-4 ring-1 ring-border/60">
          <FinovaAppSidebar
            activeItem="resumo"
            className="h-[560px] rounded-2xl ring-1 ring-white/10"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Sidebar,
  SidebarAvatar,
  SidebarBrand,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
  SidebarNavBadge,
  SidebarNavItem,
  SidebarNavList,
  SidebarSeparator,
  SidebarUser,
} from "@/components/ui/sidebar"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso</h2>
        <CodeBlock>{`import { DsIcon, Icons } from "@/app/styleguide/icons"

<Sidebar variant="finova">
  <SidebarHeader>
    <SidebarBrand title="Finova" logo={<DsIcon icon={Icons.wallet} />} />
  </SidebarHeader>
  <SidebarNav aria-label="Principal">
    <SidebarNavList>
      <SidebarNavItem href="/" active icon={...}>
        Resumo
      </SidebarNavItem>
    </SidebarNavList>
  </SidebarNav>
  <SidebarFooter>
    <SidebarSeparator />
    <SidebarUser
      avatar={<SidebarAvatar>AB</SidebarAvatar>}
      name="Ana Boutik"
      subtitle="Admin"
    />
  </SidebarFooter>
</Sidebar>`}</CodeBlock>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">SidebarNavItem</code> aceita{" "}
          <code className="font-mono text-xs">href</code> para links ou omitir{" "}
          <code className="font-mono text-xs">href</code> para{" "}
          <code className="font-mono text-xs">button</code>. Em apps Next.js,
          substitua <code className="font-mono text-xs">&lt;a&gt;</code> por{" "}
          <code className="font-mono text-xs">Link</code> no teu wrapper ou
          estenda o componente.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Acessibilidade
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Use <code className="font-mono text-xs">aria-label</code> em{" "}
            <code className="font-mono text-xs">SidebarNav</code> quando houver
            mais do que uma região de navegação.
          </li>
          <li>
            O item ativo expõe <code className="font-mono text-xs">aria-current=&quot;page&quot;</code>.
          </li>
          <li>
            Foco visível com anel; em variante <code className="font-mono text-xs">default</code>{" "}
            alinha ao token <code className="font-mono text-xs">sidebar-ring</code>.
          </li>
        </ul>
      </section>
    </div>
  )
}
