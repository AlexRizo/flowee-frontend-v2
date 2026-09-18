import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { closeRealtimeSocket, getRealtimeSocket } from '#/lib/realtime-client'
import type { Task, TaskStatus } from '../types'

const TASK_STATUS_UPDATED = 'task:status-updated'

interface TaskStatusUpdatedPayload {
  taskId: string
  spaceId: string
  status: TaskStatus
  updatedAt: string
}

// El backend emite este evento por la sala personal del usuario (no por
// sala de space, ver TasksService.recipientsFor): a quién le llega ya
// respeta permisos, así que este hook no necesita filtrar nada, solo
// parchear cualquier lista de tareas en caché que tenga esa tarea.
export function useRealtimeTaskUpdates() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const socket = getRealtimeSocket()

    const handleStatusUpdated = (payload: TaskStatusUpdatedPayload) => {
      queryClient.setQueriesData<Task[]>({ queryKey: ['tasks'] }, (tasks) =>
        tasks?.map((task) =>
          task.id === payload.taskId
            ? { ...task, status: payload.status, updatedAt: payload.updatedAt }
            : task,
        ),
      )
    }

    socket.on(TASK_STATUS_UPDATED, handleStatusUpdated)

    return () => {
      socket.off(TASK_STATUS_UPDATED, handleStatusUpdated)
      // Este hook vive en el layout autenticado: si se desmonta es porque
      // se salió de /w/$workspaceCode (logout, sesión expirada). Cerramos
      // el socket para no dejar una conexión autenticada con el usuario
      // anterior colgando hasta que el navegador la corte por su cuenta.
      closeRealtimeSocket()
    }
  }, [queryClient])
}
