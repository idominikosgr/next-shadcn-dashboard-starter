## Additional Utilities to Make Dynamic

### 1. **Elevation/Depth System**
```css
--elevation-1: /* subtle lift */
--elevation-2: /* card level */
--elevation-3: /* dropdown/popover */
--elevation-4: /* modal/dialog */
--elevation-5: /* toast/notification */
```

### 2. **Border Styles**
```css
--border-width: 1px;
--border-style: solid; /* solid, dashed, double for brutalist */
--card-border: var(--border-width) var(--border-style) var(--border);
--card-border-hover: var(--border-width) var(--border-style) var(--ring);
```

### 3. **Transition/Animation**
```css
--transition-fast: 150ms;
--transition-normal: 200ms;
--transition-slow: 300ms;
--transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
--hover-scale: 1.02;
--active-scale: 0.98;
```

### 4. **Blur/Glassmorphism**
```css
--blur-sm: 4px;
--blur-md: 8px;
--blur-lg: 16px;
--glass-opacity: 0.8;
--glass-blur: var(--blur-md);
```

### 5. **Focus Ring**
```css
--ring-width: 2px;
--ring-offset: 2px;
--ring-opacity: 0.5;
```

### 6. **Surface Variants**
```css
--surface-raised: /* slightly elevated bg */
--surface-sunken: /* inset/recessed bg */
--surface-overlay: /* modal overlay bg */
```
