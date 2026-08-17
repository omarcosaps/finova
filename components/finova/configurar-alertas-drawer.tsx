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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Switch } from "@/components/ui/switch"
import {
  ALERTA_REGRAS_META,
  getDefaultConfigurarAlertasFormValues,
  validateConfigurarAlertasForm,
  type AlertaRegraId,
  type ConfigurarAlertasFieldErrors,
  type ConfigurarAlertasFormValues,
} from "@/lib/alertas-mock"

type ConfigurarAlertasDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  rules: ConfigurarAlertasFormValues
  onSubmit?: (rules: ConfigurarAlertasFormValues) => void
}

function cloneRules(
  rules: ConfigurarAlertasFormValues
): ConfigurarAlertasFormValues {
  return {
    "limites-gasto": { ...rules["limites-gasto"] },
    "vencimento-faturas": { ...rules["vencimento-faturas"] },
    "transacoes-altas": { ...rules["transacoes-altas"] },
  }
}

function filterDigitInput(value: string, maxDigits: number) {
  return value.replace(/\D/g, "").slice(0, maxDigits)
}

function parseDigitInput(value: string, maxDigits: number): number {
  const digits = filterDigitInput(value, maxDigits)
  if (!digits) return Number.NaN
  return Number.parseInt(digits, 10)
}

function integerInputValue(value: number): string {
  return Number.isFinite(value) ? String(value) : ""
}

export function ConfigurarAlertasDrawer({
  open,
  onOpenChange,
  rules,
  onSubmit,
}: ConfigurarAlertasDrawerProps) {
  const [form, setForm] = React.useState<ConfigurarAlertasFormValues>(
    getDefaultConfigurarAlertasFormValues
  )
  const [errors, setErrors] = React.useState<ConfigurarAlertasFieldErrors>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [wasOpen, setWasOpen] = React.useState(false)

  if (open && !wasOpen) {
    setWasOpen(true)
    setForm(cloneRules(rules))
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
      document.getElementById("alerta-regra-limites-gasto")?.focus()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [open])

  const clearError = (id: AlertaRegraId) => {
    setErrors((prev) => {
      if (!prev[id]) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const handleEnabledChange = (id: AlertaRegraId, enabled: boolean) => {
    setForm((prev) => ({
      ...prev,
      [id]: { ...prev[id], enabled },
    }))
    clearError(id)
  }

  const handlePercentChange = (raw: string) => {
    setForm((prev) => ({
      ...prev,
      "limites-gasto": {
        ...prev["limites-gasto"],
        percent: parseDigitInput(raw, 3),
      },
    }))
    clearError("limites-gasto")
  }

  const handleDaysChange = (raw: string) => {
    setForm((prev) => ({
      ...prev,
      "vencimento-faturas": {
        ...prev["vencimento-faturas"],
        days: parseDigitInput(raw, 2),
      },
    }))
    clearError("vencimento-faturas")
  }

  const handleAmountChange = (amountCents: number) => {
    setForm((prev) => ({
      ...prev,
      "transacoes-altas": {
        ...prev["transacoes-altas"],
        amountCents,
      },
    }))
    clearError("transacoes-altas")
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateConfigurarAlertasForm(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 300))

    const payload = cloneRules(form)
    onSubmit?.(payload)
    console.log("Configurar alertas (mock):", payload)

    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} direction="right">
      <DrawerContent className="h-full max-h-none sm:max-w-lg">
        <DrawerHeader className="border-b border-border">
          <DrawerTitle>Configurar alertas</DrawerTitle>
        </DrawerHeader>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <FieldGroup>
              {ALERTA_REGRAS_META.map((meta) => {
                const rule = form[meta.id]
                const error = errors[meta.id]
                const switchId = `alerta-regra-${meta.id}`
                const descId = `alerta-regra-desc-${meta.id}`
                const limiarId = `alerta-limiar-${meta.id}`
                const errorId = `${limiarId}-error`
                const enabled = rule.enabled

                return (
                  <div
                    key={meta.id}
                    className="flex flex-col gap-4 border-b border-border pb-7 last:border-0 last:pb-0"
                  >
                    <Field
                      orientation="horizontal"
                      className="justify-between gap-4"
                    >
                      <div className="min-w-0 space-y-0.5">
                        <FieldLabel htmlFor={switchId}>
                          {meta.label}
                        </FieldLabel>
                        <FieldDescription id={descId}>
                          {meta.description}
                        </FieldDescription>
                      </div>
                      <Switch
                        id={switchId}
                        checked={enabled}
                        onCheckedChange={(checked) =>
                          handleEnabledChange(meta.id, checked)
                        }
                        aria-describedby={descId}
                        disabled={isSubmitting}
                      />
                    </Field>

                    {meta.id === "limites-gasto" ? (
                      <Field
                        data-invalid={error ? true : undefined}
                        data-disabled={!enabled ? true : undefined}
                      >
                        <FieldLabel htmlFor={limiarId}>
                          Percentual do orçamento
                        </FieldLabel>
                        <InputGroup
                          data-disabled={!enabled ? true : undefined}
                        >
                          <InputGroupInput
                            id={limiarId}
                            value={integerInputValue(form["limites-gasto"].percent)}
                            onChange={(event) =>
                              handlePercentChange(event.target.value)
                            }
                            placeholder="80"
                            inputMode="numeric"
                            autoComplete="off"
                            disabled={!enabled || isSubmitting}
                            aria-invalid={error ? true : undefined}
                            aria-describedby={error ? errorId : undefined}
                          />
                          <InputGroupAddon align="inline-end">
                            <InputGroupText>%</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        {error ? (
                          <FieldError id={errorId}>{error}</FieldError>
                        ) : null}
                      </Field>
                    ) : null}

                    {meta.id === "vencimento-faturas" ? (
                      <Field
                        data-invalid={error ? true : undefined}
                        data-disabled={!enabled ? true : undefined}
                      >
                        <FieldLabel htmlFor={limiarId}>
                          Dias antes do vencimento
                        </FieldLabel>
                        <Input
                          id={limiarId}
                          value={integerInputValue(
                            form["vencimento-faturas"].days
                          )}
                          onChange={(event) =>
                            handleDaysChange(event.target.value)
                          }
                          placeholder="3"
                          inputMode="numeric"
                          autoComplete="off"
                          disabled={!enabled || isSubmitting}
                          aria-invalid={error ? true : undefined}
                          aria-describedby={error ? errorId : undefined}
                        />
                        {error ? (
                          <FieldError id={errorId}>{error}</FieldError>
                        ) : null}
                      </Field>
                    ) : null}

                    {meta.id === "transacoes-altas" ? (
                      <Field
                        data-invalid={error ? true : undefined}
                        data-disabled={!enabled ? true : undefined}
                      >
                        <FieldLabel htmlFor={limiarId}>Valor mínimo</FieldLabel>
                        <CurrencyInput
                          id={limiarId}
                          valueCents={form["transacoes-altas"].amountCents}
                          onValueCentsChange={handleAmountChange}
                          placeholder="0,00"
                          disabled={!enabled || isSubmitting}
                          aria-invalid={error ? true : undefined}
                          aria-describedby={error ? errorId : undefined}
                        />
                        {error ? (
                          <FieldError id={errorId}>{error}</FieldError>
                        ) : null}
                      </Field>
                    ) : null}
                  </div>
                )
              })}
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
              {isSubmitting ? "Salvando…" : "Salvar"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
