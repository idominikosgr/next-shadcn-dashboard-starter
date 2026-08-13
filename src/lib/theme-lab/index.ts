/**
 * Theme Laboratory Module
 *
 * This module provides advanced theme customization capabilities.
 * It is conditionally loaded based on the THEME_LAB feature flag.
 *
 * Uses CSS data-attribute selectors for theme application.
 * Presets are defined in /src/styles/presets/*.css files.
 */

export { useThemeLab } from './use-theme-lab';
export {
  corePresets,
  communityPresets,
  getAllPresets,
  getPreset,
  getPresetIds
} from './generated-presets';
