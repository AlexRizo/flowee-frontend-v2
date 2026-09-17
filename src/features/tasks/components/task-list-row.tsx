import { CalendarClock } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from '#/components/ui/avatar'
import { cn } from '#/lib/utils'
import { avatarColorFor, initialsFor, initialsFrom } from '../lib/avatar-color'
import { TASK_PRIORITY_CONFIG } from '../lib/task-priority'
import { TASK_TYPE_CONFIG } from '../lib/task-type'
import type { Task } from '../types'

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'short',
})

const MAX_VISIBLE_ASSIGNEES = 3

interface TaskListRowProps {
  task: Task
  onClick?: (task: Task) => void
}

export function TaskListRow({ task, onClick }: TaskListRowProps) {
  const typeConfig = TASK_TYPE_CONFIG[task.type]
  const priorityConfig = TASK_PRIORITY_CONFIG[task.priority]
  const TypeIcon = typeConfig.icon
  const PriorityIcon = priorityConfig.icon

  const visibleAssignees = task.assignees.slice(0, MAX_VISIBLE_ASSIGNEES)
  const extraAssignees = task.assignees.length - visibleAssignees.length

  return (
    <div
      onClick={() => onClick?.(task)}
      className="flex cursor-pointer items-center gap-3 border-border px-4 py-2.5 hover:bg-muted/40"
    >
      <span
        className={cn(
          'flex size-7 shrink-0 items-center justify-center rounded-md',
          typeConfig.className,
        )}
        title={typeConfig.label}
      >
        <TypeIcon className="size-3.5" />
      </span>

      <span
        className="hidden h-5 shrink-0 items-center justify-center rounded-md px-1.5 text-[10px] font-bold text-white sm:flex"
        style={{ background: task.space.color }}
        title={task.space.name}
      >
        {initialsFrom(task.space.name)}
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-bold">{task.title}</span>
        {task.description && (
          <span className="truncate text-xs font-normal text-muted-foreground">
            {task.description}
          </span>
        )}
      </div>

      {task.priority !== 'NORMAL' && (
        <span
          className={cn(
            'hidden shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold md:flex',
            priorityConfig.className,
          )}
        >
          <PriorityIcon className="size-3" />
          {priorityConfig.label}
        </span>
      )}

      {visibleAssignees.length > 0 && (
        <AvatarGroup className="shrink-0">
          {visibleAssignees.map((assignee) => (
            <Avatar
              key={assignee.id}
              size="sm"
              title={assignee.name ?? assignee.username}
            >
              <AvatarFallback className={avatarColorFor(assignee.id)}>
                {initialsFor(assignee.name, assignee.username)}
              </AvatarFallback>
            </Avatar>
          ))}
          {extraAssignees > 0 && (
            <AvatarGroupCount className="size-6 text-[10px]">
              +{extraAssignees}
            </AvatarGroupCount>
          )}
        </AvatarGroup>
      )}

      <div className="flex w-20 shrink-0 items-center justify-end gap-1 text-xs text-muted-foreground">
        {task.dueDate && (
          <>
            <CalendarClock className="size-3.5" />
            {dateFormatter.format(new Date(task.dueDate))}
          </>
        )}
      </div>
    </div>
  )
}
