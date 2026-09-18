import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { TaskCard } from '#/features/tasks/components/task-card'
import type { Task } from '#/features/tasks/types'
import { cn } from '#/lib/utils'

interface AssignmentCardVisualProps {
  task: Task
  /** true cuando la tarjeta está en la columna de un STAFF pero aún no se
   * ha guardado con el botón "Asignar". */
  pending?: boolean
  isDragging?: boolean
}

/** Tarjeta + badge "Por guardar", sin lógica de drag: la usan tanto la
 * tarjeta arrastrable como el DragOverlay, para que la vista fantasma que
 * sigue al cursor se vea igual que la tarjeta real (con su badge). */
export function AssignmentCardVisual({
  task,
  pending,
  isDragging,
}: AssignmentCardVisualProps) {
  return (
    <div
      className={cn(
        'relative',
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

interface DraggableAssignmentCardProps {
  task: Task
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
      className={cn('touch-none', isDragging && 'relative z-20')}
    >
      <AssignmentCardVisual task={task} pending={pending} isDragging={isDragging} />
    </div>
  )
}
