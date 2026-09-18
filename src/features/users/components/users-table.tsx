import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Trash2 } from 'lucide-react'
import type { User } from '../types'
import type { UserStatus } from '../../auth/types'
import { formatDate, initials, roleLabel, statusLabel } from '../lib/labels'

interface Props {
  users: User[]
  currentUserId: string
  canManage: boolean
  onDelete: (user: User) => void
}

const STATUS_VARIANT: Record<
  UserStatus,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  ACTIVE: 'default',
  PENDING: 'outline',
  SUSPENDED: 'destructive',
  DELETED: 'destructive',
}

export const UsersTable = ({
  users,
  currentUserId,
  canManage,
  onDelete,
}: Props) => {
  if (users.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No hay usuarios registrados todavía.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-muted-foreground">
            <th className="px-4 py-2.5 text-left font-medium">Usuario</th>
            <th className="px-4 py-2.5 text-left font-medium">Correo</th>
            <th className="px-4 py-2.5 text-left font-medium">Rol</th>
            <th className="px-4 py-2.5 text-left font-medium">Estado</th>
            <th className="px-4 py-2.5 text-left font-medium">Verificado</th>
            <th className="px-4 py-2.5 text-left font-medium">Creado</th>
            {canManage && (
              <th className="px-4 py-2.5 text-right font-medium">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSelf = user.id === currentUserId

            return (
              <tr key={user.id} className="border-b last:border-0">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar ?? undefined} alt={user.name ?? user.username} />
                      <AvatarFallback>
                        {initials(user.name, user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {user.name || '—'}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5">{user.email}</td>
                <td className="px-4 py-2.5">
                  <Badge variant="secondary">{roleLabel(user.role)}</Badge>
                </td>
                <td className="px-4 py-2.5">
                  <Badge variant={STATUS_VARIANT[user.status]}>
                    {statusLabel(user.status)}
                  </Badge>
                </td>
                <td className="px-4 py-2.5">
                  {user.emailVerified ? 'Sí' : 'No'}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {formatDate(user.createdAt)}
                </td>
                {canManage && (
                  <td className="px-4 py-2.5 text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      disabled={isSelf || user.status === 'DELETED'}
                      aria-label={`Eliminar a ${user.username}`}
                      onClick={() => onDelete(user)}
                    >
                      <Trash2 />
                    </Button>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}