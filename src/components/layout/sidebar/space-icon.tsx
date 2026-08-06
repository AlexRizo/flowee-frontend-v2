interface Props {
  name: string
  color: string
}

export const SpaceIcon = ({ color, name }: Props) => {
  return (
    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }}>
      <small>{name.slice(0, 2).toUpperCase()}</small>
    </div>
  )
}
