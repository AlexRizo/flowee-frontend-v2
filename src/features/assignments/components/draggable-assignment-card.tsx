import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { TaskCard } from '#/features/tasks/components/task-card'
import type { Task } from '#/features/tasks/types'
import { cn } from '#/lib/utils'

interface DraggableAssignmentCardProps {
  task: Task
  /** true cuando la tarjeta está en la columna de un STAFF pero aún no se
   * ha guardado con el botón "Asignar". */
  pending?: boolean
}

export function DraggableAssignmentCard({
  task,
  pending,
}: DraggableAssignmentCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id, data: { task } })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={cn(
        'relative touch-none',
        pending && 'rounded-xl ring-2 ring-status-attention/50',
      )}
    >
      {pending && (
        <span className="absolute -top-2 right-2 z-10 rounded-full bg-status-attention px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
          Por guardar
        </span>
      )}
      <TaskCard task={task} isDragging={isDragging} />
    </div>
  )
}
