/**
 * Registo único de ícones Hugeicons usados no design system.
 * Para trocar um ícone em todo o projeto, altere apenas o mapeamento aqui.
 */
import {
  Add01Icon,
  Alert01Icon,
  ArrowDown01Icon,
  ArrowDownLeft01Icon,
  ArrowLeft01Icon,
  ArrowLeftRightIcon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  ArrowUpRight01Icon,
  BarChartIcon,
  Building01Icon,
  Calendar01Icon,
  ChartDecreaseIcon,
  ChartIncreaseIcon,
  CreditCardIcon,
  Download01Icon,
  FilterIcon,
  GridViewIcon,
  MonitorDotIcon,
  Moon01Icon,
  MoreHorizontalCircle01Icon,
  Notification01Icon,
  PencilEdit01Icon,
  PieChartIcon,
  Settings01Icon,
  Sun01Icon,
  Tag01Icon,
  Tick02Icon,
  UserCircleIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons"

export const DEFAULT_ICON_STROKE = 2 as const

export const Icons = {
  add: Add01Icon,
  alertTriangle: Alert01Icon,
  arrowDown: ArrowDown01Icon,
  /** Mesmo trac.svg que "seta para baixo" em controlos (ex. dropdown). */
  chevronDown: ArrowDown01Icon,
  arrowDownLeft: ArrowDownLeft01Icon,
  arrowLeft: ArrowLeft01Icon,
  arrowUp: ArrowUp01Icon,
  arrowUpRight: ArrowUpRight01Icon,
  barChart: BarChartIcon,
  building: Building01Icon,
  arrowRight: ArrowRight01Icon,
  arrowLeftRight: ArrowLeftRightIcon,
  calendar: Calendar01Icon,
  download: Download01Icon,
  edit: PencilEdit01Icon,
  filter: FilterIcon,
  monitor: MonitorDotIcon,
  moon: Moon01Icon,
  moreHorizontal: MoreHorizontalCircle01Icon,
  sun: Sun01Icon,
  tick: Tick02Icon,
  user: UserCircleIcon,
  wallet: Wallet01Icon,
  gridView: GridViewIcon,
  creditCard: CreditCardIcon,
  notification: Notification01Icon,
  pieChart: PieChartIcon,
  tag: Tag01Icon,
  settings: Settings01Icon,
  trendingDown: ChartDecreaseIcon,
  trendingUp: ChartIncreaseIcon,
} as const

export type IconName = keyof typeof Icons

/** Chaves de `Icons` ordenadas alfabeticamente (para documentação e grelhas). */
export const ICON_NAMES = Object.keys(Icons).sort() as IconName[]
