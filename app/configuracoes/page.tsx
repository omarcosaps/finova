import type { Metadata } from "next"

import { ConfiguracoesView } from "./configuracoes-view"

export const metadata: Metadata = {
  title: "Configurações",
  description: "Preferências da conta, notificações e limites.",
}

export default function ConfiguracoesPage() {
  return <ConfiguracoesView />
}
