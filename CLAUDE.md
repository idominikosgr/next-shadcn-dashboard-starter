# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## CRITICAL: This is a Design System Template

**Read [PROJECT_MANIFEST.md](PROJECT_MANIFEST.md) before making ANY changes.**

This project serves as a **base template** for multiple SaaS dashboards. It contains carefully designed foundational patterns that MUST NOT be modified when adapting for new projects.

### The Cardinal Rules

1. **NEVER use hex/RGB colors** - ALL colors are OKLCH format
2. **NEVER use localStorage** - Preferences persist via cookies + server actions
3. **NEVER manually toggle `.dark` class** - Use `updateThemeModeWithAnimation()` or `updateThemeModeInstant()`
4. **NEVER create variant component files** - Use data attributes instead
5. **NEVER put feature components in `/components`** - They belong in `/features/`
6. **NEVER use Tailwind default colors** - Use semantic tokens (`bg-primary`, not `bg-blue-500`)
7. **NEVER break the provider order** in layout.tsx

### When Adapting This Template

**You MAY customize:**
- OKLCH color values (keeping the format)
- Theme preset names and colors
- Feature implementations under `/features/`
- Routes under `/app/dashboard/`
- Sidebar navigation items
- Company branding

**You MUST preserve:**
- Dual-layer theming architecture
- OKLCH color variable system
- Cookie → Zustand → DOM preference flow
- Data-attribute layout system
- Semantic elevation shadows
- View Transition API integration
- Feature isolation pattern
- Server Components by default

---

## Project Overview

Nexus Dashboard is a production-ready, unified design system combining features from multiple dashboard implementations. It's a modern SaaS dashboard built with Next.js 16 App Router, featuring an advanced dual-layer theming system with animated transitions and on-the-fly customization.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5.9
- **Styling**: Tailwind CSS 4.1, OKLCH color space
- **UI Components**: Shadcn UI (50+ components), Radix UI primitives
- **State Management**: Zustand (preferences + Kanban)
- **Data Fetching**: TanStack Query, Nuqs (type-safe URL params)
- **Forms**: React Hook Form + Zod validation
- **Tables**: TanStack Table
- **Authentication**: Clerk (currently disabled/mocked)
- **Error Tracking**: Sentry (conditionally enabled)
- **Command Palette**: kbar
- **Package Manager**: pnpm

## Development Commands

```bash
# Development
pnpm dev              # Start dev server at http://localhost:3000
pnpm build            # Build for production
pnpm start            # Run production server

# Code Quality
pnpm lint             # Run Biome checks
pnpm lint:fix         # Apply Biome auto-fixes
pnpm lint:strict      # Run Biome with warnings treated as errors
pnpm format           # Format code with Biome
pnpm format:check     # Check code formatting

# Git Hooks
pnpm prepare          # Install husky git hooks
```

## Architecture Overview

