import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { LayoutPreferencesApplier } from '@/components/layout/layout-preferences-applier';
import { ThemeLabLoader } from '@/components/theme-lab/theme-lab-loader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type {
  SidebarVariant,
  SidebarCollapsible,
  ContentLayout,
  NavbarStyle
} from '@/types/preferences/layout';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  // Read layout preferences from cookies
  const sidebarVariant =
    (cookieStore.get('sidebar_variant')?.value as SidebarVariant) || 'sidebar';
  const sidebarCollapsible =
    (cookieStore.get('sidebar_collapsible')?.value as SidebarCollapsible) ||
    'icon';
  const contentLayout =
    (cookieStore.get('content_layout')?.value as ContentLayout) || 'full-width';
  const navbarStyle =
    (cookieStore.get('navbar_style')?.value as NavbarStyle) || 'sticky';

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <LayoutPreferencesApplier />
        <AppSidebar variant={sidebarVariant} collapsible={sidebarCollapsible} />
        <SidebarInset data-content-layout={contentLayout}>
          <Header navbarStyle={navbarStyle} />
          {/* page main content */}
          <div className='flex min-h-0 flex-1 flex-col overflow-y-auto p-4 md:p-6'>
            {children}
          </div>
          {/* page main content ends */}
        </SidebarInset>
        {/* Theme Laboratory - conditionally rendered based on feature flag */}
        <ThemeLabLoader />
      </SidebarProvider>
    </KBar>
  );
}
