# Theme Creation Guide

This guide explains how to create custom themes for the Nexus Dashboard using our CSS-based theme system.

## Overview

Themes are defined as CSS files in `/src/styles/presets/`. Each theme uses CSS custom properties (variables) scoped to a `data-theme-preset` attribute selector. The system supports:

- **Light and dark mode** variants
- **Extended styling properties** (elevation, borders, glassmorphism, hover effects)
- **Custom fonts** per theme
- **Automatic TypeScript integration** via generation script

## Quick Start

1. Create a new CSS file in `/src/styles/presets/` (e.g., `my-theme.css`)
2. Add the required metadata and CSS structure
3. Run `pnpm generate:presets` to register the theme
4. Your theme will appear in the Theme Lab

## Theme File Structure

```css
/**
 * @preset My Theme Name
 * @category community
 * @description A brief description of your theme
 */

:root[data-theme-preset="my-theme"] {
  /* Light mode variables */
}

.dark[data-theme-preset="my-theme"] {
  /* Dark mode variables */
}
```

### Metadata Comments

| Tag | Required | Description |
|-----|----------|-------------|
| `@preset` | Yes | Display name in Theme Lab |
| `@category` | No | `core` or `community` (default: community) |
| `@description` | No | Brief description shown in tooltips |

## Required CSS Variables

### Color Palette

These are the minimum required color variables:

```css
:root[data-theme-preset="my-theme"] {
  /* Base colors */
  --background: oklch(1 0 0);
  --foreground: oklch(0.1 0 0);

  /* Card surfaces */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.1 0 0);

  /* Popover/dropdown surfaces */
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.1 0 0);

  /* Primary action color */
  --primary: oklch(0.5 0.2 250);
  --primary-foreground: oklch(1 0 0);

  /* Secondary/muted action color */
  --secondary: oklch(0.95 0.01 250);
  --secondary-foreground: oklch(0.2 0 0);

  /* Muted/disabled states */
  --muted: oklch(0.95 0 0);
  --muted-foreground: oklch(0.45 0 0);

  /* Accent/highlight color */
  --accent: oklch(0.95 0.01 250);
  --accent-foreground: oklch(0.2 0 0);

  /* Destructive/error color */
  --destructive: oklch(0.6 0.25 25);

  /* Borders and inputs */
  --border: oklch(0.9 0 0);
  --input: oklch(0.9 0 0);
  --ring: oklch(0.5 0.2 250);

  /* Chart colors (for data visualization) */
  --chart-1: oklch(0.5 0.2 250);
  --chart-2: oklch(0.6 0.18 160);
  --chart-3: oklch(0.7 0.15 60);
  --chart-4: oklch(0.55 0.22 320);
  --chart-5: oklch(0.65 0.2 25);

  /* Sidebar colors */
  --sidebar: oklch(0.98 0 0);
  --sidebar-foreground: oklch(0.1 0 0);
  --sidebar-primary: oklch(0.5 0.2 250);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.95 0.01 250);
  --sidebar-accent-foreground: oklch(0.2 0 0);
  --sidebar-border: oklch(0.9 0 0);
  --sidebar-ring: oklch(0.5 0.2 250);
}
```

### Optional: Extended Styling Variables

These variables let you customize the visual style beyond colors:

#### Border Radius

```css
--radius: 0.5rem;  /* Global border radius - affects all rounded elements */
```

| Value | Effect |
|-------|--------|
| `0` | Sharp corners (brutalist) |
| `0.3rem` | Subtle rounding |
| `0.5rem` | Default |
| `0.75rem` | Soft rounding |
| `1rem+` | Pill-like shapes |

#### Border Width

```css
--border-width: 1px;  /* Global border thickness */
```

| Value | Effect |
|-------|--------|
| `0px` | Borderless (glassmorphism, neumorphism) |
| `1px` | Default |
| `2px` | Bold borders (brutalist) |

#### Elevation System

Control shadows across all elevated elements:

```css
/* From subtle to dramatic */
--elevation-1: /* Buttons, inputs - subtle lift */
--elevation-2: /* Cards - standard elevation */
--elevation-3: /* Dropdowns, popovers */
--elevation-4: /* Modals, dialogs */
--elevation-5: /* Toasts, notifications - maximum elevation */
```

**Example styles:**

```css
/* Soft shadows (default) */
--elevation-1: 0 1px 2px oklch(0 0 0 / 0.05);
--elevation-2: 0 2px 4px oklch(0 0 0 / 0.08);

/* No shadows (brutalist) */
--elevation-1: none;
--elevation-2: none;

/* Hard offset shadows (neo-brutalism) */
--elevation-1: 4px 4px 0 oklch(0 0 0 / 1);
--elevation-2: 4px 4px 0 oklch(0 0 0 / 1);

/* Neumorphism */
--elevation-2: 8px 8px 16px #d1d1d1, -8px -8px 16px #fff;

/* Neon glow (cyberpunk) */
--elevation-2: 0 0 10px #ff00ff50, 0 0 20px #00ffff30;
```

#### Glassmorphism

Create frosted glass effects:

```css
--glass-blur: 16px;     /* Backdrop blur amount */
--glass-opacity: 0.7;   /* Surface transparency (0-1) */
```

#### Surface Variants

Alternative background surfaces:

```css
--surface-raised: oklch(0.98 0 0);   /* Slightly elevated surface */
--surface-sunken: oklch(0.96 0 0);   /* Recessed/inset surface */
--surface-overlay: oklch(0 0 0 / 0.5); /* Modal backdrop */
```

#### Hover Effects

Micro-interaction scaling:

```css
--hover-scale: 1.02;      /* Scale on hover (1 = no scale) */
--hover-brightness: 1.05; /* Brightness on hover */
--active-scale: 0.98;     /* Scale when pressed */
```

