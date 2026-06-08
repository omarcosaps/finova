import type { Metadata } from "next"

import { ResumoView } from "./resumo-view"

export const metadata: Metadata = {
  title: "Resumo",
  description: "Panorama financeiro da sua conta corporativa.",
}

export default function ResumoPage() {
  return <ResumoView />
}
