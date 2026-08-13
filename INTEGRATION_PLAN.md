# Dashboard Integration Plan

## Executive Summary

After auditing 13 external dashboard projects and the current nexus-dashboard, **I recommend keeping nexus-dashboard as the foundation** and selectively integrating components/features from the external sources.

### Why Keep Nexus-Dashboard as Base?

| Factor                     | Nexus-Dashboard                                   | shadcn-admin      | circle            |
| -------------------------- | ------------------------------------------------- | ----------------- | ----------------- |
| **Theming System**         | Dual-layer (View Transitions + OKLCH presets)     | Basic next-themes | Basic next-themes |
| **Color System**           | OKLCH (perceptually uniform, 8 presets)           | Standard HSL      | Standard HSL      |
| **Theme Animation**        | Circular reveal via View Transitions API          | Instant swap      | Instant swap      |
| **Layout Variants**        | 6 configurable options (sidebar, navbar, content) | Fixed layout      | Fixed layout      |
| **Preference Persistence** | Server-side cookies + Zustand                     | localStorage only | Zustand only      |

The theming system in nexus-dashboard is significantly more sophisticated and would require substantial effort to replicate in another base. Moving the other direction (components → nexus-dashboard) is much easier.

---

## Source Projects Overview

### Full Dashboards

| Project          | Unique Value                                                                    | Priority to Integrate |
| ---------------- | ------------------------------------------------------------------------------- | --------------------- |
| **shadcn-admin** | AI Chat, Discord Clone, Mail Client, Calendar, Multiple Auth Flows, Error Pages | **HIGH**              |
| **circle**       | Linear-style Issue Tracking, Multi-store Zustand, Team/Project Management       | **MEDIUM-HIGH**       |

### Component Libraries

| Project                         | Component Type                            | Priority                      |
| ------------------------------- | ----------------------------------------- | ----------------------------- |
| **shadcn-map / next-maps**      | Map components with Mapbox GL             | **MEDIUM**                    |
| **shadcn-cal-com**              | React Aria calendar (accessibility-first) | **MEDIUM**                    |
| **shadcn-timeline**             | Timeline with Storybook tests             | **MEDIUM**                    |
| **shadcn-ui-tree-view**         | Tree with checkboxes/context menu         | **HIGH**                      |
| **shadcn-address-autocomplete** | Address lookup + phone validation         | **LOW**                       |
| **shadcn-cookie-consent**       | GDPR compliance                           | **LOW**                       |
| **shadcn-tour**                 | Product onboarding                        | **MEDIUM**                    |
| **clerk-shadcn-theme**          | Clerk theming styles                      | **HIGH** (when enabling auth) |

---

## Phase 1: Foundation & High-Priority Features

### 1.1 AI Chat System (from shadcn-admin)

**Source**: `shadcn-admin/src/features/ai-chat/`
**Priority**: HIGH
**Effort**: Large (3-5 days)

**Components to Bring**:

```
ai-chat/
├── components/
│   ├── ai-chat.tsx              # Main chat container
│   ├── artifact.tsx             # Code/content artifacts
│   ├── chain-of-thought.tsx     # Reasoning visualization
│   ├── code-block.tsx           # Syntax highlighted code
│   ├── connection.tsx           # Connection status
│   ├── context.tsx              # Chat context provider
│   ├── markdown.tsx             # Markdown rendering
│   ├── message.tsx              # Chat message bubble
│   ├── model-selector.tsx       # AI model picker
│   ├── panel.tsx                # Chat panel
│   ├── prompt-input.tsx         # Message input with suggestions
│   ├── reasoning.tsx            # Step-by-step reasoning
│   ├── suggestion.tsx           # Quick prompts
│   ├── toolbar.tsx              # Chat actions
│   └── web-preview.tsx          # URL preview cards
└── utils/
    └── [any helper functions]
```

**Dependencies to Add**:

```json
{
  "@ai-sdk/google": "^1.x",
  "@ai-sdk/react": "^1.x",
  "ai": "^4.x"
}
```

**Theme Adaptation Required**:

- Replace all hardcoded colors with CSS variables
- Use `bg-background`, `text-foreground`, `bg-muted`, etc.
- Adapt shadows to theme preset system
- Ensure dark mode compatibility

**Route**: `/dashboard/ai-chat`

---

### 1.2 Mail Client (from shadcn-admin)

**Source**: `shadcn-admin/src/features/mail/` (if exists) or `shadcn-admin/src/app/(dashboard)/mail/`
**Priority**: HIGH
**Effort**: Medium (2-3 days)

**Components to Bring**:

```
mail/
├── components/
│   ├── mail-list.tsx            # Email list
│   ├── mail-detail.tsx          # Email reader
│   ├── mail-compose.tsx         # Compose dialog
│   ├── mail-sidebar.tsx         # Folders/labels
│   └── mail-search.tsx          # Search interface
```

