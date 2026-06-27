"use client"

import * as React from "react"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

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

export default function DatePickerShowcasePage() {
  const [date, setDate] = React.useState("2026-06-27")
  const [emptyDate, setEmptyDate] = React.useState("")
  const [invalidDate, setInvalidDate] = React.useState("")

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Date Picker
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Seletor de data com calendário em popover (Calendar + Popover). Valor
          controlado em <code className="font-mono text-xs">YYYY-MM-DD</code> e
          exibição formatada em português (pt-BR).
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <p className="text-sm text-muted-foreground">
          Modo controlado com <code className="font-mono text-xs">value</code> +{" "}
          <code className="font-mono text-xs">onChange</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="max-w-xs space-y-3">
            <DatePicker
              id="date-picker-basic"
              value={date}
              onChange={setDate}
            />
            <p className="text-xs text-muted-foreground">
              Valor: <code className="font-mono">{date || "—"}</code>
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com Field</h2>
        <p className="text-sm text-muted-foreground">
          Composição com <code className="font-mono text-xs">Field</code>, rótulo
          e mensagem de erro.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="max-w-xs">
            <Field data-invalid={!invalidDate ? true : undefined}>
              <FieldLabel htmlFor="date-picker-field">Data da transação</FieldLabel>
              <DatePicker
                id="date-picker-field"
                value={invalidDate}
                onChange={setInvalidDate}
                aria-invalid={!invalidDate ? true : undefined}
                aria-describedby={
                  !invalidDate ? "date-picker-field-error" : undefined
                }
              />
              {!invalidDate ? (
                <FieldError id="date-picker-field-error">
                  Selecione a data.
                </FieldError>
              ) : null}
            </Field>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Placeholder</h2>
        <p className="text-sm text-muted-foreground">
          Sem valor selecionado — exibe o placeholder configurável.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="max-w-xs">
            <DatePicker
              id="date-picker-empty"
              value={emptyDate}
              onChange={setEmptyDate}
              placeholder="Escolha uma data"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Disabled</h2>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="max-w-xs">
            <DatePicker
              id="date-picker-disabled"
              value="2026-01-15"
              disabled
            />
          </div>
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
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Data em <code className="font-mono">YYYY-MM-DD</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">onChange</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  (value: string) =&gt; void
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Callback ao selecionar uma data no calendário.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">placeholder</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Texto quando vazio. Padrão: &quot;Selecione a data&quot;.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">disabled</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Desabilita o trigger e impede abrir o calendário.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">id</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Repassado ao trigger; use com{" "}
                  <code className="font-mono">FieldLabel htmlFor</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">aria-invalid</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Estado de erro de validação (estilo + leitores de tela).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">aria-describedby</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Associa mensagem de erro via <code className="font-mono">FieldError</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import { DatePicker } from "@/components/ui/date-picker"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`const [date, setDate] = useState("2026-06-27")

<Field>
  <FieldLabel htmlFor="tx-date">Data</FieldLabel>
  <DatePicker
    id="tx-date"
    value={date}
    onChange={setDate}
  />
</Field>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Use <code className="font-mono text-xs">id</code> no trigger e{" "}
            <code className="font-mono text-xs">htmlFor</code> no rótulo visível.
          </li>
          <li>
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
              Espaço
            </kbd>{" "}
            ou{" "}
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
              Enter
            </kbd>{" "}
            abrem o popover; setas navegam no calendário;{" "}
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
              Esc
            </kbd>{" "}
            fecha.
          </li>
          <li>
            <code className="font-mono text-xs">aria-invalid</code> e{" "}
            <code className="font-mono text-xs">aria-describedby</code> integram
            com <code className="font-mono text-xs">Field</code> para erros de
            validação.
          </li>
          <li>
            O ícone de calendário é decorativo (<code className="font-mono text-xs">aria-hidden</code>).
          </li>
        </ul>
      </section>
    </div>
  )
}
