const pad = (n: number) => String(n).padStart(2, '0')

// dd/mm/yyyy hh:mm, siempre en este formato exacto (usado en tooltips).
export const formatDateTime = (date: Date) =>
  `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`
