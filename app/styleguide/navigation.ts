export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [
      { name: "Design Tokens", href: "/styleguide" },
      { name: "Ícones", href: "/styleguide/icons" },
    ],
  },
  {
    title: "Components",
    items: [
      { name: "Button", href: "/styleguide/components/button" },
      { name: "Table", href: "/styleguide/components/table" },
      { name: "Chart", href: "/styleguide/components/chart" },
      { name: "Breadcrumb", href: "/styleguide/components/breadcrumb" },
      { name: "Accordion", href: "/styleguide/components/accordion" },
      { name: "Data Table", href: "/styleguide/components/data-table" },
      { name: "Dialog", href: "/styleguide/components/dialog" },
      { name: "Field", href: "/styleguide/components/field" },
      { name: "Pagination", href: "/styleguide/components/pagination" },
      { name: "Radio Group", href: "/styleguide/components/radio-group" },
      { name: "Select", href: "/styleguide/components/select" },
      { name: "Sidebar", href: "/styleguide/components/sidebar" },
      { name: "Tooltip", href: "/styleguide/components/tooltip" },
    ],
  },
]
