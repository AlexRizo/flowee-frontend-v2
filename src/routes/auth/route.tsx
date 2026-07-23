import { meQueryOptions } from '#/features/auth/queries/auth.queries'
import { queryClient } from '#/lib/query-client'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  beforeLoad: async () => {
    const user = await queryClient
      .ensureQueryData(meQueryOptions())
      .catch(() => null)

    if (user) {
      throw redirect({ to: '/' })
    }

    return { user: null }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="h-screen w-screen">
      <section className="flex flex-row size-full">
        <aside className="bg-primary size-full" />
        <div className="min-w-lg p-14 flex">
          <Outlet />
        </div>
      </section>
    </main>
  )
}
