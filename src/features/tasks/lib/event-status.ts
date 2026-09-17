import type { EventStatus } from '../types'
import { TASK_PRIORITY_CONFIG } from './task-priority'

interface EventStatusConfig {
  label: string
  className: string
  /**
   * Clase para el evento dentro de react-big-calendar (.rbc-event). No usa
   * las utilities de Tailwind de `className` porque los estados propios de
   * la librería (`.rbc-event.rbc-selected`, `.rbc-event:focus`) tienen
   * mayor especificidad CSS y las pisarían; ver event-calendar.css.
   */
  calendarClassName: string
}

// Reutiliza los mismos tokens/colores de TASK_PRIORITY_CONFIG (no valores
// nuevos), mapeados por urgencia semántica en vez del orden literal del
// enum: PENDING es neutro (como LOW), SCHEDULED ya tiene fecha confirmada
// y se acerca (como HIGH), ATTENDING está sucediendo ahora mismo (como
// URGENT), FINISHED ya se resolvió y vuelve a ser neutro (como NORMAL).
export const TASK_EVENT_STATUS_CONFIG: Record<
  EventStatus,
  EventStatusConfig
> = {
  PENDING: {
    label: 'Pendiente',
    className: TASK_PRIORITY_CONFIG.LOW.className,
    calendarClassName: 'rbc-event-pending',
  },
  SCHEDULED: {
    label: 'Programado',
    className: TASK_PRIORITY_CONFIG.HIGH.className,
    calendarClassName: 'rbc-event-scheduled',
  },
  ATTENDING: {
    label: 'En curso',
    className: TASK_PRIORITY_CONFIG.URGENT.className,
    calendarClassName: 'rbc-event-attending',
  },
  FINISHED: {
    label: 'Finalizado',
    className: TASK_PRIORITY_CONFIG.NORMAL.className,
    calendarClassName: 'rbc-event-finished',
  },
}
