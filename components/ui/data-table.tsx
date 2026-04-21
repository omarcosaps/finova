"use client"

import * as React from "react"
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type VisibilityState,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DsIcon, Icons } from "@/app/styleguide/icons"
import { cn } from "@/lib/utils"

function globalFilterRows<TData>(
  row: { original: TData },
  _columnId: string,
  filterValue: string
): boolean {
  const q = String(filterValue).toLowerCase().trim()
  if (!q) return true
  const values = Object.values(row.original as object)
  return values.some((v) =>
    String(v ?? "")
      .toLowerCase()
      .includes(q)
  )
}

export function DataTableColumnHeader<TData>({
  column,
  title,
  className,
}: {
  column: Column<TData, unknown>
  title: string
  className?: string
}) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("-ml-2 h-8 gap-1 px-2", className)}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <span>{title}</span>
      {column.getIsSorted() === "desc" ? (
        <DsIcon icon={Icons.arrowDown} className="size-3.5 shrink-0" />
      ) : column.getIsSorted() === "asc" ? (
        <DsIcon icon={Icons.arrowUp} className="size-3.5 shrink-0" />
      ) : (
        <DsIcon
          icon={Icons.arrowDown}
          className="size-3.5 shrink-0 opacity-35"
        />
      )}
    </Button>
  )
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchPlaceholder?: string
  showSearch?: boolean
  showColumnToggle?: boolean
  getRowId?: (originalRow: TData, index: number) => string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Buscar…",
  showSearch = true,
  showColumnToggle = true,
  getRowId,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize: 8 },
    },
  })

  return (
    <div className="space-y-4">
      {(showSearch || showColumnToggle) && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {showSearch ? (
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="max-w-sm"
              aria-label="Filtrar linhas"
            />
          ) : (
            <span />
          )}
          {showColumnToggle ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Colunas
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-40">
                {table
                  .getAllColumns()
                  .filter((col) => col.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(v) => column.toggleVisibility(!!v)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card ring-1 ring-border/60">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} linha(s) · Página{" "}
          {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount() || 1}
          {table.getFilteredSelectedRowModel().rows.length > 0 ? (
            <>
              {" "}
              · {table.getFilteredSelectedRowModel().rows.length} selecionada(s)
            </>
          ) : null}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}
