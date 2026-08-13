'use client';

import * as React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback error={this.state.error} onReset={this.handleReset} />
      );
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  onReset?: () => void;
  title?: string;
  description?: string;
  className?: string;
}

function ErrorFallback({
  error,
  onReset,
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  className
}: ErrorFallbackProps) {
  return (
    <div
      className={cn(
        'border-destructive/20 bg-destructive/5 flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg border p-8 text-center',
        className
      )}
    >
      <div className='bg-destructive/10 flex size-16 items-center justify-center rounded-full'>
        <AlertCircle className='text-destructive size-8' />
      </div>
      <div className='space-y-1'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='text-muted-foreground text-sm'>{description}</p>
        {error && process.env.NODE_ENV === 'development' && (
          <details className='mt-2 text-left'>
            <summary className='text-muted-foreground cursor-pointer text-xs'>
              Error details
            </summary>
            <pre className='bg-muted mt-2 max-h-32 overflow-auto rounded p-2 text-xs'>
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
      {onReset && (
        <Button variant='outline' onClick={onReset}>
          <RefreshCw className='mr-2 size-4' />
          Try again
        </Button>
      )}
    </div>
  );
}

export { ErrorBoundary, ErrorFallback };