### Directory Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── dashboard/           # Dashboard routes
│   ├── auth/                # Auth-related pages
│   ├── globals.css          # Global styles + OKLCH base
│   ├── theme.css            # Theme variants
│   └── layout.tsx           # Root layout with providers
├── components/
│   ├── ui/                  # 50+ Shadcn UI components
│   ├── layout/              # Layout components (header, sidebar)
│   ├── settings/            # Settings popover & controls
│   ├── forms/               # Form wrappers
│   ├── kbar/                # Command palette
│   ├── modal/               # Modal components
│   └── data-table/          # Data table components
├── features/                # Feature-based organization
│   ├── kanban/              # Kanban board feature
│   ├── products/            # Product management
│   ├── overview/            # Analytics dashboard
│   ├── calendar/            # Calendar feature
│   ├── profile/             # User profile
│   └── auth/                # Auth components
├── stores/
│   └── preferences/         # Zustand store for theme/layout preferences
├── server/
│   └── server-actions.ts    # Server actions (cookie management)
├── lib/
│   ├── theme-utils.ts       # Theme switching utilities
│   ├── layout-utils.ts      # Layout manipulation utilities
│   └── utils.ts             # General utilities (cn, formatters)
├── styles/
│   └── presets/             # Theme preset CSS files
│       ├── brutalist.css
│       ├── tangerine.css
│       └── soft-pop.css
├── types/
│   └── preferences/         # TypeScript types for theme/layout
├── hooks/                   # Custom React hooks
├── constants/               # App constants and mock data
└── config/                  # App configuration
```

### Path Aliases

- `@/*` → `src/*`
- `~/*` → `public/*`

### Key Architecture Patterns

#### 1. Dual-Layer Theming System

The dashboard has a sophisticated two-tier theming architecture:

**Layer 1: Light/Dark Mode**

- Managed by `next-themes`
- Animated transitions via View Transition API
- Circular reveal effect from click coordinates
- Implementation: [src/lib/theme-utils.ts](src/lib/theme-utils.ts)

**Layer 2: Theme Presets**

- 4 presets: default, brutalist, tangerine, soft-pop
- OKLCH color space for perceptually uniform colors
- Zero-flicker switching technique
- CSS files in [src/styles/presets/](src/styles/presets/)

**Theme Switching Functions:**

```typescript
// Animated light/dark toggle with circular reveal
updateThemeModeWithAnimation(mode, event);

// Instant mode change (zero-flicker)
updateThemeModeInstant(mode);

// Preset change (zero-flicker)
updateThemePreset(preset);
```

#### 2. Preferences Management

**Zustand Store** ([src/stores/preferences/](src/stores/preferences/)):

- Client-side state: theme mode, theme preset, sidebar variant, collapsible mode, content layout, navbar style
- Persisted to cookies via server actions
- Provider pattern with context

**Server Actions** ([src/server/server-actions.ts](src/server/server-actions.ts)):

- `getValueFromCookie(key)` - Read cookie value
- `setValueToCookie(key, value, options)` - Write cookie
- `getPreference(key, allowed, fallback)` - Type-safe preference getter

**Cookie Keys:**

- `theme_mode` - "light" | "dark"
- `theme_preset` - "default" | "brutalist" | "tangerine" | "soft-pop"
- `sidebar_variant` - "sidebar" | "floating" | "inset"
- `sidebar_collapsible` - "icon" | "offcanvas"
- `content_layout` - "centered" | "full-width"
- `navbar_style` - "sticky" | "scroll"

#### 3. Feature-Based Organization

Each feature domain has its own directory under `src/features/` containing:

- Components specific to that feature
- Feature-specific hooks
- Feature-specific utilities
- Local state management (if needed)

This keeps related code together and makes features more maintainable.

#### 4. Server Components by Default

- All components are Server Components unless marked with `"use client"`
- Client components only when needed (interactivity, hooks, browser APIs)
- Server Actions for mutations (cookie updates, etc.)
- Preferences hydrated from cookies in root layout

## Code Style & Formatting

### Biome Formatting Configuration

- 2-space indentation
- Single quotes for JS/TS
- JSX single quotes
- Semicolons enabled
- No trailing commas
- LF line endings
- Tailwind CSS class sorting

### Biome Configuration

- Primary linter/formatter for this repository
- Configured in [biome.jsonc](biome.jsonc)
- Rules aligned with Next.js best practices
- Auto-organize imports enabled

### TypeScript Guidelines

- Strict mode enabled
- Never use `any` - use `unknown` or proper types
- Path aliases for clean imports
- Type inference preferred over explicit types where obvious

## Important Implementation Details

### View Transition API Usage

Theme mode changes use the View Transitions API for smooth circular reveal animations:

```typescript
// Check support and preferences
if (
  document.startViewTransition &&
  event &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  // Calculate reveal from click position
  const x = event.clientX;
  const y = event.clientY;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  // Set CSS vars and start transition
  doc.style.setProperty('--x', `${x}px`);
  doc.style.setProperty('--y', `${y}px`);
  doc.style.setProperty('--r', `${radius}px`);

  document.startViewTransition(() => {
    doc.classList.toggle('dark', value === 'dark');
  });
}
```

Animation keyframes defined in [src/app/globals.css](src/app/globals.css).

### Zero-Flicker Technique

Preset changes use a flicker-free technique:

```typescript
// Disable transitions temporarily
doc.classList.add('disable-transitions');
doc.setAttribute('data-theme-preset', value);

// Re-enable after browser reflow
requestAnimationFrame(() => {
  doc.classList.remove('disable-transitions');
});
```

CSS rule in globals.css:

```css
.disable-transitions * {
  transition: none !important;
}
```

### Clerk Authentication Status

Clerk is currently **disabled** in [src/components/layout/providers.tsx](src/components/layout/providers.tsx). To re-enable:

1. Uncomment ClerkProvider wrapper
2. Uncomment useTheme hook usage
3. Set up Clerk environment variables
4. Configure Clerk appearance to match current theme

## Common Development Tasks

### Adding a New Theme Preset

1. Create CSS file in `src/styles/presets/your-preset.css`
2. Define OKLCH color variables for light and dark modes
3. Import in `src/app/globals.css`
4. Add preset to `ThemePreset` type in `src/types/preferences/theme.ts`
5. Update settings UI to include new preset option

### Adding a New Feature

1. Create feature directory under `src/features/your-feature/`
2. Add feature-specific components, hooks, and utilities
3. Create route under `src/app/dashboard/your-feature/`
4. Update sidebar navigation in `src/components/layout/app-sidebar.tsx`
5. Add to kbar commands if applicable

### Modifying Layout Options

Layout preferences are managed through:

- **Types**: [src/types/preferences/layout.ts](src/types/preferences/layout.ts)
- **Store**: [src/stores/preferences/preferences-store.ts](src/stores/preferences/preferences-store.ts)
- **Utils**: [src/lib/layout-utils.ts](src/lib/layout-utils.ts)
- **UI Controls**: [src/components/settings/layout-controls.tsx](src/components/settings/layout-controls.tsx)

## Testing

Currently no test framework configured. When adding tests, consider:

- Vitest for unit/integration tests
- Playwright for E2E tests
- React Testing Library for component tests

## Deployment Considerations

- Sentry is conditionally enabled via `NEXT_PUBLIC_SENTRY_DISABLED` env var
- Configure `NEXT_PUBLIC_SENTRY_ORG` and `NEXT_PUBLIC_SENTRY_PROJECT` for Sentry
- Ensure proper environment variables for Clerk if re-enabling auth
- Build produces optimized production bundle
- Vercel deployment recommended for Next.js 16

## Key Dependencies to Know

- **@tanstack/react-table**: Advanced table functionality with server-side features
- **nuqs**: Type-safe URL search params (used for table filters/pagination)
- **kbar**: Command palette (`Cmd+K` / `Ctrl+K`)
- **@dnd-kit**: Drag-and-drop for Kanban board
- **recharts**: Chart components for analytics
- **zod**: Schema validation for forms
- **motion**: Animation library (successor to Framer Motion)

## Common Pitfalls

1. **Don't add "use client" unnecessarily** - Keep Server Components by default
2. **Theme changes must use utilities** - Don't manually toggle classes, use theme-utils.ts functions
3. **Preferences must sync to cookies** - Use server actions, don't use localStorage
4. **OKLCH colors in presets** - New theme presets should use OKLCH for consistency
5. **Feature code stays in features/** - Don't create feature-specific components in generic components folder
6. **Path aliases are required** - Always use `@/` instead of relative imports like `../../`

---

## AI Adaptation Prompts

Use these prompts when adapting this template for a new project. Copy the relevant prompt and customize the bracketed values.

### Migration Prompt (Existing Project → This Template)

```
I'm migrating an existing [PROJECT_TYPE] project into the Nexus Dashboard template.

Before migrating:
1. Read CLAUDE.md and PROJECT_MANIFEST.md completely
2. Acknowledge the design system patterns you must follow
3. Analyze my existing code at [PATH/URL] for components that need adaptation

Migration approach:
1. Map my existing components to this template's patterns:
   - Move feature-specific components to src/features/[feature-name]/
   - Identify reusable UI that should use existing src/components/ui/
   - Flag any components that need to be rebuilt to match patterns

2. For each component I'm bringing in:
   - Replace any hex/RGB colors with semantic tokens (bg-primary, text-muted-foreground)
   - Replace custom styling with existing UI components where possible
   - If creating new reusable components, follow the exact patterns in src/components/ui/

3. Data/business logic:
   - Keep domain logic in src/features/[feature]/
   - Use existing hooks patterns from src/hooks/
   - Follow the server action patterns for any mutations

Existing project structure:
[PASTE YOUR CURRENT STRUCTURE]

Target features to migrate:
- [FEATURE 1]: [DESCRIPTION]
- [FEATURE 2]: [DESCRIPTION]
```

### Initial Setup Prompt (Fresh Project)

```
I'm adapting the Nexus Dashboard template for [PROJECT_NAME], a [DESCRIPTION].

Before making any changes:
1. Read CLAUDE.md and PROJECT_MANIFEST.md completely
2. Acknowledge the foundational patterns you must preserve
3. Confirm you understand OKLCH colors, the dual-layer theming system, and cookie-based preferences

The customizations needed:
- Company name: [COMPANY]
- Primary color: oklch([L] [C] [H])
- Features to keep: [LIST]
- Features to remove: [LIST]
- New features needed: [LIST]

Please proceed step by step, verifying each change preserves the design system patterns.
```

### Add Feature Prompt

```
Add a new feature called [FEATURE_NAME] to this dashboard.

Requirements:
- [REQUIREMENT 1]
- [REQUIREMENT 2]

Follow the existing patterns:
1. Create feature directory at src/features/[feature-name]/
2. Add components, hooks, utils inside the feature directory
3. Create route at src/app/dashboard/[feature-name]/
4. Add navigation to app-sidebar.tsx
5. Use existing UI components from @/components/ui/
6. Follow the semantic color system (bg-primary, not bg-blue-500)
7. Keep components as Server Components unless interactivity requires 'use client'

Do NOT:
- Create components in src/components/ for feature-specific UI
- Use hex or RGB colors
- Add unnecessary 'use client' directives
```

### Create New Reusable Component Prompt

```
Create a new [COMPONENT_TYPE] component for this dashboard.

Before creating:
1. Check if a similar component exists in src/components/ui/
2. Read 2-3 similar existing components to understand the patterns

The new component must follow these patterns exactly:

FILE STRUCTURE:
- Location: src/components/ui/[component-name].tsx
- Single file with all variants (no separate variant files)

CODE PATTERNS (copy from existing components):
- Use cn() for className merging
- Use cva() for variants if needed
- Use data-slot attribute for theme targeting
- Use semantic color tokens only (bg-primary, text-muted-foreground)
- Use elevation shadows (shadow-elevation-1, not shadow-md)
- Use CSS variables for spacing/sizing where appropriate
- Include proper TypeScript types
- Export as named export

EXAMPLE REFERENCE:
Look at src/components/ui/[SIMILAR_COMPONENT].tsx and match:
- Import structure
- Props interface pattern
- Variant definition style
- className composition approach
- Accessibility attributes

Component requirements:
- [REQUIREMENT 1]
- [REQUIREMENT 2]
```

### Create New Chart/Visualization Prompt

```
Create a new [CHART_TYPE] chart component for this dashboard.

Before creating:
1. Read src/features/overview/components/ for existing chart patterns
2. Check src/components/ui/chart.tsx for the chart wrapper patterns
3. Understand how recharts is integrated

The new chart must follow these patterns:

STRUCTURE:
- Location: src/features/[feature]/components/[chart-name].tsx (if feature-specific)
- Or: src/components/ui/charts/[chart-name].tsx (if reusable)

PATTERNS TO MATCH:
- Use the existing ChartContainer, ChartTooltip, ChartLegend wrappers
- Use semantic chart colors: var(--chart-1) through var(--chart-5)
- Match the card wrapper pattern from existing charts
- Include loading/skeleton state matching existing patterns
- Use the same responsive approach

COLOR USAGE:
- ONLY use: chart-1, chart-2, chart-3, chart-4, chart-5 CSS variables
- For additional colors, extend in globals.css (OKLCH format only)
- Never hardcode colors in the component

Reference src/features/overview/components/bar-graph.tsx for the exact pattern.

Chart requirements:
- Data shape: [DESCRIBE DATA STRUCTURE]
- [REQUIREMENT 1]
- [REQUIREMENT 2]
```

### Theme Customization Prompt

```
Create a new theme preset called "[PRESET_NAME]" for this dashboard.

Design direction: [DESCRIBE THE AESTHETIC]

Requirements:
1. Create src/styles/presets/[preset-name].css
2. Define ALL required OKLCH variables for BOTH :root and .dark
3. Import in src/app/globals.css
4. Add to ThemePreset type in src/types/preferences/theme.ts
5. Add preset option to settings UI

The preset must include:
- All 20+ color variables (primary, secondary, muted, accent, destructive, etc.)
- All sidebar variables (7 variants)
- All chart colors (chart-1 through chart-5)
- Both light AND dark mode definitions

Use OKLCH format: oklch(L C H) where L=lightness, C=chroma, H=hue
```

### Rebrand Prompt

```
Rebrand this dashboard for [COMPANY_NAME].

Changes needed:
- Update company name in sidebar header
- Replace logo (I'll provide the SVG)
- Update page titles and metadata
- Adjust primary color to oklch([L] [C] [H])

Preserve:
- All theming architecture
- All layout functionality
- All existing features (unless specified to remove)
- Cookie-based preferences system
- View Transition animations

Do NOT:
- Change the OKLCH color format
- Modify the preference persistence system
- Restructure the provider hierarchy
- Add new dependencies for branding
```

### Remove Features Prompt

```
Remove the following features from this dashboard: [FEATURE_LIST]

For each feature:
1. Delete the feature directory from src/features/
2. Remove the route from src/app/dashboard/
3. Remove navigation items from app-sidebar.tsx
4. Remove from kbar commands if present
5. Clean up any orphaned imports

Do NOT:
- Delete shared UI components in src/components/ui/
- Remove the theming system
- Delete layout components
- Remove the preferences store
```

### Verification Checklist

After any adaptation, verify:
```
[ ] pnpm build succeeds with no TypeScript errors
[ ] Light/dark toggle animates correctly
[ ] Theme preset switching has no flicker
[ ] Preferences persist across page refresh
[ ] All layouts (sidebar variants) work correctly
[ ] No hex/RGB colors in the codebase
[ ] No localStorage usage for preferences
[ ] Feature components are in src/features/, not src/components/
[ ] All imports use @/ path alias
```
