import type { LucideIcon } from 'lucide-react'

interface SectionOption {
  title: string
  path: string
  isCollapsable?: boolean
  isActive?: boolean
  icon?: LucideIcon
  items?: {
    title: string
    path: string
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
