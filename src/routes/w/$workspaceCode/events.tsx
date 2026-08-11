import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/w/$workspaceCode/events')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/w/$workspaceCode/events"!</div>
}
