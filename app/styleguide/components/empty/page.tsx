"use client"

import * as React from "react"
import { DsIcon, Icons } from "@/app/styleguide/icons"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

type SurfaceStyle = "default" | "outline" | "muted"
type MediaStyle = "none" | "default" | "icon"

const SURFACE_CLASS: Record<SurfaceStyle, string> = {
  default: "",
  outline: "border border-dashed border-border",
  muted: "bg-muted/30",
}

function InteractiveEmptyDemo() {
  const [title, setTitle] = React.useState("Nenhum projeto ainda")
  const [description, setDescription] = React.useState(
    "Ainda não criou projetos. Comece pelo primeiro para ver tudo aqui."
  )
  const [surface, setSurface] = React.useState<SurfaceStyle>("outline")
  const [media, setMedia] = React.useState<MediaStyle>("icon")
  const [showActions, setShowActions] = React.useState(true)
  const [showLink, setShowLink] = React.useState(true)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="empty-title">Título</Label>
          <Input
            id="empty-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="empty-description">Descrição</Label>
          <Input
            id="empty-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="empty-surface">Superfície</Label>
          <select
            id="empty-surface"
            value={surface}
            onChange={(e) => setSurface(e.target.value as SurfaceStyle)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="default">Padrão</option>
            <option value="outline">Outline tracejado</option>
            <option value="muted">Fundo muted</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="empty-media">Mídia</Label>
          <select
            id="empty-media"
            value={media}
            onChange={(e) => setMedia(e.target.value as MediaStyle)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="none">Sem ícone</option>
            <option value="icon">Ícone (variant icon)</option>
            <option value="default">Ícone simples (variant default)</option>
          </select>
        </div>
        <div className="flex flex-col justify-end gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={showActions}
              onChange={(e) => setShowActions(e.target.checked)}
              className="size-4 rounded border-input"
            />
            Ações
          </label>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={showLink}
              onChange={(e) => setShowLink(e.target.checked)}
              className="size-4 rounded border-input"
            />
            Link secundário
          </label>
        </div>
      </div>

      <Empty className={cn("min-h-64", SURFACE_CLASS[surface])}>
        <EmptyHeader>
          {media !== "none" ? (
            <EmptyMedia variant={media === "icon" ? "icon" : "default"}>
              <DsIcon icon={Icons.gridView} className="size-6" />
            </EmptyMedia>
          ) : null}
          <EmptyTitle>{title || " "}</EmptyTitle>
          <EmptyDescription>{description || " "}</EmptyDescription>
        </EmptyHeader>
        {showActions ? (
          <EmptyContent className="flex-row justify-center gap-2">
            <Button size="sm">Criar projeto</Button>
            <Button size="sm" variant="outline">
              Importar
            </Button>
          </EmptyContent>
        ) : null}
        {showLink ? (
          <Button variant="link" asChild className="text-muted-foreground" size="sm">
            <a href="#">
              Saber mais
              <DsIcon icon={Icons.arrowUpRight} className="size-3.5" />
            </a>
          </Button>
        ) : null}
      </Empty>
    </div>
  )
}

export default function EmptyShowcasePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Empty
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Estado vazio composto para listas, painéis e fluxos sem dados. Usa tokens do tema (
          <code className="font-mono text-xs">muted</code>,{" "}
          <code className="font-mono text-xs">foreground</code>,{" "}
          <code className="font-mono text-xs">border</code>,{" "}
          <code className="font-mono text-xs">primary</code>) definidos em{" "}
          <code className="font-mono text-xs">app/globals.css</code>.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Composição básica</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">EmptyHeader</code> agrupa mídia, título e descrição;{" "}
          <code className="font-mono text-xs">EmptyContent</code> recebe CTAs ou formulários.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <DsIcon icon={Icons.gridView} />
              </EmptyMedia>
              <EmptyTitle>Nenhum projeto ainda</EmptyTitle>
              <EmptyDescription>
                Ainda não criou projetos. Comece pelo primeiro para ver tudo aqui.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button size="sm">Criar projeto</Button>
              <Button size="sm" variant="outline">
                Importar
              </Button>
            </EmptyContent>
            <Button variant="link" asChild className="text-muted-foreground" size="sm">
              <a href="#">
                Saber mais
                <DsIcon icon={Icons.arrowUpRight} className="size-3.5" />
              </a>
            </Button>
          </Empty>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Variantes de superfície</h2>
        <p className="text-sm text-muted-foreground">
          O root aceita utilitários Tailwind: tracejado com{" "}
          <code className="font-mono text-xs">border border-dashed border-border</code> ou fundo{" "}
          <code className="font-mono text-xs">bg-muted/30</code>.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-4 ring-1 ring-border/60">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Outline</p>
            <Empty className="border border-dashed border-border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <DsIcon icon={Icons.download} />
                </EmptyMedia>
                <EmptyTitle>Armazenamento vazio</EmptyTitle>
                <EmptyDescription>
                  Envie ficheiros para aceder em qualquer dispositivo.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" size="sm">
                  Enviar ficheiros
                </Button>
              </EmptyContent>
            </Empty>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 ring-1 ring-border/60">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Fundo muted</p>
            <Empty className="bg-muted/30">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <DsIcon icon={Icons.notification} />
                </EmptyMedia>
                <EmptyTitle>Sem notificações</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty">
                  Está em dia. Novas notificações aparecem aqui.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" size="sm">
                  Atualizar
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          EmptyMedia — variantes
        </h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">variant=&quot;icon&quot;</code> aplica{" "}
          <code className="font-mono text-xs">bg-muted</code> e caixa arredondada;{" "}
          <code className="font-mono text-xs">default</code> deixa a mídia transparente (útil para
          avatares ou ilustrações).
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-4 ring-1 ring-border/60">
            <p className="mb-3 text-xs font-medium text-muted-foreground">icon</p>
            <Empty className="border border-dashed border-border py-10">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <DsIcon icon={Icons.filter} />
                </EmptyMedia>
                <EmptyTitle>Sem resultados</EmptyTitle>
                <EmptyDescription>Ajuste os filtros e tente outra vez.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 ring-1 ring-border/60">
            <p className="mb-3 text-xs font-medium text-muted-foreground">default</p>
            <Empty className="border border-dashed border-border py-10">
              <EmptyHeader>
                <EmptyMedia variant="default">
                  <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                    DS
                  </div>
                </EmptyMedia>
                <EmptyTitle>Sem membros</EmptyTitle>
                <EmptyDescription>Convide a equipa para colaborar.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Demo interativa</h2>
        <p className="text-sm text-muted-foreground">
          Ajuste texto, superfície, mídia e ações para pré-visualizar combinações comuns.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <InteractiveEmptyDemo />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Tokens e variáveis CSS</h2>
        <p className="text-sm text-muted-foreground">
          O Empty não define variáveis próprias; reutiliza o tema global. Mapeamento principal:
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 font-medium text-foreground">Parte</th>
                <th className="px-4 py-3 font-medium text-foreground">Classe / token</th>
                <th className="px-4 py-3 font-medium text-foreground">Variável CSS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 text-foreground">EmptyTitle</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  font-heading, text-foreground
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  --foreground
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">EmptyDescription</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  text-muted-foreground
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  --muted-foreground
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">EmptyMedia (icon)</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  bg-muted, text-foreground
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  --muted, --foreground
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">Links na descrição</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  hover:text-primary
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  --primary
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">Outline (opcional)</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  border-border
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  --border
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">Fundo suave (opcional)</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  bg-muted/30
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  --muted
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">API resumida</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 font-medium text-foreground">Componente</th>
                <th className="px-4 py-3 font-medium text-foreground">Props / notas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">Empty</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Container flex centralizado; aceita{" "}
                  <code className="font-mono text-xs">className</code> para borda/fundo.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">EmptyHeader</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Agrupa mídia, título e descrição com{" "}
                  <code className="font-mono text-xs">max-w-sm</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">EmptyMedia</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <code className="font-mono text-xs">variant</code>:{" "}
                  <code className="font-mono text-xs">default</code> |{" "}
                  <code className="font-mono text-xs">icon</code> (default:{" "}
                  <code className="font-mono text-xs">default</code>).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">EmptyTitle</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Título semântico visual; use texto curto e orientado à ação.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">EmptyDescription</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Parágrafo auxiliar; suporta links com sublinhado e hover em{" "}
                  <code className="font-mono text-xs">primary</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">EmptyContent</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Área para botões, inputs ou links;{" "}
                  <code className="font-mono text-xs">max-w-sm</code> por padrão.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`<Empty className="border border-dashed border-border">
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <DsIcon icon={Icons.gridView} />
    </EmptyMedia>
    <EmptyTitle>Nenhum item</EmptyTitle>
    <EmptyDescription>
      Crie o primeiro registo para começar.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button size="sm">Adicionar</Button>
  </EmptyContent>
</Empty>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            O estado vazio é informativo: garanta que o título descreve o que está ausente e a
            descrição indica o próximo passo.
          </li>
          <li>
            Botões e links em <code className="font-mono text-xs">EmptyContent</code> mantêm foco
            visível via tokens <code className="font-mono text-xs">ring-ring</code> do{" "}
            <code className="font-mono text-xs">Button</code>.
          </li>
          <li>
            Ícones decorativos em <code className="font-mono text-xs">EmptyMedia</code> devem ter{" "}
            <code className="font-mono text-xs">aria-hidden</code> quando o título já comunica o
            contexto (ícones SVG do Hugeicons são ignorados por leitores se não tiverem nome
            acessível).
          </li>
          <li>
            Se o empty substituir uma tabela ou lista, anuncie a região com um heading visível (
            <code className="font-mono text-xs">EmptyTitle</code>) em vez de depender só do ícone.
          </li>
        </ul>
      </section>
    </div>
  )
}
