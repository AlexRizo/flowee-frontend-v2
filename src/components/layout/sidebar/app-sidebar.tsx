import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '#/components/ui/sidebar'
import { Home } from 'lucide-react'
import type { ComponentProps } from 'react'
import type { SidebarMenu } from './sidebar-menu'
import { NavMain } from './nav-main'

const SIDEBAR_MENU: SidebarMenu = {
  sections: [
    {
      title: 'Centro de control',
      options: [
        { title: 'Inicio', path: '/', icon: Home },
        { title: 'Centro de asignaciones', path: '/assignments', icon: Home },
        { title: 'Mis tareas', path: '/tasks', icon: Home },
        { title: 'Eventos', path: '/events', icon: Home },
      ],
    },
    {
      title: 'Configuración',
      options: [
        { title: 'Usuarios', path: '/users', icon: Home },
        { title: 'Configuración', path: '/config', icon: Home },
        { title: 'Administrador', path: '/admin', icon: Home },
      ],
    },
  ],
}

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* TODO: Workspace switcher */}</SidebarHeader>
      <SidebarContent>
        {
          SIDEBAR_MENU.sections.map((section) => (
            <NavMain key={section.title} section={section} />
          ))
        }
      </SidebarContent>
      <SidebarFooter>{/* TODO: Profile menu */}</SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
