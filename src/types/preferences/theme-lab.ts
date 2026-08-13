/**
 * Theme Laboratory Types
 *
 * Extended types for the theme laboratory module.
 * Only loaded when THEME_LAB feature flag is enabled.
 */

export interface ThemePresetStyles {
  [key: string]: string;
}

export interface ThemeLabPreset {
  label: string;
  category: 'core' | 'community';
  description: string;
  styles: {
    light: ThemePresetStyles;
    dark: ThemePresetStyles;
  };
}

export interface ImportedTheme {
  name?: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}

export interface BrandColor {
  name: string;
  cssVar: string;
  description: string;
}

export const BRAND_COLORS: BrandColor[] = [
  {
    name: 'Primary',
    cssVar: '--primary',
    description: 'Main brand color for buttons, links, and emphasis'
  },
  {
    name: 'Primary Foreground',
    cssVar: '--primary-foreground',
    description: 'Text color on primary backgrounds'
  },
  {
    name: 'Secondary',
    cssVar: '--secondary',
    description: 'Secondary actions and muted elements'
  },
  {
    name: 'Secondary Foreground',
    cssVar: '--secondary-foreground',
    description: 'Text color on secondary backgrounds'
  },
  {
    name: 'Accent',
    cssVar: '--accent',
    description: 'Highlighting and hover states'
  },
  {
    name: 'Accent Foreground',
    cssVar: '--accent-foreground',
    description: 'Text color on accent backgrounds'
  },
  {
    name: 'Muted',
    cssVar: '--muted',
    description: 'Subtle backgrounds and disabled states'
  },
  {
    name: 'Muted Foreground',
    cssVar: '--muted-foreground',
    description: 'Subdued text and secondary content'
  }
];

export const RADIUS_OPTIONS = [
  { label: 'None', value: '0rem' },
  { label: 'Small', value: '0.3rem' },
  { label: 'Medium', value: '0.5rem' },
  { label: 'Default', value: '0.625rem' },
  { label: 'Large', value: '0.75rem' },
  { label: 'Extra Large', value: '1rem' },
  { label: 'Full', value: '1.5rem' }
] as const;

export const SHADOW_INTENSITY_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Subtle', value: 'subtle' },
  { label: 'Default', value: 'default' },
  { label: 'Medium', value: 'medium' },
  { label: 'Strong', value: 'strong' }
] as const;

export const BORDER_WIDTH_OPTIONS = [
  { label: 'None', value: '0px' },
  { label: 'Hairline', value: '0.5px' },
  { label: 'Default', value: '1px' },
  { label: 'Medium', value: '1.5px' },
  { label: 'Thick', value: '2px' }
] as const;

export const GLASS_BLUR_OPTIONS = [
  { label: 'None', value: '0' },
  { label: 'Subtle', value: '4px' },
  { label: 'Default', value: '8px' },
  { label: 'Strong', value: '12px' },
  { label: 'Heavy', value: '16px' }
] as const;

export const SURFACE_STYLE_OPTIONS = [
  { label: 'Flat', value: 'flat' },
  { label: 'Raised', value: 'raised' },
  { label: 'Sunken', value: 'sunken' }
] as const;

// --- generated:themePresets:start ---

