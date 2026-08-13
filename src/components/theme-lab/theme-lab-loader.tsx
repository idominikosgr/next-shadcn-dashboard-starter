'use client';

import dynamic from 'next/dynamic';
import { FEATURES } from '@/config/features';

// Dynamically import ThemeLab only when feature is enabled
// This ensures the component is tree-shaken when disabled
const ThemeLab = dynamic(
  () => import('@/components/theme-lab').then((mod) => mod.ThemeLab),
  {
    ssr: false,
    loading: () => null // No loading state for floating button
  }
);

/**
 * Conditionally renders the Theme Laboratory based on feature flag.
 *
 * When THEME_LAB feature is disabled:
 * - This component renders nothing
 * - ThemeLab code is tree-shaken from the bundle
 *
 * When enabled:
 * - Renders the floating trigger button
 * - Opens the theme customizer sheet on click
 */
export function ThemeLabLoader() {
  // Early return if feature is disabled
  if (!FEATURES.THEME_LAB) {
    return null;
  }

  return <ThemeLab />;
}
