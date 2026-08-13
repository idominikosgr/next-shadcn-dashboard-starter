'use client';
// TEMPORARILY DISABLED CLERK AUTH - Uncomment below to re-enable
// import { ClerkProvider } from '@clerk/nextjs';
// import { dark } from '@clerk/themes';
// import { useTheme } from 'next-themes';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // TEMPORARILY DISABLED - we need the resolvedTheme value to set the baseTheme for clerk based on the dark or light theme
  // const { resolvedTheme } = useTheme();

  return (
    <>
      {/* TEMPORARILY DISABLED CLERK AUTH - Uncomment below to re-enable */}
      {/* <ClerkProvider
        appearance={{
          baseTheme: resolvedTheme === 'dark' ? dark : undefined
        }}
      > */}
      {children}
      {/* </ClerkProvider> */}
    </>
  );
}
