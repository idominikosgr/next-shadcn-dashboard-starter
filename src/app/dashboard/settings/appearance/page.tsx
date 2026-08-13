'use client';

import { toast } from 'sonner';
import { Palette, Moon, Sun, Laptop } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { updateThemeModeWithAnimation } from '@/lib/theme-utils';
import { setValueToCookie } from '@/server/server-actions';
import { usePreferencesStore } from '@/stores/preferences/preferences-provider';
import { getAllPresets } from '@/lib/theme-lab/generated-presets';
import { useThemeLab } from '@/lib/theme-lab/use-theme-lab';
import type { ThemeMode } from '@/types/preferences/theme';
import { cn } from '@/lib/utils';

export default function AppearancePage() {
  const themeMode = usePreferencesStore((s) => s.themeMode);
  const setThemeMode = usePreferencesStore((s) => s.setThemeMode);

  const { currentPreset, applyPresetWithAnimation, isDarkMode } = useThemeLab();
  const allPresets = getAllPresets();

  const handleThemeModeChange = async (value: string) => {
    const event = window.event as MouseEvent;
    updateThemeModeWithAnimation(value as ThemeMode, event);
    setThemeMode(value as ThemeMode);
    await setValueToCookie('theme_mode', value);
    toast.success('Theme mode updated', {
      description: `Switched to ${value} mode`
    });
  };

  const handleThemePresetChange = async (value: string) => {
    // Uses crossfade transition (no click coordinates from RadioGroup)
    await applyPresetWithAnimation(value);
    const preset = allPresets[value];
    toast.success('Theme preset updated', {
      description: `Applied ${preset?.label || value} theme`
    });
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Moon className='h-5 w-5' />
            <CardTitle>Theme Mode</CardTitle>
          </div>
          <CardDescription>
            Choose how the interface appears to you. Select light or dark mode.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={themeMode} onValueChange={handleThemeModeChange}>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
              <Label
                htmlFor='light'
                className={cn(
                  'border-muted hover:bg-accent hover:text-accent-foreground flex cursor-pointer flex-col items-center justify-between rounded-lg border-2 bg-transparent p-4 transition-colors',
                  themeMode === 'light' && 'border-primary'
                )}
              >
                <RadioGroupItem value='light' id='light' className='sr-only' />
                <Sun className='mb-3 h-8 w-8' />
                <div className='space-y-1 text-center'>
                  <p className='text-sm leading-none font-medium'>Light</p>
                  <p className='text-muted-foreground text-xs'>
                    Bright and clear
                  </p>
                </div>
              </Label>

              <Label
                htmlFor='dark'
                className={cn(
                  'border-muted hover:bg-accent hover:text-accent-foreground flex cursor-pointer flex-col items-center justify-between rounded-lg border-2 bg-transparent p-4 transition-colors',
                  themeMode === 'dark' && 'border-primary'
                )}
              >
                <RadioGroupItem value='dark' id='dark' className='sr-only' />
                <Moon className='mb-3 h-8 w-8' />
                <div className='space-y-1 text-center'>
                  <p className='text-sm leading-none font-medium'>Dark</p>
                  <p className='text-muted-foreground text-xs'>
                    Easy on the eyes
                  </p>
                </div>
              </Label>

              <Label
                htmlFor='system'
                className={cn(
                  'border-muted hover:bg-accent hover:text-accent-foreground flex cursor-not-allowed flex-col items-center justify-between rounded-lg border-2 bg-transparent p-4 opacity-50 transition-colors'
                )}
              >
                <RadioGroupItem
                  value='system'
                  id='system'
                  className='sr-only'
                  disabled
                />
                <Laptop className='mb-3 h-8 w-8' />
                <div className='space-y-1 text-center'>
                  <p className='text-sm leading-none font-medium'>System</p>
                  <p className='text-muted-foreground text-xs'>
                    Follow system (Coming soon)
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Palette className='h-5 w-5' />
            <CardTitle>Theme Preset</CardTitle>
          </div>
          <CardDescription>
            Select a color theme for your dashboard. Each theme provides unique
            color palettes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={currentPreset || 'default'}
            onValueChange={handleThemePresetChange}
          >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {Object.entries(allPresets).map(([key, preset]) => (
                <Label
                  key={key}
                  htmlFor={key}
                  className={cn(
                    'border-muted hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-start gap-4 rounded-lg border-2 bg-transparent p-4 transition-colors',
                    currentPreset === key && 'border-primary'
                  )}
                >
                  <RadioGroupItem
                    value={key}
                    id={key}
                    className='mt-1'
                  />
                  <div className='flex-1 space-y-2'>
                    <div className='flex items-center gap-2'>
                      <p className='text-sm leading-none font-medium'>
                        {preset.label}
                      </p>
                      {currentPreset === key && (
                        <span className='text-primary text-xs font-medium'>
                          Active
                        </span>
                      )}
                    </div>
                    <div className='mt-3 flex gap-2'>
                      <div
                        className='h-6 w-6 rounded-full border'
                        style={{
                          backgroundColor: isDarkMode
                            ? preset.styles.dark.primary
                            : preset.styles.light.primary
                        }}
                        title='Primary color'
                      />
                    </div>
                  </div>
                </Label>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme Customization</CardTitle>
          <CardDescription>
            Advanced theme customization options are available in the Theme Lab.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-2 rounded-lg border p-4'>
            <p className='text-sm font-medium'>Theme Lab</p>
            <p className='text-muted-foreground text-sm'>
              Access the Theme Lab to create custom color schemes, adjust
              individual color values, and preview changes in real-time.
            </p>
            <div className='pt-2'>
              <a
                href='/dashboard/showcase/theme-lab'
                className='text-primary text-sm hover:underline'
              >
                Open Theme Lab →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
