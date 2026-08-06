import { queryOptions, useQuery } from "@tanstack/react-query"
import { spaceApi } from "../api/space.api"

export const spaceKeys = {
  mySpaces: () => ['spaces', 'my'] as const
}

export const meSpacesQueryOptions = () => queryOptions({
  queryKey: spaceKeys.mySpaces(),
  queryFn: () => spaceApi.getMySpaces(),
  staleTime: 10 * 60 * 1000
})

export const useMeSpaces = () => useQuery(meSpacesQueryOptions())