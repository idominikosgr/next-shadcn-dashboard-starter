'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StepperContextValue {
  activeStep: number;
  totalSteps: number;
  orientation: 'horizontal' | 'vertical';
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

function useStepperContext() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error('Stepper components must be used within a Stepper');
  }
  return context;
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
}

function Stepper({
  activeStep,
  orientation = 'horizontal',
  className,
  children,
  ...props
}: StepperProps) {
  const steps = React.Children.toArray(children);
  const totalSteps = steps.length;

  return (
    <StepperContext.Provider value={{ activeStep, totalSteps, orientation }}>
      <div
        data-slot='stepper'
        data-orientation={orientation}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<StepProps>(child)) {
            return React.cloneElement(child, { index });
          }
          return child;
        })}
      </div>
    </StepperContext.Provider>
  );
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number;
  icon?: React.ReactNode;
}

function Step({ index = 0, icon, className, children, ...props }: StepProps) {
  const { activeStep, totalSteps, orientation } = useStepperContext();

  const status =
    index < activeStep
      ? 'complete'
      : index === activeStep
        ? 'active'
        : 'pending';

  const isLast = index === totalSteps - 1;

  return (
    <div
      data-slot='step'
      data-status={status}
      className={cn(
        'flex',
        orientation === 'horizontal'
          ? 'flex-1 items-center'
          : 'items-start gap-4',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'flex',
          orientation === 'horizontal'
            ? 'flex-col items-center gap-2'
            : 'flex-row gap-4'
        )}
      >
        <div className='flex items-center'>
          <StepIndicator status={status} index={index} icon={icon} />
          {!isLast && orientation === 'horizontal' && (
            <StepSeparator status={status} orientation={orientation} />
          )}
        </div>
        {children && (
          <div
            className={cn(
              orientation === 'horizontal' ? 'text-center' : 'flex-1 pb-8'
            )}
          >
            {children}
          </div>
        )}
      </div>
      {!isLast && orientation === 'vertical' && (
        <StepSeparator status={status} orientation={orientation} />
      )}
    </div>
  );
}

interface StepIndicatorProps {
  status: 'complete' | 'active' | 'pending';
  index: number;
  icon?: React.ReactNode;
}

function StepIndicator({ status, index, icon }: StepIndicatorProps) {
  return (
    <div
      data-slot='step-indicator'
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors',
        status === 'complete' &&
          'border-primary bg-primary text-primary-foreground',
        status === 'active' && 'border-primary bg-background text-primary',
        status === 'pending' &&
          'border-muted bg-background text-muted-foreground'
      )}
    >
      {status === 'complete' ? (
        <Check className='size-5' />
      ) : icon ? (
        <span className='size-5'>{icon}</span>
      ) : (
        <span>{index + 1}</span>
      )}
    </div>
  );
}

interface StepSeparatorProps {
  status: 'complete' | 'active' | 'pending';
  orientation: 'horizontal' | 'vertical';
}

function StepSeparator({ status, orientation }: StepSeparatorProps) {
  return (
    <div
      data-slot='step-separator'
      className={cn(
        'transition-colors',
        orientation === 'horizontal'
          ? 'h-0.5 w-full min-w-8'
          : 'ml-5 h-full min-h-8 w-0.5',
        status === 'complete' ? 'bg-primary' : 'bg-muted'
      )}
    />
  );
}

interface StepTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

function StepTitle({ className, ...props }: StepTitleProps) {
  return (
    <h4
      data-slot='step-title'
      className={cn('text-sm font-medium', className)}
      {...props}
    />
  );
}

interface StepDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

function StepDescription({ className, ...props }: StepDescriptionProps) {
  return (
    <p
      data-slot='step-description'
      className={cn('text-muted-foreground text-xs', className)}
      {...props}
    />
  );
}

export { Stepper, Step, StepTitle, StepDescription };
