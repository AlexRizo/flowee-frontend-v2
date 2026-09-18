import { useEffect, useMemo, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { toast } from 'sonner'
import { useUpdateTaskStatus } from '../queries/tasks.queries'
import { TASK_STATUS_ORDER } from '../lib/task-status'
import type { Task, TaskStatus } from '../types'
import { KanbanColumn } from './kanban-column'
import { TaskCard } from './task-card'

interface KanbanBoardProps {
  workspaceCode: string
  tasks: Task[]
  onTaskClick?: (task: Task) => void
}

export function KanbanBoard({
  workspaceCode,
  tasks,
  onTaskClick,
}: KanbanBoardProps) {
  // Las tareas EVENT no viven en el kanban, tienen su propio calendario en
  // /eventos.
  const boardTasks = useMemo(
    () => tasks.filter((task) => task.type !== 'EVENT'),
    [tasks],
  )

  const [localTasks, setLocalTasks] = useState(boardTasks)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const updateStatus = useUpdateTaskStatus(workspaceCode)

  // Resincroniza si llegan datos nuevos del servidor (refetch, navegación).
  useEffect(() => {
    setLocalTasks(boardTasks)
  }, [boardTasks])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  )

  const tasksByStatus = useMemo(() => {
    const grouped = new Map<TaskStatus, Task[]>(
      TASK_STATUS_ORDER.map((status) => [status, []]),
    )
    for (const task of localTasks) {
      grouped.get(task.status)?.push(task)
    }
    return grouped
  }, [localTasks])

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTask(localTasks.find((task) => task.id === active.id) ?? null)
  }

  const setTaskStatus = (taskId: string, status: TaskStatus) => {
    setLocalTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t)),
    )
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null)
    if (!over) return

    const nextStatus = over.id as TaskStatus
    const taskId = active.id as string
    const task = localTasks.find((t) => t.id === taskId)
    if (!task || task.status === nextStatus) return

    const previousStatus = task.status

    // Optimista: se mueve la tarjeta de inmediato; si el backend rechaza el
    // cambio (permisos, tarea eliminada, etc.) se revierte y se avisa.
    setTaskStatus(taskId, nextStatus)

    updateStatus.mutate(
      { spaceCode: task.space.code, taskId, status: nextStatus },
      {
        onError: () => {
          setTaskStatus(taskId, previousStatus)
          toast.error('No se pudo actualizar el status de la tarea')
        },
      },
    )
  }

  return (
    <DndContext
      sensors={sensors}
      autoScroll={{ threshold: { x: 0.2, y: 0 } }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-1 min-h-0 items-start gap-5 overflow-auto px-2 pb-2 no-scrollbar">
        {TASK_STATUS_ORDER.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasksByStatus.get(status) ?? []}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>

      <DragOverlay>{activeTask && <TaskCard task={activeTask} />}</DragOverlay>
    </DndContext>
  )
}
