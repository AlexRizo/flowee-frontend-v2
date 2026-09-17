// Reutiliza los 5 --chart-* del tema como paleta de avatares en vez de
// definir colores propios; da distribución 1:1 con los 5 tonos disponibles.
const AVATAR_COLOR_CLASSES = [
  'bg-chart-1 text-primary-foreground',
  'bg-chart-2 text-primary-foreground',
  'bg-chart-3 text-primary-foreground',
  'bg-chart-4 text-primary-foreground',
  'bg-chart-5 text-primary-foreground',
]

const hash = (value: string) => {
  let h = 0
  for (let i = 0; i < value.length; i++) {
    h = (h << 5) - h + value.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export const avatarColorFor = (id: string) =>
  AVATAR_COLOR_CLASSES[hash(id) % AVATAR_COLOR_CLASSES.length]

export const initialsFrom = (text: string) => {
  const parts = text.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return text.slice(0, 2).toUpperCase()
}

export const initialsFor = (name: string | null, username: string) =>
  initialsFrom(name?.trim() || username)
