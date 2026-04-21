"use client"

import * as React from "react"
import { DsIcon, Icons } from "@/app/styleguide/icons"
import { Button } from "@/components/ui/button"

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

export default function ButtonShowcasePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Button
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Botão com variantes de estilo e tamanho (radix-maia). Usa tokens{" "}
          <code className="font-mono text-xs">primary</code>,{" "}
          <code className="font-mono text-xs">secondary</code>,{" "}
          <code className="font-mono text-xs">destructive</code>, etc.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Variantes</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">default</code>,{" "}
          <code className="font-mono text-xs">secondary</code>,{" "}
          <code className="font-mono text-xs">outline</code>,{" "}
          <code className="font-mono text-xs">ghost</code>,{" "}
          <code className="font-mono text-xs">destructive</code>,{" "}
          <code className="font-mono text-xs">link</code>.
        </p>
        <div className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Tamanhos</h2>
        <p className="text-sm text-muted-foreground">
          Alturas e paddings para texto denso ou CTAs maiores.
        </p>
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Só ícone</h2>
        <p className="text-sm text-muted-foreground">
          Tamanhos <code className="font-mono text-xs">icon</code>,{" "}
          <code className="font-mono text-xs">icon-xs</code>,{" "}
          <code className="font-mono text-xs">icon-sm</code>,{" "}
          <code className="font-mono text-xs">icon-lg</code>.
        </p>
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Button size="icon-xs" variant="outline" aria-label="Adicionar">
            <DsIcon icon={Icons.add} />
          </Button>
          <Button size="icon-sm" variant="outline" aria-label="Adicionar">
            <DsIcon icon={Icons.add} />
          </Button>
          <Button size="icon" variant="outline" aria-label="Adicionar">
            <DsIcon icon={Icons.add} />
          </Button>
          <Button size="icon-lg" variant="outline" aria-label="Adicionar">
            <DsIcon icon={Icons.add} />
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Estados</h2>
        <div className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled outline
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import { Button } from "@/components/ui/button"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso</h2>
        <CodeBlock>{`<Button variant="outline" size="sm">
  Salvar
</Button>`}</CodeBlock>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">asChild</code> repassa estilos para
          um filho (ex.: <code className="font-mono text-xs">Link</code>) via
          Radix Slot.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Acessibilidade
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Botões só com ícone precisam de{" "}
            <code className="font-mono text-xs">aria-label</code> (ou texto
            visível).
          </li>
          <li>
            Estado desabilitado usa <code className="font-mono text-xs">disabled</code>{" "}
            nativo e reduz opacidade.
          </li>
          <li>
            Foco visível: anel <code className="font-mono text-xs">ring-ring</code>.
          </li>
        </ul>
      </section>
    </div>
  )
}
