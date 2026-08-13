'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User, Settings, Bell, Monitor, Lock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const settingsNavItems = [
  {
    title: 'Profile',
    href: '/dashboard/settings/profile',
    icon: User,
    description: 'Manage your personal information'
  },
  {
    title: 'Account',
    href: '/dashboard/settings/account',
    icon: Lock,
    description: 'Account security and preferences'
  },
  {
    title: 'Appearance',
    href: '/dashboard/settings/appearance',
    icon: Settings,
    description: 'Customize theme and colors'
  },
  {
    title: 'Notifications',
    href: '/dashboard/settings/notifications',
    icon: Bell,
    description: 'Configure notification preferences'
  },
  {
    title: 'Display',
    href: '/dashboard/settings/display',
    icon: Monitor,
    description: 'Layout and display options'
  }
];

export default function SettingsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className='space-y-1'>
        <h1 className='text-3xl font-bold tracking-tight'>Settings</h1>
        <p className='text-muted-foreground'>
          Manage your account settings and preferences
        </p>
      </div>
      <Separator />
      <div className='flex flex-col gap-6 lg:flex-row'>
        <aside className='space-y-1 lg:w-64'>
          <nav className='flex flex-col gap-1'>
            {settingsNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'hover:bg-accent flex items-start gap-3 rounded-lg px-3 py-2 transition-colors',
                    isActive && 'bg-accent text-accent-foreground'
                  )}
                >
                  <Icon className='mt-0.5 h-5 w-5 shrink-0' />
                  <div className='flex-1 space-y-0.5'>
                    <div className='text-sm font-medium'>{item.title}</div>
                    <div className='text-muted-foreground line-clamp-2 hidden text-xs sm:block'>
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className='max-w-4xl flex-1'>{children}</div>
      </div>
    </div>
  );
}
