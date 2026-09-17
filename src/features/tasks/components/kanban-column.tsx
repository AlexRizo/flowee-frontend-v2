import { useDroppable } from '@dnd-kit/core'
import { cn } from '#/lib/utils'
import { TASK_STATUS_CONFIG } from '../lib/task-status'
import type { Task, TaskStatus } from '../types'
import { DraggableTaskCard } from './draggable-task-card'

interface KanbanColumnProps {
  status: TaskStatus
  tasks: Task[]
  onTaskClick?: (task: Task) => void
}

export function KanbanColumn({ status, tasks, onTaskClick }: KanbanColumnProps) {
  const config = TASK_STATUS_CONFIG[status]
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <div className="flex min-w-60 max-w-70 flex-1 basis-60 flex-col gap-3.5">
      <div
        className={cn(
          'flex items-center justify-between rounded-lg border border-l-4 px-3 py-2.5',
          config.headerBg,
          config.headerBorder,
          config.bar,
        )}
      >
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-semibold">{config.label}</span>
          <span className="text-[13px] text-muted-foreground">
            ({tasks.length})
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          'flex flex-col gap-3 rounded-lg p-1 -m-1 transition-colors',
          isOver && 'bg-primary/5 ring-2 ring-primary/30',
        )}
      >
        {tasks.length === 0 ? (
          <div className="flex min-h-15 items-center justify-center rounded-lg border border-dashed border-border/70 px-3 py-5 text-[12.5px] text-muted-foreground">
            Sin tareas
          </div>
        ) : (
          tasks.map((task) => (
            <DraggableTaskCard key={task.id} task={task} onClick={onTaskClick} />
          ))
        )}
      </div>
    </div>
  )
}