**Theme Adaptation**:

- Ensure list items use `bg-muted/50` for hover states
- Use `border-border` for all dividers
- Apply `text-muted-foreground` for secondary text

**Route**: `/dashboard/mail`

---

### 1.3 Discord-Style Chat (from shadcn-admin)

**Source**: `shadcn-admin/src/features/discord/`
**Priority**: HIGH
**Effort**: Medium-Large (3-4 days)

**Components to Bring**:

```
discord/
├── components/
│   ├── server-list.tsx          # Server icons sidebar
│   ├── channel-list.tsx         # Channel navigation
│   ├── message-list.tsx         # Chat messages
│   ├── message-input.tsx        # Message composer
│   ├── member-list.tsx          # Online members
│   └── voice-channel.tsx        # Voice channel UI
```

**Route**: `/dashboard/chat` or `/dashboard/discord`

---

### 1.4 Tree View Component (from shadcn-ui-tree-view)

**Source**: `shadcn-ui-tree-view/`
**Priority**: HIGH
**Effort**: Small (1 day)

**Why High Priority**: Tree views are essential for:

- File managers
- Navigation hierarchies
- Organization structures
- Settings categories

**Components to Bring**:

```
components/ui/
├── tree-view.tsx                # Main tree component
├── tree-item.tsx                # Individual tree node
└── tree-checkbox.tsx            # Checkbox variant (if exists)
```

**Features**:

- Expandable/collapsible nodes
- Checkbox selection
- Context menu integration
- Keyboard navigation

**Usage in Existing Features**:

- Enhance `file-manager` with proper tree navigation
- Add to `kanban` for project hierarchy
- Use in settings for category organization

---

### 1.5 Error Pages (from shadcn-admin)

**Source**: `shadcn-admin/src/app/(errors)/`
**Priority**: HIGH
**Effort**: Small (0.5 days)

**Pages to Bring**:

```
app/
├── not-found.tsx                # 404 page (improve existing)
├── forbidden.tsx                # 403 page
├── unauthorized.tsx             # 401 page
├── internal-server-error.tsx    # 500 page
└── maintenance-error.tsx        # Maintenance mode
```

**Routes**:

- `/not-found` (already exists, enhance)
- `/forbidden`
- `/unauthorized`
- `/error`
- `/maintenance`

---

### 1.6 Authentication Flows (from shadcn-admin)

**Source**: `shadcn-admin/src/features/auth/` and `shadcn-admin/src/app/(auth)/`
**Priority**: HIGH
**Effort**: Medium (2-3 days)

**Components to Bring**:

```
features/auth/
├── components/
│   ├── sign-in-form.tsx         # Login form
│   ├── sign-up-form.tsx         # Registration form
│   ├── forgot-password.tsx      # Password reset
│   ├── otp-verification.tsx     # OTP input
│   └── social-auth.tsx          # OAuth buttons
```

**Auth Page Variants** (choose 2):

- `sign-in-1.tsx` - Classic form
- `sign-in-2.tsx` - Split layout with image

**Theme Adaptation**:

- Use existing form components
- Apply theme colors to auth layouts
- Integrate with Clerk (when enabled) using `clerk-shadcn-theme`

---

## Phase 2: Issue Tracking System (from circle)

### 2.1 Issue Management

**Source**: `circle/src/components/common/issues/`
**Priority**: MEDIUM-HIGH
**Effort**: Large (4-5 days)

**Components to Bring**:

```
features/issues/
├── components/
│   ├── issue-list.tsx           # Main issues view
│   ├── issue-line.tsx           # Single issue row
│   ├── issue-card.tsx           # Issue card variant
│   ├── issue-detail.tsx         # Issue detail panel
│   ├── issue-form.tsx           # Create/edit issue
│   ├── priority-selector.tsx    # Priority picker
│   ├── status-selector.tsx      # Status picker
│   ├── assignee-selector.tsx    # User assignment
│   ├── label-selector.tsx       # Label management
│   └── issue-filters.tsx        # Filter toolbar
├── stores/
│   ├── issues-store.ts          # Issue data
│   └── filter-store.ts          # Filter state
└── types/
    └── issue.ts                 # Issue types
```

**Store Pattern to Adopt** (from circle):

```typescript
// Zustand store with proper typing
interface IssuesState {
  issues: Issue[];
  selectedIssue: Issue | null;
  addIssue: (issue: Issue) => void;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  deleteIssue: (id: string) => void;
}
```

**Route**: `/dashboard/issues`

---

### 2.2 Project Management

**Source**: `circle/src/components/common/projects/`
**Priority**: MEDIUM
**Effort**: Medium (2-3 days)

