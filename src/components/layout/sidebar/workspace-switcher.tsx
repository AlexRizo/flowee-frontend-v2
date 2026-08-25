import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '#/components/ui/sidebar'
import type { Workspace } from '#/features/workspace/types'
import { getContrastText } from '#/lib/get-contrast-text'
import { useNavigate } from '@tanstack/react-router'
import { ChevronsUpDown, LayoutDashboard, Plus } from 'lucide-react'

interface Prosp {
  workspaces: Workspace[]
  activeWorkspace: Workspace
}

export const WorkspaceSwitcher = ({ workspaces, activeWorkspace }: Prosp) => {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()

  const onSelectWorkspace = async (code: string) => {
    if (code === activeWorkspace.code) return
    await navigate({
      to: '/w/$workspaceCode',
      params: { workspaceCode: code },
      replace: true,
    })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                className="flex aspect-square size-8 items-center justify-center rounded-md"
                style={{
                  backgroundColor: activeWorkspace.color,
                  color: getContrastText(activeWorkspace.color),
                }}
              >
                <LayoutDashboard strokeWidth={1.5} className="size-5.5!" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeWorkspace.name}
                </span>
                <span className="truncate text-muted-foreground text-xs">
                  Workspace
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            {workspaces.map((workspace, index) => (
              <DropdownMenuItem
                key={workspace.code}
                onClick={() => onSelectWorkspace(workspace.code)}
                className="gap-2 p-2"
              >
                <div
                  className="flex size-6 items-center justify-center rounded-sm border"
                  style={{
                    color: getContrastText(workspace.color),
                    backgroundColor: workspace.color,
                  }}
                >
                  <LayoutDashboard className="shrink-0 size-3.5" />
                </div>
                {workspace.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
