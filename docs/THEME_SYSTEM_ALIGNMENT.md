# Theme System Alignment Guide

## Overview

This project has an extended CSS variable system in `globals.css` that allows themes to customize shadows, blur effects, surfaces, borders, and interactive states. However, **most components, features, and pages do NOT use these variables** - they use hardcoded Tailwind classes instead.

**The goal**: Update EVERY component, feature, and page to use the CSS variables so that custom themes can actually change the appearance.

---

## Extended CSS Variables Available

These are defined in `/src/app/globals.css` under `:root` and `.dark`:

### 1. Elevation Shadows (Semantic)
```css
--elevation-1: /* subtle lift: buttons, inputs */
--elevation-2: /* card level */
--elevation-3: /* dropdown, popover */
--elevation-4: /* modal, dialog */
--elevation-5: /* toast, notification */
```

**Tailwind usage**: `shadow-elevation-1`, `shadow-elevation-2`, etc. (defined in `@theme inline`)

### 2. Glass/Blur Effects
```css
--glass-blur: /* backdrop blur amount (e.g., 8px, 20px) */
--glass-opacity: /* surface transparency 0-1 */
--glass-border: /* border style for glass surfaces */
```

**Problem**: Tailwind's `backdrop-blur-*` classes are hardcoded. To use variables, you need:
- Inline style: `style={{ backdropFilter: 'blur(var(--glass-blur))' }}`
- Or CSS class that references the variable

### 3. Surface Variants
```css
--surface-raised: /* slightly elevated background */
--surface-sunken: /* recessed/inset background */
--surface-overlay: /* modal/dialog backdrop */
```

**Tailwind usage**: `bg-surface-raised`, `bg-surface-sunken`, `bg-surface-overlay`

### 4. Border Width
```css
--border-width: /* default border thickness */
```

**Problem**: Tailwind's `border` is hardcoded to 1px. To use variable:
- Inline style: `style={{ borderWidth: 'var(--border-width)' }}`
- Or use `[border-width:var(--border-width)]` arbitrary value

### 5. Interactive States
```css
--hover-scale: /* transform scale on hover (e.g., 1.02) */
--active-scale: /* transform scale when pressed (e.g., 0.98) */
--hover-brightness: /* brightness filter on hover */
--active-brightness: /* brightness filter when pressed */
```

**Problem**: These require inline styles or custom CSS classes:
```css
.interactive-scale {
  transition: transform var(--duration-fast) var(--easing-default);
}
.interactive-scale:hover {
  transform: scale(var(--hover-scale));
}
.interactive-scale:active {
  transform: scale(var(--active-scale));
}
```

### 6. Transitions/Durations
```css
--duration-fast: 150ms
--duration-normal: 200ms
--duration-slow: 300ms
--easing-default: cubic-bezier(0.4, 0, 0.2, 1)
```

---

## What Needs To Be Done

### Step 1: Audit All Files

Find every file that uses styling:

```bash
# Find all TSX files
find src -name "*.tsx" -type f

# Find files with shadow classes
grep -rn "shadow-" src/ --include="*.tsx" | grep -v "shadow-elevation"

# Find files with backdrop-blur
grep -rn "backdrop-blur" src/ --include="*.tsx"

# Find files with hardcoded borders
grep -rn "border " src/ --include="*.tsx" | grep -v "border-"

# Find files with hardcoded transitions
grep -rn "transition-" src/ --include="*.tsx"

# Find files with transform/scale
grep -rn "hover:scale" src/ --include="*.tsx"
```

### Step 2: Update Shadow Classes

**Replace ALL occurrences**:
- `shadow-xs` → `shadow-elevation-1`
- `shadow-sm` → `shadow-elevation-1`
- `shadow-md` → `shadow-elevation-2`
- `shadow-lg` → `shadow-elevation-3`
- `shadow-xl` → `shadow-elevation-4`
- `shadow-2xl` → `shadow-elevation-5`

Also update hover states:
- `hover:shadow-md` → `hover:shadow-elevation-2`
- `hover:shadow-lg` → `hover:shadow-elevation-3`

### Step 3: Update Backdrop Blur

