import type { Space } from '#/features/space/types'
import { getContrastText } from '#/lib/get-contrast-text'
import { cn } from '#/lib/utils'
import type { FC } from 'react'

interface Props extends Pick<Space, 'name' | 'color'> {
  className?: string
}

export const SpaceIcon: FC<Props> = ({ name, color, className }) => {
  return (
    <span
      style={{
        backgroundColor: color,
        color: getContrastText(color),
      }}
      className={cn("rounded text-center place-content-center", className)}
    >
      {name[0]}
    </span>
  )
}
