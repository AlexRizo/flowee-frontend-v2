import { useMemo } from 'react'
import { Calendar } from 'react-big-calendar'
import type { Event as RbcEvent } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './event-calendar.css'
import { calendarLocalizer, calendarMessages } from '../lib/calendar-localizer'
import { TASK_EVENT_STATUS_CONFIG } from '../lib/event-status'
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
        eventPropGetter={(event) => {
          const status = event.task.eventDetails?.status
          return {
            className: status
              ? TASK_EVENT_STATUS_CONFIG[status].calendarClassName
              : undefined,
          }
        }}
      />
    </div>
  )
}
