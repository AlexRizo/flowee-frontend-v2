import { CalendarPlus, CalendarClock } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from '#/components/ui/avatar'
import { Card, CardContent } from '#/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { cn } from '#/lib/utils'
import { avatarColorFor, initialsFor } from '../lib/avatar-color'
import { formatDateTime } from '../lib/format-date'
import { TASK_PRIORITY_CONFIG } from '../lib/task-priority'
import { TASK_TYPE_CONFIG } from '../lib/task-type'
import { truncate } from '../lib/truncate'
import type { Task } from '../types'
import { BoardBadge } from '#/features/space/components/board-badge'

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  weekday: 'short',
  hour: 'numeric',
  minute: '2-digit',
})

const MAX_VISIBLE_ASSIGNEES = 3
const TITLE_MAX_LENGTH = 60
const DESCRIPTION_MAX_LENGTH = 90

interface TaskCardProps {
  task: Task
  onClick?: (task: Task) => void
  isDragging?: boolean
}

export function TaskCard({ task, onClick, isDragging }: TaskCardProps) {
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
      className={cn(
        'cursor-pointer p-0 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/40',
        isDragging && 'opacity-40',
      )}
    >
      <CardContent className="p-0 gap-0">
        <div
          role="heading"
          className="flex items-center justify-between gap-2 py-2 px-4"
        >
          <div className="flex items-center gap-1">
            {/* Prefijo/iniciales del Space */}
            <BoardBadge task={task} />

            {/* Asignado(s) */}
            {visibleAssignees.length > 0 && (
              <AvatarGroup>
                {visibleAssignees.map((assignee) => (
                  <Tooltip key={assignee.id}>
                    <TooltipTrigger asChild>
                      <Avatar size="sm">
                        <AvatarFallback className={avatarColorFor(assignee.id)}>
                          {initialsFor(assignee.name, assignee.username)}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>{assignee.username}</TooltipContent>
                  </Tooltip>
                ))}
                {extraAssignees > 0 && (
                  <AvatarGroupCount className="size-6 text-[10px]">
                    +{extraAssignees}
                  </AvatarGroupCount>
                )}
              </AvatarGroup>
            )}

            {/* Fecha de creación */}
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex size-6 items-center justify-center rounded-md text-muted-foreground">
                  <CalendarPlus className="size-3.5" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                Creada: {formatDateTime(new Date(task.createdAt))}
              </TooltipContent>
            </Tooltip>

            {/* Icono de tipo de tarea */}
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex size-6 items-center justify-center rounded-md text-muted-foreground">
                  <TypeIcon className="size-3.5" />
                </span>
              </TooltipTrigger>
              <TooltipContent>{typeConfig.label}</TooltipContent>
            </Tooltip>
          </div>

          {/* Prioridad */}
          <span
            className={cn(
              'flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold',
              priorityConfig.className,
            )}
          >
            <PriorityIcon className="size-3" />
            {priorityConfig.label}
          </span>
        </div>

        <div className="flex flex-col gap-0.5 p-4 border-y">
          <span
            className="truncate text-[13.5px] font-bold leading-tight"
            title={task.title}
          >
            {truncate(task.title, TITLE_MAX_LENGTH)}
          </span>
          {task.description && (
            <p
              className="line-clamp-2 text-[12.5px] leading-snug font-normal text-muted-foreground"
              title={task.description}
            >
              {truncate(task.description, DESCRIPTION_MAX_LENGTH)}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between py-2 px-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar size="sm">
                <AvatarFallback className={avatarColorFor(task.author.id)}>
                  {initialsFor(task.author.name, task.author.username)}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>{task.author.username}</TooltipContent>
          </Tooltip>

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
