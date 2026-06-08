import type { Metadata } from "next"

import { RelatoriosView } from "./relatorios-view"

export const metadata: Metadata = {
  title: "Relatórios",
  description: "Análises de despesas, categorias e fluxo de caixa.",
}

export default function RelatoriosPage() {
  return <RelatoriosView />
}
