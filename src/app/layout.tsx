import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import { fontVariables } from '@/lib/font';
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';
import { PreferencesStoreProvider } from '@/stores/preferences/preferences-provider';
import { ThemeLabInitializer } from '@/components/theme-lab/theme-lab-initializer';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { ThemeMode } from '@/types/preferences/theme';
import type {
  SidebarVariant,
  SidebarCollapsible,
  ContentLayout,
  NavbarStyle
} from '@/types/preferences/layout';
import './globals.css';
import './theme.css';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

export const metadata: Metadata = {
  title: 'Unified Dashboard - Modern SaaS Design System',
  description:
    'A unified design system combining the best features of multiple dashboards with Next.js, Shadcn UI, and Tailwind CSS'
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  // Read preferences from cookies
  const themeMode =
    (cookieStore.get('theme_mode')?.value as ThemeMode) || 'light';
  const themePreset = cookieStore.get('theme_preset')?.value || null;
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
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body
        className={cn(
          'bg-background overflow-hidden overscroll-none font-sans antialiased',
          fontVariables
        )}
        suppressHydrationWarning
      >
        <NextTopLoader color='var(--primary)' showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <PreferencesStoreProvider
              themeMode={themeMode}
              themePreset={themePreset}
              sidebarVariant={sidebarVariant}
              sidebarCollapsible={sidebarCollapsible}
              contentLayout={contentLayout}
              navbarStyle={navbarStyle}
            >
              <ThemeLabInitializer />
              <Providers>
                <Toaster />
                {children}
              </Providers>
            </PreferencesStoreProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
