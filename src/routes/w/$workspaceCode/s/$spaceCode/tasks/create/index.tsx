import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/w/$workspaceCode/s/$spaceCode/tasks/create/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { spaceCode } = Route.useParams()
  const { spaces } = useLoaderData({ from: '/w/$workspaceCode' })

  const space = spaces.find((s) => s.code === spaceCode)

  return <div>Crear tarea para el espacio {space?.name}: </div>
}
