import { api } from '#/lib/api-client'
import type { SigninSchemaType } from '../schemas/signin.schema'
import type { LoginResponse, PublicUser } from '../types'

// Funciones puras de red. No saben nada de React ni de TanStack Query.
export const authApi = {
  signIn: (body: SigninSchemaType) =>
    api<LoginResponse>('/auth/login', { method: 'POST', body }),

  me: () => api<PublicUser>('/auth/me', { skipOnSessionExpired: true }),

  setFavoriteWorkspace: (workspaceCode: string) =>
    api<{ ok: true }>('/auth/me/favorite-workspace', {
      method: 'PATCH',
      body: { workspaceCode },
    }),
}
