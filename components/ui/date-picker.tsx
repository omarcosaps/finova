"use client"

import * as React from "react"
import { format, isValid, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ptBR as ptBRDayPicker } from "react-day-picker/locale"

import { DsIcon, Icons } from "@/app/styleguide/icons"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const DATE_VALUE_FORMAT = "yyyy-MM-dd"

function parseDateValue(value: string | undefined): Date | undefined {
  if (!value) return undefined
  const parsed = parse(value, DATE_VALUE_FORMAT, new Date())
  return isValid(parsed) ? parsed : undefined
}

function formatDateValue(date: Date): string {
  return format(date, DATE_VALUE_FORMAT)
}

function formatDisplayDate(date: Date): string {
  return format(date, "PPP", { locale: ptBR })
}

type DatePickerProps = {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  id?: string
  className?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
}

function DatePicker({
  value,
  onChange,
  placeholder = "Selecione a data",
  disabled,
  id,
  className,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const selectedDate = parseDateValue(value)

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger
        type="button"
        id={id}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 rounded-4xl border border-input bg-input/30 px-3 py-1 text-left text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className
        )}
      >
        <span
          className={cn("truncate", !selectedDate && "text-muted-foreground")}
        >
          {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
        </span>
        <DsIcon
          icon={Icons.calendar}
          className="pointer-events-none size-4 shrink-0 text-muted-foreground"
          aria-hidden
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          defaultMonth={selectedDate}
          locale={ptBRDayPicker}
          onSelect={(date) => {
            if (date) {
              onChange?.(formatDateValue(date))
              setOpen(false)
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, formatDateValue, parseDateValue }
