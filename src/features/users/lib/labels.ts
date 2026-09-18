import type { UserRole, UserStatus } from '../../auth/types'

const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Admin',
  STAFF: 'Staff',
  CLIENT_ADMIN: 'Admin del cliente',
  CLIENT_STAFF: 'Personal del cliente',
  CLIENT: 'Cliente',
}

const STATUS_LABELS: Record<UserStatus, string> = {
  PENDING: 'Pendiente',
  ACTIVE: 'Activo',
  SUSPENDED: 'Suspendido',
  DELETED: 'Eliminado',
}

export const roleLabel = (role: UserRole) => ROLE_LABELS[role]
export const statusLabel = (status: UserStatus) => STATUS_LABELS[status]

export function formatDate(value: string | null): string {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function initials(name: string | null, username: string): string {
  const source = (name || username).trim()
  const parts = source.split(/\s+/).slice(0, 2)
  return parts.map((part) => part.charAt(0).toUpperCase() || '').join('')
}