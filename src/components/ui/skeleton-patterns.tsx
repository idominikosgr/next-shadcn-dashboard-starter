'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const skeletonVariants = cva('animate-pulse rounded-md bg-muted', {
  variants: {
    variant: {
      default: '',
      shimmer:
        'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-linear-to-r before:from-transparent before:via-background/60 before:to-transparent'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      data-slot='skeleton'
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}

// Common skeleton patterns
function SkeletonText({
  lines = 3,
  className,
  lastLineWidth = '60%'
}: {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className='h-4'
          style={{
            width: i === lines - 1 ? lastLineWidth : '100%'
          }}
        />
      ))}
    </div>
  );
}

function SkeletonAvatar({
  size = 'default',
  className
}: {
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'size-8',
    default: 'size-10',
    lg: 'size-12'
  };

  return (
    <Skeleton className={cn('rounded-full', sizeClasses[size], className)} />
  );
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4 rounded-lg border p-6', className)}>
      <div className='flex items-center gap-4'>
        <SkeletonAvatar />
        <div className='flex-1 space-y-2'>
          <Skeleton className='h-4 w-1/3' />
          <Skeleton className='h-3 w-1/4' />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

function SkeletonTable({
  rows = 5,
  columns = 4,
  className
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={cn('rounded-lg border', className)}>
      {/* Header */}
      <div className='flex gap-4 border-b p-4'>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className='h-4 flex-1' />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className='flex gap-4 border-b p-4 last:border-0'>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className='h-4 flex-1' />
          ))}
        </div>
      ))}
    </div>
  );
}

function SkeletonList({
  items = 5,
  className
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className='flex items-center gap-4'>
          <SkeletonAvatar size='sm' />
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-3 w-1/2' />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonChart({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className='flex h-48 items-end justify-between gap-2'>
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton
            key={i}
            className='flex-1'
            style={{
              height: `${Math.random() * 60 + 40}%`
            }}
          />
        ))}
      </div>
      <div className='flex justify-between'>
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className='h-3 w-8' />
        ))}
      </div>
    </div>
  );
}

function SkeletonForm({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Form field */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-10 w-full' />
        </div>
      ))}
      {/* Submit button */}
      <Skeleton className='h-10 w-32' />
    </div>
  );
}

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTable,
  SkeletonList,
  SkeletonChart,
  SkeletonForm,
  skeletonVariants
};
