import { dateFnsLocalizer } from 'react-big-calendar'
import { format, getDay, parse, startOfWeek } from 'date-fns'
import { es } from 'date-fns/locale'

const locales = { es }

export const calendarLocalizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: es }),
  getDay,
  locales,
})

export const calendarMessages = {
  today: 'Hoy',
  previous: 'Anterior',
  next: 'Siguiente',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango.',
  showMore: (count: number) => `+${count} más`,
}
