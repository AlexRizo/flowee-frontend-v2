import type { TaskUser } from '#/features/tasks/types'

export type Staff = TaskUser

export interface TaskAssignment {
  taskId: string
  userId: string
}
