import { createStore } from 'zustand/vanilla';
import { initialEvents, type CalendarEvent } from '../lib/calendar-data';

export type EventsState = {
  events: CalendarEvent[];
  eventViewOpen: boolean;
  eventAddOpen: boolean;
  eventEditOpen: boolean;
  eventDeleteOpen: boolean;
  availabilityCheckerEventAddOpen: boolean;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  setEventViewOpen: (value: boolean) => void;
  setEventAddOpen: (value: boolean) => void;
  setEventEditOpen: (value: boolean) => void;
  setEventDeleteOpen: (value: boolean) => void;
  setAvailabilityCheckerEventAddOpen: (value: boolean) => void;
};

export const createEventsStore = (init?: Partial<EventsState>) =>
  createStore<EventsState>()((set) => ({
    events: init?.events ?? initialEvents,
    eventViewOpen: init?.eventViewOpen ?? false,
    eventAddOpen: init?.eventAddOpen ?? false,
    eventEditOpen: init?.eventEditOpen ?? false,
    eventDeleteOpen: init?.eventDeleteOpen ?? false,
    availabilityCheckerEventAddOpen:
      init?.availabilityCheckerEventAddOpen ?? false,
    addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
    updateEvent: (id, updates) =>
      set((state) => ({
        events: state.events.map((event) =>
          event.id === id ? { ...event, ...updates } : event
        )
      })),
    deleteEvent: (id) =>
      set((state) => ({
        events: state.events.filter((event) => event.id !== id)
      })),
    setEventViewOpen: (value) => set({ eventViewOpen: value }),
    setEventAddOpen: (value) => set({ eventAddOpen: value }),
    setEventEditOpen: (value) => set({ eventEditOpen: value }),
    setEventDeleteOpen: (value) => set({ eventDeleteOpen: value }),
    setAvailabilityCheckerEventAddOpen: (value) =>
      set({ availabilityCheckerEventAddOpen: value })
  }));
