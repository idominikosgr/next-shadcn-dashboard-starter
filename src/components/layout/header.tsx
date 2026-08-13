import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { UserNav } from './user-nav';
import CtaGithub from './cta-github';
import type { NavbarStyle } from '@/types/preferences/layout';
import { cn } from '@/lib/utils';

type HeaderProps = {
  navbarStyle?: NavbarStyle;
};

export default function Header({ navbarStyle = 'sticky' }: HeaderProps) {
  return (
    <header
      className={cn(
        'flex h-16 shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12',
        // Navbar style - sticky adds backdrop blur and fixed positioning
        'data-[navbar-style=sticky]:bg-background/50 data-[navbar-style=sticky]:sticky data-[navbar-style=sticky]:top-0 data-[navbar-style=sticky]:z-50 data-[navbar-style=sticky]:rounded-t-[inherit] data-[navbar-style=sticky]:glass-effect'
      )}
      data-navbar-style={navbarStyle}
    >
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <CtaGithub />
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <UserNav />
      </div>
    </header>
  );
}
