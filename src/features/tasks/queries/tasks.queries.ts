import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { tasksApi } from '../api/tasks.api'
import type { TaskStatus } from '../types'

export const taskKeys = {
  workspace: (workspaceCode: string, take: number) =>
    ['tasks', 'workspace', workspaceCode, take] as const,
  myWorkspace: (workspaceCode: string, take: number) =>
    ['tasks', 'workspace', workspaceCode, 'mine', take] as const,
  events: (workspaceCode: string, take: number) =>
    ['tasks', 'workspace', workspaceCode, 'events', take] as const,
  space: (workspaceCode: string, spaceCode: string, take: number) =>
    ['tasks', 'space', workspaceCode, spaceCode, take] as const,
}

export const workspaceTasksQueryOptions = (
  workspaceCode: string,
  take = 25,
) =>
  queryOptions({
    queryKey: taskKeys.workspace(workspaceCode, take),
    queryFn: () => tasksApi.getWorkspaceTasks(workspaceCode, take),
    staleTime: 60 * 1000,
  })

export const useWorkspaceTasks = (workspaceCode: string, take = 25) =>
  useQuery(workspaceTasksQueryOptions(workspaceCode, take))

export const myWorkspaceTasksQueryOptions = (
  workspaceCode: string,
  take = 200,
) =>
  queryOptions({
    queryKey: taskKeys.myWorkspace(workspaceCode, take),
    queryFn: () => tasksApi.getMyWorkspaceTasks(workspaceCode, take),
    staleTime: 60 * 1000,
  })

export const useMyWorkspaceTasks = (workspaceCode: string, take = 200) =>
  useQuery(myWorkspaceTasksQueryOptions(workspaceCode, take))

export const eventTasksQueryOptions = (workspaceCode: string, take = 200) =>
  queryOptions({
    queryKey: taskKeys.events(workspaceCode, take),
    queryFn: () => tasksApi.getEventTasks(workspaceCode, take),
    staleTime: 60 * 1000,
  })

export const useEventTasks = (workspaceCode: string, take = 200) =>
  useQuery(eventTasksQueryOptions(workspaceCode, take))

export const spaceTasksQueryOptions = (
  workspaceCode: string,
  spaceCode: string,
  take = 25,
) =>
  queryOptions({
    queryKey: taskKeys.space(workspaceCode, spaceCode, take),
    queryFn: () => tasksApi.getSpaceTasks(workspaceCode, spaceCode, take),
    staleTime: 60 * 1000,
  })

export const useSpaceTasks = (
  workspaceCode: string,
  spaceCode: string,
  take = 25,
) => useQuery(spaceTasksQueryOptions(workspaceCode, spaceCode, take))

// El tablero general mezcla tareas de varios Spaces de un mismo Workspace,
// así que el space no es fijo por board: se recibe por llamada (viene de
// `task.space.code` de la tarea que se está moviendo).
export const useUpdateTaskStatus = (workspaceCode: string) =>
  useMutation({
    mutationFn: ({
      spaceCode,
      taskId,
      status,
    }: {
      spaceCode: string
      taskId: string
      status: TaskStatus
    }) => tasksApi.updateStatus(workspaceCode, spaceCode, taskId, status),
  })
