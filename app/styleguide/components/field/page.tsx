"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

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

export default function FieldShowcasePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Field
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Composição de campos de formulário: legenda, rótulo, descrição, agrupamento
          e mensagens de erro. Use{" "}
          <code className="font-mono text-xs">htmlFor</code> no{" "}
          <code className="font-mono text-xs">FieldLabel</code> e o mesmo{" "}
          <code className="font-mono text-xs">id</code> no controlo para associação acessível.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Importação</h2>
        <CodeBlock>{`import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Campo simples</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">Field</code> vertical (padrão) com{" "}
          <code className="font-mono text-xs">FieldLabel</code> e{" "}
          <code className="font-mono text-xs">Input</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="max-w-md">
            <Field>
              <FieldLabel htmlFor="field-email">Email</FieldLabel>
              <Input
                id="field-email"
                type="email"
                placeholder="nome@empresa.com"
                autoComplete="email"
              />
            </Field>
          </div>
        </div>
        <CodeBlock>{`<Field>
  <FieldLabel htmlFor="field-email">Email</FieldLabel>
  <Input id="field-email" type="email" placeholder="nome@empresa.com" />
</Field>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com descrição</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">FieldDescription</code> para texto de ajuda sob o controlo.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="max-w-md">
            <Field>
              <FieldLabel htmlFor="field-username">Nome de utilizador</FieldLabel>
              <Input id="field-username" placeholder="jdoe" autoComplete="username" />
              <FieldDescription>
                Só letras minúsculas, números e hífenes. Mínimo 3 caracteres.
              </FieldDescription>
            </Field>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Textarea</h2>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="max-w-md">
            <Field>
              <FieldLabel htmlFor="field-bio">Biografia</FieldLabel>
              <Textarea id="field-bio" placeholder="Conte-nos sobre si…" rows={4} />
              <FieldDescription>Máximo de 500 caracteres.</FieldDescription>
            </Field>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">FieldSet e FieldGroup</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">FieldSet</code> semântico com{" "}
          <code className="font-mono text-xs">FieldLegend</code>;{" "}
          <code className="font-mono text-xs">FieldSeparator</code> divide blocos.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <form className="max-w-md space-y-0">
            <FieldGroup>
              <FieldSet>
                <FieldLegend variant="label">Contacto</FieldLegend>
                <FieldDescription>
                  Estes dados aparecem na fatura.
                </FieldDescription>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="field-invoice-name">Nome</FieldLabel>
                    <Input id="field-invoice-name" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="field-invoice-vat">NIF</FieldLabel>
                    <Input id="field-invoice-vat" inputMode="numeric" />
                  </Field>
                </FieldGroup>
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend variant="label">Entrega</FieldLegend>
                <Field>
                  <FieldLabel htmlFor="field-address">Morada</FieldLabel>
                  <Input id="field-address" />
                </Field>
              </FieldSet>
            </FieldGroup>
          </form>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Orientação horizontal (checkbox)
        </h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">orientation=&quot;horizontal&quot;</code> alinha rótulo e controlo na mesma linha.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Field orientation="horizontal" className="max-w-md">
            <Checkbox id="field-newsletter" defaultChecked />
            <FieldLabel htmlFor="field-newsletter" className="font-normal">
              Receber newsletter com novidades do produto
            </FieldLabel>
          </Field>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Select dentro de Field</h2>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="max-w-xs">
            <Field>
              <FieldLabel htmlFor="field-country-trigger">País</FieldLabel>
              <Select defaultValue="pt">
                <SelectTrigger id="field-country-trigger" className="w-full">
                  <SelectValue placeholder="Escolha" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="pt">Portugal</SelectItem>
                  <SelectItem value="es">Espanha</SelectItem>
                  <SelectItem value="fr">França</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Estado desativado</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">data-disabled=&quot;true&quot;</code> no{" "}
          <code className="font-mono text-xs">Field</code> reduz opacidade do rótulo alinhado ao tema.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="max-w-md">
            <Field data-disabled="true">
              <FieldLabel htmlFor="field-locked">Campo bloqueado</FieldLabel>
              <Input id="field-locked" defaultValue="Não editável" disabled />
            </Field>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Validação</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">aria-invalid</code> no input ativa estilo de erro;{" "}
          <code className="font-mono text-xs">data-invalid=&quot;true&quot;</code> no{" "}
          <code className="font-mono text-xs">Field</code> para texto em destaque;{" "}
          <code className="font-mono text-xs">FieldError</code> com{" "}
          <code className="font-mono text-xs">role=&quot;alert&quot;</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="max-w-md">
            <Field data-invalid="true">
              <FieldLabel htmlFor="field-code">Código promocional</FieldLabel>
              <Input
                id="field-code"
                placeholder="SUMMER2026"
                aria-invalid
                aria-describedby="field-code-error"
              />
              <FieldError id="field-code-error">
                Código inválido ou expirado.
              </FieldError>
            </Field>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Props principais</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 font-medium text-foreground">Componente</th>
                <th className="px-4 py-3 font-medium text-foreground">Notas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">Field</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {" "}
                  <code className="font-mono text-xs">orientation</code>:{" "}
                  <code className="font-mono text-xs">vertical</code> (default),{" "}
                  <code className="font-mono text-xs">horizontal</code>,{" "}
                  <code className="font-mono text-xs">responsive</code>. Opcional:{" "}
                  <code className="font-mono text-xs">data-invalid</code>,{" "}
                  <code className="font-mono text-xs">data-disabled</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">FieldLabel</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Estende <code className="font-mono text-xs">Label</code>; use{" "}
                  <code className="font-mono text-xs">htmlFor</code> com o id do controlo.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">FieldDescription</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Parágrafo de ajuda; associe ao controlo com{" "}
                  <code className="font-mono text-xs">aria-describedby</code> quando necessário.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">FieldError</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Filhos ou prop <code className="font-mono text-xs">errors</code> (lista de objetos com{" "}
                  <code className="font-mono text-xs">message</code>).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">FieldLegend</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <code className="font-mono text-xs">variant</code>:{" "}
                  <code className="font-mono text-xs">legend</code> ou{" "}
                  <code className="font-mono text-xs">label</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Ligue cada <code className="font-mono text-xs">FieldLabel</code> ao controlo com{" "}
            <code className="font-mono text-xs">htmlFor</code> / <code className="font-mono text-xs">id</code>.
          </li>
          <li>
            Em erros, use <code className="font-mono text-xs">aria-invalid</code> e{" "}
            <code className="font-mono text-xs">aria-describedby</code> apontando para a descrição ou{" "}
            <code className="font-mono text-xs">FieldError</code>.
          </li>
          <li>
            <code className="font-mono text-xs">FieldSet</code> agrupa controlos relacionados; o leitor anuncia a legenda do conjunto.
          </li>
        </ul>
      </section>
    </div>
  )
}
