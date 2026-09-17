import { queryOptions, useQuery } from '@tanstack/react-query'
import { tasksApi } from '../api/tasks.api'

export const taskKeys = {
  workspace: (workspaceCode: string, take: number) =>
    ['tasks', 'workspace', workspaceCode, take] as const,
  myWorkspace: (workspaceCode: string, take: number) =>
    ['tasks', 'workspace', workspaceCode, 'mine', take] as const,
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
