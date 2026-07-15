import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/w/$workspaceCode')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <h1>{Route.id}</h1>
      <Outlet />
    </main>
  )
}
