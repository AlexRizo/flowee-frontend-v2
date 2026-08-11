import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '#/components/ui/sidebar'
import type { Space } from '#/features/space/types'
import { Link } from '@tanstack/react-router'
import { SpaceIcon } from './space-icon'

interface Props {
  spaces: Space[]
}

export const NavSpaces = ({ spaces }: Props) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Espacios</SidebarGroupLabel>
      <SidebarMenu>
        {spaces.map((space) => (
          <Link
            activeProps={{ className: 'bg-violet-200' }}
            className='hover:bg-violet-100 rounded-md'
            from="/w/$workspaceCode"
            to="/w/$workspaceCode/s/$spaceCode"
            params={{ spaceCode: space.code }}
          >
            <SidebarMenuItem key={space.id}>
              <SidebarMenuButton tooltip={space.name} className='hover:bg-transparent'>
                <SpaceIcon color={space.color} name={space.name} />
                <span>{space.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
