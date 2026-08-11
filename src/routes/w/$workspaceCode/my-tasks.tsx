import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/w/$workspaceCode/my-tasks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/w/$workspaceCode/my-tasks"!</div>
}
