import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '#/components/ui/sidebar'
import type { FC } from 'react'
import type { Section } from './sidebar-menu'
import { Link } from '@tanstack/react-router'

interface Props {
  section: Section
  workspace: string
}

export const NavMain: FC<Props> = ({ section, workspace }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
      <SidebarMenu>
        {section.options.map((option) => (
          <Link
            activeProps={{ className: 'bg-violet-200' }}
            activeOptions={{ exact: option.to === '/' }}
            className="hover:bg-violet-100 rounded-md"
            to={'/w/$workspaceCode' + option.to}
            params={{ workspaceCode: workspace }}
          >
            <SidebarMenuItem key={option.to}>
              <SidebarMenuButton
                tooltip={option.title}
                className="hover:bg-transparent"
              >
                {option.icon ? <option.icon /> : null}
                <span>{option.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
