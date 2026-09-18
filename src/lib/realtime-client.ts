import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { env } from '#/env'

let socket: Socket | null = null

// VITE_API_URL trae el prefijo REST (/api/v1); el gateway de sockets vive
// en la raíz del mismo servidor Nest, fuera de ese prefijo.
const socketOrigin = () => new URL(env.VITE_API_URL).origin

export const getRealtimeSocket = (): Socket => {
  socket ??= io(`${socketOrigin()}/realtime`, {
    // La cookie httpOnly del access token viaja sola si el origin está en
    // ALLOWED_ORIGINS del backend (mismo mecanismo que el fetch del REST).
    withCredentials: true,
  })
  return socket
}

export const closeRealtimeSocket = () => {
  socket?.disconnect()
  socket = null
}
