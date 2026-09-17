import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { Task } from '../types'
import { TaskCard } from './task-card'

interface DraggableTaskCardProps {
  task: Task
  onClick?: (task: Task) => void
}

export function DraggableTaskCard({ task, onClick }: DraggableTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id, data: { task } })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ transform: CSS.Translate.toString(transform) }}
      className="touch-none"
    >
      <TaskCard task={task} onClick={onClick} isDragging={isDragging} />
    </div>
  )
}
