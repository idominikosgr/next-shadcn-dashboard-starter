'use client';

import { useEffect } from 'react';
import { usePreferencesStore } from '@/stores/preferences/preferences-provider';
import { updateContentLayout, updateNavbarStyle } from '@/lib/layout-utils';

/**
 * Client component that applies layout preferences from the store
 * to the DOM via data attributes. This enables immediate visual updates
 * without page reloads for content layout and navbar style.
 */
export function LayoutPreferencesApplier() {
  const contentLayout = usePreferencesStore((s) => s.contentLayout);
  const navbarStyle = usePreferencesStore((s) => s.navbarStyle);

  // Apply content layout preference
  useEffect(() => {
    updateContentLayout(contentLayout);
  }, [contentLayout]);

  // Apply navbar style preference
  useEffect(() => {
    updateNavbarStyle(navbarStyle);
  }, [navbarStyle]);

  return null;
}
