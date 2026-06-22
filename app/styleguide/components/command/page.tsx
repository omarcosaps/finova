"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CalculatorIcon,
  Calendar03Icon,
  CreditCardIcon,
  Settings02Icon,
  SmileIcon,
  UserIcon,
} from "@hugeicons/core-free-icons"

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

export default function CommandShowcasePage() {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setDialogOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Command
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Paleta de comandos com busca e navegação por teclado (cmdk). Use inline
          para comboboxes ricas ou dentro de{" "}
          <code className="font-mono text-xs">CommandDialog</code> para atalhos globais
          estilo ⌘K.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Inline</h2>
        <p className="text-sm text-muted-foreground">
          Lista filtrável embutida em card ou popover; ideal para seleção rápida com
          muitas opções.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Command className="max-w-md border border-border shadow-sm">
            <CommandInput placeholder="Buscar ação..." />
            <CommandList>
              <CommandEmpty>Nenhum resultado.</CommandEmpty>
              <CommandGroup heading="Sugestões">
                <CommandItem>
                  <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
                  Calendário
                </CommandItem>
                <CommandItem>
                  <HugeiconsIcon icon={SmileIcon} strokeWidth={2} />
                  Buscar emoji
                </CommandItem>
                <CommandItem disabled>
                  <HugeiconsIcon icon={CalculatorIcon} strokeWidth={2} />
                  Calculadora (indisponível)
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Configurações">
                <CommandItem>
                  <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
                  Perfil
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} />
                  Cobrança
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} />
                  Preferências
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Command dialog</h2>
        <p className="text-sm text-muted-foreground">
          Envolve o mesmo conteúdo em um modal acessível. Nesta página,{" "}
          <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
            ⌘K
          </kbd>{" "}
          ou{" "}
          <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
            Ctrl+K
          </kbd>{" "}
          também abre a paleta abaixo.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <p className="mb-4 text-sm text-muted-foreground">
            Pressione{" "}
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
              ⌘K
            </kbd>{" "}
            ou use o botão.
          </p>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setDialogOpen(true)}
          >
            Abrir paleta
          </Button>
          <CommandDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title="Paleta de comandos"
            description="Busque uma ação ou navegue com as setas."
          >
            <Command>
              <CommandInput placeholder="Digite um comando ou busque..." />
              <CommandList>
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                <CommandGroup heading="Navegação">
                  <CommandItem onSelect={() => setDialogOpen(false)}>
                    <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
                    Ir para transações
                  </CommandItem>
                  <CommandItem onSelect={() => setDialogOpen(false)}>
                    <HugeiconsIcon icon={SmileIcon} strokeWidth={2} />
                    Ir para relatórios
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Conta">
                  <CommandItem onSelect={() => setDialogOpen(false)}>
                    <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
                    Perfil
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem onSelect={() => setDialogOpen(false)}>
                    <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} />
                    Configurações
                    <CommandShortcut>⌘,</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </CommandDialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Blocos exportados</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">Peça</th>
                <th className="px-4 py-3 font-medium text-foreground">Uso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">Command</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Root cmdk; recebe props de filtro como{" "}
                  <code className="font-mono text-xs">filter</code> e{" "}
                  <code className="font-mono text-xs">shouldFilter</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  CommandDialog
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Dialog + título/descrição sr-only; props de{" "}
                  <code className="font-mono text-xs">open</code> /{" "}
                  <code className="font-mono text-xs">onOpenChange</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  CommandInput
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Campo de busca com ícone; foco inicial em paletas modais.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  CommandList / Empty / Group / Item
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Lista rolável, estado vazio, agrupamento com heading e itens
                  selecionáveis.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  CommandShortcut
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Hint visual de atalho; não registra listener — implemente no app.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico (dialog)</h2>
        <CodeBlock>{`const [open, setOpen] = React.useState(false)

<CommandDialog open={open} onOpenChange={setOpen}>
  <Command>
    <CommandInput placeholder="Buscar..." />
    <CommandList>
      <CommandEmpty>Nada encontrado.</CommandEmpty>
      <CommandGroup heading="Ações">
        <CommandItem onSelect={() => setOpen(false)}>
          Nova transação
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</CommandDialog>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            <code className="font-mono text-xs">CommandDialog</code> inclui título e
            descrição para leitores de tela (visíveis só para SR).
          </li>
          <li>
            Setas movem o destaque; <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">Enter</kbd>{" "}
            confirma; digitação filtra itens automaticamente.
          </li>
          <li>
            Itens <code className="font-mono text-xs">disabled</code> ficam fora da
            seleção por teclado.
          </li>
          <li>
            Combine <code className="font-mono text-xs">onSelect</code> em{" "}
            <code className="font-mono text-xs">CommandItem</code> com navegação ou
            fechamento do dialog.
          </li>
        </ul>
      </section>
    </div>
  )
}
