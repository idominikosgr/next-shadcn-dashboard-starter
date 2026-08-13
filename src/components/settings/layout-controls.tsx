'use client';

import { Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { updateContentLayout, updateNavbarStyle } from '@/lib/layout-utils';
import { updateThemeModeWithAnimation } from '@/lib/theme-utils';
import { setValueToCookie } from '@/server/server-actions';
import { usePreferencesStore } from '@/stores/preferences/preferences-provider';
import { getAllPresets } from '@/lib/theme-lab/generated-presets';
import { useThemeLab } from '@/lib/theme-lab/use-theme-lab';
import type {
  ContentLayout,
  NavbarStyle,
  SidebarCollapsible,
  SidebarVariant
} from '@/types/preferences/layout';
import type { ThemeMode } from '@/types/preferences/theme';

type LayoutControlsProps = Record<string, never>;

export function LayoutControls(_props: LayoutControlsProps) {
  const themeMode = usePreferencesStore((s) => s.themeMode);
  const setThemeMode = usePreferencesStore((s) => s.setThemeMode);
  const sidebarVariant = usePreferencesStore((s) => s.sidebarVariant);
  const setSidebarVariant = usePreferencesStore((s) => s.setSidebarVariant);
  const sidebarCollapsible = usePreferencesStore((s) => s.sidebarCollapsible);
  const setSidebarCollapsible = usePreferencesStore(
    (s) => s.setSidebarCollapsible
  );
  const contentLayout = usePreferencesStore((s) => s.contentLayout);
  const setContentLayout = usePreferencesStore((s) => s.setContentLayout);
  const navbarStyle = usePreferencesStore((s) => s.navbarStyle);
  const setNavbarStyle = usePreferencesStore((s) => s.setNavbarStyle);

  const { currentPreset, applyPresetWithAnimation, isDarkMode, setTheme } = useThemeLab();
  const allPresets = getAllPresets();

  const handleValueChange = async (
    key: string,
    value: string,
    event?: MouseEvent
  ) => {
    if (key === 'theme_mode') {
      // Update next-themes state first (triggers useThemeLab to re-apply preset)
      setTheme(value as ThemeMode);
      // Then animate the transition
      updateThemeModeWithAnimation(value as ThemeMode, event);
      // Update Zustand store
      setThemeMode(value as ThemeMode);
    }

    if (key === 'theme_preset') {
      // No event available from Select, uses crossfade transition
      applyPresetWithAnimation(value);
      return; // applyPresetWithAnimation handles the cookie
    }

    if (key === 'sidebar_variant') {
      setSidebarVariant(value as SidebarVariant);
    }

    if (key === 'sidebar_collapsible') {
      setSidebarCollapsible(value as SidebarCollapsible);
    }

    if (key === 'content_layout') {
      updateContentLayout(value as ContentLayout);
      setContentLayout(value as ContentLayout);
    }

    if (key === 'navbar_style') {
      updateNavbarStyle(value as NavbarStyle);
      setNavbarStyle(value as NavbarStyle);
    }
    await setValueToCookie(key, value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Settings className='h-5 w-5' />
          <span className='sr-only'>Layout settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-80'>
        <div className='flex flex-col gap-5'>
          <div className='space-y-1.5'>
            <h4 className='text-sm leading-none font-medium'>
              Layout Settings
            </h4>
            <p className='text-muted-foreground text-xs'>
              Customize your dashboard layout and theme preferences.
            </p>
          </div>
          <div className='space-y-3'>
            <div className='space-y-1.5'>
              <Label className='text-xs font-medium'>Theme Preset</Label>
              <Select
                value={currentPreset || 'default'}
                onValueChange={(value) =>
                  handleValueChange('theme_preset', value)
                }
              >
                <SelectTrigger className='h-9 w-full text-xs'>
                  <SelectValue placeholder='Select preset' />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(allPresets).map(([key, preset]) => (
                    <SelectItem
                      key={key}
                      className='text-xs'
                      value={key}
                    >
                      <div className='flex items-center gap-2'>
                        <span
                          className='size-2.5 rounded-full'
                          style={{
                            backgroundColor: isDarkMode
                              ? preset.styles.dark.primary
                              : preset.styles.light.primary
                          }}
                        />
                        <span>{preset.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-1.5'>
              <Label className='text-xs font-medium'>Theme Mode</Label>
              <ToggleGroup
                className='w-full'
                size='sm'
                variant='outline'
                type='single'
                value={themeMode}
                onValueChange={(value) => {
                  if (value) {
                    // Get the event from the click
                    const event = window.event as MouseEvent;
                    handleValueChange('theme_mode', value, event);
                  }
                }}
              >
                <ToggleGroupItem
                  value='light'
                  aria-label='Light mode'
                  className='flex-1 text-xs'
                >
                  Light
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='dark'
                  aria-label='Dark mode'
                  className='flex-1 text-xs'
                >
                  Dark
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className='space-y-1.5'>
              <Label className='text-xs font-medium'>Sidebar Variant</Label>
              <ToggleGroup
                className='w-full'
                size='sm'
                variant='outline'
                type='single'
                value={sidebarVariant}
                onValueChange={(value) => {
                  if (value) handleValueChange('sidebar_variant', value);
                }}
              >
                <ToggleGroupItem
                  value='inset'
                  aria-label='Inset sidebar'
                  className='flex-1 text-xs'
                >
                  Inset
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='sidebar'
                  aria-label='Standard sidebar'
                  className='flex-1 text-xs'
                >
                  Sidebar
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='floating'
                  aria-label='Floating sidebar'
                  className='flex-1 text-xs'
                >
                  Floating
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className='space-y-1.5'>
              <Label className='text-xs font-medium'>Navbar Style</Label>
              <ToggleGroup
                className='w-full'
                size='sm'
                variant='outline'
                type='single'
                value={navbarStyle}
                onValueChange={(value) => {
                  if (value) handleValueChange('navbar_style', value);
                }}
              >
                <ToggleGroupItem
                  value='sticky'
                  aria-label='Sticky navbar'
                  className='flex-1 text-xs'
                >
                  Sticky
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='scroll'
                  aria-label='Scroll navbar'
                  className='flex-1 text-xs'
                >
                  Scroll
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className='space-y-1.5'>
              <Label className='text-xs font-medium'>Sidebar Collapsible</Label>
              <ToggleGroup
                className='w-full'
                size='sm'
                variant='outline'
                type='single'
                value={sidebarCollapsible}
                onValueChange={(value) => {
                  if (value) handleValueChange('sidebar_collapsible', value);
                }}
              >
                <ToggleGroupItem
                  value='icon'
                  aria-label='Icon mode'
                  className='flex-1 text-xs'
                >
                  Icon
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='offcanvas'
                  aria-label='Off-canvas mode'
                  className='flex-1 text-xs'
                >
                  OffCanvas
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className='space-y-1.5'>
              <Label className='text-xs font-medium'>Content Layout</Label>
              <ToggleGroup
                className='w-full'
                size='sm'
                variant='outline'
                type='single'
                value={contentLayout}
                onValueChange={(value) => {
                  if (value) handleValueChange('content_layout', value);
                }}
              >
                <ToggleGroupItem
                  value='centered'
                  aria-label='Centered layout'
                  className='flex-1 text-xs'
                >
                  Centered
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='full-width'
                  aria-label='Full width layout'
                  className='flex-1 text-xs'
                >
                  Full Width
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
