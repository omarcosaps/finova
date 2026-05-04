"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HugeiconsIcon } from "@hugeicons/react"
import { InformationCircleIcon, FloppyDiskIcon } from "@hugeicons/core-free-icons"

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

export default function TooltipShowcasePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Tooltip
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Contexto auxiliar sob demanda (Radix Tooltip). Abre ao passar o ponteiro ou com foco por
          teclado; conteúdo curto só — para textos longos prefira Popover ou página de ajuda.
        </p>
        <p className="text-xs text-muted-foreground">
          O layout raiz (Server Component) envolve <code className="font-mono">children</code> com{" "}
          <code className="font-mono">AppProviders</code>, que registra{" "}
          <code className="font-mono">TooltipProvider</code> como boundary cliente. Demais seções
          abaixo aninham um provider só para demos de delay.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Triggers com botão</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">TooltipTrigger</code> com{" "}
          <code className="font-mono text-xs">asChild</code> repassa comportamento ao filho único (ex.:{" "}
          <code className="font-mono text-xs">Button</code>).
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  Hover ou foco
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Ação rápida sem ocupar espaço fixo na tela.
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Sobre esta view">
                  <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[280px]">
                Métricas agregadas nas últimas 24 h; filtros aplicam-se apenas a esta página.
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Lado e deslocamento</h2>
        <p className="text-sm text-muted-foreground">
          Props <code className="font-mono text-xs">side</code> e{" "}
          <code className="font-mono text-xs">sideOffset</code> em{" "}
          <code className="font-mono text-xs">TooltipContent</code> (preferir evitar clipping em modais ou scroll containers).
        </p>
        <div className="rounded-2xl border border-border bg-card p-10 ring-1 ring-border/60">
          <div className="grid gap-16 sm:grid-cols-3 sm:gap-12">
            <div className="flex justify-center sm:justify-start">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="sm">
                    right
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  Conteúdo à direita do trigger.
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="sm">
                    bottom
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={10}>
                  Abaixo (padrão).
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex justify-center sm:justify-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="sm">
                    top
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  Encima quando o fluxo cobre parte inferior da tabela.
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Botão desabilitado</h2>
        <p className="text-sm text-muted-foreground">
          Botões desabilitados não disparam hover; encapsule num{" "}
          <code className="font-mono text-xs">span</code> focável quando o tooltip ainda precisar
          explicar o bloqueio.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                tabIndex={0}
                className="inline-flex cursor-not-allowed rounded-4xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <Button
                  variant="outline"
                  size="icon-sm"
                  disabled
                  aria-label="Salvar"
                  className="pointer-events-none shadow-none"
                >
                  <HugeiconsIcon icon={FloppyDiskIcon} strokeWidth={2} />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>Salve após pelo menos uma alteração.</TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Delay no provider local</h2>
        <p className="text-sm text-muted-foreground">
          Um <code className="font-mono text-xs">TooltipProvider</code> interno redefine{" "}
          <code className="font-mono text-xs">delayDuration</code> apenas para seus descendentes
          (aqui ~500 ms antes de abrir).
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <TooltipProvider delayDuration={500}>
            <div className="flex flex-wrap gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    Demora mais
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Este subtree usa delay 500 ms.</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Props principais</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">Nome</th>
                <th className="px-4 py-3 font-medium text-foreground">Onde</th>
                <th className="px-4 py-3 font-medium text-foreground">Notas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  delayDuration
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  TooltipProvider
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Milissegundos antes de abrir; o projeto define <code className="font-mono text-xs">0</code>
                  {" "}no layout raiz.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  open / onOpenChange
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Tooltip (root)
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Modo controlado opcional quando integrado a outros estados da UI.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  disableHoverableContent
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  TooltipProvider
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Impede manter tooltip aberto movendo cursor para dentro do conteúdo.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  side / align / sideOffset
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  TooltipContent
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Posicionamento em relação ao trigger; há seta (Arrow) inclusa automaticamente.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Layout raiz</h2>
        <p className="text-sm text-muted-foreground mb-3">
          O           <code className="font-mono text-xs">TooltipProvider</code> vive num módulo com a diretiva{' '}
          <code className="font-mono text-xs">{`"use client"`}</code>; o layout importa o wrapper
          único <code className="font-mono text-xs">AppProviders</code> para manter{' '}
          <code className="font-mono text-xs">app/layout.tsx</code> como servidor (ex.: metadata).
        </p>
        <CodeBlock>{`// components/app-providers.tsx ("use client")
import { TooltipProvider } from "@/components/ui/tooltip"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>
}

// app/layout.tsx
import { AppProviders } from "@/components/app-providers"

<body>
  <AppProviders>{children}</AppProviders>
</body>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="sm">
      Hover
    </Button>
  </TooltipTrigger>
  <TooltipContent>Texto curto para contexto rápido.</TooltipContent>
</Tooltip>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            O trigger recebe associação ARIA ao conteúdo; garanta texto visível ou{" "}
            <code className="font-mono text-xs">aria-label</code> em ícones.
          </li>
          <li>
            Tooltip não substitui rótulos obrigatórios de formulário; use{" "}
            <code className="font-mono text-xs">&lt;label&gt;</code> para campos que precisam ser
            anunciados por padrão.
          </li>
          <li>
            Com wrappers em <code className="font-mono text-xs">span</code> para elementos
            disabled, exponha foco/teclado com <code className="font-mono text-xs">tabIndex=0</code>{" "}
            quando faz sentido.
          </li>
          <li>
            Conteúdo longo aumenta tempo de leitura; prefira texto conciso (idealmente até uma linha curta).
          </li>
        </ul>
      </section>
    </div>
  )
}
