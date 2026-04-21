"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const SCALE_STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const

function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(true)

  const toggle = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(document.documentElement.classList.contains("dark"))
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-muted-foreground">Theme</span>
      <div className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5">
        <button
          type="button"
          onClick={() => {
            document.documentElement.classList.remove("dark")
            setIsDark(false)
          }}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            !isDark
              ? "bg-card text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Light
        </button>
        <button
          type="button"
          onClick={() => {
            document.documentElement.classList.add("dark")
            setIsDark(true)
          }}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            isDark
              ? "bg-card text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Dark
        </button>
      </div>
      <button
        type="button"
        onClick={toggle}
        className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Toggle
      </button>
    </div>
  )
}

function Swatch({
  name,
  cssVar,
}: {
  name: string
  cssVar: string
}) {
  return (
    <div className="space-y-2">
      <div
        className="h-14 rounded-lg border border-border ring-1 ring-border/40"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <p className="break-all font-mono text-[11px] leading-snug text-muted-foreground">
        {name}
      </p>
    </div>
  )
}

function ScaleRow({
  prefix,
  label,
}: {
  prefix: "--neutral" | "--brand"
  label: string
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">{label}</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-10">
        {SCALE_STEPS.map((step) => (
          <Swatch
            key={step}
            name={`${prefix}-${step}`}
            cssVar={`${prefix}-${step}`}
          />
        ))}
      </div>
    </div>
  )
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-8 space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-10">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Foundation
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Design tokens
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Charcoal dashboard palette with Inter, zinc neutrals, and a green
          accent for data and success. Toggle light and dark to preview
          semantic variables.
        </p>
        <ThemeToggle />
      </header>

      <Section
        id="palette"
        title="Core palette"
        description="shadcn semantic tokens mapped from the reference UI."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Swatch name="--background" cssVar="--background" />
          <Swatch name="--foreground" cssVar="--foreground" />
          <Swatch name="--card" cssVar="--card" />
          <Swatch name="--card-foreground" cssVar="--card-foreground" />
          <Swatch name="--popover" cssVar="--popover" />
          <Swatch name="--popover-foreground" cssVar="--popover-foreground" />
          <Swatch name="--primary" cssVar="--primary" />
          <Swatch name="--primary-foreground" cssVar="--primary-foreground" />
          <Swatch name="--secondary" cssVar="--secondary" />
          <Swatch
            name="--secondary-foreground"
            cssVar="--secondary-foreground"
          />
          <Swatch name="--muted" cssVar="--muted" />
          <Swatch name="--muted-foreground" cssVar="--muted-foreground" />
          <Swatch name="--accent" cssVar="--accent" />
          <Swatch name="--accent-foreground" cssVar="--accent-foreground" />
          <Swatch name="--border" cssVar="--border" />
          <Swatch name="--input" cssVar="--input" />
          <Swatch name="--ring" cssVar="--ring" />
          <Swatch name="--destructive" cssVar="--destructive" />
        </div>
      </Section>

      <Section
        id="sidebar"
        title="Sidebar"
        description="Navigation and shell tokens."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Swatch name="--sidebar" cssVar="--sidebar" />
          <Swatch name="--sidebar-foreground" cssVar="--sidebar-foreground" />
          <Swatch name="--sidebar-primary" cssVar="--sidebar-primary" />
          <Swatch
            name="--sidebar-primary-foreground"
            cssVar="--sidebar-primary-foreground"
          />
          <Swatch name="--sidebar-accent" cssVar="--sidebar-accent" />
          <Swatch
            name="--sidebar-accent-foreground"
            cssVar="--sidebar-accent-foreground"
          />
          <Swatch name="--sidebar-border" cssVar="--sidebar-border" />
          <Swatch name="--sidebar-ring" cssVar="--sidebar-ring" />
        </div>
      </Section>

      <Section
        id="charts"
        title="Chart colors"
        description="Heatmap-style greens for data visualization."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <Swatch name="--chart-1" cssVar="--chart-1" />
          <Swatch name="--chart-2" cssVar="--chart-2" />
          <Swatch name="--chart-3" cssVar="--chart-3" />
          <Swatch name="--chart-4" cssVar="--chart-4" />
          <Swatch name="--chart-5" cssVar="--chart-5" />
        </div>
      </Section>

      <div className="space-y-12 rounded-2xl border border-border bg-card/40 p-6 ring-1 ring-border/60 lg:p-8">
        <ScaleRow
          prefix="--brand"
          label="Brand / accent scale (green, ~50–900)"
        />
        <ScaleRow prefix="--neutral" label="Neutral / grey scale (50–900)" />
      </div>

      <Section
        id="semantic"
        title="Semantic colors"
        description="Success, warning, info, and destructive."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Swatch name="--success" cssVar="--success" />
          <Swatch name="--success-foreground" cssVar="--success-foreground" />
          <Swatch name="--warning" cssVar="--warning" />
          <Swatch name="--warning-foreground" cssVar="--warning-foreground" />
          <Swatch name="--info" cssVar="--info" />
          <Swatch name="--info-foreground" cssVar="--info-foreground" />
          <Swatch name="--destructive" cssVar="--destructive" />
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-success px-2.5 py-1 text-xs font-medium text-success-foreground">
            Success
          </span>
          <span className="rounded-full bg-warning px-2.5 py-1 text-xs font-medium text-warning-foreground">
            Warning
          </span>
          <span className="rounded-full bg-info px-2.5 py-1 text-xs font-medium text-info-foreground">
            Info
          </span>
        </div>
      </Section>

      <Section
        id="typography"
        title="Typography"
        description="Inter for UI; Geist Mono for code-style labels."
      >
        <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
          <h1 className="text-4xl font-semibold tracking-tight">
            Heading 1 — Semibold
          </h1>
          <h2 className="text-3xl font-semibold tracking-tight">
            Heading 2 — Semibold
          </h2>
          <h3 className="text-2xl font-semibold tracking-tight">
            Heading 3 — Semibold
          </h3>
          <h4 className="text-xl font-medium tracking-tight">
            Heading 4 — Medium
          </h4>
          <p className="max-w-prose text-base leading-relaxed text-foreground">
            Body: The quick brown fox jumps over the lazy dog. Used for
            descriptions, cards, and dense product UI.
          </p>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            Muted: Secondary labels, captions, and de-emphasized copy at
            smaller sizes.
          </p>
          <p className="font-mono text-sm text-foreground">
            font-mono: --font-geist-mono · 0123456789 · ABC
          </p>
        </div>
      </Section>

      <Section
        id="radius"
        title="Border radius"
        description="System radius from --radius (8px); Tailwind steps derive from it."
      >
        <div className="flex flex-wrap gap-4">
          {(
            [
              ["rounded-sm", "sm"],
              ["rounded-md", "md"],
              ["rounded-lg", "lg"],
              ["rounded-xl", "xl"],
            ] as const
          ).map(([cls, label]) => (
            <div key={label} className="space-y-2 text-center">
              <div
                className={`size-20 border border-border bg-muted ${cls}`}
              />
              <p className="font-mono text-xs text-muted-foreground">
                {cls} · {label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="shadows"
        title="Shadows"
        description="Reference UI is mostly flat; use sparingly."
      >
        <div className="flex flex-wrap gap-6">
          <div className="space-y-2">
            <div className="h-20 w-36 rounded-lg border border-border bg-card shadow-none" />
            <p className="font-mono text-xs text-muted-foreground">
              shadow-none
            </p>
          </div>
          <div className="space-y-2">
            <div className="h-20 w-36 rounded-lg border border-border bg-card shadow-sm" />
            <p className="font-mono text-xs text-muted-foreground">shadow-sm</p>
          </div>
        </div>
      </Section>

      <Section
        id="components"
        title="Components"
        description="shadcn/ui primitives using design tokens."
      >
        <div className="space-y-10">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Badge</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Card</CardTitle>
                <CardDescription>
                  Surface token <code className="font-mono text-xs">--card</code>{" "}
                  with ring border.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Plan management, usage, and settings patterns from the reference
                dashboard.
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="outline">
                  Secondary
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-4">
              <Alert>
                <AlertTitle>Default alert</AlertTitle>
                <AlertDescription>
                  Inline message using card background and muted description
                  text.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle>Destructive alert</AlertTitle>
                <AlertDescription>
                  Use for errors and blocking issues.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border pt-10 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">Summary:</strong> Primary CTA
          inverts by theme (dark fill in light mode, near-white in dark mode).
          Accent green <code className="font-mono text-xs">#4ADE80</code>{" "}
          drives charts and brand scale. Font: Inter. Radius baseline: 8px.
          Style: minimal charcoal product UI.
        </p>
      </footer>
    </div>
  )
}
