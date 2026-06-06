"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"

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

const directions = [
  { value: "bottom", label: "Bottom" },
  { value: "top", label: "Top" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
] as const

export default function DrawerShowcasePage() {
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [formOpen, setFormOpen] = React.useState(false)

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Drawer
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Painel deslizante com gesto de arraste (vaul). Ideal para ações contextuais,
          filtros e formulários curtos em mobile — usa tokens{" "}
          <code className="font-mono text-xs">popover</code>,{" "}
          <code className="font-mono text-xs">border</code> e{" "}
          <code className="font-mono text-xs">muted</code>.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com trigger</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">DrawerTrigger</code> com{" "}
          <code className="font-mono text-xs">asChild</code> mantém foco ao abrir/fechar.
          Direção padrão: <code className="font-mono text-xs">bottom</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">
                Abrir painel
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Exportar relatório</DrawerTitle>
                <DrawerDescription>
                  Um link assinado chega por e-mail quando o arquivo estiver pronto.
                </DrawerDescription>
              </DrawerHeader>
              <p className="px-4 text-sm text-muted-foreground">
                Estimativa: menos de dois minutos para o intervalo padrão.
              </p>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline" size="sm">
                    Voltar
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button size="sm">Iniciar exportação</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Direções</h2>
        <p className="text-sm text-muted-foreground">
          Prop <code className="font-mono text-xs">direction</code> no root controla posição e
          animação via <code className="font-mono text-xs">data-[vaul-drawer-direction]</code>.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {directions.map(({ value, label }) => (
            <div
              key={value}
              className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60"
            >
              <Drawer direction={value}>
                <DrawerTrigger asChild>
                  <Button variant="secondary" size="sm">
                    {label}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Drawer {label.toLowerCase()}</DrawerTitle>
                    <DrawerDescription>
                      Conteúdo desliza a partir da borda{" "}
                      <code className="font-mono text-xs">{value}</code>.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button size="sm">Fechar</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Controlado só por estado
        </h2>
        <p className="text-sm text-muted-foreground">
          Sem <code className="font-mono text-xs">DrawerTrigger</code>: usa{" "}
          <code className="font-mono text-xs">open</code> +{" "}
          <code className="font-mono text-xs">onOpenChange</code> quando a abertura vem de fluxo
          assíncrono ou de outra área da tela.
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
          <Drawer open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Confirmar ação?</DrawerTitle>
                <DrawerDescription>
                  Exemplo apenas para estado controlado: nenhuma alteração real é aplicada ao fechar.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                >
                  Cancelar
                </Button>
                <Button size="sm" type="button" onClick={() => setConfirmOpen(false)}>
                  Confirmar
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Formulário curto</h2>
        <p className="text-sm text-muted-foreground">
          Campos dentro do mesmo <code className="font-mono text-xs">DrawerContent</code>; fecha
          com arraste, overlay ou botão × (quando habilitado).
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Drawer open={formOpen} onOpenChange={setFormOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">
                Convidar membro
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Convite por e-mail</DrawerTitle>
                <DrawerDescription>
                  A pessoa recebe um link com papel de visualizadora por padrão.
                </DrawerDescription>
              </DrawerHeader>
              <div className="grid gap-2 px-4">
                <label htmlFor="drawer-invite-email" className="text-sm font-medium text-foreground">
                  E-mail
                </label>
                <Input
                  id="drawer-invite-email"
                  type="email"
                  autoComplete="email"
                  placeholder="colega@empresa.com"
                />
              </div>
              <DrawerFooter>
                <Button variant="outline" size="sm" type="button" onClick={() => setFormOpen(false)}>
                  Cancelar
                </Button>
                <Button size="sm" type="button" onClick={() => setFormOpen(false)}>
                  Enviar
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Conteúdo rolável</h2>
        <p className="text-sm text-muted-foreground">
          Limite altura da área com <code className="font-mono text-xs">max-h</code> +{" "}
          <code className="font-mono text-xs">overflow-y-auto</code> dentro do drawer.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="sm">
                Ler política curta (scroll)
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Política de retenção</DrawerTitle>
                <DrawerDescription>
                  Extrato sintético apenas para fins de demo na styleguide.
                </DrawerDescription>
              </DrawerHeader>
              <div className="max-h-[200px] overflow-y-auto px-4 text-sm text-muted-foreground">
                {Array.from({ length: 8 }, (_, i) => (
                  <p key={i} className="mb-3 last:mb-0">
                    Parágrafo {i + 1}. Dados de uso são pseudonimizados após {30 + i} dias quando o
                    workspace ficar ocioso. Exportações ficam disponíveis por sete dias antes da
                    expiração automática dos links públicos compartilhados.
                  </p>
                ))}
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button size="sm">Entendi</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Sem botão × no topo</h2>
        <p className="text-sm text-muted-foreground">
          Prop <code className="font-mono text-xs">{`showCloseButton={false}`}</code> no conteúdo —
          ótimo quando a decisão fica apenas nos botões da base ou no gesto de arraste.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary" size="sm">
                Abrir fluxo obrigatório (demo)
              </Button>
            </DrawerTrigger>
            <DrawerContent showCloseButton={false}>
              <DrawerHeader>
                <DrawerTitle>Termos atualizados</DrawerTitle>
                <DrawerDescription>
                  Leia o resumo e escolha continuar ou sair para revisar mais tarde.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline" size="sm">
                    Sair por agora
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button size="sm">Continuar</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Variáveis e tokens</h2>
        <p className="text-sm text-muted-foreground">
          O Drawer não define variáveis CSS dedicadas — reutiliza tokens semânticos de{" "}
          <code className="font-mono text-xs">globals.css</code>.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">Token / classe</th>
                <th className="px-4 py-3 font-medium text-foreground">Uso no Drawer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">--popover / bg-popover</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Fundo do painel (<code className="font-mono text-xs">before:bg-popover</code>).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">--popover-foreground</td>
                <td className="px-4 py-3 text-muted-foreground">Texto base do conteúdo.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">--border / border-border</td>
                <td className="px-4 py-3 text-muted-foreground">Borda do painel arredondado.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">--muted / bg-muted</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Handle de arraste na direção <code className="font-mono text-xs">bottom</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">--foreground</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Título (<code className="font-mono text-xs">DrawerTitle</code>).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">--muted-foreground</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Descrição (<code className="font-mono text-xs">DrawerDescription</code>).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">bg-black/80 + backdrop-blur-xs</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Overlay escurecido (mesmo padrão do Dialog).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Props e blocos úteis</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">Peça</th>
                <th className="px-4 py-3 font-medium text-foreground">Notas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">Drawer (root)</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Props do vaul: <code className="font-mono text-xs">open</code>,{" "}
                  <code className="font-mono text-xs">defaultOpen</code>,{" "}
                  <code className="font-mono text-xs">onOpenChange</code>,{" "}
                  <code className="font-mono text-xs">direction</code> (
                  <code className="font-mono text-xs">bottom</code> default),{" "}
                  <code className="font-mono text-xs">dismissible</code>,{" "}
                  <code className="font-mono text-xs">modal</code>,{" "}
                  <code className="font-mono text-xs">snapPoints</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">DrawerContent</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <code className="font-mono text-xs">showCloseButton</code> controla o × no topo
                  (default <code className="font-mono text-xs">true</code>). Inclui overlay e portal.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">DrawerHeader / Footer</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Layout auxiliar; header centraliza texto em direções top/bottom em telas pequenas.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">DrawerClose</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Use com <code className="font-mono text-xs">asChild</code> em botões de ação.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Título</DrawerTitle>
      <DrawerDescription>Contexto opcional para leitores de tela.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Fechar</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Título sempre presente (<code className="font-mono text-xs">DrawerTitle</code>).
          </li>
          <li>
            <code className="font-mono text-xs">DrawerDescription</code> deve acompanhar títulos
            curtos para contexto em leitores de tela.
          </li>
          <li>
            Em <code className="font-mono text-xs">direction=&quot;bottom&quot;</code>, o handle
            visual indica gesto de arraste; mantenha também botões explícitos de fechar.
          </li>
          <li>
            Overlay clicável fecha por padrão; confirme se isso está ok para formulários não salvos.
          </li>
          <li>
            Foco fica preso ao conteúdo do drawer enquanto aberto (comportamento modal do vaul).
          </li>
        </ul>
      </section>
    </div>
  )
}
