'use client';

import {
  ArrowUpRight,
  CalendarDays,
  Calendar as CalendarIcon,
  Clock,
  TrendingDown,
  TrendingUp,
  Users
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Calendar } from '@/features/calendar/components/calendar';
import { EventsStoreProvider } from '@/features/calendar/context/events-provider';
import { cn } from '@/lib/utils';

export default function CalendarPage() {
  // Mock stats - in a real app, these would be calculated from actual events
  const stats = {
    total: 14,
    meetings: 7,
    tasks: 4,
    calendars: 5
  };

  const performanceMetrics = [
    {
      title: 'Total Events',
      current: stats.total.toString(),
      previous: '10',
      growth: 40.0,
      icon: CalendarDays
    },
    {
      title: 'Meetings',
      current: stats.meetings.toString(),
      previous: '4',
      growth: 75.0,
      icon: Users
    },
    {
      title: 'Tasks',
      current: stats.tasks.toString(),
      previous: '3',
      growth: 33.3,
      icon: Clock
    },
    {
      title: 'Calendars',
      current: stats.calendars.toString(),
      previous: '3',
      growth: 66.7,
      icon: CalendarIcon
    }
  ];

  return (
    <EventsStoreProvider>
      <div className='flex flex-1 flex-col gap-6 p-4 md:p-6'>
        {/* Page Header */}
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Calendar
          </h1>
          <p className='text-muted-foreground text-sm md:text-base'>
            Manage your schedule and upcoming events
          </p>
        </div>

        {/* Stats Cards */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className='border'>
              <CardContent className='space-y-4 pt-6'>
                <div className='flex items-center justify-between'>
                  <metric.icon className='text-muted-foreground size-6' />
                  <Badge
                    variant='outline'
                    className={cn(
                      metric.growth >= 0
                        ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/20 dark:text-green-400'
                        : 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400'
                    )}
                  >
                    {metric.growth >= 0 ? (
                      <>
                        <TrendingUp className='me-1 size-3' />+{metric.growth}%
                      </>
                    ) : (
                      <>
                        <TrendingDown className='me-1 size-3' />
                        {metric.growth}%
                      </>
                    )}
                  </Badge>
                </div>

                <div className='space-y-2'>
                  <p className='text-muted-foreground text-sm font-medium'>
                    {metric.title}
                  </p>
                  <div className='text-2xl font-bold'>{metric.current}</div>
                  <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                    <span>from {metric.previous}</span>
                    <ArrowUpRight className='size-3' />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Calendar Card */}
        <Card className='overflow-hidden border'>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>
              View and manage your calendar events
            </CardDescription>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='p-4'>
              <Calendar />
            </div>
          </CardContent>
        </Card>
      </div>
    </EventsStoreProvider>
  );
}
