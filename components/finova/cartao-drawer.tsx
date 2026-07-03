"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { CurrencyInput } from "@/components/ui/currency-input"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CARTAO_BANDEIRAS,
  createCorporateCardFromForm,
  getDefaultNovoCartaoFormValues,
  getNovoCartaoFormValuesFromCard,
  updateCorporateCardFromForm,
  validateNovoCartaoForm,
  type CardBrand,
  type CorporateCard,
  type NovoCartaoFieldErrors,
  type NovoCartaoFormValues,
} from "@/lib/cartoes-mock"

export type CartaoDrawerMode = "create" | "edit"

type CartaoDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode?: CartaoDrawerMode
  /** Cartão a editar quando `mode === "edit"`. */
  card?: CorporateCard | null
  onSubmit?: (card: CorporateCard, form: NovoCartaoFormValues) => void
}

const COPY: Record<CartaoDrawerMode, { title: string; submit: string; saving: string }> = {
  create: { title: "Novo cartão", submit: "Salvar cartão", saving: "Salvando…" },
  edit: { title: "Editar cartão", submit: "Salvar alterações", saving: "Salvando…" },
}

function filterDayInput(value: string) {
  return value.replace(/\D/g, "").slice(0, 2)
}

export function CartaoDrawer({
  open,
  onOpenChange,
  mode = "create",
  card = null,
  onSubmit,
}: CartaoDrawerProps) {
  const [form, setForm] = React.useState<NovoCartaoFormValues>(() =>
    getDefaultNovoCartaoFormValues()
  )
  const [errors, setErrors] = React.useState<NovoCartaoFieldErrors>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [wasOpen, setWasOpen] = React.useState(false)

  const getInitialValues = React.useCallback((): NovoCartaoFormValues => {
    if (mode === "edit" && card) {
      return getNovoCartaoFormValuesFromCard(card)
    }
    return getDefaultNovoCartaoFormValues()
  }, [mode, card])

  // Sincroniza o formulário com o cartão selecionado a cada abertura do drawer.
  // Ajustar estado durante o render é o padrão recomendado para "resetar ao
  // mudar de prop", evitando um efeito que dispara re-renders em cascata.
  if (open && !wasOpen) {
    setWasOpen(true)
    setForm(getInitialValues())
    setErrors({})
    setIsSubmitting(false)
  } else if (!open && wasOpen) {
    setWasOpen(false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setIsSubmitting(false)
    }
    onOpenChange(nextOpen)
  }

  React.useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => {
      document.getElementById("cartao-drawer-nome")?.focus()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [open])

  const updateField = <K extends keyof NovoCartaoFormValues>(
    key: K,
    value: NovoCartaoFormValues[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateNovoCartaoForm(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 300))

    const result =
      mode === "edit" && card
        ? updateCorporateCardFromForm(card, form)
        : createCorporateCardFromForm(form)
    onSubmit?.(result, form)
    console.log(`Cartão (${mode}, mock):`, { card: result, form })

    onOpenChange(false)
  }

  const copy = COPY[mode]

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} direction="right">
      <DrawerContent className="h-full max-h-none sm:max-w-lg">
        <DrawerHeader className="border-b border-border">
          <DrawerTitle>{copy.title}</DrawerTitle>
        </DrawerHeader>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <FieldGroup>
              <Field data-invalid={errors.name ? true : undefined}>
                  <FieldLabel htmlFor="cartao-drawer-nome">
                    Nome do cartão
                  </FieldLabel>
                  <Input
                    id="cartao-drawer-nome"
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    placeholder="Ex.: Cartão Marketing"
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={
                      errors.name ? "cartao-drawer-nome-error" : undefined
                    }
                    autoComplete="off"
                  />
                  {errors.name ? (
                    <FieldError id="cartao-drawer-nome-error">
                      {errors.name}
                    </FieldError>
                  ) : null}
                </Field>

                <Field data-invalid={errors.limitCents ? true : undefined}>
                  <FieldLabel htmlFor="cartao-drawer-limite">
                    Limite do cartão
                  </FieldLabel>
                  <CurrencyInput
                    id="cartao-drawer-limite"
                    valueCents={form.limitCents}
                    onValueCentsChange={(cents) =>
                      updateField("limitCents", cents)
                    }
                    placeholder="0,00"
                    aria-invalid={errors.limitCents ? true : undefined}
                    aria-describedby={
                      errors.limitCents ? "cartao-drawer-limite-error" : undefined
                    }
                  />
                  {errors.limitCents ? (
                    <FieldError id="cartao-drawer-limite-error">
                      {errors.limitCents}
                    </FieldError>
                  ) : null}
                </Field>

                <div className="grid gap-7 sm:grid-cols-2">
                  <Field data-invalid={errors.closingDay ? true : undefined}>
                    <FieldLabel htmlFor="cartao-drawer-fechamento">
                      Dia de fechamento da fatura
                    </FieldLabel>
                    <Input
                      id="cartao-drawer-fechamento"
                      value={form.closingDay}
                      onChange={(event) =>
                        updateField(
                          "closingDay",
                          filterDayInput(event.target.value)
                        )
                      }
                      placeholder="Ex.: 5"
                      inputMode="numeric"
                      aria-invalid={errors.closingDay ? true : undefined}
                      aria-describedby={
                        errors.closingDay
                          ? "cartao-drawer-fechamento-error"
                          : undefined
                      }
                      autoComplete="off"
                    />
                    {errors.closingDay ? (
                      <FieldError id="cartao-drawer-fechamento-error">
                        {errors.closingDay}
                      </FieldError>
                    ) : null}
                  </Field>

                  <Field data-invalid={errors.dueDay ? true : undefined}>
                    <FieldLabel htmlFor="cartao-drawer-vencimento">
                      Dia de vencimento da fatura
                    </FieldLabel>
                    <Input
                      id="cartao-drawer-vencimento"
                      value={form.dueDay}
                      onChange={(event) =>
                        updateField("dueDay", filterDayInput(event.target.value))
                      }
                      placeholder="Ex.: 15"
                      inputMode="numeric"
                      aria-invalid={errors.dueDay ? true : undefined}
                      aria-describedby={
                        errors.dueDay
                          ? "cartao-drawer-vencimento-error"
                          : undefined
                      }
                      autoComplete="off"
                    />
                    {errors.dueDay ? (
                      <FieldError id="cartao-drawer-vencimento-error">
                        {errors.dueDay}
                      </FieldError>
                    ) : null}
                  </Field>
                </div>

                <Field data-invalid={errors.brand ? true : undefined}>
                  <FieldLabel htmlFor="cartao-drawer-bandeira">
                    Bandeira do cartão
                  </FieldLabel>
                  <Select
                    value={form.brand || undefined}
                    onValueChange={(value) =>
                      updateField("brand", value as CardBrand)
                    }
                  >
                    <SelectTrigger
                      id="cartao-drawer-bandeira"
                      className="w-full"
                      aria-invalid={errors.brand ? true : undefined}
                      aria-describedby={
                        errors.brand ? "cartao-drawer-bandeira-error" : undefined
                      }
                    >
                      <SelectValue placeholder="Selecione a bandeira" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {CARTAO_BANDEIRAS.map((bandeira) => (
                        <SelectItem key={bandeira.value} value={bandeira.value}>
                          {bandeira.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.brand ? (
                    <FieldError id="cartao-drawer-bandeira-error">
                      {errors.brand}
                    </FieldError>
                  ) : null}
                </Field>
            </FieldGroup>
          </div>

          <DrawerFooter className="border-t border-border sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? copy.saving : copy.submit}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
