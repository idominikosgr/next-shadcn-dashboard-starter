import { createStore } from 'zustand/vanilla';

import type { ThemeMode } from '@/types/preferences/theme';
import type {
  SidebarVariant,
  SidebarCollapsible,
  ContentLayout,
  NavbarStyle
} from '@/types/preferences/layout';

export type PreferencesState = {
  themeMode: ThemeMode;
  themePreset: string | null; // Theme Lab preset key (null = default theme)
  sidebarVariant: SidebarVariant;
  sidebarCollapsible: SidebarCollapsible;
  contentLayout: ContentLayout;
  navbarStyle: NavbarStyle;
  setThemeMode: (mode: ThemeMode) => void;
  setThemePreset: (preset: string | null) => void;
  setSidebarVariant: (variant: SidebarVariant) => void;
  setSidebarCollapsible: (collapsible: SidebarCollapsible) => void;
  setContentLayout: (layout: ContentLayout) => void;
  setNavbarStyle: (style: NavbarStyle) => void;
};

export const createPreferencesStore = (init?: Partial<PreferencesState>) =>
  createStore<PreferencesState>()((set) => ({
    themeMode: init?.themeMode ?? 'light',
    themePreset: init?.themePreset ?? null,
    sidebarVariant: init?.sidebarVariant ?? 'sidebar',
    sidebarCollapsible: init?.sidebarCollapsible ?? 'icon',
    contentLayout: init?.contentLayout ?? 'full-width',
    navbarStyle: init?.navbarStyle ?? 'sticky',
    setThemeMode: (mode) => set({ themeMode: mode }),
    setThemePreset: (preset) => set({ themePreset: preset }),
    setSidebarVariant: (variant) => set({ sidebarVariant: variant }),
    setSidebarCollapsible: (collapsible) =>
      set({ sidebarCollapsible: collapsible }),
    setContentLayout: (layout) => set({ contentLayout: layout }),
    setNavbarStyle: (style) => set({ navbarStyle: style })
  }));
