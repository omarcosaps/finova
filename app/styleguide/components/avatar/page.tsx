"use client"

import * as React from "react"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const DEMO_IMAGES = {
  shadcn: "https://github.com/shadcn.png",
  vercel: "https://github.com/vercel.png",
  radix: "https://github.com/radix-ui.png",
} as const

type AvatarSize = "sm" | "default" | "lg"
type BadgeTone = "primary" | "success" | "warning" | "destructive"

const BADGE_TONE_CLASS: Record<BadgeTone, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
}

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

function InteractiveAvatarDemo() {
  const [size, setSize] = React.useState<AvatarSize>("default")
  const [fallback, setFallback] = React.useState("MA")
  const [showImage, setShowImage] = React.useState(true)
  const [brokenImage, setBrokenImage] = React.useState(false)
  const [showBadge, setShowBadge] = React.useState(true)
  const [badgeTone, setBadgeTone] = React.useState<BadgeTone>("success")

  const imageSrc = brokenImage ? "https://invalid.example/avatar.png" : DEMO_IMAGES.shadcn

  const generatedCode = `<Avatar size="${size}">
  ${showImage ? `<AvatarImage src="${imageSrc}" alt="Utilizador" />\n  ` : ""}<AvatarFallback>${fallback || "??"}</AvatarFallback>
  ${showBadge ? `<AvatarBadge className="${BADGE_TONE_CLASS[badgeTone]}" />` : ""}
</Avatar>`

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="avatar-size">Tamanho</Label>
          <select
            id="avatar-size"
            value={size}
            onChange={(e) => setSize(e.target.value as AvatarSize)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="sm">sm (24px)</option>
            <option value="default">default (32px)</option>
            <option value="lg">lg (40px)</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatar-fallback">Fallback (iniciais)</Label>
          <Input
            id="avatar-fallback"
            value={fallback}
            maxLength={3}
            onChange={(e) => setFallback(e.target.value.toUpperCase())}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatar-badge-tone">Tom do badge</Label>
          <select
            id="avatar-badge-tone"
            value={badgeTone}
            disabled={!showBadge}
            onChange={(e) => setBadgeTone(e.target.value as BadgeTone)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50"
          >
            <option value="primary">primary</option>
            <option value="success">success (online)</option>
            <option value="warning">warning</option>
            <option value="destructive">destructive</option>
          </select>
        </div>
        <div className="flex flex-col justify-end gap-3 sm:flex-row sm:items-center lg:col-span-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={showImage}
              onChange={(e) => setShowImage(e.target.checked)}
              className="size-4 rounded border-input"
            />
            Mostrar imagem
          </label>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={brokenImage}
              disabled={!showImage}
              onChange={(e) => setBrokenImage(e.target.checked)}
              className="size-4 rounded border-input disabled:opacity-50"
            />
            Simular erro de carregamento
          </label>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={showBadge}
              onChange={(e) => setShowBadge(e.target.checked)}
              className="size-4 rounded border-input"
            />
            Badge de estado
          </label>
        </div>
      </div>

      <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 p-8">
        <Avatar size={size}>
          {showImage ? (
            <AvatarImage src={imageSrc} alt="Pré-visualização do avatar" />
          ) : null}
          <AvatarFallback delayMs={showImage && !brokenImage ? 600 : 0}>
            {fallback || "??"}
          </AvatarFallback>
          {showBadge ? (
            <AvatarBadge
              className={cn(BADGE_TONE_CLASS[badgeTone])}
              aria-hidden
            />
          ) : null}
        </Avatar>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Código gerado</p>
        <CodeBlock>{generatedCode}</CodeBlock>
      </div>
    </div>
  )
}

export default function AvatarShowcasePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Avatar
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Representação visual de utilizador ou entidade (Radix Avatar). Exibe foto quando
          disponível; caso contrário, mostra iniciais em{" "}
          <code className="font-mono text-xs">AvatarFallback</code>. Suporta tamanhos, badge de
          estado e agrupamento sobreposto.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Tamanhos</h2>
        <p className="text-sm text-muted-foreground">
          Prop <code className="font-mono text-xs">size</code> no root:{" "}
          <code className="font-mono text-xs">sm</code> (24px),{" "}
          <code className="font-mono text-xs">default</code> (32px),{" "}
          <code className="font-mono text-xs">lg</code> (40px).
        </p>
        <div className="flex flex-wrap items-end gap-6 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          {(["sm", "default", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Avatar size={size}>
                <AvatarImage src={DEMO_IMAGES.shadcn} alt="shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-mono text-xs text-muted-foreground">{size}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Imagem e fallback</h2>
        <p className="text-sm text-muted-foreground">
          O fallback aparece enquanto a imagem carrega ou quando o URL falha. Borda sutil via{" "}
          <code className="font-mono text-xs">after:border-border</code>.
        </p>
        <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <AvatarImage src={DEMO_IMAGES.shadcn} alt="Com foto" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">Com imagem</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
                AB
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">Só iniciais</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <AvatarImage src="https://invalid.example/avatar.png" alt="Erro" />
              <AvatarFallback delayMs={0}>ER</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">URL inválido</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Badge de estado</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">AvatarBadge</code> indica presença ou notificação.
          Use tokens semânticos (<code className="font-mono text-xs">success</code>,{" "}
          <code className="font-mono text-xs">warning</code>, etc.) via{" "}
          <code className="font-mono text-xs">className</code>.
        </p>
        <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          {(
            [
              ["primary", "primary", DEMO_IMAGES.vercel],
              ["success", "success", DEMO_IMAGES.shadcn],
              ["warning", "warning", DEMO_IMAGES.radix],
              ["destructive", "destructive", DEMO_IMAGES.shadcn],
            ] as const
          ).map(([label, tone, src]) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Avatar>
                <AvatarImage src={src} alt={label} />
                <AvatarFallback>{label.slice(0, 2).toUpperCase()}</AvatarFallback>
                <AvatarBadge className={BADGE_TONE_CLASS[tone as BadgeTone]} aria-hidden />
              </Avatar>
              <span className="font-mono text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Grupo sobreposto</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">AvatarGroup</code> empilha avatares com{" "}
          <code className="font-mono text-xs">-space-x-2</code> e anel{" "}
          <code className="font-mono text-xs">ring-background</code>.{" "}
          <code className="font-mono text-xs">AvatarGroupCount</code> resume membros extra.
        </p>
        <div className="flex flex-wrap items-center gap-8 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <AvatarGroup>
            <Avatar>
              <AvatarImage src={DEMO_IMAGES.shadcn} alt="Membro 1" />
              <AvatarFallback>M1</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src={DEMO_IMAGES.vercel} alt="Membro 2" />
              <AvatarFallback>M2</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+4</AvatarGroupCount>
          </AvatarGroup>
          <AvatarGroup className="*:data-[slot=avatar]:data-[size=lg]">
            <Avatar size="lg">
              <AvatarImage src={DEMO_IMAGES.radix} alt="Grande 1" />
              <AvatarFallback>G1</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src={DEMO_IMAGES.shadcn} alt="Grande 2" />
              <AvatarFallback>G2</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+2</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com nome (padrão de lista)</h2>
        <p className="text-sm text-muted-foreground">
          Combinação típica em menus, tabelas e cabeçalhos de perfil.
        </p>
        <div className="max-w-sm rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage src={DEMO_IMAGES.shadcn} alt="Marcos António" />
              <AvatarFallback>MA</AvatarFallback>
              <AvatarBadge className="bg-success" aria-hidden />
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                Marcos António
              </p>
              <p className="truncate text-xs text-muted-foreground">
                heymmark@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Demo interativa</h2>
        <p className="text-sm text-muted-foreground">
          Ajuste tamanho, fallback, imagem e badge; o snippet abaixo atualiza em tempo real.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <InteractiveAvatarDemo />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Tokens e variáveis CSS</h2>
        <p className="text-sm text-muted-foreground">
          O Avatar reutiliza o tema global definido em{" "}
          <code className="font-mono text-xs">globals.css</code>.
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
                <td className="px-4 py-3 text-foreground">AvatarFallback</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  bg-muted, text-muted-foreground
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  --muted, --muted-foreground
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">Borda do avatar</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  after:border-border
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  --border
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">AvatarBadge (padrão)</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  bg-primary, text-primary-foreground
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  --primary, --primary-foreground
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">Anel do grupo</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  ring-background
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  --background
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">AvatarGroupCount</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  bg-muted, text-muted-foreground
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  --muted, --muted-foreground
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">Estado online (custom)</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  bg-success
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  --success
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">Avatar</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <code className="font-mono text-xs">size?: &quot;sm&quot; | &quot;default&quot; | &quot;lg&quot;</code>{" "}
                  (padrão <code className="font-mono text-xs">&quot;default&quot;</code>). Aceita props do Radix Root.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">AvatarImage</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <code className="font-mono text-xs">src</code>,{" "}
                  <code className="font-mono text-xs">alt</code> obrigatório para acessibilidade quando a imagem é o conteúdo principal.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">AvatarFallback</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Iniciais ou ícone; <code className="font-mono text-xs">delayMs</code> controla atraso antes de mostrar (útil para evitar flash).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">AvatarBadge</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Indicador posicionado no canto; personalize cor com{" "}
                  <code className="font-mono text-xs">className</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">AvatarGroup</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Container flex com sobreposição; filhos devem ser{" "}
                  <code className="font-mono text-xs">Avatar</code> ou{" "}
                  <code className="font-mono text-xs">AvatarGroupCount</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">AvatarGroupCount</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Círculo com texto tipo <code className="font-mono text-xs">+3</code> para membros não exibidos.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="Utilizador" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Defina <code className="font-mono text-xs">alt</code> descritivo em{" "}
            <code className="font-mono text-xs">AvatarImage</code> quando a foto identifica a pessoa.
          </li>
          <li>
            O fallback é exposto a leitores de tela quando a imagem não está disponível; use
            iniciais curtas (1–2 caracteres).
          </li>
          <li>
            Badges puramente decorativos (ponto de presença) devem ter{" "}
            <code className="font-mono text-xs">aria-hidden</code>; se comunicarem estado, exponha
            texto adjacente (ex.: &quot;Online&quot;).
          </li>
          <li>
            Em listas com nome, associe avatar + texto num único bloco clicável quando for link ou
            botão de perfil.
          </li>
        </ul>
      </section>
    </div>
  )
}
