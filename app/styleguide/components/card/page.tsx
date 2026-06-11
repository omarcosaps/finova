"use client"

import * as React from "react"
import Link from "next/link"
import { DsIcon, Icons } from "@/app/styleguide/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

type CardSize = "default" | "sm"

function InteractiveCardDemo() {
  const [title, setTitle] = React.useState("Plano Pro")
  const [description, setDescription] = React.useState(
    "Ideal para equipes em crescimento com limites ampliados."
  )
  const [size, setSize] = React.useState<CardSize>("default")
  const [showDescription, setShowDescription] = React.useState(true)
  const [showAction, setShowAction] = React.useState(true)
  const [showFooter, setShowFooter] = React.useState(true)
  const [headerDivider, setHeaderDivider] = React.useState(true)
  const [footerDivider, setFooterDivider] = React.useState(false)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="card-demo-title">Título</Label>
          <Input
            id="card-demo-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="card-demo-description">Descrição</Label>
          <Input
            id="card-demo-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Switch
            id="card-demo-size"
            checked={size === "sm"}
            onCheckedChange={(checked) => setSize(checked ? "sm" : "default")}
          />
          <span className="ml-2">Tamanho sm</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Switch
            id="card-demo-desc"
            checked={showDescription}
            onCheckedChange={setShowDescription}
          />
          <span className="ml-2">Descrição</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Switch
            id="card-demo-action"
            checked={showAction}
            onCheckedChange={setShowAction}
          />
          <span className="ml-2">Ação no header</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Switch
            id="card-demo-footer"
            checked={showFooter}
            onCheckedChange={setShowFooter}
          />
          <span className="ml-2">Footer</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Switch
            id="card-demo-header-div"
            checked={headerDivider}
            onCheckedChange={setHeaderDivider}
          />
          <span className="ml-2">Divisor no header</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Switch
            id="card-demo-footer-div"
            checked={footerDivider}
            onCheckedChange={setFooterDivider}
          />
          <span className="ml-2">Divisor no footer</span>
        </label>
      </div>

      <Card size={size} className="max-w-md">
        <CardHeader
          className={cn(headerDivider && "border-b border-border")}
        >
          <CardTitle>{title || "Sem título"}</CardTitle>
          {showDescription ? (
            <CardDescription>{description || "Sem descrição"}</CardDescription>
          ) : null}
          {showAction ? (
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="Mais opções">
                <DsIcon icon={Icons.moreHorizontal} />
              </Button>
            </CardAction>
          ) : null}
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            R$ 149,00/mês · 10 usuários · Suporte prioritário.
          </p>
        </CardContent>
        {showFooter ? (
          <CardFooter
            className={cn(
              "gap-2",
              footerDivider && "border-t border-border"
            )}
          >
            <Button size="sm">Assinar</Button>
            <Button size="sm" variant="outline">
              Comparar
            </Button>
          </CardFooter>
        ) : null}
      </Card>
    </div>
  )
}