**Components to Bring**:

```
features/projects/
├── components/
│   ├── project-list.tsx         # Project grid/list
│   ├── project-card.tsx         # Project card
│   ├── project-form.tsx         # Create project
│   ├── project-health.tsx       # Health indicators
│   └── project-members.tsx      # Team assignment
```

**Route**: `/dashboard/projects`

---

### 2.3 Team Management

**Source**: `circle/src/components/common/teams/` and `members/`
**Priority**: MEDIUM
**Effort**: Medium (2 days)

**Components**:

```
features/teams/
├── components/
│   ├── team-list.tsx
│   ├── team-card.tsx
│   ├── member-list.tsx
│   ├── member-avatar-group.tsx
│   └── invite-member.tsx
```

**Route**: `/dashboard/teams`

---

## Phase 3: Calendar & Scheduling (from shadcn-cal-com)

### 3.1 Enhanced Calendar

**Source**: `shadcn-cal-com/`
**Priority**: MEDIUM
**Effort**: Medium (2 days)

**Why**: The existing calendar in nexus-dashboard uses FullCalendar. The shadcn-cal-com version uses React Aria for better accessibility.

**Components to Evaluate**:

```
components/ui/
├── calendar-aria.tsx            # Accessible calendar
├── date-picker-aria.tsx         # Accessible date picker
└── time-picker.tsx              # Time selection
```

**Recommendation**: Keep FullCalendar for the full calendar view, but adopt React Aria components for date/time pickers in forms.

---

## Phase 4: Additional Components

### 4.1 Timeline Component (from shadcn-timeline)

**Source**: `shadcn-timeline/`
**Priority**: MEDIUM
**Effort**: Small (1 day)

**Components**:

```
components/ui/
├── timeline.tsx                 # Main timeline
├── timeline-item.tsx            # Timeline entry
└── timeline-connector.tsx       # Line between items
```

**Use Cases**:

- Activity feeds
- Version history
- Event logs
- Order tracking

---

### 4.2 Product Tour (from shadcn-tour)

**Source**: `shadcn-tour/`
**Priority**: MEDIUM
**Effort**: Small (1 day)

**Components**:

```
components/ui/
├── tour.tsx                     # Tour controller
├── tour-step.tsx                # Individual step
└── tour-tooltip.tsx             # Step tooltip
```

**Use Case**: Onboarding new users to the dashboard

---

### 4.3 Map Components (from shadcn-map / next-maps)

**Source**: `shadcn-map/` and `next-maps/`
**Priority**: MEDIUM (if geolocation needed)
**Effort**: Medium (2 days)

**Components**:

```
components/ui/
├── map.tsx                      # Mapbox wrapper
├── map-marker.tsx               # Location marker
├── map-popup.tsx                # Info popup
└── map-controls.tsx             # Zoom/pan controls
```

**Dependencies**:

```json
{
  "mapbox-gl": "^3.x",
  "react-map-gl": "^7.x"
}
```

**Route**: `/dashboard/maps` (showcase)

---

### 4.4 Cookie Consent (from shadcn-cookie-consent)

**Source**: `shadcn-cookie-consent/`
**Priority**: LOW (implement when needed for GDPR)
**Effort**: Small (0.5 days)

**Components**:

```
components/
├── cookie-consent.tsx           # Consent banner
└── cookie-settings.tsx          # Preference modal
```

---

### 4.5 Address Autocomplete (from shadcn-address-autocomplete)

**Source**: `shadcn-address-autocomplete/`
**Priority**: LOW (implement when needed)
**Effort**: Small (0.5 days)

**Components**:

```
components/ui/
├── address-autocomplete.tsx     # Address lookup
└── phone-input.tsx              # International phone
```

**Dependencies**:

```json
{
  "libphonenumber-js": "^1.x"
}
```

---

## Phase 5: Enhanced Existing Features

### 5.1 Dashboard Variants

**Source**: `shadcn-admin/src/app/(dashboard)/dashboard/` and `dashboard2/`
**Priority**: MEDIUM
**Effort**: Medium (2 days)

**What to Bring**:

- Alternative chart layouts
- Selection cards for KPI highlights
- Interactive area chart component
- Widget-based dashboard builder concept

**Route**: Keep existing `/dashboard/overview`, add `/dashboard/analytics`

---

### 5.2 Settings Pages (from shadcn-admin)

**Source**: `shadcn-admin/src/app/(dashboard)/settings/`
**Priority**: HIGH
**Effort**: Medium (2 days)

**Pages to Bring**:

```
app/dashboard/settings/
├── page.tsx                     # Settings redirect
├── profile/page.tsx             # Profile settings
├── account/page.tsx             # Account settings
├── appearance/page.tsx          # Appearance (integrate with existing theme system)
├── display/page.tsx             # Display preferences
└── notifications/page.tsx       # Notification preferences
```

