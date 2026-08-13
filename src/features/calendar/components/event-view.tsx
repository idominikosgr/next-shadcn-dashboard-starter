import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { X } from 'lucide-react';

import { useEventsStore } from '../context/events-provider';
import type { CalendarEvent } from '../lib/calendar-data';
import { EventDeleteForm } from './event-delete-form';
import { EventEditForm } from './event-edit-form';

interface EventViewProps {
  event?: CalendarEvent;
}

export function EventView({ event }: EventViewProps) {
  const eventViewOpen = useEventsStore((s) => s.eventViewOpen);
  const setEventViewOpen = useEventsStore((s) => s.setEventViewOpen);

  if (!event) return null;

  return (
    <AlertDialog open={eventViewOpen} onOpenChange={setEventViewOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex flex-row items-center justify-between'>
            <h1>{event.title}</h1>
            <AlertDialogCancel
              onClick={() => setEventViewOpen(false)}
              className='border-none'
            >
              <X className='h-5 w-5' />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <table className='text-sm'>
            <tbody>
              <tr>
                <th className='pr-4 text-left font-medium'>Time:</th>
                <td>{`${event.start.toLocaleTimeString()} - ${event.end.toLocaleTimeString()}`}</td>
              </tr>
              <tr>
                <th className='pr-4 text-left font-medium'>Description:</th>
                <td>{event.description}</td>
              </tr>
              <tr>
                <th className='pr-4 text-left font-medium'>Color:</th>
                <td>
                  <div
                    className='h-5 w-5 rounded-full'
                    style={{ backgroundColor: event.backgroundColor }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <EventDeleteForm id={event.id} title={event.title} />
          <EventEditForm
            oldEvent={event}
            event={event}
            isDrag={false}
            displayButton={true}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
