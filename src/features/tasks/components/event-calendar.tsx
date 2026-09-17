import { useMemo } from 'react'
import { Calendar  } from 'react-big-calendar'
import type {Event as RbcEvent} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './event-calendar.css'
import { getContrastText } from '#/lib/get-contrast-text'
import { calendarLocalizer, calendarMessages } from '../lib/calendar-localizer'
import type { Task } from '../types'

interface CalendarEvent extends RbcEvent {
  task: Task
}

interface EventCalendarProps {
  tasks: Task[]
  onTaskClick?: (task: Task) => void
}

export function EventCalendar({ tasks, onTaskClick }: EventCalendarProps) {
  const events = useMemo<CalendarEvent[]>(
    () =>
      tasks
        .filter((task) => task.eventDetails)
        .map((task) => {
          const start = new Date(task.eventDetails!.startDate)
          const end = task.dueDate ? new Date(task.dueDate) : start

          return {
            title: task.title,
            start,
            end: end < start ? start : end,
            task,
          }
        }),
    [tasks],
  )

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col rounded-lg border border-border bg-card p-4">
      <Calendar
        localizer={calendarLocalizer}
        events={events}
        culture="es"
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        messages={calendarMessages}
        onSelectEvent={(event) => onTaskClick?.(event.task)}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.task.space.color,
            color: getContrastText(event.task.space.color),
          },
        })}
      />
    </div>
  )
}
