import { getContrastText } from '#/lib/get-contrast-text'

interface Props {
  name: string
  color: string
}

export const SpaceIcon = ({ color, name }: Props) => {
  return (
    <div
      role="complementary"
      className="size-5.5 rounded-sm flex items-center justify-center min-w-4.5 min-h-4.5"
      style={{ backgroundColor: color }}
    >
      <span
        className="font-bold text-xs"
        style={{ color: getContrastText(color) }}
      >
        {name[0]}
      </span>
    </div>
  )
}
