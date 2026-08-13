import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        // Status variants using chart colors for theme compatibility
        success:
          'border-transparent bg-chart-2 text-white [a&]:hover:bg-chart-2/90',
        warning:
          'border-transparent bg-chart-4 text-gray-900 [a&]:hover:bg-chart-4/90',
        error:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90',
        pending:
          'border-transparent bg-chart-3 text-white [a&]:hover:bg-chart-3/90',
        info: 'border-transparent bg-chart-1 text-white [a&]:hover:bg-chart-1/90',
        // Outline status variants
        'success-outline':
          'border-chart-2 text-chart-2 bg-chart-2/10 [a&]:hover:bg-chart-2/20',
        'warning-outline':
          'border-chart-4 text-chart-4 bg-chart-4/10 [a&]:hover:bg-chart-4/20',
        'error-outline':
          'border-destructive text-destructive bg-destructive/10 [a&]:hover:bg-destructive/20',
        'pending-outline':
          'border-chart-3 text-chart-3 bg-chart-3/10 [a&]:hover:bg-chart-3/20',
        'info-outline':
          'border-chart-1 text-chart-1 bg-chart-1/10 [a&]:hover:bg-chart-1/20'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot='badge'
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
