import type { Metadata } from "next"

import { CategoriasView } from "./categorias-view"

export const metadata: Metadata = {
  title: "Categorias",
  description: "Organize e classifique as suas transações.",
}

export default function CategoriasPage() {
  return <CategoriasView />
}
