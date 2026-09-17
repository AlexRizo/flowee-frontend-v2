// Recorte solo visual: la data real (title/description) no cambia, esto
// evita que un texto largo desborde tarjetas de ancho fijo (kanban, lista).
export const truncate = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}…` : text
