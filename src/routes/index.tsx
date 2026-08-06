import { authApi } from '#/features/auth/api/auth.api'
import { authKeys } from '#/features/auth/queries/auth.queries'
import { SelectWorkspace } from '#/features/workspace/components/select-workspace'
import { meWorkspacesQueryOptions } from '#/features/workspace/queries/workspace.queries'
import { queryClient } from '#/lib/query-client'
import {
  createFileRoute,
  redirect,
  useLoaderData,
} from '@tanstack/react-router'
import { AlertCircle } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
  beforeLoad({ context }) {
    const user = context.user

    if (!user) throw redirect({ to: '/auth/signin' })

    if (user.favoriteWorkspace?.code) {
      throw redirect({
        to: `/w/$workspaceCode`,
        params: { workspaceCode: user.favoriteWorkspace.code },
      })
    }
  },
  loader: async () => {
    const workspaces = await queryClient
      .ensureQueryData(meWorkspacesQueryOptions())
      .catch(() => [])

    if (workspaces.length === 1) {
      const uniqueWorkspaceCode = workspaces[0].code

      await authApi.setFavoriteWorkspace(uniqueWorkspaceCode)
      queryClient.invalidateQueries({ queryKey: authKeys.me() })

      throw redirect({
        to: `/w/$workspaceCode`,
        params: { workspaceCode: uniqueWorkspaceCode },
      })
    }

    return { workspaces }
  },
})

function Home() {
  const { workspaces } = useLoaderData({ from: '/' })

  return (
    <section className="p-8">
      <article>
        <h1 className="text-4xl font-bold text-center mb-4">
          Bienvenido/a a Flowee
        </h1>
        <p className="mt-4 text-lg text-center">
          Selecciona un workspace para empezar:
        </p>
      </article>
      <div className="flex flex-col items-center mt-6 gap-2">
        <SelectWorkspace workspaces={workspaces} />
        <article className="flex items-center gap-2 text-muted-foreground">
          <AlertCircle size={16} />
          <small className="max-w-96">
            En caso de no contar con workspaces, ingresa de nuevo o espera a que
            el administrador te asigne uno. Contacta al administrador si crees
            que es un error.
          </small>
        </article>
      </div>
    </section>
  )
}
