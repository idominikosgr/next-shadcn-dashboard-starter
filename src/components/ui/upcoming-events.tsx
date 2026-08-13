'use client';

import * as React from 'react';
import { Calendar, Clock, MapPin, MoreHorizontal, Users } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime?: Date;
  location?: string;
  color?: string;
  attendees?: {
    name: string;
    avatar?: string;
  }[];
  isAllDay?: boolean;
}

interface UpcomingEventsProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onViewAll?: () => void;
  maxEvents?: number;
  title?: string;
  className?: string;
}

export function UpcomingEvents({
  events,
  onEventClick,
  onViewAll,
  maxEvents = 5,
  title = 'Upcoming Events',
  className
}: UpcomingEventsProps) {
  // Sort events by start time and limit
  const sortedEvents = [...events]
    .filter((e) => e.startTime >= new Date())
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    .slice(0, maxEvents);

  // Group events by date
  const groupedEvents = groupEventsByDate(sortedEvents);

  return (
    <div className={cn('bg-card rounded-lg border', className)}>
      {/* Header */}
      <div className='flex items-center justify-between border-b px-4 py-3'>
        <div className='flex items-center gap-2'>
          <Calendar className='text-muted-foreground size-4' />
          <h3 className='font-semibold'>{title}</h3>
        </div>
        {onViewAll && (
          <Button variant='ghost' size='sm' onClick={onViewAll}>
            View all
          </Button>
        )}
      </div>

      {/* Events */}
      <ScrollArea className='max-h-[400px]'>
        {sortedEvents.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-8 text-center'>
            <Calendar className='text-muted-foreground/50 mb-2 size-10' />
            <p className='text-muted-foreground text-sm'>No upcoming events</p>
          </div>
        ) : (
          <div className='divide-y'>
            {Object.entries(groupedEvents).map(([dateKey, dateEvents]) => (
              <div key={dateKey}>
                {/* Date header */}
                <div className='bg-muted/50 text-muted-foreground sticky top-0 px-4 py-2 text-xs font-medium'>
                  {formatDateHeader(new Date(dateKey))}
                </div>
                {/* Events for this date */}
                <div className='divide-y divide-dashed'>
                  {dateEvents.map((event) => (
                    <EventItem
                      key={event.id}
                      event={event}
                      onClick={() => onEventClick?.(event)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

interface EventItemProps {
  event: CalendarEvent;
  onClick?: () => void;
}

function EventItem({ event, onClick }: EventItemProps) {
  return (
    <div
      className={cn(
        'group hover:bg-muted/50 flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      {/* Color indicator */}
      <div
        className='mt-1.5 size-2 shrink-0 rounded-full'
        style={{ backgroundColor: event.color || 'var(--primary)' }}
      />

      {/* Content */}
      <div className='min-w-0 flex-1'>
        <div className='flex items-start justify-between gap-2'>
          <h4 className='truncate font-medium'>{event.title}</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='size-6 shrink-0 opacity-0 group-hover:opacity-100'
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className='size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit event</DropdownMenuItem>
              <DropdownMenuItem>Add to calendar</DropdownMenuItem>
              <DropdownMenuItem className='text-destructive'>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Time */}
        <div className='text-muted-foreground mt-1 flex items-center gap-1 text-sm'>
          <Clock className='size-3.5' />
          <span>
            {event.isAllDay
              ? 'All day'
              : formatTimeRange(event.startTime, event.endTime)}
          </span>
        </div>

        {/* Location */}
        {event.location && (
          <div className='text-muted-foreground mt-1 flex items-center gap-1 text-sm'>
            <MapPin className='size-3.5' />
            <span className='truncate'>{event.location}</span>
          </div>
        )}

        {/* Attendees */}
        {event.attendees && event.attendees.length > 0 && (
          <div className='mt-2 flex items-center gap-2'>
            <div className='flex -space-x-2'>
              {event.attendees.slice(0, 3).map((attendee, i) => (
                <Avatar key={i} className='border-background size-6 border-2'>
                  <AvatarImage src={attendee.avatar} alt={attendee.name} />
                  <AvatarFallback className='text-[10px]'>
                    {attendee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            {event.attendees.length > 3 && (
              <span className='text-muted-foreground text-xs'>
                +{event.attendees.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function groupEventsByDate(
  events: CalendarEvent[]
): Record<string, CalendarEvent[]> {
  const groups: Record<string, CalendarEvent[]> = {};

  for (const event of events) {
    const dateKey = event.startTime.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
  }

  return groups;
}

function formatDateHeader(date: Date): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
}

function formatTimeRange(start: Date, end?: Date): string {
  const startTime = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  if (!end) return startTime;

  const endTime = end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return `${startTime} - ${endTime}`;
}
