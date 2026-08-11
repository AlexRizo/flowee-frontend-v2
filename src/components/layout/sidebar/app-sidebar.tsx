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
import { useLoaderData, useParams } from '@tanstack/react-router'
import { NavSpaces } from './nav-spaces'

const SIDEBAR_MENU: SidebarMenu = {
  sections: [
    {
      title: 'Centro de control',
      options: [
        { title: 'Inicio', to: '/', icon: Home },
        { title: 'Centro de asignaciones', to: '/assignments', icon: Home },
        { title: 'Mis tareas', to: '/my-tasks', icon: Home },
        { title: 'Eventos', to: '/events', icon: Home },
      ],
    },
    {
      title: 'Configuración',
      options: [
        { title: 'Usuarios', to: '/users', icon: Home },
        { title: 'Configuración', to: '/config', icon: Home },
        { title: 'Administrador', to: '/admin', icon: Home },
      ],
    },
  ],
}

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const { data: user } = useMe()
  const { spaces } = useLoaderData({ from: '/w/$workspaceCode' })
  const { workspaceCode } = useParams({ from: '/w/$workspaceCode' })

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* TODO: Workspace switcher */}</SidebarHeader>
      <SidebarContent>
        {SIDEBAR_MENU.sections.map((section) => (
          <NavMain key={section.title} section={section} workspace={workspaceCode} />
        ))}

        <NavSpaces spaces={spaces} />
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