**Integration Note**: The `appearance/page.tsx` should integrate with the existing theme preferences system, not replace it.

---

### 5.3 Help Center / Support

**Source**: `shadcn-admin/src/app/(dashboard)/help-center/`
**Priority**: LOW
**Effort**: Small (1 day)

**Components**:

- FAQ section
- Contact form
- Knowledge base structure

---

### 5.4 Pricing Pages (from shadcn-admin)

**Source**: `shadcn-admin/src/app/(dashboard)/pricing/`
**Priority**: LOW
**Effort**: Small (1 day)

**Variants**:

- Column pricing (side by side)
- Single product pricing
- Table comparison pricing

**Route**: `/dashboard/pricing` or use for public landing pages

---

## Phase 0: Theme System Enhancement (PRIORITY)

### Design Philosophy: Modular Theme Laboratory

The enhanced theme system should be designed as a **"Theme Laboratory"** - a development/experimentation tool that can be completely disabled for production dashboards.

```
┌─────────────────────────────────────────────────────────────────┐
│                     THEME SYSTEM ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              CORE THEME LAYER (Always Active)             │   │
│  │  • CSS Variables (OKLCH colors)                          │   │
│  │  • Light/Dark mode toggle                                │   │
│  │  • Basic preset selection (stored in cookies)            │   │
│  │  • Layout preferences (sidebar, navbar, content)         │   │
│  │  • View Transition animations                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              │ THEME_LAB_ENABLED=true            │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           THEME LABORATORY (Optional Module)              │   │
│  │  • 53+ theme presets (Shadcn + Tweakcn)                  │   │
│  │  • Color picker for brand customization                  │   │
│  │  • Theme import/export (JSON)                            │   │
│  │  • Random theme generator                                │   │
│  │  • Visual layout previews                                │   │
│  │  • Font selection                                        │   │
│  │  • Advanced customization link                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Enabling/Disabling the Theme Laboratory

**Environment Variable**:

```bash
# .env.local (development - enabled)
NEXT_PUBLIC_THEME_LAB_ENABLED=true

# .env.production (production - disabled)
NEXT_PUBLIC_THEME_LAB_ENABLED=false
```

**Usage in Code**:

```typescript
// src/config/features.ts
export const FEATURES = {
  THEME_LAB: process.env.NEXT_PUBLIC_THEME_LAB_ENABLED === 'true',
} as const;

// In components
import { FEATURES } from '@/config/features';

{FEATURES.THEME_LAB && <ThemeLaboratory />}
```

**When Disabled**:

- No floating settings button appears
- No theme customizer sheet
- Dashboard uses the default/configured preset from cookies
- Core theme system (light/dark, basic presets) still works
- Zero additional JS bundle for theme lab components

---

### Current State Comparison

| Feature                  | Nexus-Dashboard | Shadcn-Admin                    |
| ------------------------ | --------------- | ------------------------------- |
| **Color Presets**        | 8               | **53** (13 Shadcn + 40 Tweakcn) |
| **Color Space**          | OKLCH           | OKLCH + HEX                     |
| **Animated Transitions** | Circular reveal | Circular reveal                 |
| **Layout Options**       | 6               | 6 (with visual previews)        |
| **Theme Import/Export**  | No              | **Yes** (JSON)                  |
| **Font Selection**       | No              | **Yes** (per preset)            |
| **Sidebar Theming**      | Basic           | **Extended**                    |
| **Color Picker**         | No              | **Yes** (8 brand colors)        |
| **Random Theme Button**  | No              | **Yes**                         |

### What to Bring from shadcn-admin Theme System

#### 0.1 Theme Customizer Component Enhancement

**Source**: `shadcn-admin/components/theme-customizer/`

**Files to Adapt**:

```
theme-customizer/
├── index.tsx                    # Main sheet (230 lines)
├── theme-tab.tsx                # Theme selection UI (385 lines)
├── layout-tab.tsx               # Layout options (252 lines)
├── circular-transition.css      # Animation (already similar)
└── import-modal.tsx             # JSON import dialog
```

**Key Features to Add**:

1. **Dual preset dropdown** - Shadcn presets + Tweakcn presets
2. **Color swatch previews** - Show 4-color preview in dropdown
3. **Random theme button** - Quick discovery of new themes
4. **Brand Colors accordion** - 8 customizable base colors
5. **Theme import modal** - Paste JSON to create custom themes
6. **Visual layout previews** - Show mini sidebar previews

---

#### 0.2 Tweakcn Theme Presets (40 presets to add)

**Source**: `shadcn-admin/utils/tweakcn-theme-presets.ts`

**High-Priority Presets** (most valuable to add):

| Preset              | Style                  | Why Add It            |
| ------------------- | ---------------------- | --------------------- |
| **Claude**          | Anthropic brand        | AI-focused apps       |
| **Vercel**          | Clean, minimal         | Developer tools       |
| **Supabase**        | Green, professional    | Database/backend apps |
| **Twitter**         | Blue, social           | Social features       |
| **Catppuccin**      | Community favorite     | Developer popularity  |
| **Cyberpunk**       | Neon, bold             | Gaming/creative apps  |
| **Neo Brutalism**   | Raw, minimal           | Design-forward apps   |
| **Elegant Luxury**  | Premium, sophisticated | Enterprise apps       |
| **Claymorphism**    | Soft, modern           | Consumer apps         |
| **Northern Lights** | Cool, aurora           | Dashboard aesthetics  |
| **Vintage Paper**   | Warm, nostalgic        | Content apps          |
| **Retro Arcade**    | 80s bold               | Fun/gaming apps       |
| **Modern Minimal**  | Clean, blue            | General SaaS          |
| **Mocha Mousse**    | Warm brown             | Cozy aesthetics       |
| **Pastel Dreams**   | Soft colors            | Friendly apps         |

**Color Format**: These use HEX colors, will need OKLCH conversion for consistency or keep as HEX variant.

---

#### 0.3 Additional Shadcn UI Presets (5 new)

**Source**: `shadcn-admin/utils/shadcnui-theme-presets.ts`

Currently nexus-dashboard has: default, blue, green, amber, brutalist, tangerine, soft-pop, mono

**New OKLCH presets to add**:

- **Red** - Tailwind red tones
- **Rose** - Tailwind rose tones
- **Orange** - Tailwind orange tones
- **Yellow** - Tailwind yellow tones
- **Violet** - Tailwind violet tones
- **Purple** - Tailwind purple tones
- **Teal** - Tailwind teal tones

---

#### 0.4 Theme Manager Hook

**Source**: `shadcn-admin/hooks/use-theme-manager.ts`

**Functions to add**:

```typescript
interface ThemeManager {
  // Existing in nexus
  isDarkMode: boolean;

