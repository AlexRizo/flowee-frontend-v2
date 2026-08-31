import type { Space } from "#/features/space/types"
import { SpaceItem } from "./space-item"

interface Props {
  spaces: Space[]
  onSelect?: (space: Space) => void
}

export const SelectSpaces = ({ spaces, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {spaces.map((space) => (
          <SpaceItem key={space.id} {...space} />
      ))}
    </div>
  )
}
