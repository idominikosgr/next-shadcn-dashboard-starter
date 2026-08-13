'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MiniCalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  events?: { date: Date; color?: string }[];
  className?: string;
}

export function MiniCalendar({
  value,
  onChange,
  events = [],
  className
}: MiniCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(value || new Date());

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const today = new Date();

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDayClick = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onChange?.(newDate);
  };

  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    return (
      value.getDate() === day &&
      value.getMonth() === currentMonth.getMonth() &&
      value.getFullYear() === currentMonth.getFullYear()
    );
  };

  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      return (
        event.date.getDate() === day &&
        event.date.getMonth() === currentMonth.getMonth() &&
        event.date.getFullYear() === currentMonth.getFullYear()
      );
    });
  };

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const monthName = currentMonth.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className={cn('bg-card rounded-lg border p-4', className)}>
      {/* Header */}
      <div className='mb-4 flex items-center justify-between'>
        <Button
          variant='ghost'
          size='icon'
          className='size-7'
          onClick={prevMonth}
        >
          <ChevronLeft className='size-4' />
        </Button>
        <span className='text-sm font-medium'>{monthName}</span>
        <Button
          variant='ghost'
          size='icon'
          className='size-7'
          onClick={nextMonth}
        >
          <ChevronRight className='size-4' />
        </Button>
      </div>

      {/* Day names */}
      <div className='mb-2 grid grid-cols-7 text-center'>
        {dayNames.map((day) => (
          <div key={day} className='text-muted-foreground text-xs font-medium'>
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className='grid grid-cols-7 gap-1'>
        {/* Empty cells for days before the first of the month */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className='aspect-square' />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayEvents = getEventsForDay(day);
          const hasEvents = dayEvents.length > 0;

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={cn(
                'relative flex aspect-square items-center justify-center rounded-full text-sm transition-colors',
                'hover:bg-muted',
                isToday(day) && !isSelected(day) && 'bg-muted font-semibold',
                isSelected(day) &&
                  'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              {day}
              {/* Event indicators */}
              {hasEvents && (
                <div className='absolute bottom-0.5 flex gap-0.5'>
                  {dayEvents.slice(0, 3).map((event, idx) => (
                    <span
                      key={idx}
                      className='size-1 rounded-full'
                      style={{
                        backgroundColor: event.color || 'var(--primary)'
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getFirstDayOfMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}
