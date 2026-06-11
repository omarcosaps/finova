"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Delete02Icon,
  Logout03Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons"

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

export default function AlertDialogShowcasePage() {
  const [controlledOpen, setControlledOpen] = React.useState(false)
  const [lastAction, setLastAction] = React.useState<string | null>(null)

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Alert Dialog
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Modal de confirmação (Radix Alert Dialog) para ações irreversíveis ou sensíveis.
          Diferente do Dialog comum: não fecha com clique no overlay nem com{" "}
          <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">
            Esc
          </kbd>
          — a decisão passa pelos botões de ação ou cancelamento.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com trigger</h2>
        <p className="text-sm text-muted-foreground">
          Uso básico com <code className="font-mono text-xs">AlertDialogTrigger</code> e{" "}
          <code className="font-mono text-xs">asChild</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                Publicar alterações
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Publicar agora?</AlertDialogTitle>
                <AlertDialogDescription>
                  A versão atual ficará visível para todos os membros do workspace. Você pode
                  reverter nas próximas 24 horas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel size="sm">Voltar</AlertDialogCancel>
                <AlertDialogAction size="sm">Publicar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Ação destrutiva</h2>
        <p className="text-sm text-muted-foreground">
          Passe <code className="font-mono text-xs">variant=&quot;destructive&quot;</code> em{" "}
          <code className="font-mono text-xs">AlertDialogAction</code> para destacar risco.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Excluir workspace
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir workspace Alpha?</AlertDialogTitle>
                <AlertDialogDescription>
                  Todos os projetos, integrações e convites serão removidos permanentemente. Esta
                  ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel size="sm">Manter workspace</AlertDialogCancel>
                <AlertDialogAction variant="destructive" size="sm">
                  Excluir definitivamente
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Controlado por estado</h2>
        <p className="text-sm text-muted-foreground">
          Abra programaticamente com <code className="font-mono text-xs">open</code> +{" "}
          <code className="font-mono text-xs">onOpenChange</code> — útil após validação assíncrona
          ou fluxo em etapas.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => setControlledOpen(true)}
            >
              Encerrar sessão (demo)
            </Button>
            {lastAction && (
              <span className="text-xs text-muted-foreground">
                Última ação: <span className="font-medium text-foreground">{lastAction}</span>
              </span>
            )}
          </div>
          <AlertDialog open={controlledOpen} onOpenChange={setControlledOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Encerrar sessão em todos os dispositivos?</AlertDialogTitle>
                <AlertDialogDescription>
                  Você precisará entrar novamente neste e nos demais aparelhos conectados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  size="sm"
                  onClick={() => setLastAction("cancelado")}
                >
                  Continuar conectado
                </AlertDialogCancel>
                <AlertDialogAction
                  size="sm"
                  onClick={() => setLastAction("sessão encerrada")}
                >
                  Encerrar sessão
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Tamanhos</h2>
        <p className="text-sm text-muted-foreground">
          Prop <code className="font-mono text-xs">size</code> em{" "}
          <code className="font-mono text-xs">AlertDialogContent</code>:{" "}
          <code className="font-mono text-xs">default</code> (layout responsivo com texto à
          esquerda em telas maiores) ou <code className="font-mono text-xs">sm</code> (compacto,
          botões em grade no mobile).
        </p>
        <div className="flex flex-wrap gap-4 rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                size=&quot;default&quot;
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="default">
              <AlertDialogHeader>
                <AlertDialogTitle>Layout padrão</AlertDialogTitle>
                <AlertDialogDescription>
                  Largura maior em <code className="font-mono text-xs">sm:</code> e alinhamento
                  à esquerda no header.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel size="sm">Cancelar</AlertDialogCancel>
                <AlertDialogAction size="sm">Confirmar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                size=&quot;sm&quot;
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Layout compacto</AlertDialogTitle>
                <AlertDialogDescription>
                  Modal estreito; footer vira grade de duas colunas no mobile.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel size="sm">Não</AlertDialogCancel>
                <AlertDialogAction size="sm">Sim</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com mídia (ícone)</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">AlertDialogMedia</code> exibe um ícone ou ilustração
          acima do título; no tamanho <code className="font-mono text-xs">default</code> alinha à
          esquerda em telas maiores.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm">
                Sair da conta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia className="text-destructive">
                  <HugeiconsIcon icon={Logout03Icon} strokeWidth={2} />
                </AlertDialogMedia>
                <AlertDialogTitle>Sair da conta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Rascunhos locais não sincronizados serão descartados neste dispositivo.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel size="sm">Ficar logado</AlertDialogCancel>
                <AlertDialogAction size="sm">Sair</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Variantes nos botões</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">AlertDialogAction</code> e{" "}
          <code className="font-mono text-xs">AlertDialogCancel</code> repassam{" "}
          <code className="font-mono text-xs">variant</code> e{" "}
          <code className="font-mono text-xs">size</code> do Button.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary" size="sm">
                Remover integração
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
                </AlertDialogMedia>
                <AlertDialogTitle>Desconectar Slack?</AlertDialogTitle>
                <AlertDialogDescription>
                  Notificações e comandos deixarão de funcionar até reconectar.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="ghost" size="sm">
                  Manter
                </AlertDialogCancel>
                <AlertDialogAction variant="destructive" size="sm">
                  <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} data-icon="inline-start" />
                  Remover
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
                  AlertDialog (root)
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  <code className="font-mono text-xs">open</code>,{" "}
                  <code className="font-mono text-xs">defaultOpen</code>,{" "}
                  <code className="font-mono text-xs">onOpenChange</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  AlertDialogContent
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  <code className="font-mono text-xs">size</code>:{" "}
                  <code className="font-mono text-xs">default</code> |{" "}
                  <code className="font-mono text-xs">sm</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  AlertDialogAction / Cancel
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Variantes do Button:{" "}
                  <code className="font-mono text-xs">default</code>,{" "}
                  <code className="font-mono text-xs">outline</code>,{" "}
                  <code className="font-mono text-xs">destructive</code>,{" "}
                  <code className="font-mono text-xs">ghost</code>, etc.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  AlertDialogMedia
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Slot opcional para ícone ou avatar circular (
                  <code className="font-mono text-xs">size-16</code>, fundo{" "}
                  <code className="font-mono text-xs">muted</code>).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Excluir</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
      <AlertDialogDescription>
        Esta ação não pode ser desfeita.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction variant="destructive">
        Confirmar
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Alert Dialog vs Dialog</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">Comportamento</th>
                <th className="px-4 py-3 font-medium text-foreground">Alert Dialog</th>
                <th className="px-4 py-3 font-medium text-foreground">Dialog</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 text-foreground">Clique no overlay</td>
                <td className="px-4 py-3 text-muted-foreground">Não fecha</td>
                <td className="px-4 py-3 text-muted-foreground">Fecha</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">Tecla Esc</td>
                <td className="px-4 py-3 text-muted-foreground">Não fecha</td>
                <td className="px-4 py-3 text-muted-foreground">Fecha</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">Botão × no topo</td>
                <td className="px-4 py-3 text-muted-foreground">Não incluído</td>
                <td className="px-4 py-3 text-muted-foreground">Opcional</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">Caso de uso</td>
                <td className="px-4 py-3 text-muted-foreground">Confirmações críticas</td>
                <td className="px-4 py-3 text-muted-foreground">Conteúdo ou formulários</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Sempre inclua <code className="font-mono text-xs">AlertDialogTitle</code> e{" "}
            <code className="font-mono text-xs">AlertDialogDescription</code>.
          </li>
          <li>
            Foco fica preso dentro do modal; retorna ao gatilho ao fechar via Action ou Cancel.
          </li>
          <li>
            Use para confirmações — não substitua alertas inline ou toasts informativos.
          </li>
          <li>
            Rotule ações de forma explícita (ex.: &quot;Excluir definitivamente&quot; em vez de
            &quot;OK&quot;).
          </li>
        </ul>
      </section>
    </div>
  )
}