export const THEME_PRESET_OPTIONS = [
  {
    id: 'default',
    label: 'Default',
    category: 'core',
    description: 'System default theme',
    primary: {
      light: 'oklch(0.205 0 0)',
      dark: 'oklch(0.922 0 0)'
    }
  },
  {
    id: 'amber-minimal',
    label: 'Amber Minimal',
    category: 'community',
    description: 'Amber Minimal theme',
    primary: {
      light: 'oklch(0.7686 0.1647 70.0804)',
      dark: 'oklch(0.7686 0.1647 70.0804)'
    }
  },
  {
    id: 'amber',
    label: 'Amber',
    category: 'core',
    description: 'Warm amber/gold theme',
    primary: {
      light: 'oklch(0.7 0.15 70)',
      dark: 'oklch(0.75 0.14 70)'
    }
  },
  {
    id: 'amethyst-haze',
    label: 'Amethyst Haze',
    category: 'community',
    description: 'Amethyst Haze theme',
    primary: {
      light: 'oklch(0.6104 0.0767 299.7335)',
      dark: 'oklch(0.7058 0.0777 302.0489)'
    }
  },
  {
    id: 'aurora-borealis',
    label: 'Aurora Borealis',
    category: 'community',
    description: 'Cool northern lights inspired theme',
    primary: {
      light: '#0ea5e9',
      dark: '#38bdf8'
    }
  },
  {
    id: 'blue',
    label: 'Blue',
    category: 'core',
    description: 'Classic blue theme',
    primary: {
      light: 'oklch(0.5 0.2 250)',
      dark: 'oklch(0.6 0.18 250)'
    }
  },
  {
    id: 'bold-tech',
    label: 'Bold Tech',
    category: 'community',
    description: 'Bold Tech theme',
    primary: {
      light: 'oklch(0.6056 0.2189 292.7172)',
      dark: 'oklch(0.6056 0.2189 292.7172)'
    }
  },
  {
    id: 'brutalist',
    label: 'Brutalist',
    category: 'core',
    description: 'Bold brutalist design with sharp edges',
    primary: {
      light: 'oklch(0.6489 0.2370 26.9728)',
      dark: 'oklch(0.7044 0.1872 23.1858)'
    }
  },
  {
    id: 'bubblegum',
    label: 'Bubblegum',
    category: 'community',
    description: 'Bubblegum theme',
    primary: {
      light: 'oklch(0.6209 0.1801 348.1385)',
      dark: 'oklch(0.9195 0.0801 87.667)'
    }
  },
  {
    id: 'caffeine',
    label: 'Caffeine',
    category: 'community',
    description: 'Caffeine theme',
    primary: {
      light: 'oklch(0.4341 0.0392 41.9938)',
      dark: 'oklch(0.9247 0.0524 66.1732)'
    }
  },
  {
    id: 'candyland',
    label: 'Candyland',
    category: 'community',
    description: 'Candyland theme',
    primary: {
      light: 'oklch(0.8677 0.0735 7.0855)',
      dark: 'oklch(0.8027 0.1355 349.2347)'
    }
  },
  {
    id: 'catppuccin',
    label: 'Catppuccin',
    category: 'community',
    description: 'Catppuccin theme',
    primary: {
      light: 'oklch(0.5547 0.2503 297.0156)',
      dark: 'oklch(0.7871 0.1187 304.7693)'
    }
  },
  {
    id: 'claude',
    label: 'Claude',
    category: 'community',
    description: 'Claude theme',
    primary: {
      light: 'oklch(0.6171 0.1375 39.0427)',
      dark: 'oklch(0.6724 0.1308 38.7559)'
    }
  },
  {
    id: 'claymorphism',
    label: 'Claymorphism',
    category: 'community',
    description: 'Soft clay-like 3D appearance theme',
    primary: {
      light: '#e07a5f',
      dark: '#e07a5f'
    }
  },
  {
    id: 'clean-slate',
    label: 'Clean Slate',
    category: 'community',
    description: 'Clean Slate theme',
    primary: {
      light: 'oklch(0.5854 0.2041 277.1173)',
      dark: 'oklch(0.6801 0.1583 276.9349)'
    }
  },
  {
    id: 'cosmic-night',
    label: 'Cosmic Night',
    category: 'community',
    description: 'Cosmic Night theme',
    primary: {
      light: 'oklch(0.5417 0.179 288.0332)',
      dark: 'oklch(0.7162 0.1597 290.3962)'
    }
  },
  {
    id: 'cozy-mocha',
    label: 'Cozy Mocha',
    category: 'community',
    description: 'Warm coffee-inspired brown theme',
    primary: {
      light: '#8b5a3c',
      dark: '#c49a6c'
    }
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    category: 'community',
    description: 'Neon cyberpunk theme with magenta and cyan',
    primary: {
      light: '#ff00ff',
      dark: '#ff00ff'
    }
  },
  {
    id: 'doom-64',
    label: 'Doom 64',
    category: 'community',
    description: 'Doom 64 theme',
    primary: {
      light: 'oklch(0.5016 0.1887 27.4816)',
      dark: 'oklch(0.6083 0.209 27.0276)'
    }
  },
  {
    id: 'elegant-luxury',
    label: 'Elegant Luxury',
    category: 'community',
    description: 'Elegant Luxury theme',
    primary: {
      light: 'oklch(0.465 0.147 24.9381)',
      dark: 'oklch(0.5054 0.1905 27.5181)'
    }
  },
  {
    id: 'emerald-tech',
    label: 'Emerald Tech',
    category: 'community',
    description: 'Fresh emerald green tech theme',
    primary: {
      light: '#3ecf8e',
      dark: '#3ecf8e'
    }
  },
  {
    id: 'glassmorphism',
    label: 'Glassmorphism',
    category: 'community',
    description: 'Frosted glass effect with translucent surfaces and blur',
    primary: {
      light: 'oklch(0.55 0.2 280)',
      dark: 'oklch(0.7 0.18 280)'
    }
  },
  {
    id: 'graphite',
    label: 'Graphite',
    category: 'community',
    description: 'Graphite theme',
    primary: {
      light: 'oklch(0.4891 0 0)',
      dark: 'oklch(0.7058 0 0)'
    }
  },
  {
    id: 'green',
    label: 'Green',
    category: 'core',
    description: 'Natural green theme',
    primary: {
      light: 'oklch(0.65 0.18 130)',
      dark: 'oklch(0.7 0.16 130)'
    }
  },
  {
    id: 'ink-noir',
    label: 'Ink Noir',
    category: 'community',
    description: 'Minimalist black and white theme',
    primary: {
      light: '#000000',
      dark: '#ffffff'
    }
  },
  {
    id: 'kodama-grove',
    label: 'Kodama Grove',
    category: 'community',
    description: 'Kodama Grove theme',
    primary: {
      light: 'oklch(0.6657 0.105 118.9078)',
      dark: 'oklch(0.6762 0.0567 132.4479)'
    }
  },
  {
    id: 'midnight-bloom',
    label: 'Midnight Bloom',
    category: 'community',
    description: 'Midnight Bloom theme',
    primary: {
      light: 'oklch(0.5676 0.2021 283.0838)',
      dark: 'oklch(0.5676 0.2021 283.0838)'
    }
  },
  {
    id: 'mocha-mousse',
    label: 'Mocha Mousse',
    category: 'community',
    description: 'Mocha Mousse theme',
    primary: {
      light: 'oklch(0.6083 0.0623 44.3588)',
      dark: 'oklch(0.7272 0.0539 52.332)'
    }
  },
  {
    id: 'modern-minimal',
    label: 'Modern Minimal',
    category: 'community',
    description: 'Clean modern design with blue accents',
    primary: {
      light: '#3b82f6',
      dark: '#3b82f6'
    }
  },
  {
    id: 'mono',
    label: 'Mono',
    category: 'core',
    description: 'Monochrome grayscale theme with monospace font',
    primary: {
      light: 'oklch(0.5 0 0)',
      dark: 'oklch(0.7 0 0)'
    }
  },
  {
    id: 'nature',
    label: 'Nature',
    category: 'community',
    description: 'Nature theme',
    primary: {
      light: 'oklch(0.5234 0.1347 144.1672)',
      dark: 'oklch(0.6731 0.1624 144.2083)'
    }
  },
  {
    id: 'neo-brutalism',
    label: 'Neo Brutalism',
    category: 'community',
    description: 'Neo Brutalism theme',
    primary: {
      light: 'oklch(0.6489 0.237 26.9728)',
      dark: 'oklch(0.7044 0.1872 23.1858)'
    }
  },
  {
    id: 'neo-brutalist',
    label: 'Neo Brutalist',
    category: 'community',
    description: 'Bold neo-brutalist design with vivid colors',
    primary: {
      light: '#ff6b35',
      dark: '#ff6b35'
    }
  },
  {
    id: 'northern-lights',
    label: 'Northern Lights',
    category: 'community',
    description: 'Northern Lights theme',
    primary: {
      light: 'oklch(0.6487 0.1538 150.3071)',
      dark: 'oklch(0.6487 0.1538 150.3071)'
    }
  },
  {
    id: 'notebook',
    label: 'Notebook',
    category: 'community',
    description: 'Notebook theme',
    primary: {
      light: 'oklch(0.4891 0 0)',
      dark: 'oklch(0.7572 0 0)'
    }
  },
  {
    id: 'ocean-breeze',
    label: 'Ocean Breeze',
    category: 'community',
    description: 'Ocean Breeze theme',
    primary: {
      light: 'oklch(0.7227 0.192 149.5793)',
      dark: 'oklch(0.7729 0.1535 163.2231)'
    }
  },
  {
    id: 'pastel-dreams',
    label: 'Pastel Dreams',
    category: 'community',
    description: 'Soft pastel pink and purple theme',
    primary: {
      light: '#f9a8d4',
      dark: '#f472b6'
    }
  },
  {
    id: 'perpetuity',
    label: 'Perpetuity',
    category: 'community',
    description: 'Perpetuity theme',
    primary: {
      light: 'oklch(0.5624 0.0947 203.2755)',
      dark: 'oklch(0.852 0.1269 195.0354)'
    }
  },
  {
    id: 'purple',
    label: 'Purple',
    category: 'core',
    description: 'Deep purple theme',
    primary: {
      light: 'oklch(0.5106 0.2301 276.9656)',
      dark: 'oklch(0.6801 0.1583 276.9349)'
    }
  },
  {
    id: 'quantum-rose',
    label: 'Quantum Rose',
    category: 'community',
    description: 'Quantum Rose theme',
    primary: {
      light: 'oklch(0.6002 0.2414 0.1348)',
      dark: 'oklch(0.7543 0.2319 332.0212)'
    }
  },
  {
    id: 'red',
    label: 'Red',
    category: 'core',
    description: 'Bold red primary color theme',
    primary: {
      light: 'oklch(0.577 0.245 27.325)',
      dark: 'oklch(0.704 0.191 22.216)'
    }
  },
  {
    id: 'retro-arcade',
    label: 'Retro Arcade',
    category: 'community',
    description: 'Retro gaming arcade theme with pixel font',
    primary: {
      light: '#e94560',
      dark: '#e94560'
    }
  },
  {
    id: 'rose',
    label: 'Rose',
    category: 'core',
    description: 'Soft rose pink theme',
    primary: {
      light: 'oklch(0.645 0.246 16.439)',
      dark: 'oklch(0.72 0.21 16)'
    }
  },
  {
    id: 'sky-social',
    label: 'Sky Social',
    category: 'community',
    description: 'Light blue social media inspired theme',
    primary: {
      light: '#1e9df1',
      dark: '#1da1f2'
    }
  },
  {
    id: 'soft-pop',
    label: 'Soft Pop',
    category: 'core',
    description: 'Soft, playful pastel theme with rounded corners',
    primary: {
      light: 'oklch(0.5106 0.2301 276.9656)',
      dark: 'oklch(0.6801 0.1583 276.9349)'
    }
  },
  {
    id: 'solar-dusk',
    label: 'Solar Dusk',
    category: 'community',
    description: 'Solar Dusk theme',
    primary: {
      light: 'oklch(0.5553 0.1455 48.9975)',
      dark: 'oklch(0.7049 0.1867 47.6044)'
    }
  },
  {
    id: 'starry-night',
    label: 'Starry Night',
    category: 'community',
    description: 'Starry Night theme',
    primary: {
      light: 'oklch(0.4815 0.1178 263.3758)',
      dark: 'oklch(0.4815 0.1178 263.3758)'
    }
  },
  {
    id: 'sunset-horizon',
    label: 'Sunset Horizon',
    category: 'community',
    description: 'Sunset Horizon theme',
    primary: {
      light: 'oklch(0.7357 0.1641 34.7091)',
      dark: 'oklch(0.7357 0.1641 34.7091)'
    }
  },
  {
    id: 'supabase',
    label: 'Supabase',
    category: 'community',
    description: 'Supabase theme',
    primary: {
      light: 'oklch(0.8348 0.1302 160.908)',
      dark: 'oklch(0.4365 0.1044 156.7556)'
    }
  },
  {
    id: 't3-chat',
    label: 'T3 Chat',
    category: 'community',
    description: 'T3 Chat theme',
    primary: {
      light: 'oklch(0.5316 0.1409 355.1999)',
      dark: 'oklch(0.4607 0.1853 4.0994)'
    }
  },
  {
    id: 'tangerine',
    label: 'Tangerine',
    category: 'core',
    description: 'Warm orange tangerine theme',
    primary: {
      light: 'oklch(0.64 0.17 36.44)',
      dark: 'oklch(0.64 0.17 36.44)'
    }
  },
  {
    id: 'teal',
    label: 'Teal',
    category: 'core',
    description: 'Fresh teal/cyan theme',
    primary: {
      light: 'oklch(0.6 0.118 184.704)',
      dark: 'oklch(0.696 0.17 162.48)'
    }
  },
  {
    id: 'twitter',
    label: 'Twitter',
    category: 'community',
    description: 'Twitter theme',
    primary: {
      light: 'oklch(0.6723 0.1606 244.9955)',
      dark: 'oklch(0.6692 0.1607 245.011)'
    }
  },
  {
    id: 'vercel',
    label: 'Vercel',
    category: 'community',
    description: 'Vercel theme',
    primary: {
      light: 'oklch(0 0 0)',
      dark: 'oklch(1 0 0)'
    }
  },
  {
    id: 'vintage-paper',
    label: 'Vintage Paper',
    category: 'community',
    description: 'Classic vintage paper and sepia theme',
    primary: {
      light: '#8b4513',
      dark: '#cd853f'
    }
  },
  {
    id: 'violet-bloom',
    label: 'Violet Bloom',
    category: 'community',
    description: 'Vibrant violet theme with rounded corners',
    primary: {
      light: '#7033ff',
      dark: '#8c5cff'
    }
  },
  {
    id: 'violet',
    label: 'Violet',
    category: 'core',
    description: 'Rich violet purple theme',
    primary: {
      light: 'oklch(0.541 0.239 291.832)',
      dark: 'oklch(0.627 0.265 303.9)'
    }
  },
  {
    id: 'warm-terracotta',
    label: 'Warm Terracotta',
    category: 'community',
    description: 'Warm earthy terracotta orange theme',
    primary: {
      light: '#d97706',
      dark: '#f59e0b'
    }
  }
] as const;

export const THEME_PRESET_VALUES = THEME_PRESET_OPTIONS.map((p) => p.id);

export type ThemePresetId = (typeof THEME_PRESET_OPTIONS)[number]['id'];

// --- generated:themePresets:end ---
