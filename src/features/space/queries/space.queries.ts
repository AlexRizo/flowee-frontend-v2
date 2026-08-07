import { queryOptions, useQuery } from "@tanstack/react-query"
import { spaceApi } from "../api/space.api"
import { workspaceApi } from "#/features/workspace/api/workspace.api"

export const spaceKeys = {
  mySpaces: (workspaceCode: string) => ['space', 'my', workspaceCode] as const
}

export const mySpacesQueryOptions = (workspaceCode: string) => queryOptions({
  queryKey: spaceKeys.mySpaces(workspaceCode),
  queryFn: () => workspaceApi.getWorkspaceSpaces(workspaceCode),
  staleTime: 10 * 60 * 1000
})

export const useMySpaces = (workspaceCode: string) => useQuery(mySpacesQueryOptions(workspaceCode))