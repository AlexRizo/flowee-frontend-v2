import { redirect } from '@tanstack/react-router'
import { env } from '#/env'

const API_URL = env.VITE_API_URL

const NO_REFRESH_PATHS = [
  '/auth/login',
  '/auth/refresh',
  '/auth/2fa/login',
  '/auth/register',
]

const FALLBACK_MESSAGE = 'Ocurrió un error inesperado'

/**
 * Extrae el `message` del body de Nest de forma segura (body es `unknown`:
 * puede venir null, HTML de un proxy, un fallo de red, etc.).
 * - Excepción normal (throw): `message` es string → se devuelve tal cual.
 * - class-validator (ValidationPipe): `message` es string[] → se devuelve el array.
 * El cómo mostrarlo (texto vs. lista) lo decide quien lo consuma.
 */
const extractDetail = (body: unknown): string | Array<string> => {
  if (typeof body === 'object' && body !== null && 'message' in body) {
    const { message } = body as { message: unknown }
    if (typeof message === 'string') return message
    if (Array.isArray(message) && message.every((m) => typeof m === 'string')) {
      return message
    }
  }
  return FALLBACK_MESSAGE
}

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
  /**
   * Detalle crudo de Nest: string (throw) o string[] (validación).
   * `Error.message` (siempre string) queda para logs; para la UI usa `detail`.
   */
  readonly detail: string | Array<string>

  constructor(
    public readonly status: number,
    public readonly body: unknown,
  ) {
    const detail = extractDetail(body)
    super(Array.isArray(detail) ? detail.join(', ') : detail)
    this.name = 'ApiError'
    this.detail = detail
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

  // Endpoints de auth (login/refresh/2fa/register): un 401 significa
  // "credenciales inválidas", no "sesión expirada". No se refresca ni se
  // dispara onSessionExpired; el error se propaga como ApiError.
  const isAuthPath = NO_REFRESH_PATHS.some((p) => path.startsWith(p))
  const canRefresh = response.status === 401 && !isAuthPath

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
    if (response.status === 401 && !isAuthPath) onSessionExpired()

    throw new ApiError(response.status, errorBody)
  }

  if (response.status === 204) return null as T

  if (responseType === 'blob') return (await response.blob()) as T

  return (await response.json()) as T
}
