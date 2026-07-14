export type ConfiguracoesPerfil = {
  initials: string
  nome: string
  email: string
  papel: string
  senhaUltimaAlteracao: string
  avatarUrl: string | null
}

export type ConfiguracoesEmpresa = {
  nome: string
  cnpj: string
  moedaPadrao: string
  periodoFiscal: string
}

export type ConfiguracaoNotificacao = {
  id: string
  label: string
  description: string
  defaultEnabled: boolean
}

export type ConfiguracoesSelectOption = {
  value: string
  label: string
}

export type ConfiguracoesAparencia = {
  tema: "dark" | "light"
  modoCompacto: boolean
}

export const CONFIGURACOES_PERFIL: ConfiguracoesPerfil = {
  initials: "AB",
  nome: "Ana Boutik",
  email: "ana@boutik.com.br",
  papel: "Administrador",
  senhaUltimaAlteracao: "Última alteração há 3 meses",
  avatarUrl: null,
}

export const CONFIGURACOES_EMPRESA: ConfiguracoesEmpresa = {
  nome: "Boutik Store",
  cnpj: "00.000.000/0001-00",
  moedaPadrao: "brl",
  periodoFiscal: "day-1",
}

export const CONFIGURACOES_NOTIFICACOES: ConfiguracaoNotificacao[] = [
  {
    id: "limites-gasto",
    label: "Limites de gasto",
    description: "Avisos quando o gasto se aproximar do limite.",
    defaultEnabled: true,
  },
  {
    id: "vencimento-faturas",
    label: "Vencimento de faturas",
    description: "Lembrete antes do vencimento das faturas.",
    defaultEnabled: true,
  },
  {
    id: "transacoes-altas",
    label: "Transações acima de R$ 1.000",
    description: "Notificação imediata para valores elevados.",
    defaultEnabled: true,
  },
  {
    id: "relatorio-semanal",
    label: "Relatório semanal por e-mail",
    description: "Resumo enviado toda segunda-feira.",
    defaultEnabled: false,
  },
  {
    id: "resumo-diario",
    label: "Resumo diário",
    description: "Panorama das movimentações do dia.",
    defaultEnabled: false,
  },
]

export const CONFIGURACOES_MOEDAS: ConfiguracoesSelectOption[] = [
  { value: "brl", label: "BRL — Real Brasileiro" },
  { value: "usd", label: "USD — Dólar Americano" },
  { value: "eur", label: "EUR — Euro" },
]

export const CONFIGURACOES_PERIODOS_FISCAIS: ConfiguracoesSelectOption[] = [
  { value: "day-1", label: "Dia 1 de cada mês" },
  { value: "day-5", label: "Dia 5 de cada mês" },
  { value: "day-15", label: "Dia 15 de cada mês" },
]

export const CONFIGURACOES_APARENCIA: ConfiguracoesAparencia = {
  tema: "dark",
  modoCompacto: false,
}
