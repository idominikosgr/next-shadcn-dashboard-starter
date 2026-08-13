import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button, type buttonVariants } from '@/components/ui/button';
import type { VariantProps } from 'class-variance-authority';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: VariantProps<typeof buttonVariants>['variant'];
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot='empty-state'
      className={cn(
        'flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center',
        className
      )}
      {...props}
    >
      {icon && (
        <div className='bg-muted text-muted-foreground flex size-16 items-center justify-center rounded-full'>
          {icon}
        </div>
      )}
      <div className='max-w-sm space-y-1'>
        <h3 className='text-lg font-semibold tracking-tight'>{title}</h3>
        {description && (
          <p className='text-muted-foreground text-sm'>{description}</p>
        )}
      </div>
      {(action || secondaryAction) && (
        <div className='flex items-center gap-2'>
          {action && (
            <Button
              variant={action.variant ?? 'default'}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant='outline' onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Compact version for use in smaller spaces like table cells or cards
interface EmptyStateCompactProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  message: string;
}

function EmptyStateCompact({
  icon,
  message,
  className,
  ...props
}: EmptyStateCompactProps) {
  return (
    <div
      data-slot='empty-state-compact'
      className={cn(
        'text-muted-foreground flex items-center justify-center gap-2 py-8',
        className
      )}
      {...props}
    >
      {icon && <span className='size-4'>{icon}</span>}
      <span className='text-sm'>{message}</span>
    </div>
  );
}

export { EmptyState, EmptyStateCompact };
