'use client';

import { ImportModal } from '@/components/theme-lab/import-modal';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useThemeLab } from '@/lib/theme-lab';
import { usePreferencesStore } from '@/stores/preferences/preferences-provider';
import { setValueToCookie } from '@/server/server-actions';
import type { ImportedTheme } from '@/types/preferences/theme-lab';
import { cn } from '@/lib/utils';
import { Layout, Palette, RotateCcw, Settings, X } from 'lucide-react';
import * as React from 'react';
import { LayoutTab } from './layout-tab';
import { ThemeTab } from './theme-tab';

interface ThemeLabCustomizerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeLabCustomizer({
  open,
  onOpenChange
}: ThemeLabCustomizerProps) {
  const { isDarkMode, resetTheme, currentPreset } = useThemeLab();

  const sidebarVariant = usePreferencesStore((state) => state.sidebarVariant);
  const setSidebarVariant = usePreferencesStore(
    (state) => state.setSidebarVariant
  );
  const setSidebarCollapsible = usePreferencesStore(
    (state) => state.setSidebarCollapsible
  );

  const [activeTab, setActiveTab] = React.useState('theme');
  const [selectedRadius, setSelectedRadius] = React.useState('0.5rem');
  const [importModalOpen, setImportModalOpen] = React.useState(false);
  const [importedTheme, setImportedTheme] =
    React.useState<ImportedTheme | null>(null);

  // Track if user has made a local selection (to avoid overwriting with stale hook data)
  const [localPreset, setLocalPreset] = React.useState<string | null>(null);

  // Use local selection if available, otherwise fall back to persisted preset from hook
  const selectedPreset = localPreset ?? currentPreset ?? 'default';

  // When user selects a preset, update local state immediately for responsive UI
  const setSelectedPreset = React.useCallback((preset: string) => {
    setLocalPreset(preset);
  }, []);

  // Sync local state with persisted state on mount/when hook initializes
  React.useEffect(() => {
    if (currentPreset && localPreset === null) {
      setLocalPreset(currentPreset);
    }
  }, [currentPreset, localPreset]);

  const handleReset = async () => {
    // Complete reset to application defaults

    // 1. Reset all state variables to initial values
    setLocalPreset('default');
    setSelectedRadius('0.5rem');
    setImportedTheme(null);

    // 2. Completely remove theme preset
    resetTheme();

    // 3. Reset the radius to default
    document.documentElement.style.setProperty('--radius', '0.5rem');

    // 4. Reset extended theme variables
    document.documentElement.style.removeProperty('--elevation-1');
    document.documentElement.style.removeProperty('--elevation-2');
    document.documentElement.style.removeProperty('--elevation-3');
    document.documentElement.style.removeProperty('--elevation-4');
    document.documentElement.style.removeProperty('--elevation-5');
    document.documentElement.style.removeProperty('--shadow-intensity');
    document.documentElement.style.removeProperty('--border-width');
    document.documentElement.style.removeProperty('--glass-blur');
    document.documentElement.style.removeProperty('--glass-opacity');

    // 5. Reset sidebar to defaults
    setSidebarVariant('sidebar');
    setSidebarCollapsible('icon');
    await setValueToCookie('sidebar_variant', 'sidebar');
    await setValueToCookie('sidebar_collapsible', 'icon');
  };

  const handleImport = (themeData: ImportedTheme) => {
    setImportedTheme(themeData);
    // Clear preset selection to indicate custom import is active
    setLocalPreset('');
    // Note: Import functionality is preserved but uses inline styles
    // For full CSS-based imports, users would need to create CSS files
  };

  const handleImportClick = () => {
    setImportModalOpen(true);
  };

  // Determine sheet side based on sidebar position
  const sheetSide = sidebarVariant === 'sidebar' ? 'right' : 'right';

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
        <SheetContent
          side={sheetSide}
          className='pointer-events-auto flex w-[400px] flex-col gap-0 overflow-hidden p-0 [&>button]:hidden'
          onInteractOutside={(e) => {
            // Prevent the sheet from closing when dialog is open
            if (importModalOpen) {
              e.preventDefault();
            }
          }}
        >
          <SheetHeader className='space-y-0 p-4 pb-2'>
            <div className='flex items-center gap-2'>
              <div className='bg-primary/10 rounded-lg p-2'>
                <Settings className='h-4 w-4' />
              </div>
              <SheetTitle className='text-lg font-semibold'>
                Theme Laboratory
              </SheetTitle>
              <div className='ml-auto flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={handleReset}
                  className='h-8 w-8 cursor-pointer'
                >
                  <RotateCcw className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => onOpenChange(false)}
                  className='h-8 w-8 cursor-pointer'
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            </div>
            <SheetDescription className='text-muted-foreground sr-only text-sm'>
              Customize the theme and layout of your dashboard.
            </SheetDescription>
          </SheetHeader>

          <div className='flex-1 overflow-y-auto'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='flex h-full flex-col'
            >
              <div className='py-2'>
                <TabsList className='grid h-12 w-full grid-cols-2 rounded-none p-1.5'>
                  <TabsTrigger
                    value='theme'
                    className='data-[state=active]:bg-background cursor-pointer'
                  >
                    <Palette className='mr-1 h-4 w-4' /> Theme
                  </TabsTrigger>
                  <TabsTrigger
                    value='layout'
                    className='data-[state=active]:bg-background cursor-pointer'
                  >
                    <Layout className='mr-1 h-4 w-4' /> Layout
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value='theme' className='mt-0 flex-1'>
                <ThemeTab
                  selectedPreset={selectedPreset}
                  setSelectedPreset={setSelectedPreset}
                  selectedRadius={selectedRadius}
                  setSelectedRadius={setSelectedRadius}
                  setImportedTheme={setImportedTheme}
                  onImportClick={handleImportClick}
                />
              </TabsContent>

              <TabsContent value='layout' className='mt-0 flex-1'>
                <LayoutTab />
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      <ImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        onImport={handleImport}
      />
    </>
  );
}

// Floating trigger button
interface ThemeLabTriggerProps {
  onClick: () => void;
  position?: 'left' | 'right';
}

export function ThemeLabTrigger({
  onClick,
  position = 'right'
}: ThemeLabTriggerProps) {
  return (
    <Button
      onClick={onClick}
      size='icon'
      className={cn(
        'bg-primary hover:bg-primary/90 text-primary-foreground fixed top-1/2 z-50 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full shadow-elevation-3',
        position === 'right' ? 'right-4' : 'left-4'
      )}
    >
      <Settings className='h-5 w-5' />
    </Button>
  );
}

// Combined component that manages its own state
export function ThemeLab() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <ThemeLabTrigger onClick={() => setOpen(true)} />
      <ThemeLabCustomizer open={open} onOpenChange={setOpen} />
    </>
  );
}

export { ThemeTab } from './theme-tab';
export { LayoutTab } from './layout-tab';
export { ImportModal } from './import-modal';
export { ColorPicker } from './color-picker';
