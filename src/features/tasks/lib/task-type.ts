import { Calendar, Megaphone, Palette, Video } from 'lucide-react'
import type { TaskType } from '../types'

interface TypeConfig {
  label: string
  icon: typeof Palette
  className: string
}

// Reutiliza los --chart-* del tema (pensados para color-coding
// categórico) en vez de definir un hue nuevo por tipo de tarea.
export const TASK_TYPE_CONFIG: Record<TaskType, TypeConfig> = {
  DESIGN: {
    label: 'Diseño',
    icon: Palette,
    className: 'bg-chart-2 text-primary-foreground',
  },
  VIDEO: {
    label: 'Video',
    icon: Video,
    className: 'bg-chart-3 text-primary-foreground',
  },
  EVENT: {
    label: 'Evento',
    icon: Calendar,
    className: 'bg-primary text-primary-foreground',
  },
  POST: {
    label: 'Publicación',
    icon: Megaphone,
    className: 'bg-chart-5 text-primary-foreground',
  },
}
