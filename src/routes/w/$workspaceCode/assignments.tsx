import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/w/$workspaceCode/assignments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/w/$workspaceCode/assignments"!</div>
}
