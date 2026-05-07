import type { Metadata } from "next"

import { CartoesView } from "./cartoes-view"

export const metadata: Metadata = {
  title: "Meus Cartões | Finova",
  description:
    "Gerencie seus cartões corporativos, limites e faturas.",
}

export default function CartoesPage() {
  return <CartoesView />
}
