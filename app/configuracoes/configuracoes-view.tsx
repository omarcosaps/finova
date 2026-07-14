"use client"

import * as React from "react"

import { AlterarFotoPerfilDialog } from "@/app/configuracoes/components/alterar-foto-perfil-dialog"
import { ConfiguracoesFormRow } from "@/app/configuracoes/components/configuracoes-form-row"
import { ConfiguracoesSectionCard } from "@/app/configuracoes/components/configuracoes-section-card"
import { ConfiguracoesThemeSelector } from "@/app/configuracoes/components/configuracoes-theme-selector"
import { FinovaPageShell } from "@/components/finova/finova-page-shell"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  CONFIGURACOES_APARENCIA,
  CONFIGURACOES_EMPRESA,
  CONFIGURACOES_MOEDAS,
  CONFIGURACOES_NOTIFICACOES,
  CONFIGURACOES_PERIODOS_FISCAIS,
  CONFIGURACOES_PERFIL,
  type ConfiguracaoNotificacao,
} from "@/lib/configuracoes-mock"

type NotificacaoState = Record<ConfiguracaoNotificacao["id"], boolean>

function buildNotificacaoState(): NotificacaoState {
  return CONFIGURACOES_NOTIFICACOES.reduce<NotificacaoState>((acc, item) => {
    acc[item.id] = item.defaultEnabled
    return acc
  }, {} as NotificacaoState)
}

