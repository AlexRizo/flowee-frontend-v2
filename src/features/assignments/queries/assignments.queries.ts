import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { assignmentsApi } from '../api/assignments.api'
import type { TaskAssignment } from '../types'

export const assignmentKeys = {
  staff: (workspaceCode: string, spaceCode: string) =>
    ['assignments', 'staff', workspaceCode, spaceCode] as const,
}

export const staffForSpaceQueryOptions = (
  workspaceCode: string,
  spaceCode: string,
) =>
  queryOptions({
    queryKey: assignmentKeys.staff(workspaceCode, spaceCode),
    queryFn: () => assignmentsApi.getStaffForSpace(workspaceCode, spaceCode),
    staleTime: 60 * 1000,
  })

export const useStaffForSpace = (workspaceCode: string, spaceCode: string) =>
  useQuery(staffForSpaceQueryOptions(workspaceCode, spaceCode))

export const useBulkAssignTasks = (
  workspaceCode: string,
  spaceCode: string,
) =>
  useMutation({
    mutationFn: (assignments: TaskAssignment[]) =>
      assignmentsApi.bulkAssign(workspaceCode, spaceCode, assignments),
  })
