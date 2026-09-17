import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { initialsFrom } from '#/features/tasks/lib/avatar-color'
import type { Task } from '#/features/tasks/types'
import { getContrastText } from '#/lib/get-contrast-text'

interface Props {
  task: Task
}

export const BoardBadge = ({ task }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className="flex items-center justify-center size-6 rounded-md text-[10px] font-bold tracking-wide"
          style={{
            background: task.space.color,
            color: getContrastText(task.space.color),
          }}
        >
          {initialsFrom(task.space.name)}
        </span>
      </TooltipTrigger>
      <TooltipContent>{task.space.name}</TooltipContent>
    </Tooltip>
  )
}
