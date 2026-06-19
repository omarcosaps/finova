import type { Metadata } from "next"

import { ConfiguracoesView } from "./configuracoes-view"

export const metadata: Metadata = {
  title: "Configurações",
  description: "Gerencie preferências da conta e do sistema.",
}

export default function ConfiguracoesPage() {
  return <ConfiguracoesView />
}
