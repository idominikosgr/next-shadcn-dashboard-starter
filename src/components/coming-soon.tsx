'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

export function ComingSoon() {
  return (
    <div className='flex h-full items-center justify-center'>
      <Card className='border-border/50 from-primary/5 via-background to-accent/5 w-full max-w-md bg-linear-to-br shadow-elevation-3'>
        <CardContent className='flex flex-col items-center justify-center gap-4 py-12'>
          <Spinner className='text-primary size-12' />
          <h1 className='text-4xl leading-tight font-bold'>Coming Soon</h1>
          <p className='text-muted-foreground text-center'>
            This page has not been created yet. <br />
            Stay tuned though!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
