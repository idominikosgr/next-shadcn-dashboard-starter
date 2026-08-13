'use client';

import { toast } from 'sonner';
import { Layout, Maximize, Sidebar as SidebarIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { updateContentLayout, updateNavbarStyle } from '@/lib/layout-utils';
import { setValueToCookie } from '@/server/server-actions';
import { usePreferencesStore } from '@/stores/preferences/preferences-provider';
import type {
  ContentLayout,
  NavbarStyle,
  SidebarCollapsible,
  SidebarVariant
} from '@/types/preferences/layout';
import { cn } from '@/lib/utils';

export default function DisplayPage() {
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

  const handleSidebarVariantChange = async (value: string) => {
    setSidebarVariant(value as SidebarVariant);
    await setValueToCookie('sidebar_variant', value);
    toast.success('Sidebar variant updated', {
      description: `Changed to ${value} sidebar`
    });
  };

  const handleSidebarCollapsibleChange = async (value: string) => {
    setSidebarCollapsible(value as SidebarCollapsible);
    await setValueToCookie('sidebar_collapsible', value);
    toast.success('Sidebar collapse mode updated', {
      description: `Changed to ${value} mode`
    });
  };

  const handleContentLayoutChange = async (value: string) => {
    updateContentLayout(value as ContentLayout);
    setContentLayout(value as ContentLayout);
    await setValueToCookie('content_layout', value);
    toast.success('Content layout updated', {
      description: `Changed to ${value} layout`
    });
  };

  const handleNavbarStyleChange = async (value: string) => {
    updateNavbarStyle(value as NavbarStyle);
    setNavbarStyle(value as NavbarStyle);
    await setValueToCookie('navbar_style', value);
    toast.success('Navbar style updated', {
      description: `Changed to ${value} navbar`
    });
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <SidebarIcon className='h-5 w-5' />
            <CardTitle>Sidebar Variant</CardTitle>
          </div>
          <CardDescription>
            Choose how the sidebar appears in your dashboard layout.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={sidebarVariant}
            onValueChange={handleSidebarVariantChange}
          >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
              <Label
                htmlFor='inset'
                className={cn(
                  'border-muted hover:bg-accent hover:text-accent-foreground flex cursor-pointer flex-col items-center justify-between rounded-lg border-2 bg-transparent p-4 transition-colors',
                  sidebarVariant === 'inset' && 'border-primary'
                )}
              >
                <RadioGroupItem value='inset' id='inset' className='sr-only' />
                <div className='bg-muted/50 mb-3 h-16 w-full rounded border p-2'>
                  <div className='flex h-full gap-1'>
                    <div className='bg-muted-foreground/20 w-1/4 rounded' />
                    <div className='bg-muted-foreground/10 flex-1 rounded' />
                  </div>
                </div>
                <div className='space-y-1 text-center'>
                  <p className='text-sm leading-none font-medium'>Inset</p>
                  <p className='text-muted-foreground text-xs'>
                    Sidebar within container
                  </p>
                </div>
              </Label>

              <Label
                htmlFor='sidebar'
                className={cn(
                  'border-muted hover:bg-accent hover:text-accent-foreground flex cursor-pointer flex-col items-center justify-between rounded-lg border-2 bg-transparent p-4 transition-colors',
                  sidebarVariant === 'sidebar' && 'border-primary'
                )}
              >
                <RadioGroupItem
                  value='sidebar'
                  id='sidebar'
                  className='sr-only'
                />
                <div className='bg-muted/50 mb-3 flex h-16 w-full gap-1 rounded border p-2'>
                  <div className='bg-muted-foreground/20 w-1/4 rounded' />
                  <div className='bg-muted-foreground/10 flex-1 rounded' />
                </div>
                <div className='space-y-1 text-center'>
                  <p className='text-sm leading-none font-medium'>Sidebar</p>
                  <p className='text-muted-foreground text-xs'>
                    Standard sidebar
                  </p>
                </div>
              </Label>

              <Label
                htmlFor='floating'
                className={cn(
                  'border-muted hover:bg-accent hover:text-accent-foreground flex cursor-pointer flex-col items-center justify-between rounded-lg border-2 bg-transparent p-4 transition-colors',
                  sidebarVariant === 'floating' && 'border-primary'
                )}
              >
                <RadioGroupItem
                  value='floating'
                  id='floating'
                  className='sr-only'
                />
                <div className='bg-muted/50 mb-3 flex h-16 w-full gap-2 rounded border p-3'>
                  <div className='border-muted-foreground/30 bg-muted-foreground/10 w-1/4 rounded border-2' />
                  <div className='bg-muted-foreground/10 flex-1 rounded' />
                </div>
                <div className='space-y-1 text-center'>
                  <p className='text-sm leading-none font-medium'>Floating</p>
                  <p className='text-muted-foreground text-xs'>
                    Elevated sidebar
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
            <SidebarIcon className='h-5 w-5' />
            <CardTitle>Sidebar Collapse Mode</CardTitle>
          </div>
          <CardDescription>
            Choose how the sidebar collapses on smaller screens.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={sidebarCollapsible}
            onValueChange={handleSidebarCollapsibleChange}
          >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <Label
                htmlFor='icon'
                className={cn(
                  'border-muted hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-start gap-4 rounded-lg border-2 bg-transparent p-4 transition-colors',
                  sidebarCollapsible === 'icon' && 'border-primary'
                )}
              >
                <RadioGroupItem value='icon' id='icon' className='mt-1' />
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm leading-none font-medium'>
                      Icon Mode
                    </p>
                    {sidebarCollapsible === 'icon' && (
                      <span className='text-primary text-xs font-medium'>
                        Active
                      </span>
                    )}
                  </div>
                  <p className='text-muted-foreground text-xs'>
                    Collapses to show only icons while keeping sidebar visible
                  </p>
                </div>
              </Label>

              <Label
                htmlFor='offcanvas'
                className={cn(
                  'border-muted hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-start gap-4 rounded-lg border-2 bg-transparent p-4 transition-colors',
                  sidebarCollapsible === 'offcanvas' && 'border-primary'
                )}
              >
                <RadioGroupItem
                  value='offcanvas'
                  id='offcanvas'
                  className='mt-1'
                />
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm leading-none font-medium'>
                      Off-Canvas
                    </p>
                    {sidebarCollapsible === 'offcanvas' && (
                      <span className='text-primary text-xs font-medium'>
                        Active
                      </span>
                    )}
                  </div>
                  <p className='text-muted-foreground text-xs'>
                    Hides sidebar completely and shows as overlay when opened
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
            <Maximize className='h-5 w-5' />
            <CardTitle>Content Layout</CardTitle>
          </div>
          <CardDescription>
            Control the maximum width of the main content area.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={contentLayout}
            onValueChange={handleContentLayoutChange}
          >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <Label
                htmlFor='centered'
                className={cn(
                  'border-muted hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-start gap-4 rounded-lg border-2 bg-transparent p-4 transition-colors',
                  contentLayout === 'centered' && 'border-primary'
                )}
              >
                <RadioGroupItem
                  value='centered'
                  id='centered'
                  className='mt-1'
                />
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm leading-none font-medium'>Centered</p>
                    {contentLayout === 'centered' && (
                      <span className='text-primary text-xs font-medium'>
                        Active
                      </span>
                    )}
                  </div>
                  <p className='text-muted-foreground text-xs'>
                    Content is centered with a maximum width for better
                    readability
                  </p>
                </div>
              </Label>

              <Label
                htmlFor='full-width'
                className={cn(
                  'border-muted hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-start gap-4 rounded-lg border-2 bg-transparent p-4 transition-colors',
                  contentLayout === 'full-width' && 'border-primary'
                )}
              >
                <RadioGroupItem
                  value='full-width'
                  id='full-width'
                  className='mt-1'
                />
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm leading-none font-medium'>
                      Full Width
                    </p>
                    {contentLayout === 'full-width' && (
                      <span className='text-primary text-xs font-medium'>
                        Active
                      </span>
                    )}
                  </div>
                  <p className='text-muted-foreground text-xs'>
                    Content spans the full width of the available space
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
            <Layout className='h-5 w-5' />
            <CardTitle>Navbar Style</CardTitle>
          </div>
          <CardDescription>
            Choose how the navigation bar behaves when scrolling.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={navbarStyle}
            onValueChange={handleNavbarStyleChange}
          >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <Label
                htmlFor='sticky'
                className={cn(
                  'border-muted hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-start gap-4 rounded-lg border-2 bg-transparent p-4 transition-colors',
                  navbarStyle === 'sticky' && 'border-primary'
                )}
              >
                <RadioGroupItem value='sticky' id='sticky' className='mt-1' />
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm leading-none font-medium'>Sticky</p>
                    {navbarStyle === 'sticky' && (
                      <span className='text-primary text-xs font-medium'>
                        Active
                      </span>
                    )}
                  </div>
                  <p className='text-muted-foreground text-xs'>
                    Navbar stays fixed at the top when scrolling
                  </p>
                </div>
              </Label>

              <Label
                htmlFor='scroll'
                className={cn(
                  'border-muted hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-start gap-4 rounded-lg border-2 bg-transparent p-4 transition-colors',
                  navbarStyle === 'scroll' && 'border-primary'
                )}
              >
                <RadioGroupItem value='scroll' id='scroll' className='mt-1' />
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm leading-none font-medium'>Scroll</p>
                    {navbarStyle === 'scroll' && (
                      <span className='text-primary text-xs font-medium'>
                        Active
                      </span>
                    )}
                  </div>
                  <p className='text-muted-foreground text-xs'>
                    Navbar scrolls with the page content
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
