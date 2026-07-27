import { queryOptions, useQuery } from '@tanstack/react-query'
import { workspaceApi } from '../api/workspace.api'

export const workspaceKeys = {
  me: () => ['workspace', 'me'] as const,
}

export const meWorkspacesQueryOptions = () =>
  queryOptions({
    queryKey: workspaceKeys.me(),
    queryFn: () => workspaceApi.getMyWorkspaces(),
    staleTime: 10 * 60 * 1000,
  })

export const useMeWorkspaces = () => useQuery(meWorkspacesQueryOptions())
