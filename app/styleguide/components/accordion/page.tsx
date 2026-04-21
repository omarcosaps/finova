"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

export default function AccordionShowcasePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Accordion
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Painéis expansíveis com um ou vários itens abertos. Baseado em Radix
          Accordion; estilos usam tokens de borda, fundo e texto.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Um painel por vez (<code className="font-mono text-sm">single</code>)
        </h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">collapsible</code> permite fechar
          o item ativo clicando de novo no trigger.
        </p>
        <div className="max-w-2xl rounded-2xl ring-1 ring-border/60">
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Design tokens</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Cores, tipografia e raios vivem em{" "}
                  <code className="font-mono text-xs text-foreground">
                    app/globals.css
                  </code>
                  . Use variáveis CSS e utilitários Tailwind (
                  <code className="font-mono text-xs">bg-card</code>,{" "}
                  <code className="font-mono text-xs">text-muted-foreground</code>
                  ).
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Componentes shadcn</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Componentes em{" "}
                  <code className="font-mono text-xs text-foreground">
                    components/ui
                  </code>{" "}
                  seguem o registro radix-maia e Hugeicons onde aplicável.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Styleguide</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Cada componente tem uma página em{" "}
                  <code className="font-mono text-xs text-foreground">
                    app/styleguide/components
                  </code>{" "}
                  e entrada em{" "}
                  <code className="font-mono text-xs text-foreground">
                    navigation.ts
                  </code>
                  .
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Vários abertos (<code className="font-mono text-sm">multiple</code>)
        </h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">defaultValue</code> aceita um
          array de <code className="font-mono text-xs">value</code>.
        </p>
        <div className="max-w-2xl rounded-2xl ring-1 ring-border/60">
          <Accordion type="multiple" defaultValue={["a", "b"]}>
            <AccordionItem value="a">
              <AccordionTrigger>Primeiro</AccordionTrigger>
              <AccordionContent>
                Conteúdo do primeiro item.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Segundo</AccordionTrigger>
              <AccordionContent>
                Conteúdo do segundo item.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger>Terceiro</AccordionTrigger>
              <AccordionContent>
                Conteúdo do terceiro item.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Title</AccordionTrigger>
    <AccordionContent>Body</AccordionContent>
  </AccordionItem>
</Accordion>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Partes</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Accordion</strong> — raiz (
            <code className="font-mono text-xs">type</code>,{" "}
            <code className="font-mono text-xs">collapsible</code>,{" "}
            <code className="font-mono text-xs">defaultValue</code> /{" "}
            <code className="font-mono text-xs">value</code> controlado).
          </li>
          <li>
            <strong className="text-foreground">AccordionItem</strong> — item
            com <code className="font-mono text-xs">value</code> único.
          </li>
          <li>
            <strong className="text-foreground">AccordionTrigger</strong> —
            botão que expande/colapsa (ícones de seta via Hugeicons).
          </li>
          <li>
            <strong className="text-foreground">AccordionContent</strong> —{" "}
            região animada com o conteúdo.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Acessibilidade
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Triggers são botões nativos com estados ARIA geridos pelo Radix.
          </li>
          <li>
            Navegação por teclado:{" "}
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
              Tab
            </kbd>{" "}
            para foco,{" "}
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
              Space
            </kbd>{" "}
            /{" "}
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
              Enter
            </kbd>{" "}
            para alternar.
          </li>
          <li>
            Associe rótulos claros ao trigger; o conteúdo fica no fluxo quando
            expandido.
          </li>
        </ul>
      </section>
    </div>
  )
}
