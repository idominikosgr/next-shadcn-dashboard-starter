# Nexus Dashboard - Design System Manifest

> **For AI Assistants**: This document defines IMMUTABLE patterns that MUST be preserved. When adapting this template for a new project, you MUST NOT modify any pattern marked as FOUNDATIONAL. Customization is ONLY allowed in sections marked CUSTOMIZABLE.

---

## Core Identity

This is a production-grade SaaS dashboard design system built on:
- Next.js 16 App Router + React 19
- Tailwind CSS 4.1 with OKLCH colors
- Shadcn UI components (extended)
- Dual-layer theming (light/dark + presets)

---

## FOUNDATIONAL PATTERNS (DO NOT MODIFY)

### 1. OKLCH Color System

**Rule**: ALL colors MUST use OKLCH format. Never hex, RGB, or HSL.

```css
/* CORRECT */
--primary: oklch(0.7 0.15 250);

/* WRONG - Never do this */
--primary: #3b82f6;
--primary: rgb(59, 130, 246);
--primary: hsl(217, 91%, 60%);
```

**Required Variables** (defined in `src/app/globals.css`):
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--popover`, `--popover-foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--border`, `--input`, `--ring`
- `--chart-1` through `--chart-5`
- `--sidebar-*` (7 variants)
- `--elevation-1` through `--elevation-5`

**Enforcement**: When adding new colors, add to BOTH `:root` AND `.dark` selectors.

---

### 2. Dual-Layer Theming Architecture

**Layer 1: Light/Dark Mode**
- Managed by `next-themes`
- Toggle via `updateThemeModeWithAnimation()` or `updateThemeModeInstant()`
- View Transition API with circular reveal animation
- CSS class: `.dark` on `<html>`

**Layer 2: Theme Presets**
- Data attribute: `data-theme-preset="presetId"` on `<html>`
- Switch via `updateThemePreset(presetId)`
- Zero-flicker technique with `disable-transitions` class
- Preset files in `src/styles/presets/`

**Enforcement**: Never manually toggle `.dark` class. Always use theme-utils.ts functions.

---

### 3. Preferences Persistence Flow

```
Cookies (server) → Zustand Store → DOM (data attributes)
```

**Cookie Keys** (7-day expiry):
| Key | Type | Options |
|-----|------|---------|
| `theme_mode` | string | "light" \| "dark" |
| `theme_preset` | string | preset ID or null |
| `sidebar_variant` | string | "sidebar" \| "floating" \| "inset" \| "floating-inset" |
| `sidebar_collapsible` | string | "icon" \| "offcanvas" |
| `content_layout` | string | "centered" \| "full-width" |
| `navbar_style` | string | "sticky" \| "scroll" |

**Enforcement**:
- NEVER use localStorage for preferences
- ALWAYS sync to cookies via `setValueToCookie()` server action
- ALWAYS update Zustand store when changing preferences

---

### 4. Data-Attribute Layout System

Layout changes are CSS-only via data attributes. No component swapping.

```tsx
// Sidebar variant
<Sidebar variant={sidebarVariant} />
// → renders: <aside data-variant="inset">

// Content layout
<div data-slot="sidebar-inset" data-content-layout="centered">

// Navbar style
<header data-navbar-style="sticky">
```

**Enforcement**: Never create separate component files for layout variants (e.g., no `SidebarInset.tsx` vs `SidebarFloating.tsx`).

---

### 5. Provider Order in Root Layout

```tsx
// src/app/layout.tsx - EXACT ORDER REQUIRED
<ThemeProvider>
  <PreferencesStoreProvider {...cookieValues}>
    <Providers>
      <ThemeLabInitializer />
      {children}
    </Providers>
  </PreferencesStoreProvider>
