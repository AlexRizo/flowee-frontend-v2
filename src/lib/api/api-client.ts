import { redirect } from '@tanstack/react-router'
import { env } from '#/env'

const API_URL = env.VITE_API_URL

const NO_REFRESH_PATHS = [
  '/auth/login',
  '/auth/refresh',
  '/auth/2fa/login',
  '/auth/register',
]

let refreshPromise: Promise<boolean> | null = null

const refreshSession = async (): Promise<boolean> => {
  refreshPromise ??= fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((res) => res.ok)
    .catch(() => false)
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

let onSessionExpired: () => void = () => {
  return redirect({ to: '/auth/signin' })
}

export const setOnSessionExpired = (handler: () => void) => {
  onSessionExpired = handler
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(`Api error ${status}`)
  }
}

export const api = async <T = unknown>(
  path: string,
  options: Omit<RequestInit, 'body'> & { body?: unknown } = {},
): Promise<T> => {
  const { body, headers, ...rest } = options

  const doFetch = () =>
    fetch(`${API_URL}${path}`, {
      ...rest,
      credentials: 'include',
      headers: {
        ...(body !== undefined && { 'Content-Type': 'application/json' }),
        ...headers,
      },
      ...(body !== undefined && { body: JSON.stringify(body) }),
    })

  let response = await doFetch()

  const canRefresh =
    response.status === 401 && !NO_REFRESH_PATHS.some((p) => path.startsWith(p))

  if (canRefresh) {
    const refreshed = await refreshSession()

    if (!refreshed) {
      onSessionExpired()
      throw new ApiError(401, { message: 'Sesión expirada' })
    }

    response = await doFetch()
  }

  const data: unknown =
    response.status === 204 ? null : await response.json().catch(() => null)

  if (!response.ok) {
    if (response.status === 401) onSessionExpired()

    throw new ApiError(response.status, data)
  }

  return data as T
}
