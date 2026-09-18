import { Info } from 'lucide-react'
import { useDroppable } from '@dnd-kit/core'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { TaskCard } from '#/features/tasks/components/task-card'
import { avatarColorFor, initialsFor } from '#/features/tasks/lib/avatar-color'
import type { Task } from '#/features/tasks/types'
import { cn } from '#/lib/utils'
import type { Staff } from '../types'
import { DraggableAssignmentCard } from './draggable-assignment-card'

const HIGH_WORKLOAD_THRESHOLD = 5
const OVERLOAD_WORKLOAD_THRESHOLD = 9

const workloadBorderClass = (activeCount: number) => {
  if (activeCount >= OVERLOAD_WORKLOAD_THRESHOLD) return 'border-red-600'
  if (activeCount >= HIGH_WORKLOAD_THRESHOLD) return 'border-yellow-500'
  return 'border-green-600'
}

interface AssignmentColumnProps {
  id: string
  title: string
  /** Tareas que ya tiene asignadas este STAFF (solo lectura, no arrastrables). */
  existingTasks: Task[]
  /** Tareas originadas en "Sin asignar" que están en esta columna (arrastrables). */
  draggableTasks: Task[]
  /** true en columnas de STAFF: marca draggableTasks como "por guardar". */
  pending?: boolean

  isUser?: boolean
  /** Usuario dueño de la columna (solo columnas de STAFF/ADMIN). */
  member?: Staff
}

export function AssignmentColumn({
  id,
  title,
  existingTasks,
  draggableTasks,
  pending,
  isUser,
  member,
}: AssignmentColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })
  const total = existingTasks.length + draggableTasks.length
  const activeCount = [...existingTasks, ...draggableTasks].filter(
    (task) => task.status !== 'DONE',
  ).length
  const isHighWorkload = isUser && activeCount >= HIGH_WORKLOAD_THRESHOLD
  // En columnas de usuario solo se muestran las tareas por asignar
  // (draggableTasks); las ya asignadas no se renderizan, solo cuentan.
  const visibleTasks = isUser
    ? draggableTasks
    : [...existingTasks, ...draggableTasks]
  const displayCount = isUser ? activeCount : total

  return (
    <div className="relative flex min-w-64 max-w-72 flex-1 basis-64 flex-col gap-3.5">
      <div
        className={cn(
          'flex items-center gap-1.5 px-3 py-2.5 border border-l-4 sticky top-0 z-15 backdrop-blur-md',
          isUser && 'bg-neutral-700 rounded-lg text-white',
          isUser && workloadBorderClass(activeCount),
          !isUser && 'bg-orange-50 rounded-lg border-orange-400',
        )}
      >
        {isUser && member && (
          <Avatar size="sm">
            <AvatarFallback className={avatarColorFor(member.id)}>
              {initialsFor(member.name, member.username)}
            </AvatarFallback>
          </Avatar>
        )}
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-[13px]">({displayCount})</span>
        {isHighWorkload && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="ml-auto size-4 shrink-0 text-status-attention" />
            </TooltipTrigger>
            <TooltipContent>
              Este usuario tiene mucha carga de trabajo. Asignarle más tareas
              podría conllevar tiempos de entrega más largos.
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          'flex min-h-24 flex-1 flex-col gap-3 rounded-lg -m-1 p-1 transition-colors',
          isOver && 'bg-primary/5 ring-2 ring-primary/30',
        )}
      >
        {visibleTasks.length === 0 ? (
          <div className="flex min-h-15 items-center justify-center rounded-lg border border-dashed border-border/70 px-3 py-5 text-[12.5px] text-muted-foreground">
            Sin tareas
          </div>
        ) : isUser ? (
          draggableTasks.map((task) => (
            <DraggableAssignmentCard
              key={task.id}
              task={task}
              pending={pending}
            />
          ))
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
