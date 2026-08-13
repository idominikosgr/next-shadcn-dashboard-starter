# 🎨 Nexus Dashboard - Modern SaaS Design System

A production-ready, unified design system combining the best features from multiple dashboard implementations, built with Next.js 16, Shadcn UI, and Tailwind CSS 4.

<div align="center">

**Built for developers creating modern SaaS applications**

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com)

</div>

---

## ✨ Unique Features

This unified dashboard combines the best features from two carefully selected dashboard implementations:

### 🎭 Advanced Theme System

- **✨ View Transition API Animation** - Circular reveal effect when switching light/dark modes
- **⚡ Zero-Flicker Preset Switching** - Instant theme changes without visual artifacts
- **🌈 4 Beautiful Theme Presets** - Default, Brutalist, Tangerine, Soft Pop
- **🎨 OKLCH Color Space** - Modern, perceptually uniform colors for better dark mode
- **🔄 Dual-Layer Theming** - Independent light/dark mode and color preset control

### ⚙️ On-the-Fly Customization

- **Settings Popover** with live preview - No page reload required!
- **Theme Preset Selector** with color swatches
- **3 Sidebar Variants**: Inset, Sidebar, Floating
- **2 Collapsible Modes**: Icon, OffCanvas
- **2 Content Layouts**: Centered, Full Width
- **2 Navbar Styles**: Sticky, Scroll
- **Cookie Persistence** - Settings saved across sessions

### 🚀 Premium Features

- **📊 Kanban Board** - Drag-and-drop task management with localStorage
- **📈 Advanced Data Tables** - Server-side search, filtering, pagination with Nuqs
- **⌨️ Command Palette** - kbar integration for Cmd+K navigation
- **🔐 Clerk Authentication** - Production-ready auth (currently mocked for demo)
- **📱 Fully Responsive** - Mobile-first with adaptive layouts
- **♿ Accessible** - ARIA labels, keyboard navigation, screen reader support
- **50+ Components** - Complete Shadcn UI library integrated

---

## 🚀 Quick Start

```bash
# Clone and navigate
cd nexus-dashboard

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your dashboard.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## 🎨 Theme Presets

### Default

- **Style**: Neutral grayscale
- **Use Case**: Corporate applications, professional tools
- **Border Radius**: 0.625rem
- **Shadows**: Subtle, soft

### Brutalist

- **Style**: Bold, high-contrast
- **Use Case**: Modern, edgy applications
- **Border Radius**: 0px (sharp corners)
- **Shadows**: Hard 4px offset shadows
- **Colors**: Orange primary (#FF6B35)

### Tangerine

- **Style**: Warm, organic
- **Use Case**: Friendly, approachable apps
- **Border Radius**: 0.625rem
- **Shadows**: Soft
- **Colors**: Orange tones (OKLCH 0.64 0.17 36.44°)

### Soft Pop

- **Style**: Playful, rounded
- **Use Case**: Creative, modern applications
- **Border Radius**: 1rem (large)
- **Shadows**: Minimal
- **Colors**: Purple primary

---

## 🎯 Architecture

### Merged Features Matrix

| Feature                    | Source      | Status        |
| -------------------------- | ----------- | ------------- |
| View Transition Animation  | Dashboard 1 | ✅ Integrated |
| Zero-Flicker Switching     | Dashboard 2 | ✅ Integrated |
| OKLCH Color System         | Dashboard 2 | ✅ Integrated |
| Theme Presets (4 variants) | Dashboard 2 | ✅ Integrated |
| Layout Controls UI         | Dashboard 2 | ✅ Integrated |
| Preferences Store          | Dashboard 2 | ✅ Integrated |
| kbar Command Palette       | Dashboard 1 | ✅ Integrated |
| Kanban Board               | Dashboard 1 | ✅ Integrated |
| Advanced Data Tables       | Dashboard 1 | ✅ Integrated |
| Clerk Authentication       | Dashboard 1 | ✅ Integrated |
| Feature-Based Structure    | Dashboard 1 | ✅ Integrated |
| 50+ Shadcn Components      | Dashboard 1 | ✅ Integrated |

### Project Structure

```
nexus-dashboard/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── overview/          # Analytics dashboard
│   │   │   ├── product/           # Product management
│   │   │   ├── kanban/            # Task board
│   │   │   └── profile/           # User profile
│   │   ├── globals.css            # Merged global styles + presets
│   │   ├── theme.css              # Theme variants
│   │   └── layout.tsx             # Root with providers
│   ├── components/
│   │   ├── ui/                    # 50+ Shadcn components
│   │   ├── layout/
│   │   │   ├── header.tsx         # Header with settings button
│   │   │   └── app-sidebar.tsx    # Collapsible sidebar
│   │   ├── settings/
│   │   │   └── layout-controls.tsx # **NEW** Settings popover
│   │   ├── forms/                 # Form component wrappers
│   │   └── kbar/                  # Command palette
│   ├── features/                  # Feature-based organization
│   │   ├── kanban/
│   │   ├── products/
│   │   └── overview/
│   ├── stores/
│   │   └── preferences/           # **NEW** Zustand preferences store
│   ├── lib/
│   │   ├── theme-utils.ts         # **NEW** Merged theme utilities
│   │   └── layout-utils.ts        # **NEW** Layout manipulation
│   ├── styles/
│   │   └── presets/               # **NEW** Theme CSS files
│   │       ├── brutalist.css
│   │       ├── tangerine.css
│   │       └── soft-pop.css
│   ├── types/
│   │   └── preferences/           # **NEW** Theme/layout types
│   └── server/
│       └── server-actions.ts      # **NEW** Cookie actions
└── package.json
```

---

## 🛠️ Tech Stack

**Core**

- Next.js 16 (App Router)
- React 19
- TypeScript 5.9
- Tailwind CSS 4.1

**UI & Components**

- Shadcn UI
- Radix UI
- Lucide React (icons)
- Motion.js (animations)
- Recharts (charts)

**State & Data**

- Zustand (preferences + Kanban)
- TanStack Table
- TanStack React Query
- React Hook Form + Zod
- Nuqs (type-safe URL params)

**Developer Tools**

- kbar (Command palette)
- Biome (linting + formatting)
- Husky (Git hooks)
- Sentry (Error tracking)

**Authentication**

- Clerk (currently mocked)

---

## 💡 Usage Examples

### Access Theme Settings

```typescript
import { usePreferencesStore } from '@/stores/preferences/preferences-provider';

