"use client"

import * as React from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  applyCurrencyDraftKey,
  draftToCents,
  formatCentsForInput,
  sanitizeCurrencyDraft,
} from "@/lib/currency"
import { cn } from "@/lib/utils"

const ALLOWED_KEYS = new Set([
  "Tab",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
  "Enter",
])

function isShortcutKey(event: React.KeyboardEvent<HTMLInputElement>) {
  return event.ctrlKey || event.metaKey || event.altKey
}

function draftFromCents(cents: number): string {
  return cents > 0 ? formatCentsForInput(cents) : ""
}

type CurrencyInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "type"
> & {
  valueCents: number
  onValueCentsChange: (cents: number) => void
  showPrefix?: boolean
}

function CurrencyInput({
  valueCents,
  onValueCentsChange,
  showPrefix = true,
  className,
  inputMode = "decimal",
  placeholder = "0,00",
  onKeyDown,
  onBlur,
  onFocus,
  ...props
}: CurrencyInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = React.useState(false)
  const [draft, setDraft] = React.useState(() => draftFromCents(valueCents))

  React.useEffect(() => {
    if (isFocused) return
    setDraft(draftFromCents(valueCents))
  }, [valueCents, isFocused])

  const commitDraft = (nextDraft: string) => {
    setDraft(nextDraft)
    onValueCentsChange(draftToCents(nextDraft))
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    const cents = draftToCents(draft)
    setDraft(draftFromCents(cents))
    if (cents !== valueCents) {
      onValueCentsChange(cents)
    }
    onBlur?.(event)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    commitDraft(sanitizeCurrencyDraft(event.target.value, draft))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isShortcutKey(event) || ALLOWED_KEYS.has(event.key)) {
      onKeyDown?.(event)
      return
    }

    const isDigit = /^\d$/.test(event.key)
    const isSeparator = event.key === "," || event.key === "."
    const isEditKey = event.key === "Backspace" || event.key === "Delete"

    if (!isDigit && !isSeparator && !isEditKey) {
      event.preventDefault()
      onKeyDown?.(event)
      return
    }

    event.preventDefault()

    const input = event.currentTarget
    const start = input.selectionStart ?? 0
    const end = input.selectionEnd ?? 0
    const allSelected = draft.length > 0 && start === 0 && end === draft.length
    const base = allSelected ? "" : draft

    commitDraft(applyCurrencyDraftKey(base, event.key))
    onKeyDown?.(event)
  }

  const input = (
    <InputGroupInput
      ref={inputRef}
      type="text"
      inputMode={inputMode}
      value={isFocused ? draft : draftFromCents(valueCents)}
      placeholder={placeholder}
      className={cn(!showPrefix && className)}
      {...props}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  )

  if (!showPrefix) {
    return input
  }

  return (
    <InputGroup className={className}>
      <InputGroupAddon align="inline-start">
        <InputGroupText>R$</InputGroupText>
      </InputGroupAddon>
      {input}
    </InputGroup>
  )
}

export { CurrencyInput, type CurrencyInputProps }
