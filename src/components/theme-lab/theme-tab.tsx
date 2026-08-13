'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useThemeLab } from '@/lib/theme-lab';
import {
  RADIUS_OPTIONS,
  SHADOW_INTENSITY_OPTIONS,
  BORDER_WIDTH_OPTIONS,
  GLASS_BLUR_OPTIONS,
  THEME_PRESET_OPTIONS
} from '@/types/preferences/theme-lab';
import type { ImportedTheme } from '@/types/preferences/theme-lab';
import { updateThemeModeWithAnimation } from '@/lib/theme-utils';
import { Dices, Moon, Sun, Upload } from 'lucide-react';
import * as React from 'react';

interface ThemeTabProps {
  selectedPreset: string;
  setSelectedPreset: (preset: string) => void;
  selectedRadius: string;
  setSelectedRadius: (radius: string) => void;
  setImportedTheme: (theme: ImportedTheme | null) => void;
  onImportClick: () => void;
}

// Shadow intensity multipliers
const SHADOW_MULTIPLIERS: Record<string, number> = {
  none: 0,
  subtle: 0.5,
  default: 1,
  medium: 1.5,
  strong: 2
};

export function ThemeTab({
  selectedPreset,
  setSelectedPreset,
  selectedRadius,
  setSelectedRadius,
  setImportedTheme,
  onImportClick
}: ThemeTabProps) {
  const { isDarkMode, applyPresetWithAnimation, setTheme } = useThemeLab();

  // Extended controls state
  const [shadowIntensity, setShadowIntensity] = React.useState('default');
  const [borderWidth, setBorderWidth] = React.useState('1px');
  const [glassBlur, setGlassBlur] = React.useState('8px');
  const [glassOpacity, setGlassOpacity] = React.useState([0.8]);

  // Get presets by category from the generated options
  const corePresets = THEME_PRESET_OPTIONS.filter((p) => p.category === 'core');
  const communityPresets = THEME_PRESET_OPTIONS.filter(
    (p) => p.category === 'community'
  );

  const handleRandomCore = (event: React.MouseEvent) => {
    const randomIndex = Math.floor(Math.random() * corePresets.length);
    const randomPreset = corePresets[randomIndex];
    if (randomPreset) {
      setSelectedPreset(randomPreset.id);
      setImportedTheme(null);
      applyPresetWithAnimation(randomPreset.id, event.nativeEvent);
    }
  };

  const handleRandomCommunity = (event: React.MouseEvent) => {
    const randomIndex = Math.floor(Math.random() * communityPresets.length);
    const randomPreset = communityPresets[randomIndex];
    if (randomPreset) {
      setSelectedPreset(randomPreset.id);
      setImportedTheme(null);
      applyPresetWithAnimation(randomPreset.id, event.nativeEvent);
    }
  };

  const handleRadiusSelect = (radius: string) => {
    setSelectedRadius(radius);
    document.documentElement.style.setProperty('--radius', radius);
  };

  const handleShadowIntensityChange = (value: string) => {
    setShadowIntensity(value);
    const multiplier = SHADOW_MULTIPLIERS[value] ?? 1;

    // Apply shadow intensity by modifying elevation variables
    if (value === 'none') {
      document.documentElement.style.setProperty('--elevation-1', 'none');
      document.documentElement.style.setProperty('--elevation-2', 'none');
      document.documentElement.style.setProperty('--elevation-3', 'none');
      document.documentElement.style.setProperty('--elevation-4', 'none');
      document.documentElement.style.setProperty('--elevation-5', 'none');
    } else {
      // Reset to defaults and scale via opacity
      document.documentElement.style.setProperty('--elevation-1', 'var(--shadow-xs)');
      document.documentElement.style.setProperty('--elevation-2', 'var(--shadow-sm)');
      document.documentElement.style.setProperty('--elevation-3', 'var(--shadow-md)');
      document.documentElement.style.setProperty('--elevation-4', 'var(--shadow-lg)');
      document.documentElement.style.setProperty('--elevation-5', 'var(--shadow-xl)');
      document.documentElement.style.setProperty('--shadow-intensity', multiplier.toString());
    }
  };

  const handleBorderWidthChange = (value: string) => {
    setBorderWidth(value);
    document.documentElement.style.setProperty('--border-width', value);
  };

  const handleGlassBlurChange = (value: string) => {
    setGlassBlur(value);
    document.documentElement.style.setProperty('--glass-blur', value);
  };

  const handleGlassOpacityChange = (value: number[]) => {
    setGlassOpacity(value);
    document.documentElement.style.setProperty('--glass-opacity', value[0].toString());
  };

  const handleLightMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDarkMode === false) return;
    setTheme('light');
    updateThemeModeWithAnimation('light', event.nativeEvent);
  };

  const handleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDarkMode === true) return;
    setTheme('dark');
    updateThemeModeWithAnimation('dark', event.nativeEvent);
  };

  const handlePresetChange = (value: string) => {
    setSelectedPreset(value);
    setImportedTheme(null);
    // No event available from Select, uses crossfade transition
    applyPresetWithAnimation(value);
  };

  // Determine if current selection is core or community
  const isCorePreset = corePresets.some((p) => p.id === selectedPreset);
  const isCommunityPreset = communityPresets.some(
    (p) => p.id === selectedPreset
  );

  return (
    <div className='space-y-6 p-4'>
      {/* Core Theme Presets */}
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <Label className='text-sm font-medium'>Core Theme Presets</Label>
          <Button
            variant='outline'
            size='sm'
            onClick={handleRandomCore}
            className='cursor-pointer'
          >
            <Dices className='mr-1.5 h-3.5 w-3.5' />
            Random
          </Button>
        </div>

        <Select
          value={isCorePreset ? selectedPreset : ''}
          onValueChange={handlePresetChange}
        >
          <SelectTrigger className='w-full cursor-pointer'>
            <SelectValue placeholder='Choose Core Theme' />
          </SelectTrigger>
          <SelectContent className='max-h-60'>
            <div className='p-2'>
              {corePresets.map((preset) => (
                <SelectItem
                  key={preset.id}
                  value={preset.id}
                  className='cursor-pointer'
                >
                  <div className='flex items-center gap-2'>
                    <div
                      className='border-border/20 h-3 w-3 rounded-full border'
                      style={{ backgroundColor: preset.primary.light }}
                    />
                    <span>{preset.label}</span>
                  </div>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Community Theme Presets */}
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <Label className='text-sm font-medium'>Community Presets</Label>
          <Button
            variant='outline'
            size='sm'
            onClick={handleRandomCommunity}
            className='cursor-pointer'
          >
            <Dices className='mr-1.5 h-3.5 w-3.5' />
            Random
          </Button>
        </div>

        <Select
          value={isCommunityPreset ? selectedPreset : ''}
          onValueChange={handlePresetChange}
        >
          <SelectTrigger className='w-full cursor-pointer'>
            <SelectValue placeholder='Choose Community Theme' />
          </SelectTrigger>
          <SelectContent className='max-h-60'>
            <div className='p-2'>
              {communityPresets.map((preset) => (
                <SelectItem
                  key={preset.id}
                  value={preset.id}
                  className='cursor-pointer'
                >
                  <div className='flex items-center gap-2'>
                    <div
                      className='border-border/20 h-3 w-3 rounded-full border'
                      style={{ backgroundColor: preset.primary.light }}
                    />
                    <span>{preset.label}</span>
                  </div>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Radius Selection */}
      <div className='space-y-3'>
        <Label className='text-sm font-medium'>Radius</Label>
        <div className='grid grid-cols-4 gap-2'>
          {RADIUS_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={`relative cursor-pointer rounded-md border p-3 transition-colors ${
                selectedRadius === option.value
                  ? 'border-primary'
                  : 'border-border hover:border-border/60'
              }`}
              onClick={() => handleRadiusSelect(option.value)}
            >
              <div className='text-center'>
                <div className='text-xs font-medium'>{option.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Shadow Intensity */}
      <div className='space-y-3'>
        <Label className='text-sm font-medium'>Shadow Intensity</Label>
        <div className='grid grid-cols-5 gap-1.5'>
          {SHADOW_INTENSITY_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={`relative cursor-pointer rounded-md border px-2 py-2.5 transition-colors ${
                shadowIntensity === option.value
                  ? 'border-primary'
                  : 'border-border hover:border-border/60'
              }`}
              onClick={() => handleShadowIntensityChange(option.value)}
            >
              <div className='text-center'>
                <div className='text-[10px] font-medium'>{option.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Border Width */}
      <div className='space-y-3'>
        <Label className='text-sm font-medium'>Border Width</Label>
        <div className='grid grid-cols-5 gap-1.5'>
          {BORDER_WIDTH_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={`relative cursor-pointer rounded-md border px-2 py-2.5 transition-colors ${
                borderWidth === option.value
                  ? 'border-primary'
                  : 'border-border hover:border-border/60'
              }`}
              onClick={() => handleBorderWidthChange(option.value)}
            >
              <div className='text-center'>
                <div className='text-[10px] font-medium'>{option.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Glassmorphism Controls */}
      <div className='space-y-3'>
        <Label className='text-sm font-medium'>Glassmorphism</Label>

        {/* Glass Blur */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground text-xs'>Blur</span>
            <span className='text-muted-foreground text-xs'>{glassBlur}</span>
          </div>
          <div className='grid grid-cols-5 gap-1.5'>
            {GLASS_BLUR_OPTIONS.map((option) => (
              <div
                key={option.value}
                className={`relative cursor-pointer rounded-md border px-2 py-2 transition-colors ${
                  glassBlur === option.value
                    ? 'border-primary'
                    : 'border-border hover:border-border/60'
                }`}
                onClick={() => handleGlassBlurChange(option.value)}
              >
                <div className='text-center'>
                  <div className='text-[10px] font-medium'>{option.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Glass Opacity */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground text-xs'>Opacity</span>
            <span className='text-muted-foreground text-xs'>{Math.round(glassOpacity[0] * 100)}%</span>
          </div>
          <Slider
            value={glassOpacity}
            onValueChange={handleGlassOpacityChange}
            min={0}
            max={1}
            step={0.05}
            className='cursor-pointer'
          />
        </div>
      </div>

      <Separator />

      {/* Mode Section */}
      <div className='space-y-3'>
        <Label className='text-sm font-medium'>Mode</Label>
        <div className='grid grid-cols-2 gap-2'>
          <Button
            variant={!isDarkMode ? 'secondary' : 'outline'}
            size='sm'
            onClick={handleLightMode}
            className='cursor-pointer'
          >
            <Sun className='mr-1 h-4 w-4' />
            Light
          </Button>
          <Button
            variant={isDarkMode ? 'secondary' : 'outline'}
            size='sm'
            onClick={handleDarkMode}
            className='cursor-pointer'
          >
            <Moon className='mr-1 h-4 w-4' />
            Dark
          </Button>
        </div>
      </div>

      <Separator />

      {/* Import Theme Button */}
      <div className='space-y-3'>
        <Button
          variant='outline'
          size='lg'
          onClick={onImportClick}
          className='w-full cursor-pointer'
        >
          <Upload className='mr-1.5 h-3.5 w-3.5' />
          Import Theme
        </Button>
      </div>
    </div>
  );
}
