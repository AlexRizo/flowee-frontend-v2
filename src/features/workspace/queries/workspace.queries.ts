import { queryOptions, useQuery } from '@tanstack/react-query'
import { workspaceApi } from '../api/workspace.api'

export const workspaceKeys = {
  myWorkspaces: () => ['workspace', 'me'] as const,
}

export const meWorkspacesQueryOptions = () =>
  queryOptions({
    queryKey: workspaceKeys.myWorkspaces(),
    queryFn: () => workspaceApi.getMyWorkspaces(),
    staleTime: 10 * 60 * 1000,
  })

export const useMyWorkspaces = () => useQuery(meWorkspacesQueryOptions())
