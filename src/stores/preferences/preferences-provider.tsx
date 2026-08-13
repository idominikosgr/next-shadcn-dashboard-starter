'use client';

import { createContext, useContext, useRef } from 'react';

import { useStore, type StoreApi } from 'zustand';

import { createPreferencesStore, PreferencesState } from './preferences-store';

const PreferencesStoreContext =
  createContext<StoreApi<PreferencesState> | null>(null);

export const PreferencesStoreProvider = ({
  children,
  themeMode,
  themePreset,
  sidebarVariant,
  sidebarCollapsible,
  contentLayout,
  navbarStyle
}: {
  children: React.ReactNode;
  themeMode: PreferencesState['themeMode'];
  themePreset: PreferencesState['themePreset'];
  sidebarVariant: PreferencesState['sidebarVariant'];
  sidebarCollapsible: PreferencesState['sidebarCollapsible'];
  contentLayout: PreferencesState['contentLayout'];
  navbarStyle: PreferencesState['navbarStyle'];
}) => {
  const storeRef = useRef<StoreApi<PreferencesState> | null>(null);

  storeRef.current ??= createPreferencesStore({
    themeMode,
    themePreset,
    sidebarVariant,
    sidebarCollapsible,
    contentLayout,
    navbarStyle
  });

  return (
    <PreferencesStoreContext value={storeRef.current}>
      {children}
    </PreferencesStoreContext>
  );
};

export const usePreferencesStore = <T,>(
  selector: (state: PreferencesState) => T
): T => {
  const store = useContext(PreferencesStoreContext);
  if (!store) throw new Error('Missing PreferencesStoreProvider');
  return useStore(store, selector);
};
