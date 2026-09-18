import { api } from '#/lib/api-client'
import type { CreateUserSchemaType } from '../schemas/create-user.schema'
import type { User, Users } from '../types'

export const usersApi = {
  getUsers: () => api<Users>('/users'),
  createUser: (body: CreateUserSchemaType) =>
    api<User>('/users', { method: 'POST', body }),
  deleteUser: (id: string) =>
    api<{ ok: true }>(`/users/${id}`, { method: 'DELETE' }),
}