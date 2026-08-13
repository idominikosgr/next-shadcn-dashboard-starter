'use client';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

import { useEventsStore } from '../context/events-provider';

interface EventDeleteFormProps {
  id?: string;
  title?: string;
}

export function EventDeleteForm({ id, title }: EventDeleteFormProps) {
  const deleteEvent = useEventsStore((s) => s.deleteEvent);
  const eventDeleteOpen = useEventsStore((s) => s.eventDeleteOpen);
  const setEventDeleteOpen = useEventsStore((s) => s.setEventDeleteOpen);
  const setEventViewOpen = useEventsStore((s) => s.setEventViewOpen);

  async function onSubmit() {
    if (!id) return;

    deleteEvent(id);
    setEventDeleteOpen(false);
    setEventViewOpen(false);
    toast.success('Event deleted successfully!');
  }

  return (
    <AlertDialog open={eventDeleteOpen} onOpenChange={setEventDeleteOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' onClick={() => setEventDeleteOpen(true)}>
          Delete Event
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex flex-row items-center justify-between'>
            <h1>Delete {title}</h1>
          </AlertDialogTitle>
          Are you sure you want to delete this event?
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setEventDeleteOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <Button variant='destructive' onClick={() => onSubmit()}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
