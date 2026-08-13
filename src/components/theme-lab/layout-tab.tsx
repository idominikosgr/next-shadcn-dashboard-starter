'use client';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { usePreferencesStore } from '@/stores/preferences/preferences-provider';
import { setValueToCookie } from '@/server/server-actions';
import { updateContentLayout, updateNavbarStyle } from '@/lib/layout-utils';
import {
  SIDEBAR_VARIANT_OPTIONS,
  SIDEBAR_COLLAPSIBLE_OPTIONS,
  CONTENT_LAYOUT_OPTIONS,
  NAVBAR_STYLE_OPTIONS,
  type SidebarVariant,
  type SidebarCollapsible,
  type ContentLayout,
  type NavbarStyle
} from '@/types/preferences/layout';

export function LayoutTab() {
  const sidebarVariant = usePreferencesStore((state) => state.sidebarVariant);
  const setSidebarVariant = usePreferencesStore(
    (state) => state.setSidebarVariant
  );
  const sidebarCollapsible = usePreferencesStore(
    (state) => state.sidebarCollapsible
  );
  const setSidebarCollapsible = usePreferencesStore(
    (state) => state.setSidebarCollapsible
  );
  const contentLayout = usePreferencesStore((state) => state.contentLayout);
  const setContentLayout = usePreferencesStore(
    (state) => state.setContentLayout
  );
  const navbarStyle = usePreferencesStore((state) => state.navbarStyle);
  const setNavbarStyle = usePreferencesStore((state) => state.setNavbarStyle);

  const { toggleSidebar, state: sidebarState } = useSidebar();

  // Handler functions
  const handleSidebarVariantSelect = async (variant: SidebarVariant) => {
    setSidebarVariant(variant);
    await setValueToCookie('sidebar_variant', variant);
  };

  const handleSidebarCollapsibleSelect = async (
    collapsible: SidebarCollapsible
  ) => {
    setSidebarCollapsible(collapsible);
    await setValueToCookie('sidebar_collapsible', collapsible);

    // If switching to icon mode and sidebar is currently expanded, auto-collapse it
    if (collapsible === 'icon' && sidebarState === 'expanded') {
      toggleSidebar();
    }
  };

  const handleContentLayoutSelect = async (layout: ContentLayout) => {
    updateContentLayout(layout);
    setContentLayout(layout);
    await setValueToCookie('content_layout', layout);
  };

  const handleNavbarStyleSelect = async (style: NavbarStyle) => {
    updateNavbarStyle(style);
    setNavbarStyle(style);
    await setValueToCookie('navbar_style', style);
  };

  return (
    <div className='space-y-6 p-4'>
      {/* Sidebar Configuration */}
      <div className='space-y-3'>
        {/* Sidebar Variant */}
        <div>
          <Label className='text-sm font-medium'>Sidebar Variant</Label>
          {sidebarVariant && (
            <p className='text-muted-foreground mt-1 text-xs'>
              {sidebarVariant === 'sidebar' &&
                'Default: Standard sidebar layout'}
              {sidebarVariant === 'floating' &&
                'Floating: Floating sidebar with border'}
              {sidebarVariant === 'inset' &&
                'Inset: Inset sidebar with rounded corners'}
            </p>
          )}
        </div>
        <div className='grid grid-cols-3 gap-3'>
          {SIDEBAR_VARIANT_OPTIONS.map((variant) => (
            <div
              key={variant.value}
              className={`relative cursor-pointer rounded-md border p-4 transition-colors ${
                sidebarVariant === variant.value
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-border/60'
              }`}
              onClick={() =>
                handleSidebarVariantSelect(variant.value as SidebarVariant)
              }
            >
              {/* Visual representation of sidebar variant */}
              <div className='space-y-2'>
                <div className='text-center text-xs font-semibold'>
                  {variant.label}
                </div>
                <div
                  className={`flex h-12 rounded border ${variant.value === 'inset' ? 'bg-muted' : 'bg-background'}`}
                >
                  {/* Sidebar representation - smaller and more proportional */}
                  <div
                    className={`bg-muted flex w-3 shrink-0 flex-col gap-0.5 p-1 ${
                      variant.value === 'floating'
                        ? 'm-1 rounded border-r'
                        : variant.value === 'inset'
                          ? 'bg-muted/80 m-1 ms-0 rounded'
                          : 'border-r'
                    }`}
                  >
                    {/* Menu icon representations */}
                    <div className='bg-foreground/60 h-0.5 w-full rounded'></div>
                    <div className='bg-foreground/50 h-0.5 w-3/4 rounded'></div>
                    <div className='bg-foreground/40 h-0.5 w-2/3 rounded'></div>
                    <div className='bg-foreground/30 h-0.5 w-3/4 rounded'></div>
                  </div>
                  {/* Main content area */}
                  <div
                    className={`flex-1 ${variant.value === 'inset' ? 'bg-background ms-0' : 'bg-background/50'} border-muted-foreground/20 m-1 rounded-sm border border-dashed`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sidebar Collapsible Mode */}
      <div className='space-y-3'>
        <div>
          <Label className='text-sm font-medium'>
            Sidebar Collapsible Mode
          </Label>
          {sidebarCollapsible && (
            <p className='text-muted-foreground mt-1 text-xs'>
              {sidebarCollapsible === 'offcanvas' &&
                'Off Canvas: Slides out of view'}
              {sidebarCollapsible === 'icon' && 'Icon: Collapses to icon only'}
            </p>
          )}
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {SIDEBAR_COLLAPSIBLE_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={`relative cursor-pointer rounded-md border p-4 transition-colors ${
                sidebarCollapsible === option.value
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-border/60'
              }`}
              onClick={() =>
                handleSidebarCollapsibleSelect(
                  option.value as SidebarCollapsible
                )
              }
            >
              {/* Visual representation of collapsible mode */}
              <div className='space-y-2'>
                <div className='text-center text-xs font-semibold'>
                  {option.label}
                </div>
                <div className='bg-background flex h-12 rounded border'>
                  {/* Sidebar representation based on collapsible mode */}
                  {option.value === 'offcanvas' ? (
                    // Off-canvas: Show collapsed state with hamburger menu
                    <div className='bg-background/50 border-muted-foreground/20 m-1 flex flex-1 items-center justify-start rounded-sm border border-dashed pl-2'>
                      <div className='flex flex-col gap-0.5'>
                        <div className='bg-foreground/60 h-0.5 w-3 rounded'></div>
                        <div className='bg-foreground/60 h-0.5 w-3 rounded'></div>
                        <div className='bg-foreground/60 h-0.5 w-3 rounded'></div>
                      </div>
                    </div>
                  ) : (
                    // Icon mode: Show thin icon sidebar with clear icons
                    <>
                      <div className='bg-muted flex w-4 shrink-0 flex-col items-center gap-1 border-r p-1'>
                        <div className='bg-foreground/60 h-2 w-2 rounded-sm'></div>
                        <div className='bg-foreground/40 h-2 w-2 rounded-sm'></div>
                        <div className='bg-foreground/30 h-2 w-2 rounded-sm'></div>
                      </div>
                      <div className='bg-background/50 border-muted-foreground/20 m-1 flex-1 rounded-sm border border-dashed'></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Content Layout */}
      <div className='space-y-3'>
        <div>
          <Label className='text-sm font-medium'>Content Layout</Label>
          {contentLayout && (
            <p className='text-muted-foreground mt-1 text-xs'>
              {contentLayout === 'centered' &&
                'Centered: Content is centered with max-width'}
              {contentLayout === 'full-width' &&
                'Full Width: Content spans entire width'}
            </p>
          )}
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {CONTENT_LAYOUT_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={`relative cursor-pointer rounded-md border p-4 transition-colors ${
                contentLayout === option.value
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-border/60'
              }`}
              onClick={() =>
                handleContentLayoutSelect(option.value as ContentLayout)
              }
            >
              <div className='space-y-2'>
                <div className='text-center text-xs font-semibold'>
                  {option.label}
                </div>
                <div className='bg-background flex h-12 rounded border'>
                  {option.value === 'centered' ? (
                    // Centered: Show content with margins
                    <div className='flex flex-1 items-center justify-center px-2'>
                      <div className='bg-muted/50 border-muted-foreground/20 h-8 w-2/3 rounded border border-dashed'></div>
                    </div>
                  ) : (
                    // Full width: Show content spanning full width
                    <div className='bg-muted/50 border-muted-foreground/20 m-1 flex-1 rounded border border-dashed'></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Navbar Style */}
      <div className='space-y-3'>
        <div>
          <Label className='text-sm font-medium'>Navbar Style</Label>
          {navbarStyle && (
            <p className='text-muted-foreground mt-1 text-xs'>
              {navbarStyle === 'sticky' && 'Sticky: Navbar stays at top'}
              {navbarStyle === 'scroll' &&
                'Scroll: Navbar scrolls with content'}
            </p>
          )}
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {NAVBAR_STYLE_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={`relative cursor-pointer rounded-md border p-4 transition-colors ${
                navbarStyle === option.value
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-border/60'
              }`}
              onClick={() =>
                handleNavbarStyleSelect(option.value as NavbarStyle)
              }
            >
              <div className='space-y-2'>
                <div className='text-center text-xs font-semibold'>
                  {option.label}
                </div>
                <div className='bg-background flex h-12 flex-col overflow-hidden rounded border'>
                  {/* Header */}
                  <div
                    className={`h-2 ${option.value === 'sticky' ? 'bg-primary/20' : 'bg-muted'} border-b`}
                  ></div>
                  {/* Content */}
                  <div className='bg-muted/30 border-muted-foreground/20 m-1 flex-1 rounded-sm border border-dashed'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
