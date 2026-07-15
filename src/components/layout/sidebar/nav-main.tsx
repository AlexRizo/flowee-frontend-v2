import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '#/components/ui/sidebar'
import type { FC } from 'react'
import type { Section } from './sidebar-menu'

interface Props {
  section: Section
}

export const NavMain: FC<Props> = ({ section }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
      <SidebarMenu>
        {section.options.map((option) => (
          <SidebarMenuItem key={option.path}>
            <SidebarMenuButton tooltip={option.title}>
              {option.icon ? <option.icon /> : null}
              <span>{option.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
