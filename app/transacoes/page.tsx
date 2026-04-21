import type { Metadata } from "next"

import { TransacoesView } from "./transacoes-view"

export const metadata: Metadata = {
  title: "Transações | Finova",
  description:
    "Visualize e gerencie todas as entradas e saídas das suas transações.",
}

export default function TransacoesPage() {
  return <TransacoesView />
}
