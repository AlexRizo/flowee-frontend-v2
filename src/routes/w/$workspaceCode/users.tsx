import { createFileRoute, redirect } from '@tanstack/react-router'
import { CreateUserDialog } from '#/features/users/components/create-user-dialog'
import { UsersTable } from '#/features/users/components/users-table'
import { useDeleteUser, useUsers, usersQueryOptions } from '#/features/users/queries/users.queries'
import { queryClient } from '#/lib/query-client'
import { useMe } from '#/features/auth/queries/auth.queries'
import type { User } from '#/features/users/types'

export const Route = createFileRoute('/w/$workspaceCode/users')({
  beforeLoad: ({ context, params }) => {
    if (context.user?.role !== 'ADMIN') {
      throw redirect({ to: '/w/$workspaceCode', params })
    }
  },
  loader: async () => {
    await queryClient.ensureQueryData(usersQueryOptions()).catch(() => [])
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { data: currentUser } = useMe()
  const { data: users = [], isLoading, isError } = useUsers()
  const deleteUser = useDeleteUser()

  const canManage = currentUser?.role === 'ADMIN'
  const currentUserId = currentUser?.id ?? ''

  const handleDelete = (user: User) => {
    if (!window.confirm(`¿Eliminar al usuario ${user.username}?`)) return
    deleteUser.mutate(user.id)
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Usuarios</h1>
          <p className="text-sm text-muted-foreground">
            Administra las cuentas del sistema. Solo los administradores pueden
            crear y eliminar usuarios.
          </p>
        </div>

        {canManage && <CreateUserDialog />}
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          No se pudieron cargar los usuarios. Intenta de nuevo más tarde.
        </p>
      )}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando usuarios…</p>
      ) : (
        <UsersTable
          users={users}
          currentUserId={currentUserId}
          canManage={canManage}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}