</ThemeProvider>
```

**Enforcement**: Never reorder providers. ThemeLabInitializer MUST be inside all providers.

---

### 6. Server Components by Default

All components are Server Components unless they require:
- Event handlers (onClick, onChange)
- React hooks (useState, useEffect, useContext)
- Browser APIs (window, document, localStorage)
- Zustand store access

**Enforcement**: Never add `'use client'` to data display components or layouts.

---

### 7. Semantic Elevation Shadows

```css
--elevation-1  /* buttons, inputs */
--elevation-2  /* cards, dropdowns */
--elevation-3  /* floating panels */
--elevation-4  /* modals, dialogs */
--elevation-5  /* toasts, popovers */
```

**Enforcement**: Never use `shadow-sm`, `shadow-md` directly. Use `shadow-elevation-*`.

---

### 8. Feature Isolation

```
src/features/
├── feature-name/
│   ├── components/    # Feature-specific components
│   ├── hooks/         # Feature-specific hooks
│   ├── utils/         # Feature-specific utilities
│   └── store.ts       # Feature-specific Zustand store
```

**Enforcement**:
- Feature components NEVER go in `src/components/`
- Feature stores NEVER exported from generic exports
- No circular dependencies between features

---

### 9. Path Aliases

```typescript
import { Button } from '@/components/ui/button';  // CORRECT
import { Button } from '../../components/ui/button';  // WRONG
```

**Enforcement**: Always use `@/*` for src imports, `~/*` for public assets.

---

### 10. View Transition API Integration

Theme mode animations use View Transitions with circular reveal:

```typescript
// In updateThemeModeWithAnimation()
document.startViewTransition(() => {
  doc.classList.toggle('dark', value === 'dark');
});
```

CSS keyframes in `globals.css`:
```css
@keyframes reveal {
  from { clip-path: circle(0% at var(--x) var(--y)); }
  to { clip-path: circle(150% at var(--x) var(--y)); }
}
```

**Enforcement**: Always check `prefers-reduced-motion` before animating.

---

## CUSTOMIZABLE ELEMENTS

### Colors (OKLCH values only)

You may customize the specific OKLCH values in:
- `src/app/globals.css` (base theme)
- `src/styles/presets/*.css` (preset themes)

**Constraint**: Must define both light AND dark variants.

### Theme Presets

You may:
- Add new presets in `src/styles/presets/`
- Remove unused presets
- Rename preset IDs

**Constraint**: Update `ThemePreset` type in `src/types/preferences/theme.ts`.

### Feature Implementations

You may:
- Add new features under `src/features/`
- Remove unused features
- Modify feature business logic

**Constraint**: Follow feature isolation pattern.

### Routes

You may:
- Add new routes under `src/app/dashboard/`
- Modify page content
- Add new route groups

**Constraint**: Dashboard routes stay under `/dashboard/`.

### Sidebar Navigation

You may:
- Modify menu items in `src/components/layout/app-sidebar.tsx`
- Change icons and labels
- Reorganize navigation groups

**Constraint**: Keep sidebar structure (header, content, footer).

### Branding

You may:
- Replace logo component
- Update company name
- Modify metadata in `layout.tsx`

### Default Preferences

You may change defaults in:
- `src/config/features.ts` (feature flags)
- Cookie fallback values in server actions

---

## ANTI-PATTERNS (NEVER DO THESE)

### 1. Hex/RGB Colors
```css
/* NEVER */
--primary: #3b82f6;
bg-[#f5f5f5]
```

### 2. Component Variant Files
```
/* NEVER */
src/components/ui/button-rounded.tsx
src/components/layout/sidebar-inset.tsx
```

### 3. localStorage for Preferences
```typescript
/* NEVER */
localStorage.setItem('theme', 'dark');
```

### 4. Direct Class Manipulation
```typescript
/* NEVER */
document.documentElement.classList.add('dark');

/* CORRECT */
updateThemeModeInstant('dark');
```

### 5. Feature Components in Generic Folders
```
/* NEVER */
src/components/TaskCard.tsx  // belongs in features/kanban/

/* CORRECT */
src/features/kanban/components/task-card.tsx
```

### 6. Hardcoded Z-Index
```tsx
/* NEVER */
className="z-[9999]"

/* CORRECT */
className="z-modal"  // uses --z-modal variable
```

### 7. Missing Dark Mode Variants
```css
/* NEVER - incomplete preset */
:root[data-theme-preset="custom"] {
  --primary: oklch(0.7 0.15 250);
}
/* Missing .dark[data-theme-preset="custom"] */
```

### 8. Tailwind Default Colors
```tsx
/* NEVER */
className="bg-blue-500 text-gray-900"

/* CORRECT */
className="bg-primary text-foreground"
```

---

## Adaptation Checklist

When creating a new project from this template:

### Required Steps
- [ ] Update company/product name in sidebar
- [ ] Replace logo component
- [ ] Update metadata in root layout
- [ ] Configure authentication (Clerk or alternative)
- [ ] Set feature flags in `src/config/features.ts`
- [ ] Choose default theme preset

### Optional Steps
- [ ] Add new features under `src/features/`
- [ ] Create custom theme preset
- [ ] Modify color palette (OKLCH only)
- [ ] Add new routes
- [ ] Configure Sentry

### Verification
After adaptation, verify:
- [ ] Light/dark toggle works with animation
- [ ] Theme preset switching has no flicker
- [ ] Preferences persist across page reload
- [ ] All layouts render correctly
- [ ] No TypeScript errors
- [ ] No Biome lint warnings

---

## Quick Reference

### Theme Functions
```typescript
import {
  updateThemeModeWithAnimation,
  updateThemeModeInstant,
  updateThemePreset
} from '@/lib/theme-utils';
```

### Preference Functions
```typescript
import { setValueToCookie, getPreference } from '@/server/server-actions';
```

### Layout Functions
```typescript
import { updateContentLayout, updateNavbarStyle } from '@/lib/layout-utils';
```

### Store Access
```typescript
import { usePreferencesStore } from '@/stores/preferences/preferences-store';
const { themeMode, setThemeMode } = usePreferencesStore();
```

---

## Pattern Reference (For Creating New Components)

When extending this design system, follow these exact patterns.

### UI Component Pattern

```typescript
// src/components/ui/example.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const exampleVariants = cva(
  // Base classes - use semantic tokens
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-elevation-1',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ExampleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof exampleVariants> {}

const Example = React.forwardRef<HTMLDivElement, ExampleProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="example"  // Required for theme targeting
        className={cn(exampleVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Example.displayName = 'Example';

export { Example, exampleVariants };
```

### Chart Component Pattern

```typescript
// src/features/[feature]/components/example-chart.tsx
'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Use semantic chart colors only
const chartConfig = {
  value: {
    label: 'Value',
    color: 'var(--chart-1)',
  },
  secondary: {
    label: 'Secondary',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

interface ExampleChartProps {
  data: Array<{ name: string; value: number }>;
  title?: string;
}

export function ExampleChart({ data, title = 'Chart' }: ExampleChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border"
              />
              <XAxis
                dataKey="name"
                className="text-muted-foreground text-xs"
              />
              <YAxis className="text-muted-foreground text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="value"
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
```

### Feature Page Pattern

```typescript
// src/app/dashboard/[feature]/page.tsx
import { Metadata } from 'next';
import { FeatureView } from '@/features/[feature]/components/feature-view';

export const metadata: Metadata = {
  title: 'Feature Name',
  description: 'Feature description',
};

export default function FeaturePage() {
  // Server Component by default - no 'use client'
  return <FeatureView />;
}
```

### Feature Component Pattern

```typescript
// src/features/[feature]/components/feature-view.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Import other UI from @/components/ui/

// Keep as Server Component unless interactivity needed
export function FeatureView() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Title</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Use semantic colors */}
          <p className="text-muted-foreground">Content</p>
          <Button variant="default">Action</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Allowed Color Classes

```
/* Backgrounds */
bg-background, bg-foreground
bg-card, bg-popover
bg-primary, bg-secondary, bg-muted, bg-accent, bg-destructive
bg-sidebar, bg-sidebar-accent

/* Text */
text-foreground, text-primary-foreground, text-secondary-foreground
text-muted-foreground, text-accent-foreground, text-destructive-foreground

/* Borders */
border-border, border-input, border-ring
border-sidebar-border

/* Shadows */
shadow-elevation-1, shadow-elevation-2, shadow-elevation-3
shadow-elevation-4, shadow-elevation-5

/* Charts (in recharts/CSS) */
var(--chart-1), var(--chart-2), var(--chart-3)
var(--chart-4), var(--chart-5)
```

### Forbidden Patterns

```typescript
// NEVER: Tailwind default colors
className="bg-blue-500 text-gray-900 border-slate-200"

// NEVER: Hex/RGB values
className="bg-[#3b82f6] text-[rgb(0,0,0)]"

// NEVER: Hardcoded shadows
className="shadow-md shadow-lg shadow-xl"

// NEVER: Creating variant files
// button-primary.tsx, button-secondary.tsx

// NEVER: Feature components in /components
// src/components/AnalyticsDashboard.tsx
```
