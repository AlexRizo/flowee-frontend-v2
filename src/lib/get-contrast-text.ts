export const getContrastText = (hexColor: string): '#000' | '#fff' => {
  let hex = hexColor.replace('#', '')

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  const r = parseInt(hex.substring(0, 2), 16) / 255,
    g = parseInt(hex.substring(2, 4), 16) / 255,
    b = parseInt(hex.substring(4, 6), 16) / 255

  const toLinear = (c: number) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }

  const luminance =
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)

  return luminance > 0.179 ? '#000' : '#fff'
}
