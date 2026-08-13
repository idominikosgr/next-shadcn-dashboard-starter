'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Check } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { format } from 'date-fns';

import { useEventsStore } from '../context/events-provider';
import { eventColors, type CalendarEvent } from '../lib/calendar-data';
import { cn } from '@/lib/utils';

const eventEditFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
      error: 'Must provide a title for this event.'
}),
  description: z
    .string()
    .min(1, {
        error: 'Must provide a description for this event.'
    }),
  date: z.date({ error: 'Please select a date' }),
  startTime: z.string().min(1, {
      error: 'Please enter a start time'
}),
  endTime: z.string().min(1, {
      error: 'Please enter an end time'
}),
  color: z.string().min(1, {
      error: 'Must provide a color for this event.'
})
});

type EventEditFormValues = z.infer<typeof eventEditFormSchema>;

interface EventEditFormProps {
  oldEvent?: CalendarEvent;
  event?: CalendarEvent;
  isDrag: boolean;
  displayButton: boolean;
}

export function EventEditForm({
  oldEvent,
  event,
  isDrag,
  displayButton
}: EventEditFormProps) {
  const updateEvent = useEventsStore((s) => s.updateEvent);
  const deleteEvent = useEventsStore((s) => s.deleteEvent);
  const addEvent = useEventsStore((s) => s.addEvent);
  const eventEditOpen = useEventsStore((s) => s.eventEditOpen);
  const setEventEditOpen = useEventsStore((s) => s.setEventEditOpen);
  const setEventViewOpen = useEventsStore((s) => s.setEventViewOpen);

  const form = useForm<EventEditFormValues>({
    resolver: zodResolver(eventEditFormSchema)
  });

  const handleEditCancellation = () => {
    if (isDrag && oldEvent) {
      // Reset to old position if drag was cancelled
      deleteEvent(event?.id || '');
      addEvent(oldEvent);
    }
    setEventEditOpen(false);
  };

  useEffect(() => {
    if (event) {
      form.reset({
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.start,
        startTime: format(event.start, 'HH:mm'),
        endTime: format(event.end, 'HH:mm'),
        color: event.backgroundColor || '#000000'
      });
    }
  }, [form, event]);

  async function onSubmit(data: EventEditFormValues) {
    const [startHour, startMinute] = data.startTime.split(':').map(Number);
    const [endHour, endMinute] = data.endTime.split(':').map(Number);

    const startDate = new Date(data.date);
    startDate.setHours(startHour, startMinute, 0, 0);

    const endDate = new Date(data.date);
    endDate.setHours(endHour, endMinute, 0, 0);

    updateEvent(data.id, {
      title: data.title,
      description: data.description,
      start: startDate,
      end: endDate,
      backgroundColor: data.color
    });

    setEventEditOpen(false);
    setEventViewOpen(false);
    toast.success('Event updated successfully!');
  }

  return (
    <AlertDialog open={eventEditOpen} onOpenChange={setEventEditOpen}>
      {displayButton && (
        <AlertDialogTrigger asChild>
          <Button variant='default' onClick={() => setEventEditOpen(true)}>
            Edit Event
          </Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Event</AlertDialogTitle>
        </AlertDialogHeader>

        <Form
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-2.5'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Standup Meeting' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Daily session'
                    className='max-h-36'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-3'>
            <FormField
              control={form.control}
              name='startTime'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type='time' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='endTime'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input type='time' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='color'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <div className='flex flex-wrap gap-2'>
                    {eventColors.map((color, index) => (
                      <button
                        key={color}
                        type='button'
                        onClick={() => field.onChange(color)}
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all',
                          field.value === color
                            ? 'border-foreground scale-110'
                            : 'border-transparent hover-lift'
                        )}
                        style={{ backgroundColor: color }}
                        aria-label={`Color option ${index + 1}`}
                      >
                        {field.value === color && (
                          <Check className='h-4 w-4 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]' />
                        )}
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialogFooter className='pt-2'>
            <AlertDialogCancel onClick={handleEditCancellation}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction type='submit'>Save Changes</AlertDialogAction>
          </AlertDialogFooter>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
