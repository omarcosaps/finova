"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

export default function DialogShowcasePage() {
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Dialog
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Sobreposição modal com foco preso ao conteúdo (Radix Dialog). Use para decisões rápidas,
          formulários curtos ou detalhes que precisam de atenção imediata.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com trigger</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">DialogTrigger</code> repasse com{" "}
          <code className="font-mono text-xs">asChild</code> mantém foco ao abrir/fechar.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Ver detalhes
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Exportar relatório</DialogTitle>
                <DialogDescription>
                  Um link assinado chega por e-mail quando o arquivo estiver pronto.{" "}
                  <a href="/styleguide">Ver histórico de exportações.</a>
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                Estimativa: menos de dois minutos para o intervalo padrão.
              </p>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" size="sm">
                    Voltar
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button size="sm">Iniciar exportação</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Controlado só por estado
        </h2>
        <p className="text-sm text-muted-foreground">
          Sem <code className="font-mono text-xs">DialogTrigger</code>: usa{" "}
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
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Confirmar ação?</DialogTitle>
                <DialogDescription>
                  Exemplo apenas para estado controlado: nenhuma alteração real é aplicada ao fechar.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
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
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Confirmação destrutiva</h2>
        <p className="text-sm text-muted-foreground">
          Fluxo típico: cancelar fecha; ação perigosa em{" "}
          <code className="font-mono text-xs">variant=&quot;destructive&quot;</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Excluir projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Excluir projeto Beta?</DialogTitle>
                <DialogDescription>
                  Integrações pausadas e relatórios compartilhados deixarão de responder. Esta ação não
                  pode ser desfeita pelo painel.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="outline" size="sm">
                    Manter projeto
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive" size="sm">
                    Excluir definitivamente
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Formulário curto</h2>
        <p className="text-sm text-muted-foreground">
          Campos dentro do mesmo <code className="font-mono text-xs">DialogContent</code>; fecha
          com <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
            Esc
          </kbd>{" "}
          ou botão × (quando habilitado).
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Convidar membro
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Convite por e-mail</DialogTitle>
                <DialogDescription>
                  A pessoa recebe um link com papel de visualizadora por padrão.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2">
                <label htmlFor="dialog-invite-email" className="text-sm font-medium text-foreground">
                  E-mail
                </label>
                <Input
                  id="dialog-invite-email"
                  type="email"
                  autoComplete="email"
                  placeholder="colega@empresa.com"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" size="sm" type="button" onClick={() => setSheetOpen(false)}>
                  Cancelar
                </Button>
                <Button size="sm" type="button" onClick={() => setSheetOpen(false)}>
                  Enviar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Sem botão × no topo</h2>
        <p className="text-sm text-muted-foreground">
          Prop <code className="font-mono text-xs">{`showCloseButton={false}`}</code> no conteúdo —
          ótimo quando a decisão fica apenas nos botões da base.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm">
                Abrir fluxo obrigatório (demo)
              </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Termos atualizados</DialogTitle>
                <DialogDescription>
                  Leia o resumo e escolha continuar ou sair para revisar mais tarde.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" size="sm">
                    Sair por agora
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button size="sm">Continuar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Conteúdo rolável</h2>
        <p className="text-sm text-muted-foreground">
          Limite altura da área com <code className="font-mono text-xs">max-h</code> +{" "}
          <code className="font-mono text-xs">overflow-y-auto</code> dentro do modal.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                Ler política curta (scroll)
              </Button>
            </DialogTrigger>
            <DialogContent className="gap-4 sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Política de retenção</DialogTitle>
                <DialogDescription>
                  Extrato sintético apenas para fins de demo na styleguide.
                </DialogDescription>
              </DialogHeader>
              <div className="-mx-1 max-h-[200px] overflow-y-auto px-1 text-sm text-muted-foreground">
                {Array.from({ length: 8 }, (_, i) => (
                  <p key={i} className="mb-3 last:mb-0">
                    Parágrafo {i + 1}. Dados de uso são pseudonimizados após{' '}
                    {30 + i} dias quando o workspace ficar ocioso. Exportações ficam disponíveis por
                    sete dias antes da expiração automática dos links públicos compartilhados.
                  </p>
                ))}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button size="sm">Entendi</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  Dialog (root)
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Props do Radix: <code className="font-mono text-xs">open</code>,{" "}
                  <code className="font-mono text-xs">defaultOpen</code>,{" "}
                  <code className="font-mono text-xs">onOpenChange</code>,{" "}
                  <code className="font-mono text-xs">modal</code> (mantém backdrop e foco).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  DialogContent
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  <code className="font-mono text-xs">showCloseButton</code> controla o × no topo
                  (default <code className="font-mono text-xs">true</code>).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  DialogFooter
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Opcional <code className="font-mono text-xs">showCloseButton</code> acrescenta
                  botão <code className="font-mono text-xs">Close</code> estilizado.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  DialogOverlay / Portal
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Gerados dentro de{" "}
                  <code className="font-mono text-xs">DialogContent</code>; exponha apenas se montar layout customizado completo.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
      <DialogDescription>Contexto opcional para leitores de tela.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Fechar</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Título sempre presente (<code className="font-mono text-xs">DialogTitle</code>).
          </li>
          <li>
            <code className="font-mono text-xs">DialogDescription</code> deve acompanhar títulos
            curtos; diálogo só com título exige validação explícita de acessibilidade com o stack
            Radix atual.
          </li>
          <li>
            Foco retorna ao gatilho ao fechar; foco inicial fica dentro do content.
          </li>
          <li>
            Overlay clicável fecha por padrão; confirme se isso está ok para formulários não
            salvos.
          </li>
        </ul>
      </section>
    </div>
  )
}
