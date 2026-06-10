"use client"

import * as React from "react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
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

const PERMISSIONS = [
  { id: "read", label: "Leitura" },
  { id: "write", label: "Escrita" },
  { id: "delete", label: "Exclusão" },
  { id: "admin", label: "Administração" },
] as const

const SELECT_ALL_ITEMS = [
  { id: "item-a", label: "Item A" },
  { id: "item-b", label: "Item B" },
  { id: "item-c", label: "Item C" },
] as const

type SelectAllItemId = (typeof SELECT_ALL_ITEMS)[number]["id"]

function getSelectAllChecked(
  selected: Record<SelectAllItemId, boolean>
): boolean | "indeterminate" {
  const values = Object.values(selected)
  const allChecked = values.every(Boolean)
  const someChecked = values.some(Boolean)

  if (allChecked) return true
  if (someChecked) return "indeterminate"
  return false
}

export default function CheckboxShowcasePage() {
  const [permissions, setPermissions] = React.useState<Record<string, boolean>>({
    read: true,
    write: false,
    delete: false,
    admin: false,
  })

  const [selectedItems, setSelectedItems] = React.useState<
    Record<SelectAllItemId, boolean>
  >({
    "item-a": false,
    "item-b": true,
    "item-c": false,
  })

  const selectAllChecked = getSelectAllChecked(selectedItems)
  const selectedCount = Object.values(selectedItems).filter(Boolean).length

  const togglePermission = (id: string, checked: boolean) => {
    setPermissions((prev) => ({ ...prev, [id]: checked }))
  }

  const toggleSelectAll = (checked: boolean | "indeterminate") => {
    const next = checked === true
    setSelectedItems({
      "item-a": next,
      "item-b": next,
      "item-c": next,
    })
  }

  const toggleItem = (id: SelectAllItemId, checked: boolean) => {
    setSelectedItems((prev) => ({ ...prev, [id]: checked }))
  }

  const activePermissions = PERMISSIONS.filter(({ id }) => permissions[id])
    .map(({ label }) => label)
    .join(", ") || "nenhuma"

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Checkbox
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Controle booleano (Radix Checkbox) para seleções múltiplas independentes.
          Suporta estados marcado, desmarcado, indeterminado, inválido e desabilitado.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Estados básicos</h2>
        <p className="text-sm text-muted-foreground">
          Comparação lado a lado entre desmarcado e marcado.
        </p>
        <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex items-center gap-3">
            <Checkbox id="basic-unchecked" />
            <label
              htmlFor="basic-unchecked"
              className="cursor-pointer text-sm text-foreground"
            >
              Desmarcado
            </label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="basic-checked" defaultChecked />
            <label
              htmlFor="basic-checked"
              className="cursor-pointer text-sm text-foreground"
            >
              Marcado
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com rótulo</h2>
        <p className="text-sm text-muted-foreground">
          Associe cada checkbox a um{" "}
          <code className="font-mono text-xs">label</code> via{" "}
          <code className="font-mono text-xs">htmlFor</code> e{" "}
          <code className="font-mono text-xs">id</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex max-w-md flex-col gap-3">
            {(
              [
                ["terms", "Aceito os termos de uso"],
                ["privacy", "Aceito a política de privacidade"],
                ["marketing", "Quero receber ofertas por e-mail"],
              ] as const
            ).map(([id, label]) => (
              <div key={id} className="flex items-center gap-3">
                <Checkbox id={`label-${id}`} />
                <label
                  htmlFor={`label-${id}`}
                  className="cursor-pointer text-sm leading-none text-foreground"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Desabilitado</h2>
        <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex items-center gap-3">
            <Checkbox id="disabled-unchecked" disabled />
            <label
              htmlFor="disabled-unchecked"
              className="cursor-not-allowed text-sm text-muted-foreground"
            >
              Desmarcado (disabled)
            </label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="disabled-checked" defaultChecked disabled />
            <label
              htmlFor="disabled-checked"
              className="cursor-not-allowed text-sm text-muted-foreground"
            >
              Marcado (disabled)
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
          <div className="flex items-center gap-3">
            <Checkbox id="invalid-checkbox" aria-invalid="true" />
            <label
              htmlFor="invalid-checkbox"
              className="cursor-pointer text-sm text-foreground"
            >
              Campo obrigatório não preenchido
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Indeterminado</h2>
        <p className="text-sm text-muted-foreground">
          Estado parcial com{" "}
          <code className="font-mono text-xs">checked=&quot;indeterminate&quot;</code>.
          Comum em seleção &quot;selecionar todos&quot;.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex items-center gap-3">
            <Checkbox
              id="indeterminate-checkbox"
              checked="indeterminate"
              disabled
              aria-label="Seleção parcial (demonstração)"
            />
            <label
              htmlFor="indeterminate-checkbox"
              className="cursor-not-allowed text-sm text-muted-foreground"
            >
              Seleção parcial (indeterminado)
            </label>
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
          <Field orientation="horizontal" className="max-w-md">
            <Checkbox id="field-showcase-newsletter" defaultChecked />
            <FieldLabel htmlFor="field-showcase-newsletter" className="font-normal">
              Receber newsletter com novidades do produto
            </FieldLabel>
          </Field>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Lista controlada</h2>
        <p className="text-sm text-muted-foreground">
          Permissões ativas:{" "}
          <span className="font-mono text-foreground">{activePermissions}</span>
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex max-w-md flex-col gap-3">
            {PERMISSIONS.map(({ id, label }) => (
              <div key={id} className="flex items-center gap-3">
                <Checkbox
                  id={`permission-${id}`}
                  checked={permissions[id]}
                  onCheckedChange={(value) => togglePermission(id, value === true)}
                />
                <label
                  htmlFor={`permission-${id}`}
                  className="cursor-pointer text-sm text-foreground"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Selecionar todos</h2>
        <p className="text-sm text-muted-foreground">
          Demo interativa com checkbox pai indeterminado. Selecionados:{" "}
          <span className="font-mono text-foreground">{selectedCount}</span> de{" "}
          {SELECT_ALL_ITEMS.length}.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex max-w-md flex-col gap-3">
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <Checkbox
                id="select-all"
                checked={selectAllChecked}
                onCheckedChange={toggleSelectAll}
                aria-label="Selecionar todos os itens"
              />
              <label
                htmlFor="select-all"
                className="cursor-pointer text-sm font-medium text-foreground"
              >
                Selecionar todos
              </label>
            </div>
            {SELECT_ALL_ITEMS.map(({ id, label }) => (
              <div key={id} className="flex items-center gap-3 pl-4">
                <Checkbox
                  id={`select-${id}`}
                  checked={selectedItems[id]}
                  onCheckedChange={(value) => toggleItem(id, value === true)}
                />
                <label
                  htmlFor={`select-${id}`}
                  className="cursor-pointer text-sm text-foreground"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Design tokens</h2>
        <p className="text-sm text-muted-foreground">
          O Checkbox reutiliza tokens semânticos compartilhados do design system.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">Token / classe</th>
                <th className="px-4 py-3 font-medium text-foreground">Uso no Checkbox</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">border-input</td>
                <td className="px-4 py-3 text-muted-foreground">Borda no estado default</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">bg-primary</td>
                <td className="px-4 py-3 text-muted-foreground">Fundo quando marcado</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">text-primary-foreground</td>
                <td className="px-4 py-3 text-muted-foreground">Ícone tick no indicador</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">ring-ring/50</td>
                <td className="px-4 py-3 text-muted-foreground">Anel de foco visível</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">border-destructive</td>
                <td className="px-4 py-3 text-muted-foreground">Estado aria-invalid</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">dark:bg-input/30</td>
                <td className="px-4 py-3 text-muted-foreground">Fundo sutil em dark mode</td>
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
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  boolean | &quot;indeterminate&quot;
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Modo controlado: estado atual do checkbox.
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
                  (checked: boolean | &quot;indeterminate&quot;) =&gt; void
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Callback quando o usuário altera o estado.
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Valor associado quando marcado em grupos de checkboxes.
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
        <CodeBlock>{`import { Checkbox } from "@/components/ui/checkbox"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`// Não controlado
<div className="flex items-center gap-3">
  <Checkbox id="terms" defaultChecked />
  <label htmlFor="terms">Aceito os termos</label>
</div>

// Controlado
const [checked, setChecked] = React.useState(false)

<Checkbox
  id="notify"
  checked={checked}
  onCheckedChange={(value) => setChecked(value === true)}
/>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            O Radix expõe <code className="font-mono text-xs">role=&quot;checkbox&quot;</code>{" "}
            com estados <code className="font-mono text-xs">aria-checked</code>{" "}
            (<code className="font-mono text-xs">true</code>,{" "}
            <code className="font-mono text-xs">false</code>,{" "}
            <code className="font-mono text-xs">mixed</code> para indeterminado).
          </li>
          <li>
            Associe cada checkbox a um rótulo com{" "}
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
            Em tabelas de dados, veja também o showcase de{" "}
            <Link
              href="/styleguide/components/data-table"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Data Table
            </Link>{" "}
            para seleção de linhas com estado indeterminado.
          </li>
        </ul>
      </section>
    </div>
  )
}
