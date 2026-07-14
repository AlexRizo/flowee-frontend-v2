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

const isNativeBody = (body: unknown): body is BodyInit => {
  return (
    body instanceof FormData ||
    body instanceof Blob ||
    body instanceof ArrayBuffer ||
    ArrayBuffer.isView(body) ||
    body instanceof URLSearchParams ||
    body instanceof ReadableStream ||
    typeof body === 'string'
  )
}

interface ApiOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
  responseType?: 'json' | 'blob'
}

export const api = async <T = unknown>(
  path: string,
  options: ApiOptions = {},
): Promise<T> => {
  const { body, headers, responseType = 'json', ...rest } = options

  const nativeBody = body !== undefined && isNativeBody(body)
  const jsonBody = body !== undefined && !nativeBody

  const doFetch = () =>
    fetch(`${API_URL}${path}`, {
      ...rest,
      credentials: 'include',
      headers: {
        ...(jsonBody && { 'Content-Type': 'application/json' }),
        ...headers,
      },
      ...(body !== undefined && {
        body: nativeBody ? body : JSON.stringify(body),
      }),
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

  if (!response.ok) {
    const errorBody: unknown = await response.json().catch(() => null)
    if (response.status === 401) onSessionExpired()

    throw new ApiError(response.status, errorBody)
  }

  if (response.status === 204) return null as T

  if (responseType === 'blob') return (await response.blob()) as T

  return (await response.json()) as T
}
