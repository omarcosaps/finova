"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
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
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { CurrencyInput } from "@/components/ui/currency-input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  getEdicaoFormValuesFromTransaction,
  TRANSACAO_CATEGORIAS,
  TRANSACAO_ORIGENS,
  updateTransactionFromForm,
  validateEdicaoTransacaoForm,
  type EdicaoTransacaoFieldErrors,
  type EdicaoTransacaoFormValues,
  type Transaction,
  type TransactionDirection,
} from "@/lib/transacoes-mock"

type EditarTransacaoDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction: Transaction | null
  onSubmit?: (
    transaction: Transaction,
    form: EdicaoTransacaoFormValues
  ) => void
}

export function EditarTransacaoDrawer({
  open,
  onOpenChange,
  transaction,
  onSubmit,
}: EditarTransacaoDrawerProps) {
  const [form, setForm] = React.useState<EdicaoTransacaoFormValues>(() => ({
    direction: "out",
    description: "",
    amountCents: 0,
    category: "",
    date: "",
    sourceId: "",
    notes: "",
  }))
  const [errors, setErrors] = React.useState<EdicaoTransacaoFieldErrors>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [wasOpen, setWasOpen] = React.useState(false)

  if (open && !wasOpen && transaction) {
    setWasOpen(true)
    setForm(getEdicaoFormValuesFromTransaction(transaction))
    setErrors({})
    setIsSubmitting(false)
  } else if (!open && wasOpen) {
    setWasOpen(false)
  }

  const categorias = TRANSACAO_CATEGORIAS[form.direction]

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setIsSubmitting(false)
    }
    onOpenChange(nextOpen)
  }

  React.useEffect(() => {
    if (open && transaction) {
      const timer = window.setTimeout(() => {
        document.getElementById("editar-tx-descricao")?.focus()
      }, 0)
      return () => window.clearTimeout(timer)
    }
  }, [open, transaction])

  const updateField = <K extends keyof EdicaoTransacaoFormValues>(
    key: K,
    value: EdicaoTransacaoFormValues[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const handleDirectionChange = (direction: TransactionDirection) => {
    setForm((prev) => {
      const nextCategories = TRANSACAO_CATEGORIAS[direction]
      const categoryStillValid = nextCategories.includes(prev.category)
      return {
        ...prev,
        direction,
        category: categoryStillValid ? prev.category : "",
      }
    })
    setErrors((prev) => {
      const next = { ...prev }
      delete next.category
      return next
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!transaction) return

    const nextErrors = validateEdicaoTransacaoForm(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 300))

    const updated = updateTransactionFromForm(transaction, form)
    onSubmit?.(updated, form)
    console.log("Editar transação (mock):", { transaction: updated, form })

    setIsSubmitting(false)
    onOpenChange(false)
  }

  if (!transaction) {
    return null
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} direction="right">
      <DrawerContent className="h-full max-h-none sm:max-w-lg">
        <DrawerHeader className="border-b border-border">
          <DrawerTitle>Editar transação</DrawerTitle>
        </DrawerHeader>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <FieldGroup>
              <FieldSet>
                <FieldLegend variant="label">Tipo da transação</FieldLegend>
                <RadioGroup
                  value={form.direction}
                  onValueChange={(value) =>
                    handleDirectionChange(value as TransactionDirection)
                  }
                  className="flex flex-wrap gap-6"
                  aria-label="Tipo da transação"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="in" id="editar-tx-tipo-receita" />
                    <label
                      htmlFor="editar-tx-tipo-receita"
                      className="cursor-pointer text-sm text-foreground"
                    >
                      Receita
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="out" id="editar-tx-tipo-despesa" />
                    <label
                      htmlFor="editar-tx-tipo-despesa"
                      className="cursor-pointer text-sm text-foreground"
                    >
                      Despesa
                    </label>
                  </div>
                </RadioGroup>
              </FieldSet>

              <Field data-invalid={errors.description ? true : undefined}>
                <FieldLabel htmlFor="editar-tx-descricao">Descrição</FieldLabel>
                <Input
                  id="editar-tx-descricao"
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Ex.: Venda PDV - Pix"
                  aria-invalid={errors.description ? true : undefined}
                  aria-describedby={
                    errors.description ? "editar-tx-descricao-error" : undefined
                  }
                  autoComplete="off"
                />
                {errors.description ? (
                  <FieldError id="editar-tx-descricao-error">
                    {errors.description}
                  </FieldError>
                ) : null}
              </Field>

              <Field data-invalid={errors.amountCents ? true : undefined}>
                <FieldLabel htmlFor="editar-tx-valor">Valor</FieldLabel>
                <CurrencyInput
                  id="editar-tx-valor"
                  valueCents={form.amountCents}
                  onValueCentsChange={(cents) =>
                    updateField("amountCents", cents)
                  }
                  placeholder="0,00"
                  aria-invalid={errors.amountCents ? true : undefined}
                  aria-describedby={
                    errors.amountCents ? "editar-tx-valor-error" : undefined
                  }
                />
                {errors.amountCents ? (
                  <FieldError id="editar-tx-valor-error">
                    {errors.amountCents}
                  </FieldError>
                ) : null}
              </Field>

              <div className="grid gap-7 sm:grid-cols-2">
                <Field data-invalid={errors.category ? true : undefined}>
                  <FieldLabel htmlFor="editar-tx-categoria">
                    Categoria
                  </FieldLabel>
                  <Select
                    value={form.category || undefined}
                    onValueChange={(value) => updateField("category", value)}
                  >
                    <SelectTrigger
                      id="editar-tx-categoria"
                      className="w-full"
                      aria-invalid={errors.category ? true : undefined}
                      aria-describedby={
                        errors.category ? "editar-tx-categoria-error" : undefined
                      }
                    >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category ? (
                    <FieldError id="editar-tx-categoria-error">
                      {errors.category}
                    </FieldError>
                  ) : null}
                </Field>

                <Field data-invalid={errors.date ? true : undefined}>
                  <FieldLabel htmlFor="editar-tx-data">Data</FieldLabel>
                  <DatePicker
                    id="editar-tx-data"
                    value={form.date}
                    onChange={(value) => updateField("date", value)}
                    aria-invalid={errors.date ? true : undefined}
                    aria-describedby={
                      errors.date ? "editar-tx-data-error" : undefined
                    }
                  />
                  {errors.date ? (
                    <FieldError id="editar-tx-data-error">
                      {errors.date}
                    </FieldError>
                  ) : null}
                </Field>
              </div>

              <Field data-invalid={errors.sourceId ? true : undefined}>
                <FieldLabel htmlFor="editar-tx-origem">Conta / Cartão</FieldLabel>
                <Select
                  value={form.sourceId || undefined}
                  onValueChange={(value) => updateField("sourceId", value)}
                >
                  <SelectTrigger
                    id="editar-tx-origem"
                    className="w-full"
                    aria-invalid={errors.sourceId ? true : undefined}
                    aria-describedby={
                      errors.sourceId ? "editar-tx-origem-error" : undefined
                    }
                  >
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {TRANSACAO_ORIGENS.map((origem) => (
                      <SelectItem key={origem.value} value={origem.value}>
                        {origem.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sourceId ? (
                  <FieldError id="editar-tx-origem-error">
                    {errors.sourceId}
                  </FieldError>
                ) : null}
              </Field>

              <Field>
                <FieldLabel htmlFor="editar-tx-observacoes">
                  Observações{" "}
                  <span className="font-normal text-muted-foreground">
                    (opcional)
                  </span>
                </FieldLabel>
                <Textarea
                  id="editar-tx-observacoes"
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Detalhes adicionais sobre a transação"
                  rows={3}
                />
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
              {isSubmitting ? "Salvando…" : "Salvar alterações"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
