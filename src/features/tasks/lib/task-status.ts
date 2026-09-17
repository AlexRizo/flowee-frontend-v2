import type { TaskStatus } from '../types'

interface StatusConfig {
  label: string
  headerBg: string
  headerBorder: string
  bar: string
}

// Orden de columnas del mockup de Kanban Board. Los colores usan las
// variables del tema (--primary, --status-*) en vez de valores oklch
// sueltos, para que cambien junto con el resto del theme.
export const TASK_STATUS_ORDER: TaskStatus[] = [
  'PENDING',
  'IN_ATTENTION',
  'IN_PROGRESS',
  'FOR_REVIEW',
  'DONE',
]

export const TASK_STATUS_CONFIG: Record<TaskStatus, StatusConfig> = {
  PENDING: {
    label: 'Pendiente',
    headerBg: 'bg-muted/40',
    headerBorder: 'border-border',
    bar: 'border-l-muted-foreground/50',
  },
  IN_ATTENTION: {
    label: 'Atención',
    headerBg: 'bg-status-attention/10',
    headerBorder: 'border-status-attention/25',
    bar: 'border-l-status-attention',
  },
  IN_PROGRESS: {
    label: 'En progreso',
    headerBg: 'bg-status-progress/10',
    headerBorder: 'border-status-progress/25',
    bar: 'border-l-status-progress',
  },
  FOR_REVIEW: {
    label: 'Para revisión',
    headerBg: 'bg-primary/10',
    headerBorder: 'border-primary/25',
    bar: 'border-l-primary',
  },
  DONE: {
    label: 'Hecho',
    headerBg: 'bg-status-done/10',
    headerBorder: 'border-status-done/25',
    bar: 'border-l-status-done',
  },
}
