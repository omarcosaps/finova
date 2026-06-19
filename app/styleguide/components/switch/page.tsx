"use client"

import * as React from "react"
import Link from "next/link"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
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

const SETTINGS = [
  {
    id: "notifications",
    label: "Notificações push",
    description: "Receber alertas em tempo real no dispositivo.",
    defaultChecked: true,
  },
  {
    id: "marketing",
    label: "E-mails promocionais",
    description: "Novidades, ofertas e conteúdo de produto.",
    defaultChecked: false,
  },
  {
    id: "analytics",
    label: "Telemetria anônima",
    description: "Ajuda a melhorar a experiência sem dados pessoais.",
    defaultChecked: true,
  },
] as const

type SettingId = (typeof SETTINGS)[number]["id"]

export default function SwitchShowcasePage() {
  const [settings, setSettings] = React.useState<Record<SettingId, boolean>>({
    notifications: true,
    marketing: false,
    analytics: true,
  })

  const [airplaneMode, setAirplaneMode] = React.useState(false)
  const [isDarkTheme, setIsDarkTheme] = React.useState(true)

  React.useEffect(() => {
    setIsDarkTheme(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleSetting = (id: SettingId, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: checked }))
  }

  const syncTheme = (checked: boolean) => {
    setIsDarkTheme(checked)
    document.documentElement.classList.toggle("dark", checked)
  }

  const activeCount = Object.values(settings).filter(Boolean).length

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Switch
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Controle booleano (Radix Switch) para alternar estados ligado/desligado.
          Ideal para preferências, configurações e toggles imediatos sem submissão
          de formulário.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Estados básicos</h2>
        <p className="text-sm text-muted-foreground">
          Comparação entre desligado e ligado.
        </p>
        <div className="flex flex-wrap items-center gap-8 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex items-center gap-3">
            <Switch id="basic-off" aria-label="Desligado" />
            <label htmlFor="basic-off" className="cursor-pointer text-sm text-foreground">
              Desligado
            </label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="basic-on" defaultChecked aria-label="Ligado" />
            <label htmlFor="basic-on" className="cursor-pointer text-sm text-foreground">
              Ligado
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Tamanhos</h2>
        <p className="text-sm text-muted-foreground">
          Prop <code className="font-mono text-xs">size</code>:{" "}
          <code className="font-mono text-xs">&quot;default&quot;</code> ou{" "}
          <code className="font-mono text-xs">&quot;sm&quot;</code>.
        </p>
        <div className="flex flex-wrap items-center gap-8 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex items-center gap-3">
            <Switch id="size-default" defaultChecked />
            <label htmlFor="size-default" className="text-sm text-foreground">
              Default
            </label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="size-sm" size="sm" defaultChecked />
            <label htmlFor="size-sm" className="text-sm text-foreground">
              Small
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com rótulo e descrição</h2>
        <p className="text-sm text-muted-foreground">
          Layout comum em painéis de configurações: rótulo à esquerda, switch à direita.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex max-w-md flex-col gap-4">
            {(
              [
                ["wifi", "Wi-Fi", "Conectar automaticamente a redes conhecidas."],
                ["bluetooth", "Bluetooth", "Permitir descoberta por dispositivos próximos."],
              ] as const
            ).map(([id, label, description]) => (
              <div
                key={id}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-0.5">
                  <label
                    htmlFor={`label-${id}`}
                    className="cursor-pointer text-sm font-medium text-foreground"
                  >
                    {label}
                  </label>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <Switch id={`label-${id}`} defaultChecked={id === "wifi"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Desabilitado</h2>
        <div className="flex flex-wrap items-center gap-8 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex items-center gap-3">
            <Switch id="disabled-off" disabled aria-label="Desligado desabilitado" />
            <label
              htmlFor="disabled-off"
              className="cursor-not-allowed text-sm text-muted-foreground"
            >
              Desligado (disabled)
            </label>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="disabled-on"
              defaultChecked
              disabled
              aria-label="Ligado desabilitado"
            />
            <label
              htmlFor="disabled-on"
              className="cursor-not-allowed text-sm text-muted-foreground"
            >
              Ligado (disabled)
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Inválido</h2>
        <p className="text-sm text-muted-foreground">
          Use <code className="font-mono text-xs">aria-invalid=&quot;true&quot;</code>{" "}
          para feedback de validação.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex items-center justify-between gap-4 max-w-md">
            <label htmlFor="invalid-switch" className="text-sm text-foreground">
              Aceitar termos obrigatórios
            </label>
            <Switch id="invalid-switch" aria-invalid="true" />
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
          em orientação horizontal.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Field orientation="horizontal" className="max-w-md justify-between">
            <div className="space-y-0.5">
              <FieldLabel htmlFor="field-showcase-2fa" className="font-normal">
                Autenticação em dois fatores
              </FieldLabel>
              <FieldDescription>
                Exige código adicional no login.
              </FieldDescription>
            </div>
            <Switch id="field-showcase-2fa" defaultChecked />
          </Field>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Demo interativa — preferências</h2>
        <p className="text-sm text-muted-foreground">
          Configurações ativas:{" "}
          <span className="font-mono text-foreground">{activeCount}</span> de{" "}
          {SETTINGS.length}.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex max-w-md flex-col gap-4">
            {SETTINGS.map(({ id, label, description }) => (
              <div
                key={id}
                className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-0.5">
                  <label
                    htmlFor={`setting-${id}`}
                    className="cursor-pointer text-sm font-medium text-foreground"
                  >
                    {label}
                  </label>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <Switch
                  id={`setting-${id}`}
                  checked={settings[id]}
                  onCheckedChange={(checked) => toggleSetting(id, checked)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Demo interativa — modo avião</h2>
        <p className="text-sm text-muted-foreground">
          Estado atual:{" "}
          <span
            className={cn(
              "font-mono text-sm",
              airplaneMode ? "text-destructive" : "text-foreground"
            )}
          >
            {airplaneMode ? "ativado" : "desativado"}
          </span>
          . Quando ligado, conexões sem fio ficam bloqueadas na UI de exemplo.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex max-w-md items-center justify-between gap-4">
            <div className="space-y-0.5">
              <label
                htmlFor="airplane-mode"
                className="cursor-pointer text-sm font-medium text-foreground"
              >
                Modo avião
              </label>
              <p className="text-xs text-muted-foreground">
                Desativa Wi-Fi, Bluetooth e dados móveis.
              </p>
            </div>
            <Switch
              id="airplane-mode"
              checked={airplaneMode}
              onCheckedChange={setAirplaneMode}
              aria-describedby="airplane-mode-hint"
            />
          </div>
          <p
            id="airplane-mode-hint"
            className={cn(
              "mt-4 rounded-lg px-3 py-2 text-xs",
              airplaneMode
                ? "bg-destructive/10 text-destructive"
                : "bg-muted/60 text-muted-foreground"
            )}
          >
            {airplaneMode
              ? "Conexões desativadas — ligue o modo avião para restaurar."
              : "Todas as conexões disponíveis."}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Demo interativa — tema</h2>
        <p className="text-sm text-muted-foreground">
          Switch controlado que alterna a classe{" "}
          <code className="font-mono text-xs">dark</code> no{" "}
          <code className="font-mono text-xs">documentElement</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex max-w-md items-center justify-between gap-4">
            <label
              htmlFor="theme-switch"
              className="cursor-pointer text-sm font-medium text-foreground"
            >
              Tema escuro
            </label>
            <Switch
              id="theme-switch"
              checked={isDarkTheme}
              onCheckedChange={syncTheme}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Design tokens</h2>
        <p className="text-sm text-muted-foreground">
          O Switch reutiliza tokens semânticos de{" "}
          <code className="font-mono text-xs">app/globals.css</code>. Não há
          variáveis CSS dedicadas — o componente mapeia estados para tokens
          compartilhados do design system.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">Token / classe</th>
                <th className="px-4 py-3 font-medium text-foreground">Uso no Switch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">bg-input</td>
                <td className="px-4 py-3 text-muted-foreground">Trilho no estado desligado</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">dark:bg-input/80</td>
                <td className="px-4 py-3 text-muted-foreground">Trilho desligado em dark mode</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">bg-ring</td>
                <td className="px-4 py-3 text-muted-foreground">Trilho no estado ligado (--ring)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">bg-background</td>
                <td className="px-4 py-3 text-muted-foreground">Polegar desligado em light mode</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">dark:bg-foreground</td>
                <td className="px-4 py-3 text-muted-foreground">Polegar desligado em dark mode</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">bg-primary-foreground</td>
                <td className="px-4 py-3 text-muted-foreground">Polegar ligado em light mode</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">dark:bg-foreground</td>
                <td className="px-4 py-3 text-muted-foreground">Polegar ligado em dark mode</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">ring-ring/50</td>
                <td className="px-4 py-3 text-muted-foreground">Anel de foco visível</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">border-destructive</td>
                <td className="px-4 py-3 text-muted-foreground">Estado aria-invalid</td>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">checked</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Modo controlado: estado ligado/desligado.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">defaultChecked</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Estado inicial em modo não controlado.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">onCheckedChange</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  (checked: boolean) =&gt; void
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Callback quando o usuário alterna o switch.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">disabled</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Impede interação e reduz opacidade.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">size</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  &quot;default&quot; | &quot;sm&quot;
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Dimensão do trilho e do polegar.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">required</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Marca o campo como obrigatório em formulários.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">name</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Nome do input em submissão de formulário nativo.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Classes Tailwind adicionais no root.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import { Switch } from "@/components/ui/switch"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`// Não controlado
<div className="flex items-center justify-between gap-4">
  <label htmlFor="notifications">Notificações</label>
  <Switch id="notifications" defaultChecked />
</div>

// Controlado
const [enabled, setEnabled] = React.useState(false)

<Switch
  id="sync"
  checked={enabled}
  onCheckedChange={setEnabled}
/>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            O Radix expõe <code className="font-mono text-xs">role=&quot;switch&quot;</code>{" "}
            com <code className="font-mono text-xs">aria-checked</code>{" "}
            (<code className="font-mono text-xs">true</code> ou{" "}
            <code className="font-mono text-xs">false</code>).
          </li>
          <li>
            Associe cada switch a um rótulo com{" "}
            <code className="font-mono text-xs">htmlFor</code> igual ao{" "}
            <code className="font-mono text-xs">id</code>, ou use{" "}
            <code className="font-mono text-xs">aria-label</code> quando não houver rótulo visível.
          </li>
          <li>
            Ativação via teclado:{" "}
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
              Espaço
            </kbd>{" "}
            alterna o estado quando focado.
          </li>
          <li>
            Use <code className="font-mono text-xs">aria-invalid=&quot;true&quot;</code> para
            comunicar erro de validação a leitores de tela.
          </li>
          <li>
            Para seleções múltiplas independentes, prefira{" "}
            <Link
              href="/styleguide/components/checkbox"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Checkbox
            </Link>
            ; para opções exclusivas, use{" "}
            <Link
              href="/styleguide/components/radio-group"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Radio Group
            </Link>
            .
          </li>
        </ul>
      </section>
    </div>
  )
}
