'use client';

import { useRef, useState, type ComponentRef } from 'react';
import { Card } from '@/components/ui/card';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import { useEventsStore } from '../context/events-provider';
import { CalendarNav } from './calendar-nav';
import { EventEditForm } from './event-edit-form';
import { EventView } from './event-view';
import {
  earliestTime,
  latestTime,
  type CalendarEvent
} from '../lib/calendar-data';
import { getDateFromMinutes } from '../lib/calendar-utils';

type CalendarEventBase = {
  id: string;
  title: string;
  start: Date | null;
  end: Date | null;
  extendedProps: {
    description?: string;
    backgroundColor?: string;
    [key: string]: unknown;
  };
};

type FullCalendarRef = ComponentRef<typeof FullCalendar>;

type EventClickArg = {
  event: CalendarEventBase;
};

type EventChangeArg = {
  event: CalendarEventBase;
  oldEvent: CalendarEventBase;
};

type EventContentArg = {
  event: {
    title: string;
    extendedProps: {
      backgroundColor?: string;
    };
  };
  timeText: string;
  view: {
    type: string;
  };
};

type DayHeaderContentArg = {
  text: string;
  view: {
    type: string;
  };
  date: Date;
  isToday: boolean;
};

type DayCellContentArg = {
  view: {
    type: string;
  };
  isToday: boolean;
  dayNumberText: string;
};

type DateSelectArg = {
  start: Date;
  end: Date;
};

type EventItemProps = {
  info: EventContentArg;
};

type DayHeaderProps = {
  info: DayHeaderContentArg;
};

type DayRenderProps = {
  info: DayCellContentArg;
};

