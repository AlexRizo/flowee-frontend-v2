import { api } from '#/lib/api-client'
import type { Staff, TaskAssignment } from '../types'

export const assignmentsApi = {
  getStaffForSpace: (workspaceCode: string, spaceCode: string) =>
    api<Staff[]>(
      `/workspaces/${workspaceCode}/spaces/${spaceCode}/assignments/staff`,
    ),
  bulkAssign: (
    workspaceCode: string,
    spaceCode: string,
    assignments: TaskAssignment[],
  ) =>
    api(`/workspaces/${workspaceCode}/spaces/${spaceCode}/assignments`, {
      method: 'PATCH',
      body: { assignments },
    }),
}
