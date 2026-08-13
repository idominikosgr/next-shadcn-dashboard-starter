'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import type { ImportedTheme } from '@/types/preferences/theme-lab';
import * as React from 'react';

interface ImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (theme: ImportedTheme) => void;
}

export function ImportModal({
  open,
  onOpenChange,
  onImport
}: ImportModalProps) {
  const [importText, setImportText] = React.useState('');

  const processImport = () => {
    try {
      if (!importText.trim()) {
        console.error('No CSS content provided');
        return;
      }

      // Parse CSS content into light and dark theme variables
      const lightTheme: Record<string, string> = {};
      const darkTheme: Record<string, string> = {};

      // Split CSS into sections
      const cssText = importText.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove comments

      // Extract :root section (light theme)
      const rootMatch = cssText.match(/:root\s*\{([^}]+)\}/);
      if (rootMatch) {
        const rootContent = rootMatch[1];
        const variableMatches = rootContent.matchAll(/--([^:]+):\s*([^;]+);/g);
        for (const match of variableMatches) {
          const [, variable, value] = match;
          lightTheme[variable.trim()] = value.trim();
        }
      }

      // Extract .dark section (dark theme)
      const darkMatch = cssText.match(/\.dark\s*\{([^}]+)\}/);
      if (darkMatch) {
        const darkContent = darkMatch[1];
        const variableMatches = darkContent.matchAll(/--([^:]+):\s*([^;]+);/g);
        for (const match of variableMatches) {
          const [, variable, value] = match;
          darkTheme[variable.trim()] = value.trim();
        }
      }

      // Store the imported theme
      const importedThemeData: ImportedTheme = {
        light: lightTheme,
        dark: darkTheme
      };
      onImport(importedThemeData);

      onOpenChange(false);
      setImportText('');
    } catch (error) {
      console.error('Error importing theme:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className='w-[90vw] max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Import Theme CSS</DialogTitle>
          <DialogDescription>
            Paste your CSS theme from{' '}
            <a
              href='https://tweakcn.com/editor/theme'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              tweakcn.com
            </a>{' '}
            or similar tools. Supports colors, typography, shadows, radius, and
            spacing. Include both <code>:root</code> and <code>.dark</code>{' '}
            sections.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Textarea
              id='theme-css'
              className='border-input placeholder:text-muted-foreground focus-visible:ring-ring text-foreground flex max-h-[400px] min-h-[300px] w-full resize-none overflow-y-auto rounded-md border bg-transparent px-3 py-2 font-mono text-sm shadow-elevation-1 focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
              placeholder={`:root {
  --background: 0 0% 100%;
  --foreground: oklch(0.52 0.13 144.17);
  --primary: #3e2723;
  /* And more */
}
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: hsl(37.50 36.36% 95.69%);
  --primary: rgb(46, 125, 50);
  /* And more */
}`}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
            />
          </div>
          <div className='flex justify-end gap-2'>
            <Button
              variant='outline'
              onClick={() => onOpenChange(false)}
              className='cursor-pointer'
            >
              Cancel
            </Button>
            <Button
              onClick={processImport}
              disabled={!importText.trim()}
              className='cursor-pointer'
            >
              Import Theme
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