For components that should support theme-controlled blur (overlays, modals, glass effects):

**Before**:
```tsx
className="backdrop-blur-sm"
```

**After** (Option A - inline style):
```tsx
className="..."
style={{ backdropFilter: 'blur(var(--glass-blur))' }}
```

**After** (Option B - use utility class from globals.css):
```tsx
className="glass-effect"
```

### Step 4: Update Surface Backgrounds

For overlays and backdrops:

**Before**:
```tsx
className="bg-black/50"
```

**After**:
```tsx
className="bg-surface-overlay"
```

For raised/sunken surfaces:
```tsx
className="bg-surface-raised"
className="bg-surface-sunken"
```

### Step 5: Update Interactive Elements

For buttons, cards, and clickable elements that should have theme-controlled hover effects:

**Option A**: Add utility class
```tsx
className="hover-lift"
```

**Option B**: Add inline styles for scale
```tsx
style={{
  transition: 'transform var(--duration-fast) var(--easing-default)',
}}
// And CSS:
// :hover { transform: scale(var(--hover-scale)) }
```

### Step 6: Update Border Widths

For components where border thickness should be theme-controlled:

**Before**:
```tsx
className="border"
```

**After**:
```tsx
className="border"
style={{ borderWidth: 'var(--border-width)' }}
```

Or create a utility class in globals.css.

---

## Files To Update (Complete List)

### UI Components (`src/components/ui/`)

| File | What to check |
|------|---------------|
| `accordion.tsx` | shadows, borders |
| `alert-dialog.tsx` | overlay blur, shadows |
| `alert.tsx` | shadows |
| `avatar.tsx` | - |
| `badge.tsx` | shadows |
| `breadcrumb.tsx` | - |
| `button.tsx` | shadows, hover effects |
| `calendar.tsx` | shadows, borders |
| `card.tsx` | shadows, hover effects |
| `chart.tsx` | - |
| `checkbox.tsx` | shadows |
| `collapsible.tsx` | - |
| `command.tsx` | shadows |
| `context-menu.tsx` | shadows |
| `copy-button.tsx` | shadows |
| `dialog.tsx` | overlay blur, shadows |
| `drawer.tsx` | overlay blur, shadows |
| `dropdown-menu.tsx` | shadows |
| `empty-state.tsx` | - |
| `file-upload.tsx` | shadows, borders |
| `form.tsx` | - |
| `hover-card.tsx` | shadows |
| `input-otp.tsx` | shadows |
| `input.tsx` | shadows |
| `kbd.tsx` | shadows |
| `label.tsx` | - |
| `loading-overlay.tsx` | blur |
| `menubar.tsx` | shadows |
| `modal.tsx` | shadows |
| `multi-select.tsx` | shadows |
| `navigation-menu.tsx` | shadows |
| `notification-center.tsx` | shadows |
| `pagination.tsx` | - |
| `popover.tsx` | shadows |
| `progress.tsx` | - |
| `radio-group.tsx` | - |
| `resizable.tsx` | - |
| `scroll-area.tsx` | - |
| `select.tsx` | shadows |
| `separator.tsx` | - |
| `sheet.tsx` | overlay blur, shadows |
| `sidebar.tsx` | shadows, borders |
| `skeleton.tsx` | - |
| `slider.tsx` | shadows |
| `sonner.tsx` | shadows |
| `spinner.tsx` | - |
| `stepper.tsx` | shadows |
| `switch.tsx` | shadows |
| `table.tsx` | shadows |
| `tabs.tsx` | shadows |
| `textarea.tsx` | shadows |
| `timeline.tsx` | - |
| `toggle-group.tsx` | - |
| `toggle.tsx` | shadows |
| `tooltip.tsx` | shadows |

### Layout Components (`src/components/layout/`)

| File | What to check |
|------|---------------|
| `header.tsx` | blur, shadows |
| `app-sidebar.tsx` | shadows |
| All other layout files | shadows, blur |

### Other Components (`src/components/`)

