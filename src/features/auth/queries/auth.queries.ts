import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { toast } from 'sonner'
import { queryClient } from '#/lib/query-client'
import { authApi } from '../api/auth.api'
import type { PublicUser } from '../types'

// Query keys del feature, centralizadas para invalidar/leer sin strings sueltos.
export const authKeys = {
  me: () => ['auth', 'me'] as const,
}

export const meQueryOptions = () =>
  queryOptions({
    queryKey: authKeys.me(),
    queryFn: authApi.me,
    staleTime: 5 * 60 * 1000,
  })

export const useMe = () => useQuery(meQueryOptions())

export const useSignIn = () => {
  const navigate = useNavigate()
  const search = useSearch({
    from: '/auth',
  })

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: async (res) => {
      if (res.twoFactorRequired) {
        // TODO: cuando exista la ruta 2FA, navegar allí en vez del toast.
        toast.info('Ingresa tu código de verificación (2FA)')
        return
      }

      // Sesión establecida: guardamos el user en cache y entramos.
      queryClient.setQueryData<PublicUser>(authKeys.me(), res.user)
      await navigate({ to: search.redirect || '/' })
    },
  })
}
