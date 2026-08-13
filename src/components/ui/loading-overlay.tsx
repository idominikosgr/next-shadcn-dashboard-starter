'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';

const loadingOverlayVariants = cva(
  'absolute inset-0 z-50 flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-background/80 glass-effect',
        transparent: 'bg-background/50',
        solid: 'bg-background'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

interface LoadingOverlayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingOverlayVariants> {
  isLoading?: boolean;
  text?: string;
  spinnerSize?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
}

function LoadingOverlay({
  isLoading = true,
  text,
  variant,
  spinnerSize = 'lg',
  className,
  children,
  ...props
}: LoadingOverlayProps) {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className='relative'>
      {children}
      <div
        className={cn(loadingOverlayVariants({ variant }), className)}
        {...props}
      >
        <div className='flex flex-col items-center gap-3'>
          <Spinner size={spinnerSize} />
          {text && <p className='text-muted-foreground text-sm'>{text}</p>}
        </div>
      </div>
    </div>
  );
}

// Full screen loading overlay for page transitions
function FullScreenLoader({
  text = 'Loading...',
  className
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-background fixed inset-0 z-50 flex items-center justify-center',
        className
      )}
    >
      <div className='flex flex-col items-center gap-4'>
        <Spinner size='xl' />
        {text && <p className='text-muted-foreground'>{text}</p>}
      </div>
    </div>
  );
}

// Skeleton-based loading container
interface LoadingContainerProps {
  isLoading: boolean;
  skeleton?: React.ReactNode;
  children: React.ReactNode;
  minHeight?: string;
}

function LoadingContainer({
  isLoading,
  skeleton,
  children,
  minHeight = '200px'
}: LoadingContainerProps) {
  if (isLoading) {
    return (
      <div style={{ minHeight }}>
        {skeleton || (
          <div className='flex h-full min-h-[200px] items-center justify-center'>
            <Spinner size='lg' />
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
}

export {
  LoadingOverlay,
  FullScreenLoader,
  LoadingContainer,
  loadingOverlayVariants
};
