"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
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
  createTransactionFromForm,
  getDefaultNovaTransacaoFormValues,
  TRANSACAO_CATEGORIAS,
  TRANSACAO_ORIGENS,
  validateNovaTransacaoForm,
  type NovaTransacaoFieldErrors,
  type NovaTransacaoFormValues,
  type Transaction,
  type TransactionDirection,
} from "@/lib/transacoes-mock"

type NovaTransacaoDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (transaction: Transaction, form: NovaTransacaoFormValues) => void
}

export function NovaTransacaoDrawer({
  open,
  onOpenChange,
  onSubmit,
}: NovaTransacaoDrawerProps) {
  const [form, setForm] = React.useState<NovaTransacaoFormValues>(
    getDefaultNovaTransacaoFormValues
  )
  const [errors, setErrors] = React.useState<NovaTransacaoFieldErrors>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const categorias = TRANSACAO_CATEGORIAS[form.direction]

  const resetForm = React.useCallback(() => {
    setForm(getDefaultNovaTransacaoFormValues())
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
        document.getElementById("nova-tx-descricao")?.focus()
      }, 0)
      return () => window.clearTimeout(timer)
    }
  }, [open])

  const updateField = <K extends keyof NovaTransacaoFormValues>(
    key: K,
    value: NovaTransacaoFormValues[K]
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
    const nextErrors = validateNovaTransacaoForm(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 300))

    const transaction = createTransactionFromForm(form)
    onSubmit?.(transaction, form)
    console.log("Nova transação (mock):", { transaction, form })

    resetForm()
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} direction="right">
      <DrawerContent className="h-full max-h-none sm:max-w-lg">
        <DrawerHeader className="border-b border-border">
          <DrawerTitle>Nova transação</DrawerTitle>
          <DrawerDescription>
            Registre uma entrada ou saída financeira. Os dados são salvos
            localmente nesta demonstração.
          </DrawerDescription>
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
                    <RadioGroupItem value="in" id="nova-tx-tipo-receita" />
                    <label
                      htmlFor="nova-tx-tipo-receita"
                      className="cursor-pointer text-sm text-foreground"
                    >
                      Receita
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="out" id="nova-tx-tipo-despesa" />
                    <label
                      htmlFor="nova-tx-tipo-despesa"
                      className="cursor-pointer text-sm text-foreground"
                    >
                      Despesa
                    </label>
                  </div>
                </RadioGroup>
              </FieldSet>

              <Field data-invalid={errors.description ? true : undefined}>
                <FieldLabel htmlFor="nova-tx-descricao">Descrição</FieldLabel>
                <Input
                  id="nova-tx-descricao"
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Ex.: Venda PDV - Pix"
                  aria-invalid={errors.description ? true : undefined}
                  aria-describedby={
                    errors.description ? "nova-tx-descricao-error" : undefined
                  }
                  autoComplete="off"
                />
                {errors.description ? (
                  <FieldError id="nova-tx-descricao-error">
                    {errors.description}
                  </FieldError>
                ) : null}
              </Field>

              <Field data-invalid={errors.valorDisplay ? true : undefined}>
                <FieldLabel htmlFor="nova-tx-valor">Valor</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>R$</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="nova-tx-valor"
                    value={form.valorDisplay}
                    onChange={(event) =>
                      updateField("valorDisplay", event.target.value)
                    }
                    inputMode="decimal"
                    placeholder="0,00"
                    aria-invalid={errors.valorDisplay ? true : undefined}
                    aria-describedby={
                      errors.valorDisplay ? "nova-tx-valor-error" : undefined
                    }
                  />
                </InputGroup>
                {errors.valorDisplay ? (
                  <FieldError id="nova-tx-valor-error">
                    {errors.valorDisplay}
                  </FieldError>
                ) : null}
              </Field>

              <div className="grid gap-7 sm:grid-cols-2">
                <Field data-invalid={errors.category ? true : undefined}>
                  <FieldLabel htmlFor="nova-tx-categoria">Categoria</FieldLabel>
                  <Select
                    value={form.category || undefined}
                    onValueChange={(value) => updateField("category", value)}
                  >
                    <SelectTrigger
                      id="nova-tx-categoria"
                      className="w-full"
                      aria-invalid={errors.category ? true : undefined}
                      aria-describedby={
                        errors.category ? "nova-tx-categoria-error" : undefined
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
                    <FieldError id="nova-tx-categoria-error">
                      {errors.category}
                    </FieldError>
                  ) : null}
                </Field>

                <Field data-invalid={errors.date ? true : undefined}>
                  <FieldLabel htmlFor="nova-tx-data">Data</FieldLabel>
                  <Input
                    id="nova-tx-data"
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      updateField("date", event.target.value)
                    }
                    aria-invalid={errors.date ? true : undefined}
                    aria-describedby={
                      errors.date ? "nova-tx-data-error" : undefined
                    }
                  />
                  {errors.date ? (
                    <FieldError id="nova-tx-data-error">{errors.date}</FieldError>
                  ) : null}
                </Field>
              </div>

              <Field data-invalid={errors.sourceId ? true : undefined}>
                <FieldLabel htmlFor="nova-tx-origem">Conta / Cartão</FieldLabel>
                <Select
                  value={form.sourceId || undefined}
                  onValueChange={(value) => updateField("sourceId", value)}
                >
                  <SelectTrigger
                    id="nova-tx-origem"
                    className="w-full"
                    aria-invalid={errors.sourceId ? true : undefined}
                    aria-describedby={
                      errors.sourceId ? "nova-tx-origem-error" : undefined
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
                  <FieldError id="nova-tx-origem-error">
                    {errors.sourceId}
                  </FieldError>
                ) : null}
              </Field>

              <Field>
                <FieldLabel htmlFor="nova-tx-observacoes">
                  Observações{" "}
                  <span className="font-normal text-muted-foreground">
                    (opcional)
                  </span>
                </FieldLabel>
                <Textarea
                  id="nova-tx-observacoes"
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
              {isSubmitting ? "Salvando…" : "Salvar transação"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
