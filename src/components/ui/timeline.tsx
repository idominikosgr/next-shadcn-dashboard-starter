import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const timelineVariants = cva('flex flex-col', {
  variants: {
    variant: {
      default: '',
      compact: 'gap-0'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {}

function Timeline({ className, variant, ...props }: TimelineProps) {
  return (
    <div
      data-slot='timeline'
      className={cn(timelineVariants({ variant }), className)}
      {...props}
    />
  );
}

const timelineItemVariants = cva('relative flex gap-4 pb-8 last:pb-0', {
  variants: {
    status: {
      default: '',
      success: '',
      warning: '',
      error: '',
      pending: ''
    }
  },
  defaultVariants: {
    status: 'default'
  }
});

interface TimelineItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineItemVariants> {}

function TimelineItem({ className, status, ...props }: TimelineItemProps) {
  return (
    <div
      data-slot='timeline-item'
      data-status={status}
      className={cn(timelineItemVariants({ status }), className)}
      {...props}
    />
  );
}

const timelineConnectorVariants = cva(
  'absolute left-[15px] top-8 h-[calc(100%-32px)] w-px',
  {
    variants: {
      status: {
        default: 'bg-border',
        success: 'bg-chart-2',
        warning: 'bg-chart-4',
        error: 'bg-destructive',
        pending: 'bg-chart-3'
      }
    },
    defaultVariants: {
      status: 'default'
    }
  }
);

interface TimelineConnectorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineConnectorVariants> {}

function TimelineConnector({
  className,
  status,
  ...props
}: TimelineConnectorProps) {
  return (
    <div
      data-slot='timeline-connector'
      className={cn(timelineConnectorVariants({ status }), className)}
      {...props}
    />
  );
}

const timelineDotVariants = cva(
  'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2',
  {
    variants: {
      status: {
        default: 'border-border bg-background text-muted-foreground',
        success: 'border-chart-2 bg-chart-2/10 text-chart-2',
        warning: 'border-chart-4 bg-chart-4/10 text-chart-4',
        error: 'border-destructive bg-destructive/10 text-destructive',
        pending: 'border-chart-3 bg-chart-3/10 text-chart-3'
      }
    },
    defaultVariants: {
      status: 'default'
    }
  }
);

interface TimelineDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineDotVariants> {
  icon?: React.ReactNode;
}

function TimelineDot({ className, status, icon, ...props }: TimelineDotProps) {
  return (
    <div
      data-slot='timeline-dot'
      className={cn(timelineDotVariants({ status }), className)}
      {...props}
    >
      {icon && <span className='size-4'>{icon}</span>}
    </div>
  );
}

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {}

function TimelineContent({ className, ...props }: TimelineContentProps) {
  return (
    <div
      data-slot='timeline-content'
      className={cn('flex-1 pt-1', className)}
      {...props}
    />
  );
}

interface TimelineTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

function TimelineTitle({ className, ...props }: TimelineTitleProps) {
  return (
    <h4
      data-slot='timeline-title'
      className={cn('text-sm leading-none font-medium', className)}
      {...props}
    />
  );
}

interface TimelineDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

function TimelineDescription({
  className,
  ...props
}: TimelineDescriptionProps) {
  return (
    <p
      data-slot='timeline-description'
      className={cn('text-muted-foreground mt-1 text-sm', className)}
      {...props}
    />
  );
}

interface TimelineTimeProps extends React.HTMLAttributes<HTMLTimeElement> {
  dateTime?: string;
}

function TimelineTime({ className, ...props }: TimelineTimeProps) {
  return (
    <time
      data-slot='timeline-time'
      className={cn('text-muted-foreground text-xs', className)}
      {...props}
    />
  );
}

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime
};
