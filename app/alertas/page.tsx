import type { Metadata } from "next"

import { AlertasView } from "./alertas-view"

export const metadata: Metadata = {
  title: "Alertas",
  description: "Acompanhe avisos sobre limites, faturas e movimentações.",
}

export default function AlertasPage() {
  return <AlertasView />
}
