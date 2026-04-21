"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(true)

  const toggle = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(document.documentElement.classList.contains("dark"))
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-muted-foreground">Preview theme</span>
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

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-xs leading-relaxed">
      <code className="font-mono text-foreground">{children}</code>
    </pre>
  )
}

const lineData = [
  { month: "Jan", agent: 4200, tab: 2400 },
  { month: "Feb", agent: 3800, tab: 3100 },
  { month: "Mar", agent: 5100, tab: 2900 },
  { month: "Apr", agent: 6200, tab: 4100 },
  { month: "May", agent: 5400, tab: 3600 },
  { month: "Jun", agent: 7100, tab: 4800 },
]

const lineChartConfig = {
  agent: {
    label: "Agent",
    color: "var(--color-chart-1)",
  },
  tab: {
    label: "Tab",
    color: "var(--color-chart-3)",
  },
} satisfies ChartConfig

const barData = [
  { name: "Mon", usage: 120, limit: 200 },
  { name: "Tue", usage: 180, limit: 200 },
  { name: "Wed", usage: 95, limit: 200 },
  { name: "Thu", usage: 210, limit: 200 },
  { name: "Fri", usage: 165, limit: 200 },
]

const barChartConfig = {
  usage: {
    label: "Usage",
    color: "var(--color-chart-1)",
  },
  limit: {
    label: "Limit",
    color: "var(--color-chart-5)",
  },
} satisfies ChartConfig

const barHorizontalData = [
  { browser: "Chrome", share: 62 },
  { browser: "Safari", share: 18 },
  { browser: "Firefox", share: 9 },
  { browser: "Edge", share: 7 },
  { browser: "Other", share: 4 },
]

