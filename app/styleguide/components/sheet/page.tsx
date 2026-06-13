"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"

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

const sides = [
  { value: "right", label: "Right" },
  { value: "left", label: "Left" },
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
] as const

type SheetSide = (typeof sides)[number]["value"]

function InteractiveSheetDemo() {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState("Detalhes do projeto")
  const [description, setDescription] = React.useState(
    "Metadados, membros e integrações ativas neste workspace."
  )
  const [side, setSide] = React.useState<SheetSide>("right")
  const [showCloseButton, setShowCloseButton] = React.useState(true)
  const [showFooter, setShowFooter] = React.useState(true)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sheet-demo-title">Título</Label>
          <Input
            id="sheet-demo-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sheet-demo-side">Lado</Label>
          <Select value={side} onValueChange={(v) => setSide(v as SheetSide)}>
            <SelectTrigger id="sheet-demo-side">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sides.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="sheet-demo-description">Descrição</Label>
          <Input
            id="sheet-demo-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Switch
            id="sheet-demo-close"
            checked={showCloseButton}
            onCheckedChange={setShowCloseButton}
          />
          <span>Botão × no topo</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <Switch
            id="sheet-demo-footer"
            checked={showFooter}
            onCheckedChange={setShowFooter}
          />
          <span>Footer com ações</span>
        </label>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
        <Button variant="outline" size="sm" type="button" onClick={() => setOpen(true)}>
          Abrir sheet interativo
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side={side} showCloseButton={showCloseButton}>
            <SheetHeader>
              <SheetTitle>{title || "Sem título"}</SheetTitle>
              <SheetDescription>
                {description || "Sem descrição"}
              </SheetDescription>
            </SheetHeader>
            <div className="px-6 text-sm text-muted-foreground">
              <p>
                Conteúdo principal do painel lateral. Use sheets para filtros,
                detalhes secundários ou formulários que não precisam bloquear
                toda a tela como um dialog central.
              </p>
            </div>
            {showFooter ? (
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" size="sm">
                    Cancelar
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button size="sm">Salvar</Button>
                </SheetClose>
              </SheetFooter>
            ) : null}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default function SheetShowcasePage() {
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [formOpen, setFormOpen] = React.useState(false)

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Sheet
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Painel deslizante lateral (Radix Dialog). Complementa o Drawer em
          desktop: ideal para detalhes, filtros avançados e formulários
          secundários sem sair do contexto da página — usa tokens{" "}
          <code className="font-mono text-xs">popover</code>,{" "}
          <code className="font-mono text-xs">border</code> e{" "}
          <code className="font-mono text-xs">foreground</code>.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Demo interativo</h2>
        <p className="text-sm text-muted-foreground">
          Ajuste título, descrição, lado de abertura e visibilidade do botão × e
          do footer em tempo real.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <InteractiveSheetDemo />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com trigger</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">SheetTrigger</code> com{" "}
          <code className="font-mono text-xs">asChild</code> mantém foco ao
          abrir/fechar. Direção padrão:{" "}
          <code className="font-mono text-xs">right</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                Ver detalhes
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Exportar relatório</SheetTitle>
                <SheetDescription>
                  Um link assinado chega por e-mail quando o arquivo estiver pronto.
                </SheetDescription>
              </SheetHeader>
              <p className="px-6 text-sm text-muted-foreground">
                Estimativa: menos de dois minutos para o intervalo padrão.
              </p>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" size="sm">
                    Voltar
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button size="sm">Iniciar exportação</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Lados (side)</h2>
        <p className="text-sm text-muted-foreground">
          Prop <code className="font-mono text-xs">side</code> em{" "}
          <code className="font-mono text-xs">SheetContent</code> controla
          posição e animação via{" "}
          <code className="font-mono text-xs">data-[side=…]</code>.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {sides.map(({ value, label }) => (
            <div
              key={value}
              className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60"
            >
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" size="sm">
                    {label}
                  </Button>
                </SheetTrigger>
                <SheetContent side={value}>
                  <SheetHeader>
                    <SheetTitle>Sheet {label.toLowerCase()}</SheetTitle>
                    <SheetDescription>
                      Conteúdo desliza a partir da borda{" "}
                      <code className="font-mono text-xs">{value}</code>.
                    </SheetDescription>
                  </SheetHeader>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button size="sm">Fechar</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Controlado só por estado
        </h2>
        <p className="text-sm text-muted-foreground">
          Sem <code className="font-mono text-xs">SheetTrigger</code>: usa{" "}
          <code className="font-mono text-xs">open</code> +{" "}
          <code className="font-mono text-xs">onOpenChange</code> quando a
          abertura vem de fluxo assíncrono ou de outra área da tela.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => setConfirmOpen(true)}
            >
              Abrir programaticamente
            </Button>
          </div>
          <Sheet open={confirmOpen} onOpenChange={setConfirmOpen}>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Confirmar ação?</SheetTitle>
                <SheetDescription>
                  Exemplo apenas para estado controlado: nenhuma alteração real
                  é aplicada ao fechar.
                </SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                >
                  Confirmar
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Formulário curto</h2>
        <p className="text-sm text-muted-foreground">
          Campos dentro do mesmo{" "}
          <code className="font-mono text-xs">SheetContent</code>; fecha com{" "}
          <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
            Esc
          </kbd>
          , overlay ou botão ×.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Sheet open={formOpen} onOpenChange={setFormOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                Convidar membro
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Convite por e-mail</SheetTitle>
                <SheetDescription>
                  A pessoa recebe um link com papel de visualizadora por padrão.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-2 px-6">
                <label
                  htmlFor="sheet-invite-email"
                  className="text-sm font-medium text-foreground"
                >
                  E-mail
                </label>
                <Input
                  id="sheet-invite-email"
                  type="email"
                  autoComplete="email"
                  placeholder="colega@empresa.com"
                />
              </div>
              <SheetFooter>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setFormOpen(false)}
                >
                  Cancelar
                </Button>
                <Button size="sm" type="button" onClick={() => setFormOpen(false)}>
                  Enviar
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Sem botão × no topo</h2>
        <p className="text-sm text-muted-foreground">
          Prop{" "}
          <code className="font-mono text-xs">{`showCloseButton={false}`}</code>{" "}
          no conteúdo — ótimo quando a decisão fica apenas nos botões da base.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="sm">
                Abrir fluxo obrigatório (demo)
              </Button>
            </SheetTrigger>
            <SheetContent showCloseButton={false}>
              <SheetHeader>
                <SheetTitle>Termos atualizados</SheetTitle>
                <SheetDescription>
                  Leia o resumo e escolha continuar ou sair para revisar mais tarde.
                </SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" size="sm">
                    Sair por agora
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button size="sm">Continuar</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Conteúdo rolável</h2>
        <p className="text-sm text-muted-foreground">
          Limite altura da área com <code className="font-mono text-xs">max-h</code>{" "}
          + <code className="font-mono text-xs">overflow-y-auto</code> dentro do
          sheet.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                Ler política curta (scroll)
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Política de retenção</SheetTitle>
                <SheetDescription>
                  Extrato sintético apenas para fins de demo na styleguide.
                </SheetDescription>
              </SheetHeader>
              <div className="max-h-[240px] overflow-y-auto px-6 text-sm text-muted-foreground">
                {Array.from({ length: 8 }, (_, i) => (
                  <p key={i} className="mb-3 last:mb-0">
                    Parágrafo {i + 1}. Dados de uso são pseudonimizados após{" "}
                    {30 + i} dias quando o workspace ficar ocioso. Exportações
                    ficam disponíveis por sete dias antes da expiração automática
                    dos links públicos compartilhados.
                  </p>
                ))}
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button size="sm">Entendi</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Variáveis e tokens</h2>
        <p className="text-sm text-muted-foreground">
          O Sheet reutiliza tokens semânticos de{" "}
          <code className="font-mono text-xs">globals.css</code>, alinhados ao
          Dialog e Drawer.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">
                  Token / classe
                </th>
                <th className="px-4 py-3 font-medium text-foreground">
                  Uso no Sheet
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  --popover / bg-popover
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Fundo do painel deslizante.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  ring-foreground/5
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Anel sutil no painel (mesmo padrão do Dialog).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  --border / border-border
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Borda na aresta exposta ao viewport.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  bg-black/80 + backdrop-blur-xs
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Overlay escurecido.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Título</SheetTitle>
      <SheetDescription>Contexto para leitores de tela.</SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">Fechar</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Título sempre presente (
            <code className="font-mono text-xs">SheetTitle</code>).
          </li>
          <li>
            Foco retorna ao gatilho ao fechar;{" "}
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
              Esc
            </kbd>{" "}
            fecha o sheet.
          </li>
          <li>
            Confirme se fechar por overlay está ok para formulários não salvos.
          </li>
        </ul>
      </section>
    </div>
  )
}
