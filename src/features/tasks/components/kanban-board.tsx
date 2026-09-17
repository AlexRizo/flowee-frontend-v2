import { useMemo } from 'react'
import { TASK_STATUS_ORDER } from '../lib/task-status'
import type { Task, TaskStatus } from '../types'
import { KanbanColumn } from './kanban-column'

interface KanbanBoardProps {
  tasks: Task[]
  onTaskClick?: (task: Task) => void
}

export function KanbanBoard({ tasks, onTaskClick }: KanbanBoardProps) {
  const tasksByStatus = useMemo(() => {
    const grouped = new Map<TaskStatus, Task[]>(
      TASK_STATUS_ORDER.map((status) => [status, []]),
    )
    for (const task of tasks) {
      grouped.get(task.status)?.push(task)
    }
    return grouped
  }, [tasks])

  return (
    <div className="flex items-start gap-5 overflow-x-auto pb-2">
      {TASK_STATUS_ORDER.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasksByStatus.get(status) ?? []}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  )
}
