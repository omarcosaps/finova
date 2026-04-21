"use client"

import * as React from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

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

export default function RadioGroupShowcasePage() {
  const [billing, setBilling] = React.useState("pro")

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Radio Group
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Grupo de opções exclusivas (Radix Radio Group). Um valor ativo por
          vez; use rótulos associados e, quando precisar, estado controlado em
          React.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Vertical — lista simples</h2>
        <p className="text-sm text-muted-foreground">
          Padrão com <code className="font-mono text-xs">gap-3</code> no root
          (densidade de UI).
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <RadioGroup defaultValue="comfortable" className="max-w-md gap-3">
            {(
              [
                ["default", "Default spacing"],
                ["comfortable", "Comfortable"],
                ["compact", "Compact"],
              ] as const
            ).map(([value, label]) => (
              <div key={value} className="flex items-center gap-3">
                <RadioGroupItem value={value} id={`density-${value}`} />
                <label
                  htmlFor={`density-${value}`}
                  className="cursor-pointer text-sm leading-none text-foreground"
                >
                  {label}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Horizontal</h2>
        <p className="text-sm text-muted-foreground">
          Alinhamento em linha com <code className="font-mono text-xs">flex</code>{" "}
          e quebra responsiva.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <RadioGroup
            defaultValue="all"
            className="flex flex-wrap gap-6"
            aria-label="Filtrar origem"
          >
            {(
              [
                ["all", "All"],
                ["tab", "Tab"],
                ["agent", "Agent"],
              ] as const
            ).map(([value, label]) => (
              <div key={value} className="flex items-center gap-2">
                <RadioGroupItem value={value} id={`src-${value}`} />
                <label
                  htmlFor={`src-${value}`}
                  className="cursor-pointer text-sm text-foreground"
                >
                  {label}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com descrição</h2>
        <p className="text-sm text-muted-foreground">
          Título + texto secundário para cada opção (billing, notificações).
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <RadioGroup defaultValue="weekly" className="max-w-lg gap-4">
            {(
              [
                {
                  id: "realtime",
                  title: "Tempo real",
                  desc: "Receba cada evento assim que ocorrer.",
                },
                {
                  id: "daily",
                  title: "Resumo diário",
                  desc: "Um e-mail por dia com o que importa.",
                },
                {
                  id: "weekly",
                  title: "Semanal",
                  desc: "Digest às segundas-feiras.",
                },
              ] as const
            ).map(({ id, title, desc }) => (
              <div key={id} className="flex gap-3">
                <RadioGroupItem
                  value={id}
                  id={`notify-${id}`}
                  className="mt-0.5"
                />
                <div className="grid gap-0.5">
                  <label
                    htmlFor={`notify-${id}`}
                    className="cursor-pointer text-sm font-medium text-foreground"
                  >
                    {title}
                  </label>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Opções em cartão</h2>
        <p className="text-sm text-muted-foreground">
          Cada opção em um bloco com borda; estado marcado realça com{" "}
          <code className="font-mono text-xs">ring</code> e fundo sutil.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <RadioGroup defaultValue="standard" className="grid gap-3 sm:grid-cols-3">
            {(
              [
                ["standard", "Standard", "Entrega em 5–7 dias"],
                ["express", "Express", "+R$ 15, 2 dias"],
                ["pickup", "Retirada", "Grátis no hub"],
              ] as const
            ).map(([value, title, sub]) => (
              <label
                key={value}
                htmlFor={`ship-${value}`}
                className={cn(
                  "relative flex cursor-pointer flex-col gap-2 rounded-xl border border-border p-4 transition-colors",
                  "has-[button:focus-visible]:ring-[3px] has-[button:focus-visible]:ring-ring/50",
                  "has-[button[data-state=checked]]:border-primary has-[button[data-state=checked]]:bg-muted/40"
                )}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={value} id={`ship-${value}`} />
                  <span className="text-sm font-medium text-foreground">
                    {title}
                  </span>
                </div>
                <p className="pl-7 text-xs text-muted-foreground">{sub}</p>
              </label>
            ))}
          </RadioGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com item desabilitado</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">disabled</code> no item impede
          seleção e reduz opacidade.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <RadioGroup defaultValue="beta" className="max-w-md gap-3">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="alpha" id="tier-alpha" />
              <label
                htmlFor="tier-alpha"
                className="cursor-pointer text-sm text-foreground"
              >
                Alpha (disponível)
              </label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="beta" id="tier-beta" />
              <label
                htmlFor="tier-beta"
                className="cursor-pointer text-sm text-foreground"
              >
                Beta (disponível)
              </label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="gamma" id="tier-gamma" disabled />
              <label
                htmlFor="tier-gamma"
                className="cursor-not-allowed text-sm text-muted-foreground"
              >
                Gamma (indisponível)
              </label>
            </div>
          </RadioGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Controlado</h2>
        <p className="text-sm text-muted-foreground">
          Valor em <code className="font-mono text-xs">useState</code> +{" "}
          <code className="font-mono text-xs">onValueChange</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <p className="mb-4 text-sm text-muted-foreground">
            Plano selecionado:{" "}
            <span className="font-mono text-foreground">{billing}</span>
          </p>
          <RadioGroup
            value={billing}
            onValueChange={setBilling}
            className="max-w-md gap-3"
          >
            {(
              [
                ["free", "Free", "R$ 0"],
                ["pro", "Pro", "R$ 29/mês"],
                ["team", "Team", "R$ 79/mês"],
              ] as const
            ).map(([value, name, price]) => (
              <div key={value} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={value} id={`plan-${value}`} />
                  <label
                    htmlFor={`plan-${value}`}
                    className="cursor-pointer text-sm font-medium text-foreground"
                  >
                    {name}
                  </label>
                </div>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {price}
                </span>
              </div>
            ))}
          </RadioGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`<RadioGroup defaultValue="a">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="a" id="a" />
    <label htmlFor="a">Opção A</label>
  </div>
</RadioGroup>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Associe cada <code className="font-mono text-xs">RadioGroupItem</code>{" "}
            a um <code className="font-mono text-xs">label</code> com{" "}
            <code className="font-mono text-xs">htmlFor</code> igual ao{" "}
            <code className="font-mono text-xs">id</code>.
          </li>
          <li>
            No grupo horizontal, defina{" "}
            <code className="font-mono text-xs">aria-label</code> no root quando
            não houver legenda visível.
          </li>
          <li>
            Itens <code className="font-mono text-xs">disabled</code> não recebem
            foco; o rótulo pode usar{" "}
            <code className="font-mono text-xs">cursor-not-allowed</code> para
            feedback visual.
          </li>
        </ul>
      </section>
    </div>
  )
}
