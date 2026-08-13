/**
 * Theme Utility Functions
 *
 * Central utilities for theme management combining:
 * - View Transition API animation (circular reveal)
 * - Zero-flicker technique
 * - CSS data-attribute based preset application
 */

/**
 * Updates theme mode with View Transition animation (for light/dark toggle)
 * Uses circular reveal effect starting from click coordinates
 */
export function updateThemeModeWithAnimation(
  value: 'light' | 'dark',
  event?: MouseEvent
) {
  const doc = document.documentElement;

  // Check if View Transitions API is supported
  if (
    !document.startViewTransition ||
    !event ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    // Fallback: use zero-flicker technique
    updateThemeModeInstant(value);
    return;
  }

  // Get click coordinates for circular reveal
  const x = event.clientX;
  const y = event.clientY;

  // Calculate radius for the reveal animation
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  // Set CSS variables for animation
  doc.style.setProperty('--x', `${x}px`);
  doc.style.setProperty('--y', `${y}px`);
  doc.style.setProperty('--r', `${endRadius}px`);

  // Start view transition
  const transition = document.startViewTransition(() => {
    doc.classList.toggle('dark', value === 'dark');
  });

  transition.ready.then(() => {
    // Animation defined in globals.css
  });
}

/**
 * Updates theme mode instantly without animation (zero-flicker)
 * Use for initial load or when animation is not needed
 */
export function updateThemeModeInstant(value: 'light' | 'dark') {
  const doc = document.documentElement;
  doc.classList.add('disable-transitions');
  doc.classList.toggle('dark', value === 'dark');
  requestAnimationFrame(() => {
    doc.classList.remove('disable-transitions');
  });
}

/**
 * Updates theme preset using CSS data-attribute selector
 * The CSS files handle all styling via [data-theme-preset="presetId"] selectors
 */
export function updateThemePreset(presetId: string) {
  const root = document.documentElement;

  // 'default' means no preset - use base globals.css styles
  if (presetId === 'default') {
    root.removeAttribute('data-theme-preset');
  } else {
    root.setAttribute('data-theme-preset', presetId);
  }
}

/**
 * Get the current theme preset from the DOM
 */
export function getCurrentPreset(): string {
  return document.documentElement.getAttribute('data-theme-preset') ?? 'default';
}

/**
 * Get the current theme mode from the DOM
 */
export function getCurrentMode(): 'light' | 'dark' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * Apply theme preset with optional View Transition animation
 */
export function applyPresetWithAnimation(
  presetId: string,
  event?: MouseEvent
) {
  const doc = document.documentElement;

  // Check if View Transitions API is supported
  if (
    !document.startViewTransition ||
    !event ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    updateThemePreset(presetId);
    return;
  }

  // Get click coordinates for circular reveal
  const x = event.clientX;
  const y = event.clientY;

  // Calculate radius for the reveal animation
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  // Set CSS variables for animation
  doc.style.setProperty('--x', `${x}px`);
  doc.style.setProperty('--y', `${y}px`);
  doc.style.setProperty('--r', `${endRadius}px`);

  // Start view transition
  document.startViewTransition(() => {
    updateThemePreset(presetId);
  });
}