function MyComponent() {
  const themeMode = usePreferencesStore((s) => s.themeMode);
  const themePreset = usePreferencesStore((s) => s.themePreset);

  return <div>Theme: {themeMode} | Preset: {themePreset}</div>;
}
```

### Programmatic Theme Control

```typescript
import {
  updateThemeModeWithAnimation,
  updateThemePreset
} from '@/lib/theme-utils';

// Animated light/dark toggle
function handleThemeToggle(event: MouseEvent) {
  const newMode = currentMode === 'light' ? 'dark' : 'light';
  updateThemeModeWithAnimation(newMode, event); // Circular reveal!
}

// Instant preset change
function handlePresetChange(preset: string) {
  updateThemePreset(preset); // Zero flicker!
}
```

### Layout Customization

```typescript
import { updateContentLayout, updateNavbarStyle } from '@/lib/layout-utils';

updateContentLayout('centered'); // or 'full-width'
updateNavbarStyle('sticky'); // or 'scroll'
```

---

## 📚 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Run production server
pnpm lint         # Run Biome checks
pnpm lint:fix     # Apply Biome fixes
pnpm format       # Format code with Biome
```

---

## 🎯 Roadmap

### ✅ Completed (v2.0)

- [x] Unified theme system with 4 presets
- [x] View Transition API animation
- [x] Zero-flicker preset switching
- [x] On-the-fly settings customization
- [x] Layout controls (sidebar, navbar, content)
- [x] Merged CSS with OKLCH colors
- [x] Preferences store with cookie persistence
- [x] Updated documentation

### 🚧 Planned (v2.1+)

- [ ] Port Dashboard 2's CRM dashboard
- [ ] Port Dashboard 2's Finance dashboard
- [ ] Add unique components (ButtonGroup, InputGroup, Field, Empty)
- [ ] Container query support
- [ ] Slot-based styling pattern
- [ ] More theme presets
- [ ] Storybook integration
- [ ] E2E tests with Playwright

---

## 📖 How It Works

### Theme Animation System

This dashboard implements a sophisticated **dual-animation** approach:

**1. View Transition API (Light/Dark Mode)**

```typescript
// Circular reveal from click coordinates
const transition = document.startViewTransition(() => {
  document.documentElement.classList.toggle('dark', value === 'dark');
});
```

- Captures click X/Y coordinates
- Calculates radius for full-screen reveal
- Animates with `clip-path: circle()`
- Defined in `globals.css`

**2. Zero-Flicker Technique (Preset Changes)**

```typescript
// Disable transitions → change → re-enable
doc.classList.add('disable-transitions');
doc.classList.toggle('dark', value === 'dark');
requestAnimationFrame(() => {
  doc.classList.remove('disable-transitions');
});
```

- Prevents visual jank
- Instant updates
- Re-enables transitions after browser reflow

### CSS Architecture

**Layered Approach:**

1. Base styles (`globals.css`)
2. Theme variants (`theme.css` from Dashboard 1)
3. Preset overrides (`presets/*.css` from Dashboard 2)
4. Component styles (Shadcn UI)

**OKLCH Color System:**

- Perceptually uniform
- Better dark mode color relationships
- Device-independent
- Future-proof

---

## 🤝 Contributing

Contributions welcome! This is meant to be a community-driven design system.

**Ideas:**

- Create new theme presets
- Add dashboard layouts
- Enhance components
- Improve accessibility
- Optimize performance

---

## 📄 License

See LICENSE file for details.

---

## 🙏 Credits

**Nexus Dashboard v2.0**

Combines the best features from:

- **Dashboard 1** (next-shadcn-dashboard1): View Transition API, kbar, Kanban, advanced architecture
- **Dashboard 2** (studio-admin): OKLCH colors, theme presets, zero-flicker, layout controls

Built with ❤️ using:

- [Next.js](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

**Made for developers building modern SaaS applications**

⭐ Star this repo if you find it useful!

</div>
