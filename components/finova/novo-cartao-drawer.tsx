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
  FieldLegend,
  FieldSet,
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
  validateNovoCartaoForm,
  type CardBrand,
  type CorporateCard,
  type NovoCartaoFieldErrors,
  type NovoCartaoFormValues,
} from "@/lib/cartoes-mock"

type NovoCartaoDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (card: CorporateCard, form: NovoCartaoFormValues) => void
}

function filterDayInput(value: string) {
  return value.replace(/\D/g, "").slice(0, 2)
}

export function NovoCartaoDrawer({
  open,
  onOpenChange,
  onSubmit,
}: NovoCartaoDrawerProps) {
  const [form, setForm] = React.useState<NovoCartaoFormValues>(() =>
    getDefaultNovoCartaoFormValues()
  )
  const [errors, setErrors] = React.useState<NovoCartaoFieldErrors>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const resetForm = React.useCallback(() => {
    setForm(getDefaultNovoCartaoFormValues())
    setErrors({})
    setIsSubmitting(false)
  }, [])

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm()
    }
    onOpenChange(nextOpen)
  }

  React.useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => {
        document.getElementById("novo-cartao-nome")?.focus()
      }, 0)
      return () => window.clearTimeout(timer)
    }
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

    const card = createCorporateCardFromForm(form)
    onSubmit?.(card, form)
    console.log("Novo cartão (mock):", { card, form })

    resetForm()
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} direction="right">
      <DrawerContent className="h-full max-h-none sm:max-w-lg">
        <DrawerHeader className="border-b border-border">
          <DrawerTitle>Novo cartão</DrawerTitle>
        </DrawerHeader>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <FieldGroup>
              <FieldSet>
                <FieldLegend variant="label">Informações do cartão</FieldLegend>

                <Field data-invalid={errors.name ? true : undefined}>
                  <FieldLabel htmlFor="novo-cartao-nome">
                    Nome do cartão
                  </FieldLabel>
                  <Input
                    id="novo-cartao-nome"
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    placeholder="Ex.: Cartão Marketing"
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={
                      errors.name ? "novo-cartao-nome-error" : undefined
                    }
                    autoComplete="off"
                  />
                  {errors.name ? (
                    <FieldError id="novo-cartao-nome-error">
                      {errors.name}
                    </FieldError>
                  ) : null}
                </Field>

                <Field data-invalid={errors.limitCents ? true : undefined}>
                  <FieldLabel htmlFor="novo-cartao-limite">
                    Limite do cartão
                  </FieldLabel>
                  <CurrencyInput
                    id="novo-cartao-limite"
                    valueCents={form.limitCents}
                    onValueCentsChange={(cents) =>
                      updateField("limitCents", cents)
                    }
                    placeholder="0,00"
                    aria-invalid={errors.limitCents ? true : undefined}
                    aria-describedby={
                      errors.limitCents ? "novo-cartao-limite-error" : undefined
                    }
                  />
                  {errors.limitCents ? (
                    <FieldError id="novo-cartao-limite-error">
                      {errors.limitCents}
                    </FieldError>
                  ) : null}
                </Field>

                <div className="grid gap-7 sm:grid-cols-2">
                  <Field data-invalid={errors.closingDay ? true : undefined}>
                    <FieldLabel htmlFor="novo-cartao-fechamento">
                      Dia de fechamento da fatura
                    </FieldLabel>
                    <Input
                      id="novo-cartao-fechamento"
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
                          ? "novo-cartao-fechamento-error"
                          : undefined
                      }
                      autoComplete="off"
                    />
                    {errors.closingDay ? (
                      <FieldError id="novo-cartao-fechamento-error">
                        {errors.closingDay}
                      </FieldError>
                    ) : null}
                  </Field>

                  <Field data-invalid={errors.dueDay ? true : undefined}>
                    <FieldLabel htmlFor="novo-cartao-vencimento">
                      Dia de vencimento da fatura
                    </FieldLabel>
                    <Input
                      id="novo-cartao-vencimento"
                      value={form.dueDay}
                      onChange={(event) =>
                        updateField("dueDay", filterDayInput(event.target.value))
                      }
                      placeholder="Ex.: 15"
                      inputMode="numeric"
                      aria-invalid={errors.dueDay ? true : undefined}
                      aria-describedby={
                        errors.dueDay
                          ? "novo-cartao-vencimento-error"
                          : undefined
                      }
                      autoComplete="off"
                    />
                    {errors.dueDay ? (
                      <FieldError id="novo-cartao-vencimento-error">
                        {errors.dueDay}
                      </FieldError>
                    ) : null}
                  </Field>
                </div>

                <Field data-invalid={errors.brand ? true : undefined}>
                  <FieldLabel htmlFor="novo-cartao-bandeira">
                    Bandeira do cartão
                  </FieldLabel>
                  <Select
                    value={form.brand || undefined}
                    onValueChange={(value) =>
                      updateField("brand", value as CardBrand)
                    }
                  >
                    <SelectTrigger
                      id="novo-cartao-bandeira"
                      className="w-full"
                      aria-invalid={errors.brand ? true : undefined}
                      aria-describedby={
                        errors.brand ? "novo-cartao-bandeira-error" : undefined
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
                    <FieldError id="novo-cartao-bandeira-error">
                      {errors.brand}
                    </FieldError>
                  ) : null}
                </Field>
              </FieldSet>
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
              {isSubmitting ? "Salvando…" : "Salvar cartão"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