export function Calendar() {
  const events = useEventsStore((s) => s.events);
  const setEventAddOpen = useEventsStore((s) => s.setEventAddOpen);
  const setEventEditOpen = useEventsStore((s) => s.setEventEditOpen);
  const setEventViewOpen = useEventsStore((s) => s.setEventViewOpen);

  const calendarRef = useRef<FullCalendarRef | null>(null);
  const [viewedDate, setViewedDate] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState(new Date());
  const [selectedEnd, setSelectedEnd] = useState(new Date());
  const [selectedOldEvent, setSelectedOldEvent] = useState<
    CalendarEvent | undefined
  >();
  const [selectedEvent, setSelectedEvent] = useState<
    CalendarEvent | undefined
  >();
  const [isDrag, setIsDrag] = useState(false);

  const handleEventClick = (info: EventClickArg) => {
    const event: CalendarEvent = {
      id: info.event.id,
      title: info.event.title,
      description: String(info.event.extendedProps.description ?? ''),
      backgroundColor:
        (info.event.extendedProps.backgroundColor as string | undefined) ?? '',
      start: info.event.start!,
      end: info.event.end!
    };

    setIsDrag(false);
    setSelectedOldEvent(event);
    setSelectedEvent(event);
    setEventViewOpen(true);
  };

  const handleEventChange = (info: EventChangeArg) => {
    const event: CalendarEvent = {
      id: info.event.id,
      title: info.event.title,
      description: String(info.event.extendedProps.description ?? ''),
      backgroundColor:
        (info.event.extendedProps.backgroundColor as string | undefined) ?? '',
      start: info.event.start!,
      end: info.event.end!
    };

    const oldEvent: CalendarEvent = {
      id: info.oldEvent.id,
      title: info.oldEvent.title,
      description: String(info.oldEvent.extendedProps.description ?? ''),
      backgroundColor:
        (info.oldEvent.extendedProps.backgroundColor as string | undefined) ??
        '',
      start: info.oldEvent.start!,
      end: info.oldEvent.end!
    };

    setIsDrag(true);
    setSelectedOldEvent(oldEvent);
    setSelectedEvent(event);
    setEventEditOpen(true);
  };

  const EventItem = ({ info }: EventItemProps) => {
    const { event } = info;
    const [left, right] = info.timeText.split(' - ');
    const eventBackgroundColor =
      (event.extendedProps.backgroundColor as string | undefined) ??
      'var(--primary)';

    return (
      <div className='w-full overflow-hidden'>
        {info.view.type === 'dayGridMonth' ? (
          <div
            style={{ backgroundColor: eventBackgroundColor }}
            className='line-clamp-1 flex w-full flex-col rounded-md px-2 py-1 text-[0.5rem] sm:text-[0.6rem] md:text-xs'
          >
            <p className='line-clamp-1 w-11/12 font-semibold text-gray-950 dark:text-gray-50'>
              {event.title}
            </p>
            <p className='text-gray-800 dark:text-gray-200'>{left}</p>
            <p className='text-gray-800 dark:text-gray-200'>{right}</p>
          </div>
        ) : (
          <div className='flex flex-col space-y-0 text-[0.5rem] sm:text-[0.6rem] md:text-xs'>
            <p className='line-clamp-1 w-full font-semibold text-gray-950 dark:text-gray-50'>
              {event.title}
            </p>
            <p className='line-clamp-1 text-gray-800 dark:text-gray-200'>{`${left} - ${right}`}</p>
          </div>
        )}
      </div>
    );
  };

  const DayHeader = ({ info }: DayHeaderProps) => {
    const [weekday] = info.text.split(' ');

    return (
      <div className='flex h-full items-center overflow-hidden'>
        {info.view.type === 'timeGridDay' ? (
          <div className='flex flex-col rounded-sm'>
            <p>
              {info.date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        ) : info.view.type === 'timeGridWeek' ? (
          <div className='md:text-md flex w-full flex-col items-center space-y-0.5 rounded-sm text-xs sm:text-sm'>
            <p className='flex font-semibold'>{weekday}</p>
            {info.isToday ? (
              <div className='bg-primary text-primary-foreground md:text-md flex h-6 w-6 items-center justify-center rounded-full text-xs sm:text-sm'>
                <p className='font-medium'>{info.date.getDate()}</p>
              </div>
            ) : (
              <div className='flex h-6 w-6 items-center justify-center rounded-full'>
                <p className='font-light'>{info.date.getDate()}</p>
              </div>
            )}
          </div>
        ) : (
          <div className='flex flex-col rounded-sm'>
            <p>{weekday}</p>
          </div>
        )}
      </div>
    );
  };

  const DayRender = ({ info }: DayRenderProps) => {
    return (
      <div className='flex'>
        {info.view.type === 'dayGridMonth' && info.isToday ? (
          <div className='bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-full text-sm'>
            {info.dayNumberText}
          </div>
        ) : (
          <div className='flex h-7 w-7 items-center justify-center rounded-full text-sm'>
            {info.dayNumberText}
          </div>
        )}
      </div>
    );
  };

  const handleDateSelect = (info: DateSelectArg) => {
    setSelectedStart(info.start);
    setSelectedEnd(info.end);
  };

  const earliestHour = getDateFromMinutes(earliestTime)
    .getHours()
    .toString()
    .padStart(2, '0');
  const earliestMin = getDateFromMinutes(earliestTime)
    .getMinutes()
    .toString()
    .padStart(2, '0');
  const latestHour = getDateFromMinutes(latestTime)
    .getHours()
    .toString()
    .padStart(2, '0');
  const latestMin = getDateFromMinutes(latestTime)
    .getMinutes()
    .toString()
    .padStart(2, '0');

  const calendarEarliestTime = `${earliestHour}:${earliestMin}`;
  const calendarLatestTime = `${latestHour}:${latestMin}`;

  return (
    <div className='space-y-5'>
      <CalendarNav
        calendarRef={calendarRef}
        start={selectedStart}
        end={selectedEnd}
        viewedDate={viewedDate}
      />

      <Card className='p-3'>
        <FullCalendar
          ref={calendarRef}
          timeZone='local'
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            multiMonthPlugin,
            interactionPlugin,
            listPlugin
          ]}
          initialView='timeGridWeek'
          headerToolbar={false}
          slotMinTime={calendarEarliestTime}
          slotMaxTime={calendarLatestTime}
          allDaySlot={false}
          firstDay={1}
          height='32vh'
          displayEventEnd={true}
          events={events}
          contentHeight='auto'
          expandRows={true}
          dayCellTopContent={(dayInfo: DayCellContentArg) => (
            <DayRender info={dayInfo} />
          )}
          eventContent={(eventInfo) => <EventItem info={eventInfo} />}
          dayHeaderContent={(headerInfo) => <DayHeader info={headerInfo} />}
          eventClick={(eventInfo) => handleEventClick(eventInfo)}
          eventChange={(eventInfo) => handleEventChange(eventInfo)}
          select={handleDateSelect}
          datesSet={(dates) => setViewedDate(dates.view.currentStart)}
          dateClick={() => setEventAddOpen(true)}
          nowIndicator
          editable
          selectable
        />
      </Card>
      <EventEditForm
        oldEvent={selectedOldEvent}
        event={selectedEvent}
        isDrag={isDrag}
        displayButton={false}
      />
      <EventView event={selectedEvent} />
    </div>
  );
}