  // NEW: Apply curated presets
  applyTweakcnTheme: (preset: TweakcnPreset, isDarkMode: boolean) => void;

  // NEW: Import custom JSON themes
  applyImportedTheme: (themeData: ThemeJSON, isDarkMode: boolean) => void;

  // NEW: Individual color customization
  handleColorChange: (cssVar: string, value: string) => void;

  // NEW: Track custom brand colors
  brandColorsValues: Record<string, string>;
  setBrandColorsValues: (colors: Record<string, string>) => void;

  // NEW: Full reset to defaults
  resetTheme: () => void;
}
```

---

#### 0.5 Extended CSS Variables

**Add to globals.css** for full Tweakcn compatibility:

```css
:root {
  /* Existing variables... */

  /* NEW: Extended sidebar theming */
  --sidebar: var(--background);
  --sidebar-foreground: var(--foreground);
  --sidebar-primary: var(--primary);
  --sidebar-primary-foreground: var(--primary-foreground);
  --sidebar-accent: var(--accent);
  --sidebar-accent-foreground: var(--accent-foreground);
  --sidebar-border: var(--border);
  --sidebar-ring: var(--ring);

  /* NEW: Font customization */
  --font-sans: 'Inter, sans-serif';
  --font-serif: 'Georgia, serif';
  --font-mono: 'JetBrains Mono, monospace';

  /* NEW: Shadow customization (for Tweakcn presets) */
  --shadow-color: 0 0% 0%;
  --shadow-opacity: 0.1;
  --shadow-blur: 10px;
  --shadow-spread: 0px;

  /* NEW: Additional status colors */
  --warning: oklch(0.75 0.15 80);
  --warning-foreground: oklch(0.2 0 0);
  --success: oklch(0.7 0.2 145);
  --success-foreground: oklch(0.2 0 0);
  --info: oklch(0.6 0.15 250);
  --info-foreground: oklch(0.98 0 0);
}
```

---

#### 0.6 Import Theme Modal

**New Component**: `src/components/settings/import-theme-modal.tsx`

```typescript
interface ImportThemeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (themeData: ThemeJSON) => void;
}

