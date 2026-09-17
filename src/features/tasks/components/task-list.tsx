import { useMemo } from 'react'
import { Card } from '#/components/ui/card'
import { TASK_STATUS_CONFIG, TASK_STATUS_ORDER } from '../lib/task-status'
import type { Task, TaskStatus } from '../types'
import { TaskListRow } from './task-list-row'

interface TaskListProps {
  tasks: Task[]
  onTaskClick?: (task: Task) => void
}

export function TaskList({ tasks, onTaskClick }: TaskListProps) {
  const tasksByStatus = useMemo(() => {
    const grouped = new Map<TaskStatus, Task[]>(
      TASK_STATUS_ORDER.map((status) => [status, []]),
    )
    for (const task of tasks) {
      grouped.get(task.status)?.push(task)
    }
    return grouped
  }, [tasks])

  const nonEmptyStatuses = TASK_STATUS_ORDER.filter(
    (status) => (tasksByStatus.get(status)?.length ?? 0) > 0,
  )

  if (nonEmptyStatuses.length === 0) {
    return (
      <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed border-border/70 text-sm text-muted-foreground">
        No tienes tareas creadas ni asignadas por aquí.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {nonEmptyStatuses.map((status) => {
        const config = TASK_STATUS_CONFIG[status]
        const statusTasks = tasksByStatus.get(status) ?? []

        return (
          <div key={status} className="flex flex-col gap-2">
            <div className="flex items-baseline gap-1.5 px-1">
              <span className="text-sm font-semibold">{config.label}</span>
              <span className="text-[13px] text-muted-foreground">
                ({statusTasks.length})
              </span>
            </div>

            <Card size="sm" className="py-0 divide-y gap-0">
              {statusTasks.map((task) => (
                <TaskListRow key={task.id} task={task} onClick={onTaskClick} />
              ))}
            </Card>
          </div>
        )
      })}
    </div>
  )
}
