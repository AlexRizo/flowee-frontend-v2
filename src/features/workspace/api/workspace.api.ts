import type { Space } from '#/features/space/types'
import { api } from '#/lib/api-client'
import type { Workspaces } from '../types'

export const workspaceApi = {
  getMyWorkspaces: () => api<Workspaces>('/workspaces/me'),
  getWorkspaceSpaces: (workspaceCode: string) =>
    api<Space[]>(`/workspaces/${workspaceCode}/spaces`),
}
