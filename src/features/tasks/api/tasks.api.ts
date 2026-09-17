import { api } from '#/lib/api-client'
import type { Task } from '../types'

export const tasksApi = {
  getWorkspaceTasks: (workspaceCode: string, take = 25) =>
    api<Task[]>(`/workspaces/${workspaceCode}/tasks?take=${take}`),
  getMyWorkspaceTasks: (workspaceCode: string, take = 200) =>
    api<Task[]>(
      `/workspaces/${workspaceCode}/tasks?take=${take}&mine=true`,
    ),
  getEventTasks: (workspaceCode: string, take = 200) =>
    api<Task[]>(
      `/workspaces/${workspaceCode}/tasks?take=${take}&type=EVENT`,
    ),
  getSpaceTasks: (workspaceCode: string, spaceCode: string, take = 25) =>
    api<Task[]>(
      `/workspaces/${workspaceCode}/spaces/${spaceCode}/tasks?take=${take}`,
    ),
}
