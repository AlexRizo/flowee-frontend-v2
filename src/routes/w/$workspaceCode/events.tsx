import { createFileRoute } from '@tanstack/react-router'
import { EventCalendar } from '#/features/tasks/components/event-calendar'
import {
  eventTasksQueryOptions,
  useEventTasks,
} from '#/features/tasks/queries/tasks.queries'
import { queryClient } from '#/lib/query-client'

export const Route = createFileRoute('/w/$workspaceCode/events')({
  loader: async ({ params }) => {
    await queryClient
      .ensureQueryData(eventTasksQueryOptions(params.workspaceCode))
      .catch(() => [])
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { workspaceCode } = Route.useParams()
  const { data: tasks, isLoading, isError } = useEventTasks(workspaceCode)

  return (
    <div className="flex h-full min-h-0 flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Eventos</h1>
        <p className="text-sm text-muted-foreground">
          Calendario de tareas de tipo evento en este workspace.
        </p>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          No se pudieron cargar los eventos. Intenta de nuevo más tarde.
        </p>
      )}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando eventos…</p>
      ) : (
        <EventCalendar tasks={tasks ?? []} />
      )}
    </div>
  )
}
