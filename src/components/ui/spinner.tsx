'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

const spinnerVariants = cva('animate-spin text-muted-foreground', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      default: 'size-6',
      lg: 'size-8',
      xl: 'size-12'
    }
  },
  defaultVariants: {
    size: 'default'
  }
});

interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, label = 'Loading...', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role='status'
        aria-label={label}
        className={cn('flex items-center justify-center', className)}
        {...props}
      >
        <Loader2Icon className={spinnerVariants({ size })} />
        <span className='sr-only'>{label}</span>
      </div>
    );
  }
);
Spinner.displayName = 'Spinner';

// Full page loading spinner
interface PageSpinnerProps extends SpinnerProps {
  text?: string;
}

function PageSpinner({
  text = 'Loading...',
  size = 'lg',
  ...props
}: PageSpinnerProps) {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center gap-4'>
      <Spinner size={size} {...props} />
      {text && <p className='text-muted-foreground text-sm'>{text}</p>}
    </div>
  );
}

// Inline loading indicator
interface InlineSpinnerProps extends SpinnerProps {
  text?: string;
}

function InlineSpinner({
  text,
  size = 'sm',
  className,
  ...props
}: InlineSpinnerProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Spinner size={size} {...props} />
      {text && <span className='text-muted-foreground text-sm'>{text}</span>}
    </span>
  );
}

// Button loading state helper
function ButtonSpinner({ className, ...props }: SpinnerProps) {
  return <Spinner size='sm' className={cn('mr-2', className)} {...props} />;
}

export { Spinner, PageSpinner, InlineSpinner, ButtonSpinner, spinnerVariants };
