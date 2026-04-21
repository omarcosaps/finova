"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DataTable,
  DataTableColumnHeader,
} from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

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

type Invoice = {
  id: string
  customer: string
  email: string
  status: "paid" | "pending" | "overdue"
  amount: number
}

const demoData: Invoice[] = [
  {
    id: "INV-1042",
    customer: "Marcos Antonio",
    email: "marcos@example.com",
    status: "paid",
    amount: 250.0,
  },
  {
    id: "INV-1043",
    customer: "Ana Costa",
    email: "ana@example.com",
    status: "pending",
    amount: 120.5,
  },
  {
    id: "INV-1044",
    customer: "João Silva",
    email: "joao@example.com",
    status: "overdue",
    amount: 89.99,
  },
  {
    id: "INV-1045",
    customer: "Equipe Dev",
    email: "dev@example.com",
    status: "paid",
    amount: 1999.0,
  },
  {
    id: "INV-1046",
    customer: "Maria Santos",
    email: "maria.s@example.com",
    status: "paid",
    amount: 432.1,
  },
  {
    id: "INV-1047",
    customer: "Pedro Lima",
    email: "pedro@example.com",
    status: "pending",
    amount: 75.0,
  },
  {
    id: "INV-1048",
    customer: "Cloud Agents Inc",
    email: "billing@cloud.example",
    status: "paid",
    amount: 5600.0,
  },
  {
    id: "INV-1049",
    customer: "Lúcia Ferreira",
    email: "lucia@example.com",
    status: "overdue",
    amount: 210.0,
  },
  {
    id: "INV-1050",
    customer: "Startup XYZ",
    email: "finance@xyz.example",
    status: "pending",
    amount: 990.0,
  },
  {
    id: "INV-1051",
    customer: "Nina Oliveira",
    email: "nina@example.com",
    status: "paid",
    amount: 44.5,
  },
]

const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(value === true)
        }
        aria-label="Selecionar todas nesta página"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(value === true)}
        aria-label={`Selecionar ${row.original.customer}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fatura" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cliente" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-mail" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = row.getValue("status") as Invoice["status"]
      return (
        <Badge
          variant={
            s === "paid" ? "secondary" : s === "pending" ? "outline" : "destructive"
          }
        >
          {s === "paid"
            ? "Pago"
            : s === "pending"
              ? "Pendente"
              : "Atrasado"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor" />
    ),
    cell: ({ row }) => {
      const n = row.getValue("amount") as number
      return (
        <span className="tabular-nums">
          {n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </span>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            Ações
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => navigator.clipboard.writeText(row.original.id)}>
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export default function DataTableShowcasePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Data Table
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Tabela de dados com{" "}
          <a
            href="https://tanstack.com/table"
            className="text-foreground underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            TanStack Table
          </a>
          , sobre os primitivos{" "}
          <code className="font-mono text-xs">Table</code> do shadcn: ordenação,
          filtro global, paginação, visibilidade de colunas, seleção de linhas e
          menu de ações.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Demonstração</h2>
        <p className="text-sm text-muted-foreground">
          Busque por qualquer texto nas células, ordene colunas, oculte colunas
          em &quot;Colunas&quot;, selecione linhas e navegue por páginas (8
          linhas por página).
        </p>
        <DataTable
          columns={columns}
          data={demoData}
          getRowId={(row) => row.id}
          searchPlaceholder="Filtrar faturas, clientes, e-mail…"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import type { ColumnDef } from "@tanstack/react-table"
import {
  DataTable,
  DataTableColumnHeader,
} from "@/components/ui/data-table"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Colunas (exemplo)
        </h2>
        <CodeBlock>{`const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cliente" />
    ),
  },
]`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Uso</h2>
        <CodeBlock>{`<DataTable
  columns={columns}
  data={data}
  getRowId={(row) => row.id}
  searchPlaceholder="Buscar…"
/>`}</CodeBlock>
        <p className="text-sm text-muted-foreground">
          Props opcionais: <code className="font-mono text-xs">showSearch</code>,{" "}
          <code className="font-mono text-xs">showColumnToggle</code> (ambos{" "}
          <code className="font-mono text-xs">true</code> por padrão).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Dependências
        </h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>
            <code className="font-mono text-xs">@tanstack/react-table</code>
          </li>
          <li>
            <code className="font-mono text-xs">@/components/ui/table</code>,{" "}
            <code className="font-mono text-xs">button</code>,{" "}
            <code className="font-mono text-xs">input</code>,{" "}
            <code className="font-mono text-xs">dropdown-menu</code>,{" "}
            <code className="font-mono text-xs">checkbox</code> (para este
            showcase)
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          O bloco oficial <code className="font-mono text-xs">data-table</code>{" "}
          não está no registro <code className="font-mono text-xs">radix-maia</code>
          ; este módulo replica o padrão shadcn com os tokens do projeto.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Acessibilidade
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Cabeçalhos ordenáveis são botões; checkboxes trazem{" "}
            <code className="font-mono text-xs">aria-label</code>.
          </li>
          <li>
            Campo de busca usa <code className="font-mono text-xs">aria-label</code>.
          </li>
          <li>
            Para tabelas muito grandes, considere anunciar totais no texto
            adjacente ou usar <code className="font-mono text-xs">caption</code>.
          </li>
        </ul>
      </section>
    </div>
  )
}
