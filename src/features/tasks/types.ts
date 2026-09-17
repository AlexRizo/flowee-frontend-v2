export type TaskType = 'DESIGN' | 'VIDEO' | 'EVENT' | 'POST'

export type TaskPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'

export type TaskStatus =
  | 'PENDING'
  | 'IN_ATTENTION'
  | 'IN_PROGRESS'
  | 'FOR_REVIEW'
  | 'DONE'

export interface TaskUser {
  id: string
  name: string | null
  username: string
  avatar: string | null
}

export interface TaskSpace {
  id: string
  name: string
  code: string
  color: string
}

export interface Task {
  id: string
  title: string
  description: string | null
  type: TaskType
  priority: TaskPriority
  status: TaskStatus
  authorId: string
  spaceId: string
  createdAt: string
  updatedAt: string
  dueDate: string | null
  author: TaskUser
  assignees: TaskUser[]
  space: TaskSpace
}
