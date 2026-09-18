import type { AuthProvider, UserRole, UserStatus } from '../auth/types'

/** User tal como lo devuelve GET /users (sin password ni twoFactorSecret). */
export interface User {
  id: string
  email: string
  username: string
  name: string | null
  avatar: string | null
  twoFactorEnabled: boolean
  emailVerified: boolean
  status: UserStatus
  role: UserRole
  fullAccess: boolean
  authProvider: AuthProvider
  createdAt: string
  updatedAt: string
  lastLoginAt: string | null
  favoriteWorkspaceId: string | null
}

export type Users = User[]