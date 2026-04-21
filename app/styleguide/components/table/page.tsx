"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

const invoices = [
  { id: "INV-001", status: "Paid", email: "maria@example.com", amount: 250.0 },
  { id: "INV-002", status: "Pending", email: "joao@example.com", amount: 120.5 },
  { id: "INV-003", status: "Overdue", email: "ana@example.com", amount: 89.99 },
  { id: "INV-004", status: "Paid", email: "team@example.com", amount: 1999.0 },
] as const

export default function TableShowcasePage() {
  const total = invoices.reduce((sum, row) => sum + row.amount, 0)

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Table
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Semantic HTML table with header, body, footer, and caption. Styling
          uses design tokens (<code className="font-mono text-xs">border-border</code>
          , <code className="font-mono text-xs">text-muted-foreground</code>
          , hover rows).
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Default — invoices
        </h2>
        <p className="text-sm text-muted-foreground">
          Caption, sortable-style header cells, badges for status, numeric
          alignment, footer total.
        </p>
        <div className="rounded-2xl border border-border bg-card p-1 ring-1 ring-border/60">
          <Table>
            <TableCaption>Recent invoices for your workspace.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col" className="w-[100px]">
                  Invoice
                </TableHead>
                <TableHead scope="col">Status</TableHead>
                <TableHead scope="col">Email</TableHead>
                <TableHead scope="col" className="text-right">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={
                    row.id === "INV-002" ? ("selected" as const) : undefined
                  }
                >
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.status === "Paid"
                          ? "secondary"
                          : row.status === "Pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.email}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    ${row.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right tabular-nums">
                  ${total.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Selected row:</strong>{" "}
          <code className="font-mono">INV-002</code> uses{" "}
          <code className="font-mono">data-state=&quot;selected&quot;</code> on{" "}
          <code className="font-mono">TableRow</code> for muted highlight.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Interactive — row actions
        </h2>
        <p className="text-sm text-muted-foreground">
          Rows remain focusable via content; pair with menus or links inside
          cells for keyboard-accessible actions.
        </p>
        <div className="rounded-2xl border border-border bg-card p-1 ring-1 ring-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Name</TableHead>
                <TableHead scope="col">Role</TableHead>
                <TableHead scope="col" className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Marcos Antonio</TableCell>
                <TableCell className="text-muted-foreground">Admin</TableCell>
                <TableCell className="text-right">
                  <Button size="xs" variant="outline">
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Guest user</TableCell>
                <TableCell className="text-muted-foreground">Viewer</TableCell>
                <TableCell className="text-right">
                  <Button size="xs" variant="ghost">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Basic usage
        </h2>
        <CodeBlock>{`<Table>
  <TableCaption>Optional caption for screen readers.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Column</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Value</TableCell>
    </TableRow>
  </TableBody>
</Table>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Parts</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Table</strong> — wraps a
            scroll container and native <code className="font-mono text-xs">&lt;table&gt;</code>.
          </li>
          <li>
            <strong className="text-foreground">TableHeader / TableBody / TableFooter</strong>{" "}
            — <code className="font-mono text-xs">thead</code>,{" "}
            <code className="font-mono text-xs">tbody</code>,{" "}
            <code className="font-mono text-xs">tfoot</code>.
          </li>
          <li>
            <strong className="text-foreground">TableRow</strong> —{" "}
            <code className="font-mono text-xs">tr</code>; optional{" "}
            <code className="font-mono text-xs">data-state=&quot;selected&quot;</code>.
          </li>
          <li>
            <strong className="text-foreground">TableHead / TableCell</strong> —{" "}
            <code className="font-mono text-xs">th</code> /{" "}
            <code className="font-mono text-xs">td</code>; forward native props (
            <code className="font-mono text-xs">scope</code>,{" "}
            <code className="font-mono text-xs">colSpan</code>, etc.).
          </li>
          <li>
            <strong className="text-foreground">TableCaption</strong> —{" "}
            <code className="font-mono text-xs">caption</code>; improves accessibility.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Accessibility</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Use <code className="font-mono text-xs">scope=&quot;col&quot;</code>{" "}
            (or row) on header cells when tables are not purely presentational.
          </li>
          <li>
            Provide a <code className="font-mono text-xs">TableCaption</code>{" "}
            or an <code className="font-mono text-xs">aria-label</code> on{" "}
            <code className="font-mono text-xs">Table</code> when the dataset needs
            context.
          </li>
          <li>
            For sortable columns, add <code className="font-mono text-xs">aria-sort</code>{" "}
            on <code className="font-mono text-xs">th</code> and keep focus order
            logical (buttons inside headers).
          </li>
          <li>
            Interactive controls inside cells should be real{" "}
            <code className="font-mono text-xs">&lt;button&gt;</code> or{" "}
            <code className="font-mono text-xs">&lt;a&gt;</code> elements (not
            divs with click handlers).
          </li>
        </ul>
      </section>
    </div>
  )
}
