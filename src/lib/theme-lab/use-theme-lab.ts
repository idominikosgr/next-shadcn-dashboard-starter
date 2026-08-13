'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import type { ImportedTheme, ThemeLabPreset } from '@/types/preferences/theme-lab';
import { BRAND_COLORS, THEME_PRESET_OPTIONS } from '@/types/preferences/theme-lab';
import { getPreset, getAllPresets } from './generated-presets';
import { usePreferencesStore } from '@/stores/preferences/preferences-provider';
import { setValueToCookie } from '@/server/server-actions';
import {
  updateThemePreset,
  updateThemeModeWithAnimation,
  getCurrentPreset
} from '@/lib/theme-utils';

/**
 * Hook for managing theme laboratory functionality
 *
 * Uses CSS data-attribute selectors for theme application.
 * Themes are applied via [data-theme-preset="presetId"] selector in CSS files.
 */
export function useThemeLab() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isInitialized, setIsInitialized] = useState(false);

  // Get persisted theme preset from preferences store
  const persistedPreset = usePreferencesStore((s) => s.themePreset);
  const setPersistedPreset = usePreferencesStore((s) => s.setThemePreset);

  // Local state for current preset (synced with persisted)
  const [currentPreset, setCurrentPresetState] = useState<string | null>(
    persistedPreset
  );

  const isDarkMode = useMemo(() => {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return resolvedTheme === 'dark';
  }, [theme, resolvedTheme]);

  /**
   * Update current preset and persist to cookie
   */
  const setCurrentPreset = useCallback(
    async (preset: string | null) => {
      setCurrentPresetState(preset);
      setPersistedPreset(preset);
      if (preset) {
        await setValueToCookie('theme_preset', preset);
      } else {
        // Clear cookie by setting empty value
        await setValueToCookie('theme_preset', '');
      }
    },
    [setPersistedPreset]
  );

  /**
   * Reset theme to default (removes data-theme-preset attribute)
   */
  const resetTheme = useCallback(() => {
    updateThemePreset('default');
    setCurrentPreset(null);
  }, [setCurrentPreset]);

  /**
   * Apply a theme preset by ID
   * Sets the data-theme-preset attribute for CSS selector matching
   */
  const applyPreset = useCallback(
    async (presetId: string) => {
      // Verify preset exists
      const preset = getPreset(presetId);
      if (!preset && presetId !== 'default') {
        console.warn(`Theme preset "${presetId}" not found`);
        return;
      }

      // Apply via CSS data attribute
      updateThemePreset(presetId);

      // Update state and persist
      const value = presetId === 'default' ? null : presetId;
      setCurrentPresetState(value);
      setPersistedPreset(value);

      if (value) {
        await setValueToCookie('theme_preset', value);
      } else {
        await setValueToCookie('theme_preset', '');
      }
    },
    [setPersistedPreset]
  );

  /**
   * Apply preset with View Transition animation
   * If event is provided, uses circular reveal from click position
   * Otherwise uses a smooth crossfade transition
   */
  const applyPresetWithAnimation = useCallback(
    async (presetId: string, event?: MouseEvent) => {
      const doc = document.documentElement;

      // Check if View Transitions API is supported
      if (
        !document.startViewTransition ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        await applyPreset(presetId);
        return;
      }

      // If we have click coordinates, set up circular reveal
      if (event) {
        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        doc.style.setProperty('--x', `${x}px`);
        doc.style.setProperty('--y', `${y}px`);
        doc.style.setProperty('--r', `${endRadius}px`);
      }

      // Start view transition (crossfade if no coordinates)
      document.startViewTransition(() => {
        updateThemePreset(presetId);
      });

      // Persist state
      const value = presetId === 'default' ? null : presetId;
      setCurrentPresetState(value);
      setPersistedPreset(value);

      if (value) {
        await setValueToCookie('theme_preset', value);
      } else {
        await setValueToCookie('theme_preset', '');
      }
    },
    [setPersistedPreset]
  );

  /**
   * Apply a random preset
   */
  const applyRandomPreset = useCallback(() => {
    const presets = Object.keys(getAllPresets());
    const randomIndex = Math.floor(Math.random() * presets.length);
    const randomKey = presets[randomIndex];
    if (randomKey) {
      applyPreset(randomKey);
    }
  }, [applyPreset]);

  /**
   * Toggle theme mode with animation
   */
  const toggleThemeMode = useCallback(
    (event?: MouseEvent) => {
      const newMode = isDarkMode ? 'light' : 'dark';
      updateThemeModeWithAnimation(newMode, event);
      setTheme(newMode);
    },
    [isDarkMode, setTheme]
  );

  /**
   * Get preset metadata by ID
   */
  const getPresetInfo = useCallback((presetId: string) => {
    return THEME_PRESET_OPTIONS.find((p) => p.id === presetId);
  }, []);

  /**
   * Get all preset options
   */
  const getAllPresetOptions = useCallback(() => {
    return THEME_PRESET_OPTIONS;
  }, []);

  /**
   * Get presets by category
   */
  const getPresetsByCategory = useCallback(
    (category: 'core' | 'community') => {
      return THEME_PRESET_OPTIONS.filter((p) => p.category === category);
    },
    []
  );

  /**
   * Initialize theme from persisted preset on mount
   */
  useEffect(() => {
    if (!isInitialized) {
      // Apply persisted preset via CSS attribute
      if (persistedPreset) {
        updateThemePreset(persistedPreset);
        setCurrentPresetState(persistedPreset);
      } else {
        // Ensure default state
        updateThemePreset('default');
      }
      setIsInitialized(true);
    }
  }, [isInitialized, persistedPreset]);

  return {
    // Theme state
    theme,
    setTheme,
    isDarkMode,
    currentPreset,
    isInitialized,

    // Actions
    applyPreset,
    applyPresetWithAnimation,
    applyRandomPreset,
    toggleThemeMode,
    resetTheme,

    // Helpers
    getPresetInfo,
    getAllPresetOptions,
    getPresetsByCategory,

    // Expose getPreset for direct access
    getPreset
  };
}
