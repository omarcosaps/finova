"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"

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

const VARIANTS = [
  { variant: "default" as const, label: "Default", value: 55 },
  { variant: "accent" as const, label: "Accent", value: 55 },
  { variant: "success" as const, label: "Success", value: 55 },
  { variant: "warning" as const, label: "Warning", value: 55 },
  { variant: "destructive" as const, label: "Destructive", value: 55 },
]

const BUDGET_LIMITS = [
  { name: "Estoque", value: 80, variant: "accent" as const },
  { name: "Marketing", value: 80, variant: "warning" as const },
  { name: "Operacional", value: 96, variant: "destructive" as const },
]

export default function ProgressShowcasePage() {
  const [controlledValue, setControlledValue] = React.useState(45)

  const adjustValue = (delta: number) => {
    setControlledValue((prev) => Math.min(100, Math.max(0, prev + delta)))
  }

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Progress
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Indicador visual de conclusão ou consumo de um limite (Radix Progress).
          Use para uploads, metas, orçamentos e qualquer fluxo em que a porcentagem
          comunique progresso de forma imediata.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Estados básicos</h2>
        <p className="text-sm text-muted-foreground">
          Valores estáticos comuns: parcial, avançado e concluído.
        </p>
        <div className="space-y-6 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">33%</span>
              <span className="text-muted-foreground">Em andamento</span>
            </div>
            <Progress value={33} aria-label="Progresso 33 por cento" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">66%</span>
              <span className="text-muted-foreground">Quase lá</span>
            </div>
            <Progress value={66} aria-label="Progresso 66 por cento" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">100%</span>
              <span className="text-muted-foreground">Concluído</span>
            </div>
            <Progress value={100} aria-label="Progresso 100 por cento" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com Field</h2>
        <p className="text-sm text-muted-foreground">
          Integração com{" "}
          <Link
            href="/styleguide/components/field"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Field
          </Link>{" "}
          e <code className="font-mono text-xs">FieldLabel</code> para rótulo e barra
          alinhados.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Field className="max-w-md gap-2">
            <div className="flex items-center justify-between gap-4">
              <FieldLabel id="field-progress-label" htmlFor="field-progress">Sincronização</FieldLabel>
              <span className="text-sm tabular-nums text-muted-foreground">72%</span>
            </div>
            <Progress id="field-progress" value={72} aria-labelledby="field-progress-label" />
          </Field>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Variantes</h2>
        <p className="text-sm text-muted-foreground">
          Prop <code className="font-mono text-xs">variant</code> altera a cor do
          indicador para contextos semânticos (neutro, destaque, sucesso, alerta,
          crítico).
        </p>
        <div className="space-y-5 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          {VARIANTS.map(({ variant, label, value }) => (
            <div key={variant} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{label}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  variant=&quot;{variant}&quot;
                </span>
              </div>
              <Progress
                value={value}
                variant={variant}
                aria-label={`${label} ${value} por cento`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Controlado</h2>
        <p className="text-sm text-muted-foreground">
          Estado em React com botões para incrementar ou decrementar o valor em 10
          pontos.
        </p>
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-foreground">
              Valor atual:{" "}
              <span className="font-medium tabular-nums">{controlledValue}%</span>
            </span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => adjustValue(-10)}
                disabled={controlledValue <= 0}
              >
                −10
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => adjustValue(10)}
                disabled={controlledValue >= 100}
              >
                +10
              </Button>
            </div>
          </div>
          <Progress
            value={controlledValue}
            aria-label={`Progresso controlado ${controlledValue} por cento`}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Limites de orçamento (resumo)
        </h2>
        <p className="text-sm text-muted-foreground">
          Padrão típico em telas de resumo financeiro: cada categoria com percentual
          consumido e variante que sinaliza proximidade do limite.
        </p>
        <div className="space-y-5 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          {BUDGET_LIMITS.map(({ name, value, variant }) => (
            <div key={name} className="space-y-2">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="font-medium text-foreground">{name}</span>
                <span className="tabular-nums text-muted-foreground">{value}%</span>
              </div>
              <Progress
                value={value}
                variant={variant}
                aria-label={`${name} ${value} por cento do limite`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Design tokens</h2>
        <p className="text-sm text-muted-foreground">
          O Progress usa tokens semânticos de{" "}
          <code className="font-mono text-xs">app/globals.css</code>. O trilho e o
          indicador mapeiam para cores compartilhadas do design system.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">Token / classe</th>
                <th className="px-4 py-3 font-medium text-foreground">Uso no Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">bg-secondary</td>
                <td className="px-4 py-3 text-muted-foreground">Trilho (fundo da barra)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">bg-primary</td>
                <td className="px-4 py-3 text-muted-foreground">Indicador — variant default</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">bg-accent</td>
                <td className="px-4 py-3 text-muted-foreground">Indicador — variant accent</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">bg-success</td>
                <td className="px-4 py-3 text-muted-foreground">Indicador — variant success</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">bg-warning</td>
                <td className="px-4 py-3 text-muted-foreground">Indicador — variant warning</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">bg-destructive</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Indicador — variant destructive
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">h-2 rounded-full</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Altura e cantos do trilho
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Props principais</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">Nome</th>
                <th className="px-4 py-3 font-medium text-foreground">Tipo</th>
                <th className="px-4 py-3 font-medium text-foreground">Descrição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">number | null</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Porcentagem preenchida (0–100). Valores ausentes tratados como 0.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">variant</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  &quot;default&quot; | &quot;accent&quot; | &quot;success&quot; | &quot;warning&quot; |
                  &quot;destructive&quot;
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Cor semântica do indicador preenchido.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">max</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Valor máximo do Radix Progress (padrão 100).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Classes Tailwind adicionais no root (trilho).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">indicatorClassName</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Classes extras no indicador preenchido.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import { Progress } from "@/components/ui/progress"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`// Estático
<Progress value={66} aria-label="Upload 66 por cento" />

// Com variante semântica
<Progress value={80} variant="warning" aria-label="Marketing 80 por cento" />

// Controlado
const [value, setValue] = React.useState(45)

<Progress value={value} aria-label={\`Progresso \${value} por cento\`} />`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            O Radix expõe <code className="font-mono text-xs">role=&quot;progressbar&quot;</code>{" "}
            com <code className="font-mono text-xs">aria-valuenow</code>,{" "}
            <code className="font-mono text-xs">aria-valuemin</code> e{" "}
            <code className="font-mono text-xs">aria-valuemax</code> derivados de{" "}
            <code className="font-mono text-xs">value</code> e{" "}
            <code className="font-mono text-xs">max</code>.
          </li>
          <li>
            Forneça <code className="font-mono text-xs">aria-label</code> ou associe a
            um rótulo visível via{" "}
            <code className="font-mono text-xs">aria-labelledby</code> quando o contexto
            não for óbvio só pela barra.
          </li>
          <li>
            Não use apenas cor para comunicar limite crítico: combine variante com texto
            (porcentagem ou status) como no exemplo de orçamento.
          </li>
          <li>
            Animações de preenchimento respeitam{" "}
            <code className="font-mono text-xs">prefers-reduced-motion</code> quando
            configurado globalmente; evite atualizar{" "}
            <code className="font-mono text-xs">value</code> em intervalos muito curtos
            sem necessidade.
          </li>
          <li>
            Para tarefas indeterminadas (duração desconhecida), considere um padrão de
            loading dedicado em vez de Progress com valor fixo.
          </li>
        </ul>
      </section>
    </div>
  )
}