| File | What to check |
|------|---------------|
| `breadcrumbs.tsx` | - |
| `coming-soon.tsx` | shadows |
| `form-card-skeleton.tsx` | - |
| `kbar/index.tsx` | blur, shadows |
| `nav-*.tsx` | shadows |
| `org-switcher.tsx` | shadows |
| `search-input.tsx` | shadows |
| `theme-lab/*.tsx` | shadows |

### Features (`src/features/`)

**Every feature folder** needs to be checked:
- `auth/`
- `business-dashboard/`
- `calendar/`
- `chats/`
- `crm/`
- `dashboard/`
- `errors/`
- `file-manager/`
- `finance/`
- `forms-showcase/`
- `inbox/`
- `kanban/`
- `overview/`
- `pricing/`
- `products/`
- `profile/`
- `showcase/`
- `tasks/`
- `users/`

### Pages (`src/app/`)

Check all page.tsx and layout.tsx files in:
- `src/app/`
- `src/app/auth/`
- `src/app/dashboard/` (and all subdirectories)
- `src/app/(errors)/`

### Styles

| File | What to check |
|------|---------------|
| `src/styles/calendar.css` | shadows |
| `src/app/theme.css` | variables |

---

## Testing Checklist

After making changes:

1. **Build test**: `pnpm build` should pass
2. **Visual test**:
   - Go to Theme Lab
   - Select "Glassmorphism" theme
   - Navigate through ALL pages
   - Verify shadows look different (soft, diffuse)
   - Verify glass blur effects work
   - Verify hover effects work
3. **Test other themes**:
   - Select "Brutalist" - should have hard shadows or none
   - Select "Cyberpunk" - should have glow shadows
   - Select "Claymorphism" - should have neumorphic shadows

---

## Quick Reference: Mapping

| Old Class | New Class/Style |
|-----------|-----------------|
| `shadow-xs` | `shadow-elevation-1` |
| `shadow-sm` | `shadow-elevation-1` |
| `shadow-md` | `shadow-elevation-2` |
| `shadow-lg` | `shadow-elevation-3` |
| `shadow-xl` | `shadow-elevation-4` |
| `shadow-2xl` | `shadow-elevation-5` |
| `backdrop-blur-sm` | `style={{ backdropFilter: 'blur(var(--glass-blur))' }}` or `glass-effect` class |
| `bg-black/50` (overlays) | `bg-surface-overlay` |
| `hover:scale-105` | `hover-lift` class or inline with `--hover-scale` |

---

## Example: Complete Component Update

**Before**:
```tsx
function MyCard({ children }) {
  return (
    <div className="bg-card rounded-lg border shadow-md hover:shadow-lg transition-shadow">
      {children}
    </div>
  );
}
```

**After**:
```tsx
function MyCard({ children }) {
  return (
    <div className="bg-card rounded-lg border shadow-elevation-2 hover:shadow-elevation-3 transition-shadow hover-lift">
      {children}
    </div>
  );
}
```

**Before** (Modal overlay):
```tsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm">
```

**After**:
```tsx
<div
  className="fixed inset-0 bg-surface-overlay"
  style={{ backdropFilter: 'blur(var(--glass-blur))' }}
>
```

---

## Notes

1. **Don't touch theme preset CSS files** (`src/styles/presets/*.css`) - these define the variables
2. **Don't touch globals.css variable definitions** - these are the source of truth
3. **Do update theme-tab.tsx carefully** - it uses shadow vars for the slider functionality
4. The `@theme inline` block in globals.css exposes variables to Tailwind as `shadow-elevation-*`, `bg-surface-*`, etc.

---

## Verification Commands

```bash
# Count files still using old shadow classes
grep -rn "shadow-sm\|shadow-md\|shadow-lg\|shadow-xl" src/ --include="*.tsx" | grep -v "shadow-elevation" | grep -v "presets/" | wc -l

# Count files using elevation shadows
grep -rn "shadow-elevation" src/ --include="*.tsx" | wc -l

# Find hardcoded backdrop-blur
grep -rn "backdrop-blur-" src/ --include="*.tsx" | grep -v "var(--"

# Build and verify
pnpm build
```

The goal is: **0 hardcoded shadow classes** (except in preset CSS files), **0 hardcoded backdrop-blur** (except where intentional), and **all interactive elements using theme variables**.
