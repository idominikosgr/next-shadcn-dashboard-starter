'use client';

import { useEffect, useRef } from 'react';
import { usePreferencesStore } from '@/stores/preferences/preferences-provider';
import { FEATURES } from '@/config/features';
import { updateThemePreset } from '@/lib/theme-utils';

/**
 * Component that initializes theme preset on page load.
 *
 * This component reads the persisted theme preset from the preferences store
 * (which was initialized from cookies in the layout) and applies it immediately
 * on first render via the CSS data-attribute approach.
 *
 * When Theme Lab is disabled but DEFAULT_THEME_PRESET is configured,
 * this will apply that preset instead.
 *
 * The CSS files handle all styling via [data-theme-preset="presetId"] selectors,
 * with automatic light/dark mode variants.
 *
 * Must be rendered within both ThemeProvider and PreferencesStoreProvider.
 */
export function ThemeLabInitializer() {
  const themePreset = usePreferencesStore((s) => s.themePreset);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run once on mount
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Determine which preset to use:
    // 1. User's saved preset (from Theme Lab or cookies)
    // 2. Default preset from config (when Theme Lab is disabled)
    // 3. No preset (use CSS stylesheet defaults)
    const presetId =
      themePreset ||
      (!FEATURES.THEME_LAB ? FEATURES.DEFAULT_THEME_PRESET : null);

    if (!presetId) return;

    // Apply via CSS data attribute - CSS handles light/dark mode automatically
    updateThemePreset(presetId);
  }, [themePreset]);

  return null;
}
