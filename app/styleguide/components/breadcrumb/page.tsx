"use client"

import * as React from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

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

export default function BreadcrumbShowcasePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Breadcrumb
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Navegação hierárquica com <code className="font-mono text-xs">&lt;nav&gt;</code>
          , lista ordenada e separadores. Use{" "}
          <code className="font-mono text-xs">BreadcrumbPage</code> no item atual
          (sem link).
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Padrão</h2>
        <p className="text-sm text-muted-foreground">
          Links com <code className="font-mono text-xs">next/link</code> via{" "}
          <code className="font-mono text-xs">asChild</code> em{" "}
          <code className="font-mono text-xs">BreadcrumbLink</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card px-4 py-6 ring-1 ring-border/60 md:px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Início</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/styleguide">Styleguide</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Com elipse (caminho longo)
        </h2>
        <p className="text-sm text-muted-foreground">
          Oculte níveis intermediários com{" "}
          <code className="font-mono text-xs">BreadcrumbEllipsis</code> (inclui{" "}
          <code className="font-mono text-xs">sr-only</code> “More”).
        </p>
        <div className="rounded-2xl border border-border bg-card px-4 py-6 ring-1 ring-border/60 md:px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Início</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/styleguide/components/table">Table</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Detalhe</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Separador customizado
        </h2>
        <p className="text-sm text-muted-foreground">
          Passe <code className="font-mono text-xs">children</code> em{" "}
          <code className="font-mono text-xs">BreadcrumbSeparator</code> (ex.:{" "}
          <code className="font-mono text-xs">/</code>).
        </p>
        <div className="rounded-2xl border border-border bg-card px-4 py-6 ring-1 ring-border/60 md:px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/styleguide">Styleguide</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground/80">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/styleguide/components/breadcrumb">
                    Breadcrumb
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground/80">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Showcase</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Partes</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Breadcrumb</strong> —{" "}
            <code className="font-mono text-xs">nav</code> com{" "}
            <code className="font-mono text-xs">aria-label=&quot;breadcrumb&quot;</code>.
          </li>
          <li>
            <strong className="text-foreground">BreadcrumbList</strong> —{" "}
            <code className="font-mono text-xs">ol</code> flex.
          </li>
          <li>
            <strong className="text-foreground">BreadcrumbItem</strong> —{" "}
            <code className="font-mono text-xs">li</code>.
          </li>
          <li>
            <strong className="text-foreground">BreadcrumbLink</strong> —{" "}
            <code className="font-mono text-xs">a</code> ou slot (
            <code className="font-mono text-xs">asChild</code>).
          </li>
          <li>
            <strong className="text-foreground">BreadcrumbPage</strong> — item
            atual; <code className="font-mono text-xs">aria-current=&quot;page&quot;</code>.
          </li>
          <li>
            <strong className="text-foreground">BreadcrumbSeparator</strong> —{" "}
            <code className="font-mono text-xs">li</code> decorativo (ícone
            Hugeicons por padrão).
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Acessibilidade
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            O landmark <code className="font-mono text-xs">nav</code> já traz{" "}
            <code className="font-mono text-xs">aria-label</code> para leitores
            de tela.
          </li>
          <li>
            Use exatamente um <code className="font-mono text-xs">BreadcrumbPage</code>{" "}
            por trilha, no destino atual.
          </li>
          <li>
            Separadores usam{" "}
            <code className="font-mono text-xs">aria-hidden</code> quando são só
            visuais.
          </li>
        </ul>
      </section>
    </div>
  )
}