export default function CardShowcasePage() {
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>("pro")

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "R$ 49",
      description: "Para freelancers e micro equipes.",
    },
    {
      id: "pro",
      name: "Pro",
      price: "R$ 149",
      description: "Limites ampliados e integrações.",
      badge: "Popular",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Sob consulta",
      description: "SLA, SSO e suporte dedicado.",
    },
  ] as const

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Card
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Superfície elevada para agrupar conteúdo relacionado: título, descrição,
          corpo e ações. Usa tokens{" "}
          <code className="font-mono text-xs">card</code> e{" "}
          <code className="font-mono text-xs">--card-spacing</code> para ritmo
          interno consistente.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Anatomia básica</h2>
        <p className="text-sm text-muted-foreground">
          Composição padrão com header, content e footer.
        </p>
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Resumo da fatura</CardTitle>
            <CardDescription>
              Período de 01/05 a 31/05 · vencimento em 10/06.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
              R$ 4.280,00
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Limite disponível: R$ 15.720,00
            </p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">Pagar fatura</Button>
            <Button size="sm" variant="outline">
              Ver detalhes
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Tamanhos</h2>
        <p className="text-sm text-muted-foreground">
          Prop <code className="font-mono text-xs">size</code>:{" "}
          <code className="font-mono text-xs">&quot;default&quot;</code> ajusta{" "}
          <code className="font-mono text-xs">--card-spacing</code> para{" "}
          <code className="font-mono text-xs">--spacing(6)</code>;{" "}
          <code className="font-mono text-xs">&quot;sm&quot;</code> usa{" "}
          <code className="font-mono text-xs">--spacing(4)</code>.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Card size="default">
            <CardHeader>
              <CardTitle>Default</CardTitle>
              <CardDescription>Espaçamento padrão (24px).</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conteúdo do card.</p>
            </CardContent>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardTitle>Small</CardTitle>
              <CardDescription>Espaçamento compacto (16px).</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conteúdo do card.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com ação no header</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">CardAction</code> posiciona controles
          no canto superior direito via grid do header.
        </p>
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Últimas transações</CardTitle>
            <CardDescription>Atualizado há 2 minutos.</CardDescription>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="Opções da lista">
                <DsIcon icon={Icons.moreHorizontal} />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["Uber", "- R$ 32,40"],
              ["AWS", "- R$ 890,00"],
              ["Reembolso", "+ R$ 120,00"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-foreground">{label}</span>
                <span className="font-mono tabular-nums text-muted-foreground">
                  {value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com divisores</h2>
        <p className="text-sm text-muted-foreground">
          Use <code className="font-mono text-xs">border-b</code> no header ou{" "}
          <code className="font-mono text-xs">border-t</code> no footer para
          separar seções — padrão usado em telas como{" "}
          <Link
            href="/cartoes"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Meus Cartões
          </Link>
          .
        </p>
        <Card className="max-w-lg overflow-hidden">
          <CardHeader className="border-b border-border">
            <CardTitle>Resumo da fatura (final 4242)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Fatura atual
                </p>
                <p className="mt-1 text-xl font-semibold tabular-nums">R$ 4.280,00</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Limite disponível
                </p>
                <p className="mt-1 text-xl font-semibold tabular-nums text-success-foreground">
                  R$ 15.720,00
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border gap-2">
            <Button size="sm" variant="outline">
              Exportar
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Demo interativa — planos</h2>
        <p className="text-sm text-muted-foreground">
          Clique em um card para selecionar o plano. Selecionado:{" "}
          <span className="font-mono text-foreground">
            {selectedPlan ?? "nenhum"}
          </span>
          .
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id
            return (
              <Card
                key={plan.id}
                size="sm"
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => setSelectedPlan(plan.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setSelectedPlan(plan.id)
                  }
                }}
                className={cn(
                  "cursor-pointer transition-shadow outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  isSelected && "ring-2 ring-primary"
                )}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle>{plan.name}</CardTitle>
                    {"badge" in plan && plan.badge ? (
                      <Badge variant="secondary">{plan.badge}</Badge>
                    ) : null}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold tabular-nums">{plan.price}</p>
                  <p className="text-xs text-muted-foreground">/mês</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Demo interativa — builder</h2>
        <p className="text-sm text-muted-foreground">
          Monte um card em tempo real alternando seções, tamanho e divisores.
        </p>
        <div className="rounded-2xl border border-border bg-muted/20 p-6 ring-1 ring-border/60">
          <InteractiveCardDemo />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Design tokens</h2>
        <p className="text-sm text-muted-foreground">
          O Card consome tokens semânticos de{" "}
          <code className="font-mono text-xs">app/globals.css</code> e uma
          variável interna de espaçamento.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">Token / variável</th>
                <th className="px-4 py-3 font-medium text-foreground">Uso no Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">--card</td>
                <td className="px-4 py-3 text-muted-foreground">Fundo da superfície</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">--card-foreground</td>
                <td className="px-4 py-3 text-muted-foreground">Texto principal</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">--card-spacing</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Padding vertical, gap interno e padding horizontal dos filhos
                  (6 default · 4 em size sm)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">ring-border/60</td>
                <td className="px-4 py-3 text-muted-foreground">Contorno sutil da superfície</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">text-muted-foreground</td>
                <td className="px-4 py-3 text-muted-foreground">CardDescription e texto secundário</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">border-border</td>
                <td className="px-4 py-3 text-muted-foreground">Divisores opcionais no header/footer</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">rounded-2xl</td>
                <td className="px-4 py-3 text-muted-foreground">Raio alinhado ao ritmo do design system</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Subcomponentes</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">Componente</th>
                <th className="px-4 py-3 font-medium text-foreground">Descrição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">Card</td>
                <td className="px-4 py-3 text-muted-foreground">Container raiz com fundo, raio e ring</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">CardHeader</td>
                <td className="px-4 py-3 text-muted-foreground">Grid para título, descrição e ação</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">CardTitle</td>
                <td className="px-4 py-3 text-muted-foreground">Título semântico (font-heading)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">CardDescription</td>
                <td className="px-4 py-3 text-muted-foreground">Subtítulo em muted-foreground</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">CardAction</td>
                <td className="px-4 py-3 text-muted-foreground">Slot de ação alinhado ao canto do header</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">CardContent</td>
                <td className="px-4 py-3 text-muted-foreground">Corpo principal com padding horizontal</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">CardFooter</td>
                <td className="px-4 py-3 text-muted-foreground">Barra de ações inferior (flex row)</td>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">size</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  &quot;default&quot; | &quot;sm&quot;
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Controla <code className="font-mono text-xs">--card-spacing</code> via{" "}
                  <code className="font-mono text-xs">data-size</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Classes Tailwind adicionais no container.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição opcional.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Conteúdo principal.</p>
  </CardContent>
  <CardFooter className="gap-2">
    <Button size="sm">Confirmar</Button>
    <Button size="sm" variant="outline">Cancelar</Button>
  </CardFooter>
</Card>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            O Card é um <code className="font-mono text-xs">div</code> sem role
            implícita — use headings reais (
            <code className="font-mono text-xs">CardTitle</code>) para estrutura.
          </li>
          <li>
            Cards clicáveis devem receber{" "}
            <code className="font-mono text-xs">role=&quot;button&quot;</code>,{" "}
            <code className="font-mono text-xs">tabIndex=&#123;0&#125;</code> e
            suporte a Enter/Espaço, ou envolver o conteúdo em um link/botão real.
          </li>
          <li>
            Ações no header via{" "}
            <code className="font-mono text-xs">CardAction</code> precisam de{" "}
            <code className="font-mono text-xs">aria-label</code> quando forem
            apenas ícone.
          </li>
          <li>
            Para estados vazios dentro de um card, combine com{" "}
            <Link
              href="/styleguide/components/empty"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Empty
            </Link>
            .
          </li>
        </ul>
      </section>
    </div>
  )
}
