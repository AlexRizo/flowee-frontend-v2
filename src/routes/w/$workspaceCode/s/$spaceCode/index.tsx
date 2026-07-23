import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/w/$workspaceCode/s/$spaceCode/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { workspaceCode, spaceCode } = Route.useParams()

  return <div>Hello "/w/{workspaceCode}/{spaceCode}/"!</div>
}