// Allows users to paste JSON like:
{
  "name": "My Custom Theme",
  "styles": {
    "light": {
      "--background": "#ffffff",
      "--foreground": "#1a1a1a",
      "--primary": "#6366f1"
    },
    "dark": {
      "--background": "#0a0a0a",
      "--foreground": "#fafafa",
      "--primary": "#818cf8"
    }
  }
}
```

---

### Modular File Structure

```
src/
├── config/
│   └── features.ts                    # Feature flags (THEME_LAB, etc.)
│
├── lib/
│   ├── theme-utils.ts                 # CORE: Basic theme switching (keep)
│   └── theme-lab/                     # OPTIONAL: Theme laboratory utilities
│       ├── index.ts                   # Barrel export with feature check
│       ├── theme-manager.ts           # Extended theme management hook
│       ├── preset-registry.ts         # All 53+ presets registered here
│       ├── color-converter.ts         # HEX ↔ OKLCH conversion
│       └── theme-export.ts            # Export theme as CSS/JSON
│
├── components/
│   ├── settings/
│   │   └── layout-controls.tsx        # CORE: Basic light/dark + preset picker
│   │
│   └── theme-lab/                     # OPTIONAL: Full theme laboratory
│       ├── index.tsx                  # Main ThemeLaboratory component
│       ├── theme-lab-trigger.tsx      # Floating button (conditionally rendered)
│       ├── theme-tab.tsx              # Theme selection panel
│       ├── layout-tab.tsx             # Layout options with previews
│       ├── brand-colors.tsx           # Color picker accordion
│       ├── import-modal.tsx           # JSON import dialog
│       ├── preset-dropdown.tsx        # Dropdown with color swatches
│       ├── preset-swatch.tsx          # 4-color preview component
│       └── random-theme-button.tsx    # Random preset picker
│
├── styles/
│   ├── presets/                       # CORE: Base presets (always bundled)
│   │   ├── default.css
│   │   ├── brutalist.css
│   │   ├── tangerine.css
│   │   └── soft-pop.css
│   │
│   └── theme-lab-presets/             # OPTIONAL: Extended presets (lazy loaded)
│       ├── shadcn/                    # Shadcn UI presets (OKLCH)
│       │   ├── red.css
│       │   ├── rose.css
│       │   ├── orange.css
│       │   └── ... (7 more)
│       │
│       └── tweakcn/                   # Tweakcn presets (HEX)
│           ├── claude.css
│           ├── vercel.css
│           ├── supabase.css
│           ├── cyberpunk.css
│           └── ... (36 more)
│
└── types/
    └── preferences/
        ├── theme.ts                   # CORE: ThemeMode, basic ThemePreset
        └── theme-lab.ts               # OPTIONAL: Extended preset types
```

---

### Dynamic Import Strategy

Theme lab components use dynamic imports to avoid bundling when disabled:

```typescript
// src/components/theme-lab/index.tsx
'use client';

import dynamic from 'next/dynamic';
import { FEATURES } from '@/config/features';

// Only load if theme lab is enabled
const ThemeLaboratorySheet = dynamic(
  () => import('./theme-lab-sheet'),
  { ssr: false }
);

export function ThemeLaboratory() {
  if (!FEATURES.THEME_LAB) return null;
  return <ThemeLaboratorySheet />;
}

// Trigger button (floating)
export function ThemeLabTrigger() {
  if (!FEATURES.THEME_LAB) return null;
  return <ThemeLabTriggerButton />;
}
```

**Bundle Impact**:

- When `THEME_LAB_ENABLED=false`: 0 KB added
- When `THEME_LAB_ENABLED=true`: ~50-80 KB (lazy loaded on demand)

---

### Production Workflow: "Baking In" a Theme

When creating a new dashboard from this base:

**Step 1: Experiment with Theme Lab**

```bash
# Enable theme lab during development
NEXT_PUBLIC_THEME_LAB_ENABLED=true pnpm dev
```

**Step 2: Find/Create Your Theme**

- Browse 53+ presets
- Customize brand colors
- Adjust layout preferences
- Export theme as JSON/CSS

**Step 3: Bake the Theme**

```typescript
// Option A: Set via environment variables
// .env.production
NEXT_PUBLIC_THEME_LAB_ENABLED = false;
NEXT_PUBLIC_DEFAULT_THEME_PRESET = vercel;
NEXT_PUBLIC_DEFAULT_THEME_MODE = dark;

