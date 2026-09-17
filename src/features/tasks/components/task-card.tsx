import { CalendarPlus, CalendarClock } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from '#/components/ui/avatar'
import { Card, CardContent } from '#/components/ui/card'
import { cn } from '#/lib/utils'
import { avatarColorFor, initialsFor, initialsFrom } from '../lib/avatar-color'
import { TASK_PRIORITY_CONFIG } from '../lib/task-priority'
import { TASK_TYPE_CONFIG } from '../lib/task-type'
import type { Task } from '../types'

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  weekday: 'short',
  hour: 'numeric',
  minute: '2-digit',
})

const MAX_VISIBLE_ASSIGNEES = 3

interface TaskCardProps {
  task: Task
  onClick?: (task: Task) => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const typeConfig = TASK_TYPE_CONFIG[task.type]
  const priorityConfig = TASK_PRIORITY_CONFIG[task.priority]
  const TypeIcon = typeConfig.icon
  const PriorityIcon = priorityConfig.icon

  const visibleAssignees = task.assignees.slice(0, MAX_VISIBLE_ASSIGNEES)
  const extraAssignees = task.assignees.length - visibleAssignees.length

  return (
    <Card
      size="sm"
      onClick={() => onClick?.(task)}
      className="cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/40"
    >
      <CardContent>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {/* Prefijo/iniciales del Space */}
            <span
              className="flex h-5 items-center justify-center rounded-md px-1.5 text-[10px] font-bold tracking-wide text-white"
              style={{ background: task.space.color }}
              title={task.space.name}
            >
              {initialsFrom(task.space.name)}
            </span>

            {/* Asignado(s) */}
            {visibleAssignees.length > 0 && (
              <AvatarGroup>
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

            {/* Fecha de creación */}
            <span
              className="flex size-6 items-center justify-center rounded-md text-muted-foreground"
              title={`Creada ${dateFormatter.format(new Date(task.createdAt))}`}
            >
              <CalendarPlus className="size-3.5" />
            </span>

            {/* Icono de tipo de tarea */}
            <span
              className="flex size-6 items-center justify-center rounded-md text-muted-foreground"
              title={typeConfig.label}
            >
              <TypeIcon className="size-3.5" />
            </span>
          </div>

          {/* Prioridad */}
          {task.priority !== 'NORMAL' && (
            <span
              className={cn(
                'flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold',
                priorityConfig.className,
              )}
            >
              <PriorityIcon className="size-3" />
              {priorityConfig.label}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-[13.5px] font-bold leading-tight">
            {task.title}
          </span>
          {task.description && (
            <p className="line-clamp-2 text-[12.5px] leading-snug font-normal text-muted-foreground">
              {task.description}
            </p>
          )}
        </div>

        <div className="h-px bg-border" />

        <div className="flex items-center justify-between">
          <Avatar size="sm" title={task.author.name ?? task.author.username}>
            <AvatarFallback className={avatarColorFor(task.author.id)}>
              {initialsFor(task.author.name, task.author.username)}
            </AvatarFallback>
          </Avatar>

          {task.dueDate && (
            <div className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-muted-foreground">
              <CalendarClock className="size-3.5" />
              {dateFormatter.format(new Date(task.dueDate))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
