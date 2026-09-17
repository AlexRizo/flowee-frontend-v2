import { useDroppable } from '@dnd-kit/core'
import { TaskCard } from '#/features/tasks/components/task-card'
import type { Task } from '#/features/tasks/types'
import { cn } from '#/lib/utils'
import { DraggableAssignmentCard } from './draggable-assignment-card'

interface AssignmentColumnProps {
  id: string
  title: string
  /** Tareas que ya tiene asignadas este STAFF (solo lectura, no arrastrables). */
  existingTasks: Task[]
  /** Tareas originadas en "Sin asignar" que están en esta columna (arrastrables). */
  draggableTasks: Task[]
  /** true en columnas de STAFF: marca draggableTasks como "por guardar". */
  pending?: boolean
}

export function AssignmentColumn({
  id,
  title,
  existingTasks,
  draggableTasks,
  pending,
}: AssignmentColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })
  const total = existingTasks.length + draggableTasks.length

  return (
    <div className="flex min-w-64 max-w-72 flex-1 basis-64 flex-col gap-3.5">
      <div className="flex items-baseline gap-1.5 rounded-lg border border-border bg-card px-3 py-2.5">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-[13px] text-muted-foreground">({total})</span>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          'flex min-h-24 flex-1 flex-col gap-3 rounded-lg -m-1 p-1 transition-colors',
          isOver && 'bg-primary/5 ring-2 ring-primary/30',
        )}
      >
        {total === 0 ? (
          <div className="flex min-h-15 items-center justify-center rounded-lg border border-dashed border-border/70 px-3 py-5 text-[12.5px] text-muted-foreground">
            Sin tareas
          </div>
        ) : (
          <>
            {existingTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {draggableTasks.map((task) => (
              <DraggableAssignmentCard
                key={task.id}
                task={task}
                pending={pending}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
