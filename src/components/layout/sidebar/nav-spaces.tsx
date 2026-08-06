import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "#/components/ui/sidebar"
import type { Space } from "#/features/space/types"
import { SpaceIcon } from "./space-icon"

interface Props {
  spaces: Space[]
}

export const NavSpaces = ({ spaces }: Props) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Espacios</SidebarGroupLabel>
      <SidebarMenu>
        {spaces.map((space) => (
          <SidebarMenuItem key={space.id}>
            <SidebarMenuButton tooltip={space.name}>
              <SpaceIcon color={space.color} name={space.name} />
              <span>{space.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
