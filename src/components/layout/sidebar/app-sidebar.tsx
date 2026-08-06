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
import { NavUser } from './nav-user'
import { useMe } from '#/features/auth/queries/auth.queries'

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
  const { data: user } = useMe()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* TODO: Workspace switcher */}</SidebarHeader>
      <SidebarContent>
        {SIDEBAR_MENU.sections.map((section) => (
          <NavMain key={section.title} section={section} />
        ))}
        
      </SidebarContent>
      <SidebarFooter>
        {/* TODO: Profile menu */}
        {user && (
          <NavUser
            user={{
              name: user.username,
              email: user.email,
              avatar: user.avatar,
            }}
          />
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