// Option B: Hardcode in config (for complete removal)
// src/config/theme.ts
export const PRODUCTION_THEME = {
  preset: 'vercel',
  mode: 'dark',
  // Can include full CSS variable overrides
  overrides: {
    '--primary': 'oklch(0.7 0.15 250)'
  }
} as const;
```

**Step 4: Remove Theme Lab from Production**

```bash
# Production build - theme lab code tree-shaken
NEXT_PUBLIC_THEME_LAB_ENABLED=false pnpm build
```

---

### Core vs Lab Feature Split

| Feature                         | Core (Always) | Lab (Optional) |
| ------------------------------- | ------------- | -------------- |
| Light/Dark toggle               | ✅            | -              |
| Basic preset picker (8 presets) | ✅            | -              |
| Cookie persistence              | ✅            | -              |
| View Transitions animation      | ✅            | -              |
| Sidebar variant                 | ✅            | -              |
| Navbar style                    | ✅            | -              |
| Content layout                  | ✅            | -              |
| 53+ preset browser              | -             | ✅             |
| Color picker                    | -             | ✅             |
| Theme import/export             | -             | ✅             |
| Random theme                    | -             | ✅             |
| Font selection                  | -             | ✅             |
| Visual layout previews          | -             | ✅             |
| Tweakcn link                    | -             | ✅             |

---

### Theme System Implementation Order

**Sprint 0.1** (Day 1): Foundation & Feature Flags

- [ ] Create `src/config/features.ts` with THEME_LAB flag
- [ ] Add `NEXT_PUBLIC_THEME_LAB_ENABLED` to .env files
- [ ] Add extended CSS variables to globals.css (sidebar, fonts, shadows)
- [ ] Update TypeScript types for new presets
- [ ] Create theme-lab directory structure

**Sprint 0.2** (Day 2): Core Preset Expansion

- [ ] Add 7 new OKLCH presets (red, rose, orange, yellow, violet, purple, teal)
- [ ] Create preset CSS files in `src/styles/presets/`
- [ ] Update basic preset dropdown in existing settings
- [ ] These become part of CORE (always available)

**Sprint 0.3** (Day 3-4): Theme Laboratory Module

- [ ] Create `src/components/theme-lab/` directory
- [ ] Port theme-tab.tsx with dual dropdowns
- [ ] Port layout-tab.tsx with visual previews
- [ ] Add dynamic imports for tree-shaking
- [ ] Test feature flag enable/disable

**Sprint 0.4** (Day 5): Tweakcn Presets & Advanced Features

- [ ] Port 15 high-priority Tweakcn presets to `src/styles/theme-lab-presets/`
- [ ] Add Brand Colors accordion with color picker
- [ ] Add Import Theme modal
- [ ] Add Random Theme button
- [ ] Add preset search/filter

**Sprint 0.5** (Day 6): Polish & Documentation

- [ ] Ensure all presets work in light/dark mode
- [ ] Test theme baking workflow
- [ ] Verify bundle size when disabled
- [ ] Document the modular architecture
- [ ] Create "bake theme" helper script

---

## Theme Adaptation Guidelines

### Color Mapping Rules

When adapting components, replace hardcoded colors with CSS variables:

```typescript
// BEFORE (hardcoded)
className = 'bg-gray-100 text-gray-900 border-gray-200';

// AFTER (theme-aware)
className = 'bg-muted text-foreground border-border';
```

### Color Variable Cheat Sheet

| Use Case         | CSS Variable    | Tailwind Class                               |
| ---------------- | --------------- | -------------------------------------------- |
| Page background  | `--background`  | `bg-background`                              |
| Main text        | `--foreground`  | `text-foreground`                            |
| Primary action   | `--primary`     | `bg-primary text-primary-foreground`         |
| Secondary action | `--secondary`   | `bg-secondary text-secondary-foreground`     |
| Muted content    | `--muted`       | `bg-muted text-muted-foreground`             |
| Accent highlight | `--accent`      | `bg-accent text-accent-foreground`           |
| Destructive      | `--destructive` | `bg-destructive text-destructive-foreground` |
| Borders          | `--border`      | `border-border`                              |
| Inputs           | `--input`       | `bg-input`                                   |
| Cards            | `--card`        | `bg-card text-card-foreground`               |
| Popovers         | `--popover`     | `bg-popover text-popover-foreground`         |

### Shadow Adaptation

Replace hardcoded shadows with theme-aware variants:

```typescript
// Use theme shadows that change per preset
className = 'shadow-sm'; // Adapts to brutalist (sharp) vs soft-pop (blurred)
```

### Animation Considerations

Components with animations should:

1. Respect `prefers-reduced-motion`
2. Use `motion` library (already installed)
3. Keep animations subtle and purposeful

```typescript
import { motion } from 'motion/react';

// Wrap animated elements
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.2 }}
>
```

---

## Dependency Additions Summary

### High Priority (Phase 1)

```json
{
  "@ai-sdk/google": "^1.x",
  "@ai-sdk/react": "^1.x",
  "ai": "^4.x"
}
```

### Medium Priority (Phase 2-3)

```json
{
  "@kayron013/lexorank": "^1.x", // For issue ordering
  "react-dnd": "^16.x", // Alternative drag-drop (if needed)
  "react-dnd-html5-backend": "^16.x"
}
```

### Low Priority (Phase 4-5)

```json
{
  "mapbox-gl": "^3.x",
  "react-map-gl": "^7.x",
  "libphonenumber-js": "^1.x"
}
```

---

## File Structure After Integration

```
src/features/
├── overview/          # Existing - enhanced with more widgets
├── products/          # Existing
├── kanban/            # Existing
├── calendar/          # Existing - enhanced with aria pickers
├── crm/               # Existing - enhance
├── finance/           # Existing - enhance
├── inbox/             # Existing - enhance with mail features
├── file-manager/      # Existing - enhance with tree view
├── profile/           # Existing
├── auth/              # Existing - enhance with more flows
├── forms-showcase/    # Existing
├── dashboard/         # Existing
├── ai-chat/           # NEW from shadcn-admin
├── chat/              # NEW - Discord-style from shadcn-admin
├── issues/            # NEW from circle
├── projects/          # NEW from circle
├── teams/             # NEW from circle
└── settings/          # NEW - expanded settings pages

