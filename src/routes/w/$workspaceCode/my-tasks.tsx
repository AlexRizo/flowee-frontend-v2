import { createFileRoute } from '@tanstack/react-router'
import { TaskList } from '#/features/tasks/components/task-list'
import {
  myWorkspaceTasksQueryOptions,
  useMyWorkspaceTasks,
} from '#/features/tasks/queries/tasks.queries'
import { queryClient } from '#/lib/query-client'

export const Route = createFileRoute('/w/$workspaceCode/my-tasks')({
  loader: async ({ params }) => {
    await queryClient
      .ensureQueryData(myWorkspaceTasksQueryOptions(params.workspaceCode))
      .catch(() => [])
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { workspaceCode } = Route.useParams()
  const { data: tasks, isLoading, isError } = useMyWorkspaceTasks(workspaceCode)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Mis tareas</h1>
        <p className="text-sm text-muted-foreground">
          Tareas que creaste o que tienes asignadas en este workspace.
        </p>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          No se pudieron cargar tus tareas. Intenta de nuevo más tarde.
        </p>
      )}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando tareas…</p>
      ) : (
        <TaskList tasks={tasks ?? []} />
      )}
    </div>
  )
}
