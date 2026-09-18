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
import { Button } from '#/components/ui/button'
import type { Task } from '#/features/tasks/types'
import { useBulkAssignTasks } from '../queries/assignments.queries'
import type { Staff } from '../types'
import { AssignmentColumn } from './assignment-column'
import { AssignmentCardVisual } from './draggable-assignment-card'
import { Rocket, Save, Send } from 'lucide-react'

const UNASSIGNED_COLUMN_ID = 'unassigned'

interface AssignmentBoardProps {
  workspaceCode: string
  spaceCode: string
  tasks: Task[]
  staff: Staff[]
  onSaved?: () => void
}

export function AssignmentBoard({
  workspaceCode,
  spaceCode,
  tasks,
  staff,
  onSaved,
}: AssignmentBoardProps) {
  const [pending, setPending] = useState<Record<string, string>>({})
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [activeIsPending, setActiveIsPending] = useState(false)
  const bulkAssign = useBulkAssignTasks(workspaceCode, spaceCode)

  // Si llegan datos nuevos del servidor (refetch, cambio de space), se
  // descarta cualquier asignación pendiente sin guardar.
  useEffect(() => {
    setPending({})
  }, [tasks, staff])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  )

  const tasksById = useMemo(() => new Map(tasks.map((t) => [t.id, t])), [tasks])

  const unassignedTasks = useMemo(
    () => tasks.filter((t) => t.assignees.length === 0 && !pending[t.id]),
    [tasks, pending],
  )

  const assignedByStaff = useMemo(() => {
    const map = new Map<string, Task[]>(staff.map((s) => [s.id, []]))
    for (const task of tasks) {
      for (const assignee of task.assignees) {
        map.get(assignee.id)?.push(task)
      }
    }
    return map
  }, [tasks, staff])

  const pendingByStaff = useMemo(() => {
    const map = new Map<string, Task[]>(staff.map((s) => [s.id, []]))
    for (const [taskId, staffId] of Object.entries(pending)) {
      const task = tasksById.get(taskId)
      if (task) map.get(staffId)?.push(task)
    }
    return map
  }, [pending, staff, tasksById])

  const handleDragStart = ({ active }: DragStartEvent) => {
    const taskId = active.id as string
    setActiveTask(tasksById.get(taskId) ?? null)
    setActiveIsPending(taskId in pending)
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null)
    if (!over) return

    const taskId = active.id as string
    const targetId = over.id as string

    setPending((prev) => {
      if (targetId === UNASSIGNED_COLUMN_ID) {
        if (!(taskId in prev)) return prev
        const next = { ...prev }
        delete next[taskId]
        return next
      }
      if (prev[taskId] === targetId) return prev
      return { ...prev, [taskId]: targetId }
    })
  }

  const pendingCount = Object.keys(pending).length

  const handleSave = () => {
    const assignments = Object.entries(pending).map(([taskId, userId]) => ({
      taskId,
      userId,
    }))

    bulkAssign.mutate(assignments, {
      onSuccess: () => {
        toast.success('Asignaciones guardadas correctamente')
        setPending({})
        onSaved?.()
      },
      onError: () => {
        toast.error('No se pudieron guardar las asignaciones')
      },
    })
  }

  return (
    <div className="flex min-h-0 flex-1 relative">
      <Button
        className="absolute top-0 right-0"
        onClick={handleSave}
        disabled={pendingCount === 0 || bulkAssign.isPending}
      >
        <Rocket />
        {bulkAssign.isPending
          ? 'Guardando…'
          : `Asignar ${pendingCount ? `(${pendingCount})` : ''}`}
      </Button>

      <DndContext
        sensors={sensors}
        autoScroll={{ threshold: { x: 0.2, y: 0 } }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex min-h-0 flex-1 items-start gap-5 overflow-auto px-2 pb-2 no-scrollbar">
          <AssignmentColumn
            id={UNASSIGNED_COLUMN_ID}
            title="Sin asignar"
            existingTasks={[]}
            draggableTasks={unassignedTasks}
          />
          {staff.map((member) => (
            <AssignmentColumn
              isUser
              key={member.id}
              id={member.id}
              title={member.name ?? member.username}
              member={member}
              existingTasks={assignedByStaff.get(member.id) ?? []}
              draggableTasks={pendingByStaff.get(member.id) ?? []}
              pending
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && (
            <AssignmentCardVisual task={activeTask} pending={activeIsPending} />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
