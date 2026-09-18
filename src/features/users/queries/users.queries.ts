import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { queryClient } from '#/lib/query-client'
import { usersApi } from '../api/users.api'
import type { CreateUserSchemaType } from '../schemas/create-user.schema'

export const usersKeys = {
  list: () => ['users'] as const,
}

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: usersKeys.list(),
    queryFn: usersApi.getUsers,
    staleTime: 60 * 1000,
  })

export const useUsers = () => useQuery(usersQueryOptions())

export const useCreateUser = () =>
  useMutation({
    mutationFn: (body: CreateUserSchemaType) => usersApi.createUser(body),
    onSuccess: async (user) => {
      await queryClient.invalidateQueries({ queryKey: usersKeys.list() })
      toast.success(`Usuario ${user.username} creado`)
    },
    onError: (error) => {
      toast.error(error.name, { description: error.message })
    },
  })

export const useDeleteUser = () =>
  useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: usersKeys.list() })
      toast.success('Usuario eliminado')
    },
    onError: (error) => {
      toast.error(error.name, { description: error.message })
    },
  })