const barHorizontalConfig = {
  share: {
    label: "Market share",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

const barStackedData = [
  { month: "Jan", direct: 120, organic: 80, referral: 40 },
  { month: "Feb", direct: 132, organic: 95, referral: 52 },
  { month: "Mar", direct: 101, organic: 110, referral: 61 },
  { month: "Apr", direct: 164, organic: 88, referral: 45 },
  { month: "May", direct: 143, organic: 102, referral: 58 },
]

const barStackedConfig = {
  direct: {
    label: "Direct",
    color: "var(--color-chart-1)",
  },
  organic: {
    label: "Organic",
    color: "var(--color-chart-3)",
  },
  referral: {
    label: "Referral",
    color: "var(--color-chart-5)",
  },
} satisfies ChartConfig

const barLabelData = [
  { day: "Mon", revenue: 186 },
  { day: "Tue", revenue: 305 },
  { day: "Wed", revenue: 237 },
  { day: "Thu", revenue: 273 },
  { day: "Fri", revenue: 209 },
]

const barLabelConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

const barNegativeData = [
  { quarter: "Q1", delta: 12 },
  { quarter: "Q2", delta: -8 },
  { quarter: "Q3", delta: 21 },
  { quarter: "Q4", delta: -15 },
  { quarter: "Q1*", delta: 6 },
]

const barNegativeConfig = {
  delta: {
    label: "YoY change %",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig

export default function ChartShowcasePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-10 lg:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Chart
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Wrappers around{" "}
          <a
            href="https://recharts.org"
            className="text-foreground underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Recharts
          </a>{" "}
          with <code className="font-mono text-xs">ChartContainer</code>, design
          tokens (<code className="font-mono text-xs">--color-chart-*</code>),
          and styled tooltips and legends.
        </p>
        <ThemeToggle />
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Line chart</h2>
        <p className="text-sm text-muted-foreground">
          Multi-series line with grid, axes, tooltip, and legend. Colors map to
          keys in <code className="font-mono text-xs">chartConfig</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-4 ring-1 ring-border/60 md:p-6">
          <ChartContainer config={lineChartConfig} className="h-[320px] w-full">
            <LineChart
              data={lineData}
              margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={40}
                tickFormatter={(v) => `${Number(v) / 1000}k`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="agent"
                stroke="var(--color-agent)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="tab"
                stroke="var(--color-tab)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Bar chart</h2>
        <p className="text-sm text-muted-foreground">
          Grouped bars for comparing two metrics per category.
        </p>
        <div className="rounded-2xl border border-border bg-card p-4 ring-1 ring-border/60 md:p-6">
          <ChartContainer config={barChartConfig} className="h-[300px] w-full">
            <BarChart
              data={barData}
              margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
              <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="usage"
                fill="var(--color-usage)"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="limit"
                fill="var(--color-limit)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Bar chart — horizontal
        </h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">layout=&quot;vertical&quot;</code>
          , eixo numérico em <code className="font-mono text-xs">X</code> e
          categorias em <code className="font-mono text-xs">Y</code>.
        </p>
        <div className="rounded-2xl border border-border bg-card p-4 ring-1 ring-border/60 md:p-6">
          <ChartContainer
            config={barHorizontalConfig}
            className="h-[280px] w-full"
          >
            <BarChart
              accessibilityLayer
              layout="vertical"
              data={barHorizontalData}
              margin={{ left: 8, right: 24, top: 8, bottom: 8 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis type="number" tickLine={false} axisLine={false} unit="%" />
              <YAxis
                dataKey="browser"
                type="category"
                tickLine={false}
                axisLine={false}
                width={72}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" hideLabel />}
              />
              <Bar dataKey="share" fill="var(--color-share)" radius={[0, 6, 6, 0]}>
                <LabelList
                  dataKey="share"
                  position="right"
                  className="fill-muted-foreground"
                  fontSize={12}
                  formatter={(label) => `${label ?? ""}%`}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Bar chart — stacked + legend
        </h2>
        <p className="text-sm text-muted-foreground">
          Mesmo <code className="font-mono text-xs">stackId</code> em cada{" "}
          <code className="font-mono text-xs">Bar</code> empilha as séries;{" "}
          <code className="font-mono text-xs">ChartLegend</code> identifica as
          camadas.
        </p>
        <div className="rounded-2xl border border-border bg-card p-4 ring-1 ring-border/60 md:p-6">
          <ChartContainer config={barStackedConfig} className="h-[300px] w-full">
            <BarChart
              data={barStackedData}
              margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
              <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="direct"
                stackId="traffic"
                fill="var(--color-direct)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="organic"
                stackId="traffic"
                fill="var(--color-organic)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="referral"
                stackId="traffic"
                fill="var(--color-referral)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Bar chart — label
        </h2>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">LabelList</code> no topo de cada
          barra (valores formatados).
        </p>
        <div className="rounded-2xl border border-border bg-card p-4 ring-1 ring-border/60 md:p-6">
          <ChartContainer config={barLabelConfig} className="h-[280px] w-full">
            <BarChart
              data={barLabelData}
              margin={{ left: 8, right: 8, top: 28, bottom: 8 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
              <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[6, 6, 0, 0]}>
                <LabelList
                  position="top"
                  className="fill-foreground"
                  fontSize={11}
                  formatter={(label) => `$${label ?? ""}`}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Bar chart — negative
        </h2>
        <p className="text-sm text-muted-foreground">
          Valores positivos e negativos com{" "}
          <code className="font-mono text-xs">ReferenceLine</code> em{" "}
          <code className="font-mono text-xs">y=0</code>; raios condicionais
          para a “base” correta em cada barra.
        </p>
        <div className="rounded-2xl border border-border bg-card p-4 ring-1 ring-border/60 md:p-6">
          <ChartContainer config={barNegativeConfig} className="h-[300px] w-full">
            <BarChart
              data={barNegativeData}
              margin={{ left: 8, right: 8, top: 16, bottom: 8 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="quarter"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={40}
                tickFormatter={(v) => `${v}%`}
              />
              <ReferenceLine
                y={0}
                stroke="var(--color-border)"
                strokeWidth={1}
              />
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
              <Bar dataKey="delta" fill="var(--color-delta)" radius={4}>
                <LabelList
                  position="top"
                  className="fill-muted-foreground"
                  fontSize={11}
                  formatter={(label) => {
                    const n = Number(label)
                    if (Number.isNaN(n)) return String(label ?? "")
                    return n >= 0 ? `+${n}%` : `${n}%`
                  }}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Import</h2>
        <CodeBlock>{`import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Config</h2>
        <p className="text-sm text-muted-foreground">
          Each key in <code className="font-mono text-xs">ChartConfig</code>{" "}
          becomes <code className="font-mono text-xs">--color-&#123;key&#125;</code>{" "}
          on the chart container. Point <code className="font-mono text-xs">stroke</code>{" "}
          / <code className="font-mono text-xs">fill</code> at those variables so
          tooltips and legends stay in sync.
        </p>
        <CodeBlock>{`const chartConfig = {
  agent: {
    label: "Agent",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Accessibility</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Prefer meaningful <code className="font-mono text-xs">label</code>{" "}
            strings in <code className="font-mono text-xs">chartConfig</code> for
            tooltips and legends.
          </li>
          <li>
            For screen-reader summaries, add a visible or visually hidden caption
            near the chart describing the trend.
          </li>
          <li>
            Keep color contrast sufficient; combine color with position or
            pattern when distinguishing series.
          </li>
        </ul>
      </section>
    </div>
  )
}
