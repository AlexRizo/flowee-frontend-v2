import type { Space } from '#/features/space/types'
import { Link } from '@tanstack/react-router'
import type { FC } from 'react'

interface Props extends Space {}

export const SpaceItem: FC<Props> = ({ name, color, code }) => {
  return (
    <Link
      from="/w/$workspaceCode"
      to="/w/$workspaceCode/s/$spaceCode/tasks/create"
      params={{ spaceCode: code }}
      role="gridcell"
      className="flex flex-col items-center gap-2"
    >
      <span
        style={{
          backgroundColor: color,
        }}
        className="text-white size-10 rounded text-center place-content-center"
      >
        {name[0]}
      </span>
      <span className="text-center truncate font-semibold text-xs">{name}</span>
    </Link>
  )
}