export function ConfiguracoesView() {
  const [perfil, setPerfil] = React.useState(CONFIGURACOES_PERFIL)
  const [empresa, setEmpresa] = React.useState(CONFIGURACOES_EMPRESA)
  const [notificacoes, setNotificacoes] =
    React.useState<NotificacaoState>(buildNotificacaoState)
  const [tema, setTema] = React.useState<"dark" | "light">(
    CONFIGURACOES_APARENCIA.tema
  )
  const [modoCompacto, setModoCompacto] = React.useState(
    CONFIGURACOES_APARENCIA.modoCompacto
  )
  const [alterarFotoOpen, setAlterarFotoOpen] = React.useState(false)

  React.useEffect(() => {
    const avatarUrl = perfil.avatarUrl
    return () => {
      if (avatarUrl) URL.revokeObjectURL(avatarUrl)
    }
  }, [perfil.avatarUrl])

  const handleSave = () => {
    console.log("Configurações (mock):", {
      perfil,
      empresa,
      notificacoes,
      aparencia: { tema, modoCompacto },
    })
  }

  const handleConfirmAvatar = (avatarUrl: string) => {
    setPerfil((prev) => ({ ...prev, avatarUrl }))
  }

  const toggleNotificacao = (id: ConfiguracaoNotificacao["id"], checked: boolean) => {
    setNotificacoes((prev) => ({ ...prev, [id]: checked }))
  }

  return (
    <FinovaPageShell activeItem="configuracoes" ariaLabel="Configurações da conta">
      <header className="flex flex-col gap-4 pb-6 md:flex-row md:items-start md:justify-between md:pb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Configurações
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie preferências da conta e do sistema.
          </p>
        </div>

        <Button type="button" variant="default" size="lg" onClick={handleSave}>
          Salvar Alterações
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <section aria-label="Perfil">
            <ConfiguracoesSectionCard title="Perfil">
              <div className="space-y-6">
                <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-4">
                    <Avatar size="lg" className="size-14">
                      {perfil.avatarUrl ? (
                        <AvatarImage
                          src={perfil.avatarUrl}
                          alt={`Foto de perfil de ${perfil.nome}`}
                        />
                      ) : null}
                      <AvatarFallback className="bg-primary text-base font-medium text-primary-foreground">
                        {perfil.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">
                        {perfil.nome}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">
                        {perfil.email}
                      </p>
                      <p className="text-xs text-muted-foreground">{perfil.papel}</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    className="h-auto px-0"
                    onClick={() => setAlterarFotoOpen(true)}
                  >
                    Alterar foto
                  </Button>
                </div>

                <AlterarFotoPerfilDialog
                  open={alterarFotoOpen}
                  onOpenChange={setAlterarFotoOpen}
                  initials={perfil.initials}
                  currentAvatarUrl={perfil.avatarUrl}
                  onConfirm={handleConfirmAvatar}
                />

                <ConfiguracoesFormRow
                  label="Nome completo"
                  description="Exibido no sistema e relatórios"
                  htmlFor="config-nome"
                >
                  <Input
                    id="config-nome"
                    value={perfil.nome}
                    onChange={(event) =>
                      setPerfil((prev) => ({ ...prev, nome: event.target.value }))
                    }
                    autoComplete="name"
                  />
                </ConfiguracoesFormRow>

                <ConfiguracoesFormRow
                  label="E-mail"
                  description="Usado para notificações e acesso"
                  htmlFor="config-email"
                >
                  <Input
                    id="config-email"
                    type="email"
                    value={perfil.email}
                    onChange={(event) =>
                      setPerfil((prev) => ({ ...prev, email: event.target.value }))
                    }
                    autoComplete="email"
                  />
                </ConfiguracoesFormRow>

                <ConfiguracoesFormRow
                  label="Senha"
                  description={perfil.senhaUltimaAlteracao}
                  controlClassName="flex justify-end md:justify-end"
                >
                  <Button type="button" variant="link" className="h-auto px-0">
                    Alterar senha
                  </Button>
                </ConfiguracoesFormRow>
              </div>
            </ConfiguracoesSectionCard>
          </section>

          <section aria-label="Empresa">
            <ConfiguracoesSectionCard title="Empresa">
              <div className="space-y-6">
                <ConfiguracoesFormRow
                  label="Nome da empresa"
                  description="Aparece em relatórios e faturas"
                  htmlFor="config-empresa-nome"
                >
                  <Input
                    id="config-empresa-nome"
                    value={empresa.nome}
                    onChange={(event) =>
                      setEmpresa((prev) => ({ ...prev, nome: event.target.value }))
                    }
                  />
                </ConfiguracoesFormRow>

                <ConfiguracoesFormRow
                  label="CNPJ"
                  description="Para emissão de documentos"
                  htmlFor="config-cnpj"
                >
                  <Input
                    id="config-cnpj"
                    value={empresa.cnpj}
                    onChange={(event) =>
                      setEmpresa((prev) => ({ ...prev, cnpj: event.target.value }))
                    }
                    inputMode="numeric"
                  />
                </ConfiguracoesFormRow>

                <ConfiguracoesFormRow
                  label="Moeda padrão"
                  description="Utilizada em todas as telas"
                  htmlFor="config-moeda"
                >
                  <Select
                    value={empresa.moedaPadrao}
                    onValueChange={(value) =>
                      setEmpresa((prev) => ({ ...prev, moedaPadrao: value }))
                    }
                  >
                    <SelectTrigger id="config-moeda" className="w-full">
                      <SelectValue placeholder="Selecione a moeda" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {CONFIGURACOES_MOEDAS.map((moeda) => (
                        <SelectItem key={moeda.value} value={moeda.value}>
                          {moeda.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </ConfiguracoesFormRow>

                <ConfiguracoesFormRow
                  label="Período fiscal"
                  description="Início do ciclo mensal"
                  htmlFor="config-periodo-fiscal"
                >
                  <Select
                    value={empresa.periodoFiscal}
                    onValueChange={(value) =>
                      setEmpresa((prev) => ({ ...prev, periodoFiscal: value }))
                    }
                  >
                    <SelectTrigger id="config-periodo-fiscal" className="w-full">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {CONFIGURACOES_PERIODOS_FISCAIS.map((periodo) => (
                        <SelectItem key={periodo.value} value={periodo.value}>
                          {periodo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </ConfiguracoesFormRow>
              </div>
            </ConfiguracoesSectionCard>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section aria-label="Notificações">
            <ConfiguracoesSectionCard title="Notificações">
              <div className="flex flex-col gap-4">
                {CONFIGURACOES_NOTIFICACOES.map(({ id, label, description }) => (
                    <div
                      key={id}
                      className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0 space-y-0.5">
                        <label
                          htmlFor={`notificacao-${id}`}
                          className="cursor-pointer text-sm font-medium text-foreground"
                        >
                          {label}
                        </label>
                        <p
                          id={`notificacao-desc-${id}`}
                          className="text-xs text-muted-foreground"
                        >
                          {description}
                        </p>
                      </div>
                      <Switch
                        id={`notificacao-${id}`}
                        checked={notificacoes[id]}
                        onCheckedChange={(checked) =>
                          toggleNotificacao(id, checked)
                        }
                        aria-describedby={`notificacao-desc-${id}`}
                      />
                    </div>
                  ))}
              </div>
            </ConfiguracoesSectionCard>
          </section>

          <section aria-label="Aparência">
            <ConfiguracoesSectionCard title="Aparência">
              <div className="space-y-6">
                <ConfiguracoesThemeSelector value={tema} onChange={setTema} />

                <div className="flex items-center justify-between gap-4 border-t border-border pt-6">
                  <div className="min-w-0 space-y-0.5">
                    <label
                      htmlFor="modo-compacto"
                      className="cursor-pointer text-sm font-medium text-foreground"
                    >
                      Modo compacto
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Reduz espaçamento nas tabelas
                    </p>
                  </div>
                  <Switch
                    id="modo-compacto"
                    checked={modoCompacto}
                    onCheckedChange={setModoCompacto}
                  />
                </div>
              </div>
            </ConfiguracoesSectionCard>
          </section>

          <section aria-label="Zona de perigo">
            <ConfiguracoesSectionCard
              title="ZONA DE PERIGO"
              description="Ações irreversíveis que afetam permanentemente a conta."
              titleClassName="text-destructive"
            >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    Excluir conta
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir conta permanentemente?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Todos os dados, transações e configurações serão removidos
                      de forma irreversível. Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel size="sm">Cancelar</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" size="sm">
                      Excluir definitivamente
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ConfiguracoesSectionCard>
          </section>
        </div>
      </div>
    </FinovaPageShell>
  )
}
