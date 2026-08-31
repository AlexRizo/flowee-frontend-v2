import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/w/$workspaceCode/s/$spaceCode/tasks/create/event-task',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/w/$workspaceCode/s/$spaceCode/tasks/create/event-task"!</div>
  )
}
