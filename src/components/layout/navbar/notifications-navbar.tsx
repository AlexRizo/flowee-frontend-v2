import { Bell } from 'lucide-react'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

interface Props {
  count?: number
}

export const NavbarNotifications = ({ count = 0 }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notificaciones"
        >
          <Bell />
          {count > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full px-1 text-[10px]">
              {count > 99 ? '99+' : count}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="justify-center py-6 text-muted-foreground">
          No tienes notificaciones
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}