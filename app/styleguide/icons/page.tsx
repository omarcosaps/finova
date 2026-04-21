"use client"

import * as React from "react"

import { DsIcon, DEFAULT_ICON_STROKE, ICON_NAMES, Icons, type IconName } from "@/app/styleguide/icons"

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

function IconTile({ name }: { name: IconName }) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center ring-1 ring-border/60"
      data-icon={name}
    >
      <div className="flex size-14 items-center justify-center rounded-xl bg-muted/50 text-foreground">
        <DsIcon icon={Icons[name]} className="size-8" aria-hidden />
      </div>
      <div className="w-full space-y-1">
        <p className="font-mono text-xs font-medium text-foreground">
          Icons.{name}
        </p>
        <p className="text-[11px] leading-snug text-muted-foreground">
          variável <code className="font-mono text-[10px] text-foreground/90">{name}</code>
        </p>
      </div>
    </div>
  )
}

export default function IconsGalleryPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Foundation
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Ícones
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Catálogo dos ícones registados em{" "}
          <code className="font-mono text-xs">app/styleguide/icons/registry.ts</code>
          . Cada cartão mostra o acesso tipado{" "}
          <code className="font-mono text-xs">Icons.&lt;variável&gt;</code> e o nome da
          chave usado no objeto <code className="font-mono text-xs">Icons</code>.
          Stroke por defeito:{" "}
          <code className="font-mono text-xs">{DEFAULT_ICON_STROKE}</code> (via{" "}
          <code className="font-mono text-xs">DsIcon</code>).
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Grelha</h2>
        <p className="text-sm text-muted-foreground">
          {ICON_NAMES.length} ícones — ordem alfabética por variável.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {ICON_NAMES.map((name) => (
            <IconTile key={name} name={name} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import { DsIcon, Icons, ICON_NAMES, type IconName } from "@/app/styleguide/icons"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso</h2>
        <CodeBlock>{`<DsIcon icon={Icons.wallet} className="size-5" />

// Iterar todas as chaves
ICON_NAMES.map((name) => (
  <DsIcon key={name} icon={Icons[name]} />
))`}</CodeBlock>
      </section>
    </div>
  )
}
