'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { createEventsStore, type EventsState } from './events-store';

export type EventsStoreApi = ReturnType<typeof createEventsStore>;

export const EventsStoreContext = createContext<EventsStoreApi | undefined>(
  undefined
);

export interface EventsStoreProviderProps {
  children: ReactNode;
}

export const EventsStoreProvider = ({ children }: EventsStoreProviderProps) => {
  const storeRef = useRef<EventsStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createEventsStore();
  }

  return (
    <EventsStoreContext.Provider value={storeRef.current}>
      {children}
    </EventsStoreContext.Provider>
  );
};

export const useEventsStore = <T,>(selector: (store: EventsState) => T): T => {
  const eventsStoreContext = useContext(EventsStoreContext);

  if (!eventsStoreContext) {
    throw new Error('useEventsStore must be used within EventsStoreProvider');
  }

  return useStore(eventsStoreContext, selector);
};
