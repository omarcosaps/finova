import type { Metadata } from "next"

import { ResumoView } from "./resumo-view"

export const metadata: Metadata = {
  title: "Resumo",
  description: "Acompanhe o desempenho financeiro do seu negócio.",
}

export default function ResumoPage() {
  return <ResumoView />
}
