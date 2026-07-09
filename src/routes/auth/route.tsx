import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  validateSearch: (search): { redirect?: string } => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { redirect } = Route.useSearch()

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
