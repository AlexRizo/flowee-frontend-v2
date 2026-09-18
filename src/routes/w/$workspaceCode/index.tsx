import { createFileRoute } from '@tanstack/react-router'
import { KanbanBoard } from '#/features/tasks/components/kanban-board'
import {
  useWorkspaceTasks,
  workspaceTasksQueryOptions,
} from '#/features/tasks/queries/tasks.queries'
import { queryClient } from '#/lib/query-client'

const TASKS_TAKE = 25

export const Route = createFileRoute('/w/$workspaceCode/')({
  loader: async ({ params }) => {
    await queryClient
      .ensureQueryData(workspaceTasksQueryOptions(params.workspaceCode, TASKS_TAKE))
      .catch(() => [])
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { workspaceCode } = Route.useParams()
  const { data: tasks, isLoading, isError } = useWorkspaceTasks(
    workspaceCode,
    TASKS_TAKE,
  )

  return (
    <div className="flex h-full min-h-0 flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Tablero general</h1>
        <p className="text-sm text-muted-foreground">
          Últimas {TASKS_TAKE} tareas disponibles para ti en este workspace.
        </p>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          No se pudieron cargar las tareas. Intenta de nuevo más tarde.
        </p>
      )}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando tareas…</p>
      ) : (
        <KanbanBoard workspaceCode={workspaceCode} tasks={tasks ?? []} />
      )}
    </div>
  )
}
