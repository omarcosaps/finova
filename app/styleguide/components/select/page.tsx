"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

export default function SelectShowcasePage() {
  const [region, setRegion] = React.useState<string | undefined>(undefined)
  const [plan, setPlan] = React.useState("pro")

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Select
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Lista suspensa para escolher um valor entre opções (Radix Select).
          Estado não controlado com <code className="font-mono text-xs">defaultValue</code> ou
          controlado com <code className="font-mono text-xs">value</code> +{" "}
          <code className="font-mono text-xs">onValueChange</code>.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Trigger padrão
        </h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">SelectValue</code> com placeholder até haver seleção.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="grid max-w-xs gap-2">
            <label htmlFor="select-theme" className="text-sm font-medium text-foreground">
              Tema do editor
            </label>
            <Select defaultValue="system">
              <SelectTrigger id="select-theme" className="w-full">
                <SelectValue placeholder="Escolha um tema" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Tamanhos</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">size=&quot;sm&quot;</code> (h-8) e{" "}
          <code className="font-mono text-xs">size=&quot;default&quot;</code> (h-9) no trigger.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex flex-wrap items-end gap-4">
            <div className="grid gap-2">
              <span className="text-xs text-muted-foreground">Small</span>
              <Select defaultValue="apple">
                <SelectTrigger size="sm" aria-label="Fruta small">
                  <SelectValue placeholder="Fruta" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="apple">Maçã</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Laranja</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <span className="text-xs text-muted-foreground">Default</span>
              <Select defaultValue="banana">
                <SelectTrigger size="default" aria-label="Fruta default">
                  <SelectValue placeholder="Fruta" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="apple">Maçã</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Laranja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Grupos e separador</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">SelectGroup</code>,{" "}
          <code className="font-mono text-xs">SelectLabel</code> e{" "}
          <code className="font-mono text-xs">SelectSeparator</code> organizam categorias longas.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Select defaultValue="next">
            <SelectTrigger className="w-[min(100%,220px)]" aria-label="Framework">
              <SelectValue placeholder="Framework" />
            </SelectTrigger>
            <SelectContent position="popper" className="max-h-[min(280px,var(--radix-select-content-available-height))]">
              <SelectGroup>
                <SelectLabel>Meta-frameworks</SelectLabel>
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="nuxt">Nuxt</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>SPA</SelectLabel>
                <SelectItem value="vite">Vite + React</SelectItem>
                <SelectItem value="remix">Remix</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Item desabilitado</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">disabled</code> em{" "}
          <code className="font-mono text-xs">SelectItem</code> remove interação e reduz opacidade.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Select defaultValue="solo">
            <SelectTrigger className="w-[200px]" aria-label="Tipo de projeto">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="solo">Solo dev</SelectItem>
              <SelectItem value="team">Time pequeno</SelectItem>
              <SelectItem value="enterprise" disabled>
                Enterprise (indisponível)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Estado invalidado</h2>
        <p className="text-sm text-muted-foreground">
          Combine com validação de formulário passando{" "}
          <code className="font-mono text-xs">aria-invalid</code> no trigger (ex.: após submit).
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Select>
            <SelectTrigger className="w-full max-w-xs" aria-invalid aria-label="Campo obrigatório">
              <SelectValue placeholder="Selecione uma opção..." />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="a">Opção A</SelectItem>
              <SelectItem value="b">Opção B</SelectItem>
            </SelectContent>
          </Select>
          <p className="mt-2 text-xs text-destructive">
            Este trigger usa aria-invalid apenas para demo visual.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Controlado</h2>
        <p className="text-sm text-muted-foreground">
          Valores em estado React útil para fluxos dependentes ou envio ao servidor.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex max-w-md flex-col gap-4 sm:flex-row sm:items-end">
            <div className="grid flex-1 gap-2">
              <label htmlFor="select-region" className="text-sm font-medium text-foreground">
                Região
              </label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger id="select-region" className="w-full">
                  <SelectValue placeholder="Onde hospedar?" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="br">Brasil</SelectItem>
                  <SelectItem value="eu">UE</SelectItem>
                  <SelectItem value="us">EUA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid flex-1 gap-2">
              <span className="text-sm font-medium text-foreground">Plano atual</span>
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger className="w-full" aria-label="Plano">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <dl className="mt-6 grid gap-1 rounded-xl border border-border bg-muted/30 p-4 text-xs font-mono text-muted-foreground sm:grid-cols-2">
            <dt>region</dt>
            <dd className="text-foreground">{region ?? "(vazio)"}</dd>
            <dt>plan</dt>
            <dd className="text-foreground">{plan}</dd>
          </dl>
          <button
            type="button"
            className="mt-3 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            onClick={() => {
              setRegion(undefined)
              setPlan("pro")
            }}
          >
            Resetar região
          </button>
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
                <th className="px-4 py-3 font-medium text-foreground">Descrição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 text-muted-foreground">Select (root)</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Modo controlado: string do item ativo ou <code className="font-mono">undefined</code> para limpar quando suportado.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">defaultValue</td>
                <td className="px-4 py-3 text-muted-foreground">Select (root)</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Valor inicial em modo não controlado.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">onValueChange</td>
                <td className="px-4 py-3 text-muted-foreground">Select (root)</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Callback quando o usuário escolhe outra opção.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">Select (root)</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Desabilita todo o campo.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">size</td>
                <td className="px-4 py-3 text-muted-foreground">SelectTrigger</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <code className="font-mono">&quot;sm&quot; | &quot;default&quot;</code> — padrão{" "}
                  <code className="font-mono">&quot;default&quot;</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">SelectValue</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Texto quando nenhum valor está selecionado.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">position</td>
                <td className="px-4 py-3 text-muted-foreground">SelectContent</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <code className="font-mono">&quot;item-aligned&quot; | &quot;popper&quot;</code>. Use{" "}
                  <code className="font-mono">popper</code> em layouts empilhados ou com overflow oculto.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`<Select defaultValue="a">
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Escolha" />
  </SelectTrigger>
  <SelectContent position="popper">
    <SelectItem value="a">Opção A</SelectItem>
    <SelectItem value="b">Opção B</SelectItem>
  </SelectContent>
</Select>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            O Radix associa tipo <code className="font-mono text-xs">combobox</code> ao trigger; use{" "}
            <code className="font-mono text-xs">id</code> no trigger e{" "}
            <code className="font-mono text-xs">htmlFor</code> no rótulo visível.
          </li>
          <li>
            Quando não houver texto visível no rótulo, defina{" "}
            <code className="font-mono text-xs">aria-label</code> em{" "}
            <code className="font-mono text-xs">SelectTrigger</code>.
          </li>
          <li>
            Lista abre com <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
              Espaço
            </kbd>{" "}
            ou <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">Enter</kbd>
            ; setas navegam nos itens;{" "}
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">Esc</kbd> fecha.
          </li>
          <li>
            <code className="font-mono text-xs">aria-invalid</code> no trigger comunica erro de validação a leitores de tela.
          </li>
        </ul>
      </section>
    </div>
  )
}
