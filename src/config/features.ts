/**
 * Feature flags for optional functionality
 *
 * These flags control which features are enabled in the application.
 * Use environment variables to toggle features on/off.
 */

export const FEATURES = {
  /**
   * Theme Laboratory - Advanced theme customization panel
   *
   * When enabled:
   * - Shows floating theme customizer button
   * - Provides access to 50+ theme presets
   * - Allows brand color customization
   * - Enables theme import/export
   *
   * When disabled:
   * - No additional bundle size
   * - Dashboard uses default/configured theme from cookies
   * - Core theme system (light/dark, basic presets) still works
   */
  THEME_LAB: process.env.NEXT_PUBLIC_THEME_LAB_ENABLED === 'true',

  /**
   * Default Theme Preset - Used when Theme Lab is disabled
   *
   * Set this to any preset ID from the registry (core or community).
   * Examples: 'default', 'blue', 'violet', 'emerald-tech', 'ink-noir', etc.
   *
   * When Theme Lab is disabled, this preset will be applied automatically.
   * When Theme Lab is enabled, this is ignored (user preferences take over).
   *
   * Set to null or undefined to use the CSS stylesheet defaults.
   */
  DEFAULT_THEME_PRESET:
    (process.env.NEXT_PUBLIC_DEFAULT_THEME_PRESET as string | undefined) ||
    null,

  /**
   * Dev Tools - Development-only utilities
   *
   * When enabled:
   * - Shows performance metrics
   * - Enables component debugging tools
   */
  DEV_TOOLS: process.env.NODE_ENV === 'development'
} as const;

export type FeatureFlag = keyof typeof FEATURES;
