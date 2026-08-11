import type { LucideIcon } from 'lucide-react'

interface SectionOption {
  title: string
  to: string
  isCollapsable?: boolean
  isActive?: boolean
  icon?: LucideIcon
  items?: {
    title: string
    to: string
  }[]
}

export interface Section {
  title: string
  icon?: LucideIcon
  options: SectionOption[]
}

export interface SidebarMenu {
  sections: Section[]
}
