import { Flag } from 'lucide-react'
import type { TaskPriority } from '../types'

interface PriorityConfig {
  label: string
  icon: typeof Flag
  className: string
}

// URGENT reutiliza --destructive (mismo semántico que el resto de la app
// usa para "algo requiere atención inmediata", ver badgeVariants). El
// resto usa tokens neutros/status ya existentes en el tema.
export const TASK_PRIORITY_CONFIG: Record<TaskPriority, PriorityConfig> = {
  LOW: {
    label: 'Baja',
    icon: Flag,
    className: 'bg-muted text-muted-foreground',
  },
  NORMAL: {
    label: 'Normal',
    icon: Flag,
    className: 'bg-secondary text-secondary-foreground',
  },
  HIGH: {
    label: 'Alta',
    icon: Flag,
    className: 'bg-status-attention/10 text-status-attention',
  },
  URGENT: {
    label: 'Urgente',
    icon: Flag,
    className: 'bg-destructive/10 text-destructive',
  },
}
