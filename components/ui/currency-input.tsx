"use client"

import * as React from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { digitsToCents, formatCentsForInput } from "@/lib/currency"
import { cn } from "@/lib/utils"

const MAX_CENTS = 999_999_999_99

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
  inputMode = "numeric",
  placeholder = "0,00",
  onKeyDown,
  ...props
}: CurrencyInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const displayValue =
    valueCents > 0 ? formatCentsForInput(valueCents) : ""

  React.useLayoutEffect(() => {
    const input = inputRef.current
    if (!input || document.activeElement !== input) return
    const length = input.value.length
    input.setSelectionRange(length, length)
  }, [displayValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueCentsChange(digitsToCents(event.target.value))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isShortcutKey(event) || ALLOWED_KEYS.has(event.key)) {
      onKeyDown?.(event)
      return
    }

    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault()
      if (valueCents > 0) {
        onValueCentsChange(Math.floor(valueCents / 10))
      }
      onKeyDown?.(event)
      return
    }

    if (/^\d$/.test(event.key)) {
      event.preventDefault()
      const next = valueCents * 10 + Number(event.key)
      if (next <= MAX_CENTS) {
        onValueCentsChange(next)
      }
      onKeyDown?.(event)
      return
    }

    event.preventDefault()
    onKeyDown?.(event)
  }

  const input = (
    <InputGroupInput
      ref={inputRef}
      type="text"
      inputMode={inputMode}
      value={displayValue}
      placeholder={placeholder}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className={cn(!showPrefix && className)}
      {...props}
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