#### Custom Fonts

```css
--font-sans: "Inter", sans-serif;
--font-mono: "JetBrains Mono", monospace;
--font-serif: "Georgia", serif;
```

## Color Format: OKLCH

We use the OKLCH color space for better perceptual uniformity:

```
oklch(L C H)
      │ │ │
      │ │ └── Hue (0-360): Color wheel position
      │ └──── Chroma (0-0.4): Color intensity/saturation
      └────── Lightness (0-1): Brightness level
```

**Common hue values:**
- 0-30: Red/Orange
- 60-90: Yellow/Lime
- 120-160: Green/Teal
- 200-250: Blue/Cyan
- 280-320: Purple/Violet
- 330-360: Pink/Magenta

**Tips:**
- Keep chroma low (0-0.02) for neutral grays
- Use consistent hue across your palette for harmony
- Adjust lightness for contrast, not chroma

## Example Themes

### Minimal Theme (Colors Only)

```css
/**
 * @preset Ocean Blue
 * @category community
 * @description Clean ocean-inspired blue theme
 */

:root[data-theme-preset="ocean-blue"] {
  --background: oklch(0.98 0.01 220);
  --foreground: oklch(0.15 0.02 220);
  --primary: oklch(0.55 0.18 220);
  --primary-foreground: oklch(1 0 0);
  /* ... rest of colors */
}

.dark[data-theme-preset="ocean-blue"] {
  --background: oklch(0.12 0.02 220);
  --foreground: oklch(0.95 0.01 220);
  --primary: oklch(0.65 0.16 220);
  --primary-foreground: oklch(0.1 0 0);
  /* ... rest of colors */
}
```

### Styled Theme (Extended Variables)

```css
/**
 * @preset Soft Neumorphism
 * @category community
 * @description Soft, puffy neumorphic design
 */

:root[data-theme-preset="soft-neumorphism"] {
  --radius: 1.25rem;
  --border-width: 0px;
  --glass-blur: 0;

  /* Neumorphic shadows */
  --elevation-1: 4px 4px 8px #d1d1d1, -4px -4px 8px #fff;
  --elevation-2: 8px 8px 16px #d1d1d1, -8px -8px 16px #fff;
  --elevation-3: 12px 12px 24px #d1d1d1, -12px -12px 24px #fff;
  --elevation-4: 16px 16px 32px #d1d1d1, -16px -16px 32px #fff;
  --elevation-5: 20px 20px 40px #d1d1d1, -20px -20px 40px #fff;

  /* Warm gray palette */
  --background: oklch(0.94 0.01 60);
  --foreground: oklch(0.25 0.02 60);
  --card: oklch(0.94 0.01 60);
  /* ... */
}
```

### Cyberpunk Theme (Neon Effects)

```css
/**
 * @preset Neon City
 * @category community
 * @description Vibrant neon cyberpunk aesthetic
 */

:root[data-theme-preset="neon-city"] {
  --radius: 0;
  --border-width: 1px;
  --glass-blur: 12px;
  --glass-opacity: 0.8;

  /* Colors */
  --primary: oklch(0.7 0.3 320); /* Hot pink */
  --accent: oklch(0.75 0.25 180); /* Cyan */
  /* ... */
}

.dark[data-theme-preset="neon-city"] {
  /* Neon glow shadows */
  --elevation-1: 0 0 5px oklch(0.7 0.3 320 / 0.3);
  --elevation-2: 0 0 10px oklch(0.7 0.3 320 / 0.4), 0 0 20px oklch(0.75 0.25 180 / 0.2);
  --elevation-3: 0 0 15px oklch(0.7 0.3 320 / 0.5), 0 0 30px oklch(0.75 0.25 180 / 0.3);
  /* ... */
}
```

## Generating & Testing

### 1. Generate TypeScript Types

After creating/editing your theme file:

```bash
pnpm generate:presets
```

This:
- Updates `/src/types/preferences/theme-lab.ts` with your theme metadata
- Regenerates `/src/lib/theme-lab/generated-presets.ts`
- Updates `/src/styles/presets/index.css` with imports

### 2. Test Your Theme

1. Start the dev server: `pnpm dev`
2. Open Theme Lab (settings icon on right side)
3. Find your theme in "Community Presets" dropdown
4. Toggle between light/dark modes
5. Try adjusting the Theme Lab controls to see interactions

### 3. Iterate

- Edit your CSS file
- Refresh the browser (CSS is hot-reloaded)
- Re-run `pnpm generate:presets` if you change metadata

## Tips & Best Practices

1. **Start with an existing theme** - Copy a similar theme as your starting point
2. **Test both modes** - Always define both `:root[...]` and `.dark[...]` variants
3. **Check contrast** - Ensure text is readable on all backgrounds
4. **Use Theme Lab** - Use the shadow/blur/border controls to preview effects
5. **Be consistent** - Use the same hue family across your palette
6. **Test components** - Check cards, buttons, inputs, modals, dropdowns

## Importing External Themes

If you have themes from external sources (using `:root` / `.dark` format), place them in the `/themes/` directory. The generate script will automatically convert them to our format.

## File Locations

| Path | Description |
|------|-------------|
| `/src/styles/presets/*.css` | Theme preset CSS files |
| `/src/styles/presets/index.css` | Auto-generated imports (don't edit) |
| `/src/app/globals.css` | Base/default theme variables |
| `/src/types/preferences/theme-lab.ts` | Generated theme metadata |
| `/src/lib/theme-lab/generated-presets.ts` | Generated preset registry |
| `/themes/` | External themes to import |

## Need Help?

- Check existing themes in `/src/styles/presets/` for examples
- Use browser DevTools to inspect which CSS variables are applied
- The Theme Lab provides real-time preview of many settings
