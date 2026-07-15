import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/w/$workspaceCode/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { workspaceCode } = Route.useParams()

  return <div>Hello "/w/{workspaceCode}/"!</div>
}
