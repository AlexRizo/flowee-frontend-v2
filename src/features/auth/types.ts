// Contratos que expone el backend de auth.
// Idealmente se derivan/comparten desde Nest; por ahora se tipan a mano.

import type { Workspace } from "../workspace/types"

export type UserRole = 'CLIENT' | 'ADMIN' | 'SUPERADMIN'
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED'
export type AuthProvider = 'LOCAL' | 'GOOGLE'

/** User del backend sin `password` ni `twoFactorSecret` (ver `toPublicUser`). */
export interface PublicUser {
  id: string
  email: string
  name: string | null
  username: string
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
  favoriteWorkspace?: Omit<Workspace, 'color'>
}

/** Respuesta de `POST /auth/login` (unión discriminada por `twoFactorRequired`). */
export type LoginResponse =
  | { twoFactorRequired: true }
  | { twoFactorRequired: false; user: PublicUser }
