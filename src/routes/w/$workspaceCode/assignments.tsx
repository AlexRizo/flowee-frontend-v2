import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  createFileRoute,
  redirect,
  useLoaderData,
} from '@tanstack/react-router'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { AssignmentBoard } from '#/features/assignments/components/assignment-board'
import { staffForSpaceQueryOptions } from '#/features/assignments/queries/assignments.queries'
import {
  spaceTasksQueryOptions,
  taskKeys,
} from '#/features/tasks/queries/tasks.queries'
import { queryClient } from '#/lib/query-client'
import { SpaceIcon } from '#/components/layout/navbar/space-icon'

const TASKS_TAKE = 500

export const Route = createFileRoute('/w/$workspaceCode/assignments')({
  beforeLoad: ({ context, params }) => {
    if (context.user?.role !== 'ADMIN') {
      throw redirect({ to: '/w/$workspaceCode', params })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { workspaceCode } = Route.useParams()
  const { spaces } = useLoaderData({ from: '/w/$workspaceCode' })
  const [spaceCode, setSpaceCode] = useState<string | undefined>(
    spaces[0]?.code,
  )

  const { data: tasks, isLoading: isLoadingTasks } = useQuery({
    ...spaceTasksQueryOptions(workspaceCode, spaceCode ?? '', TASKS_TAKE),
    enabled: !!spaceCode,
  })

  const { data: staff, isLoading: isLoadingStaff } = useQuery({
    ...staffForSpaceQueryOptions(workspaceCode, spaceCode ?? ''),
    enabled: !!spaceCode,
  })

  const handleSaved = () => {
    if (!spaceCode) return
    void queryClient.invalidateQueries({
      queryKey: taskKeys.space(workspaceCode, spaceCode, TASKS_TAKE),
    })
  }

  const isLoading = isLoadingTasks || isLoadingStaff

  return (
    <div className="flex h-full min-h-0 flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Centro de asignaciones</h1>
          <p className="text-sm text-muted-foreground">
            Arrastra tareas sin asignar hacia el STAFF que las va a resolver.
          </p>
        </div>

        <Select value={spaceCode} onValueChange={setSpaceCode}>
          <SelectTrigger className="w-[200px] ">
            <SelectValue placeholder="Selecciona un space" />
          </SelectTrigger>
          <SelectContent>
            {spaces.map((space) => (
              <SelectItem key={space.code} value={space.code}>
                <SpaceIcon
                  name={space.name}
                  color={space.color}
                  className="size-4 text-xs"
                />
                {space.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!spaceCode ? (
        <p className="text-sm text-muted-foreground">
          Este workspace no tiene spaces disponibles.
        </p>
      ) : isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando…</p>
      ) : !staff || staff.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Este space no tiene STAFF con acceso asignado.
        </p>
      ) : (
        <AssignmentBoard
          workspaceCode={workspaceCode}
          spaceCode={spaceCode}
          tasks={tasks ?? []}
          staff={staff}
          onSaved={handleSaved}
        />
      )}
    </div>
  )
}