src/components/ui/
├── [existing 70+ components]
├── tree-view.tsx      # NEW
├── timeline.tsx       # NEW (enhance existing)
├── tour.tsx           # NEW
├── map.tsx            # NEW (optional)
├── cookie-consent.tsx # NEW (when needed)
└── address-input.tsx  # NEW (when needed)

src/app/
├── dashboard/
│   ├── ai-chat/       # NEW
│   ├── chat/          # NEW
│   ├── issues/        # NEW
│   ├── projects/      # NEW
│   ├── teams/         # NEW
│   ├── settings/      # EXPAND
│   ├── maps/          # NEW (optional)
│   └── [existing routes]
├── (auth)/            # NEW - dedicated auth layout
│   ├── sign-in/
│   ├── sign-up/
│   └── reset-password/
└── (errors)/          # NEW - error pages
    ├── forbidden/
    ├── unauthorized/
    └── maintenance/
```

---

## Implementation Order Recommendation

### Sprint 1 (Week 1-2): Core Enhancements

1. Error pages (HIGH impact, LOW effort)
2. Tree view component (HIGH impact, LOW effort)
3. Timeline component enhancement (MEDIUM impact, LOW effort)
4. Settings pages expansion (HIGH impact, MEDIUM effort)

### Sprint 2 (Week 3-4): AI & Communication

1. AI Chat system (HIGH impact, LARGE effort)
2. Mail client enhancement (HIGH impact, MEDIUM effort)
3. Discord-style chat (MEDIUM impact, MEDIUM effort)

### Sprint 3 (Week 5-6): Project Management

1. Issue tracking system (HIGH impact, LARGE effort)
2. Project management (MEDIUM impact, MEDIUM effort)
3. Team management (MEDIUM impact, MEDIUM effort)

### Sprint 4 (Week 7-8): Polish & Extras

1. Product tour component (MEDIUM impact, LOW effort)
2. Authentication flows (HIGH impact, MEDIUM effort)
3. Dashboard variants (MEDIUM impact, MEDIUM effort)
4. Map components (LOW impact, MEDIUM effort) - if needed

### Ongoing

- Cookie consent (implement when GDPR compliance needed)
- Address autocomplete (implement when location features needed)
- Help center (implement when support features needed)

---

## Quality Gates

Before merging any integrated component:

### Code Quality

- [ ] No TypeScript errors
- [ ] No Biome lint warnings
- [ ] Biome formatting applied
- [ ] No hardcoded colors (use CSS variables)
- [ ] No `any` types

### Theme Compatibility

- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Works with all 8 theme presets
- [ ] Respects layout preferences (sidebar variant, navbar style)

### Accessibility

- [ ] Keyboard navigation works
- [ ] ARIA labels present
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA

### Responsive Design

- [ ] Works on mobile (< 640px)
- [ ] Works on tablet (640px - 1024px)
- [ ] Works on desktop (> 1024px)

### Integration

- [ ] Added to navigation (if page)
- [ ] Added to kbar commands (if page)
- [ ] Uses existing layout system
- [ ] Uses existing form components
- [ ] Uses existing data table patterns (if applicable)

---

## Notes

### What NOT to Bring

1. **Drizzle ORM setup** (from shadcn-admin) - Nexus uses TanStack Query + server actions
2. **Better Auth** (from shadcn-admin) - Nexus uses Clerk (when enabled)
3. **Duplicate base shadcn components** - Only bring custom/enhanced versions
4. **Different state management patterns** - Stick with existing Zustand patterns

### Theming Wins from Nexus-Dashboard

The following are already better in nexus-dashboard and should be preserved:

1. View Transitions API for theme switching
2. OKLCH color system
3. 8 theme presets with consistent design
4. Server-side preference persistence
5. Layout variant system (6 options)
6. Zero-flicker switching technique

### Documentation Updates Required

After each phase:

1. Update CLAUDE.md with new features
2. Update sidebar navigation documentation
3. Add new routes to kbar commands
4. Document any new stores or hooks
