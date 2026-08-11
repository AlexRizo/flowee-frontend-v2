import type { ComponentProps } from 'react'
import { useMemo } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '#/components/ui/sidebar'
import {
  CalendarDays,
  ClipboardList,
  Cog,
  GitPullRequestCreateArrow,
  Home,
  ShieldUser,
  Users,
} from 'lucide-react'
import type { SidebarMenu } from './sidebar-menu'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'
import { useMe } from '#/features/auth/queries/auth.queries'
import { useLoaderData, useParams } from '@tanstack/react-router'
import { NavSpaces } from './nav-spaces'
import { WorkspaceSwitcher } from './workspace-switcher'
import { Skeleton } from '#/components/ui/skeleton'
import { useMyWorkspaces } from '#/features/workspace/queries/workspace.queries'

const SIDEBAR_MENU: SidebarMenu = {
  sections: [
    {
      title: 'Centro de control',
      options: [
        { title: 'Inicio', to: '/', icon: Home },
        {
          title: 'Centro de asignaciones',
          to: '/assignments',
          icon: GitPullRequestCreateArrow,
        },
        { title: 'Mis tareas', to: '/my-tasks', icon: ClipboardList },
        { title: 'Eventos', to: '/events', icon: CalendarDays },
      ],
    },
    {
      title: 'Configuración',
      options: [
        { title: 'Usuarios', to: '/users', icon: Users },
        { title: 'Configuración', to: '/config', icon: Cog },
        { title: 'Administrador', to: '/admin', icon: ShieldUser },
      ],
    },
  ],
}

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const { data: user } = useMe()
  const { spaces } = useLoaderData({ from: '/w/$workspaceCode' })
  const { data: workspaces = [] } = useMyWorkspaces()
  const { workspaceCode } = useParams({ from: '/w/$workspaceCode' })

  const selectedWorkspace = useMemo(() => {
    return workspaces.find((w) => w.code === workspaceCode)
  }, [workspaceCode, workspaces])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {selectedWorkspace ? (
          <WorkspaceSwitcher
            workspaces={workspaces}
            activeWorkspace={selectedWorkspace}
          />
        ) : (
          <Skeleton className='w-full h-20' />
        )}
      </SidebarHeader>
      <SidebarContent>
        {SIDEBAR_MENU.sections.map((section) => (
          <NavMain
            key={section.title}
            section={section}
            workspace={workspaceCode}
          />
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
