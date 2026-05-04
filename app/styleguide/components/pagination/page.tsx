"use client"

import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
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

function buildPageWindow(
  current: number,
  total: number,
  siblings = 1
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const left = Math.max(2, current - siblings)
  const right = Math.min(total - 1, current + siblings)
  const pages: (number | "ellipsis")[] = [1]
  if (left > 2) pages.push("ellipsis")
  for (let p = left; p <= right; p++) pages.push(p)
  if (right < total - 1) pages.push("ellipsis")
  pages.push(total)
  return pages
}

export default function PaginationShowcasePage() {
  const [page, setPage] = React.useState(3)
  const totalPagesDemo = 12

  const windowed = React.useMemo(
    () => buildPageWindow(page, totalPagesDemo, 1),
    [page, totalPagesDemo]
  )

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Pagination
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Navegação entre páginas com <code className="font-mono text-xs">nav</code>, lista de
          links e estados ativos. Compõe com <code className="font-mono text-xs">Button</code>{" "}
          (variant <code className="font-mono text-xs">ghost</code> /{" "}
          <code className="font-mono text-xs">outline</code>) para manter o visual do design
          system.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Páginas curtas</h2>
        <p className="text-sm text-muted-foreground">
          Todos os números visíveis; página atual com{" "}
          <code className="font-mono text-xs">isActive</code> e{" "}
          <code className="font-mono text-xs">aria-current=&quot;page&quot;</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Com reticências</h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">PaginationEllipsis</code> indica páginas
          omitidas; inclui <code className="font-mono text-xs">sr-only</code> para contexto.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  5
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">6</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Textos em português</h2>
        <p className="text-sm text-muted-foreground">
          Props <code className="font-mono text-xs">text</code> em{" "}
          <code className="font-mono text-xs">PaginationPrevious</code> /{" "}
          <code className="font-mono text-xs">PaginationNext</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" text="Anterior" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" text="Próxima" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Demo interativa</h2>
        <p className="text-sm text-muted-foreground">
          Lógica de janela de páginas no cliente; bordas desabilitam anterior/próxima com estilo
          e <code className="font-mono text-xs">aria-disabled</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-border/60">
          <p className="mb-4 text-center text-sm text-muted-foreground">
            Página{" "}
            <span className="font-mono font-medium text-foreground">{page}</span> de{" "}
            <span className="font-mono text-foreground">{totalPagesDemo}</span>
          </p>
          <Pagination>
            <PaginationContent className="flex-wrap justify-center">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  text="Anterior"
                  aria-disabled={page <= 1}
                  tabIndex={page <= 1 ? -1 : undefined}
                  className={cn(page <= 1 && "pointer-events-none opacity-50")}
                  onClick={(e) => {
                    e.preventDefault()
                    setPage((p) => Math.max(1, p - 1))
                  }}
                />
              </PaginationItem>
              {windowed.map((entry, i) =>
                entry === "ellipsis" ? (
                  <PaginationItem key={`e-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={entry}>
                    <PaginationLink
                      href="#"
                      isActive={entry === page}
                      onClick={(e) => {
                        e.preventDefault()
                        setPage(entry)
                      }}
                    >
                      {entry}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  text="Próxima"
                  aria-disabled={page >= totalPagesDemo}
                  tabIndex={page >= totalPagesDemo ? -1 : undefined}
                  className={cn(
                    page >= totalPagesDemo && "pointer-events-none opacity-50"
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    setPage((p) => Math.min(totalPagesDemo, p + 1))
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">API resumida</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">Componente</th>
                <th className="px-4 py-3 font-medium text-foreground">Papel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  Pagination
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Wrapper <code className="font-mono text-xs">&lt;nav&gt;</code> com{" "}
                  <code className="font-mono text-xs">aria-label=&quot;pagination&quot;</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  PaginationContent
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Lista <code className="font-mono text-xs">&lt;ul&gt;</code> horizontal (
                  <code className="font-mono text-xs">gap-1</code>).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  PaginationItem
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Envolve cada célula da paginação (<code className="font-mono text-xs">&lt;li&gt;</code>
                  ).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  PaginationLink
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Âncora estilizada; <code className="font-mono text-xs">isActive</code> altera variant
                  para <code className="font-mono text-xs">outline</code>. Prop{" "}
                  <code className="font-mono text-xs">size</code> segue Button (default{" "}
                  <code className="font-mono text-xs">icon</code>).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  PaginationPrevious / Next
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Ícone + texto (texto oculto em viewport estreito com{" "}
                  <code className="font-mono text-xs">hidden sm:block</code>);{" "}
                  <code className="font-mono text-xs">text</code> customiza rótulo.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  PaginationEllipsis
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Marcador visual; texto acessível em <code className="font-mono text-xs">sr-only</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso básico</h2>
        <CodeBlock>{`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/items?page=1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/items?page=1" isActive>
        1
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/items?page=2">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/items?page=2" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Acessibilidade</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            O <code className="font-mono text-xs">nav</code> expõe o landmark de paginação; altere{" "}
            <code className="font-mono text-xs">aria-label</code> no root se coexistirem várias listas paginadas.
          </li>
          <li>
            Página atual: <code className="font-mono text-xs">aria-current=&quot;page&quot;</code>{" "}
            no link ativo (<code className="font-mono text-xs">PaginationLink</code>).
          </li>
          <li>
            Anterior/próxima já trazem <code className="font-mono text-xs">aria-label</code> em
            inglês; sobrescreva com spread se precisar de outro idioma.
          </li>
          <li>
            Em links desabilitados logicamente (ex.: primeira página), prefira{" "}
            <code className="font-mono text-xs">aria-disabled</code>,{" "}
            <code className="font-mono text-xs">{'tabIndex={-1}'}</code> e remover navegação no{" "}
            <code className="font-mono text-xs">onClick</code>, ou troque por{" "}
            <code className="font-mono text-xs">&lt;span&gt;</code> sem href.
          </li>
        </ul>
      </section>
    </div>
  )
}
