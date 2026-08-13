'use client';

import * as React from 'react';
import { Check, Copy } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button, type buttonVariants } from '@/components/ui/button';
import type { VariantProps } from 'class-variance-authority';

interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  value: string;
  onCopy?: () => void;
  /** Duration in ms to show success state */
  successDuration?: number;
}

function CopyButton({
  value,
  onCopy,
  successDuration = 2000,
  variant = 'ghost',
  size = 'icon',
  className,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => {
        setHasCopied(false);
      }, successDuration);
      return () => clearTimeout(timeout);
    }
  }, [hasCopied, successDuration]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setHasCopied(true);
      onCopy?.();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('relative', className)}
      onClick={handleCopy}
      {...props}
    >
      <span className='sr-only'>{hasCopied ? 'Copied' : 'Copy'}</span>
      {hasCopied ? (
        <Check className='text-chart-2 size-4' />
      ) : (
        <Copy className='size-4' />
      )}
    </Button>
  );
}

interface CopyButtonWithTextProps extends CopyButtonProps {
  label?: string;
  successLabel?: string;
}

function CopyButtonWithText({
  value,
  onCopy,
  successDuration = 2000,
  variant = 'outline',
  size = 'sm',
  label = 'Copy',
  successLabel = 'Copied!',
  className,
  ...props
}: CopyButtonWithTextProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => {
        setHasCopied(false);
      }, successDuration);
      return () => clearTimeout(timeout);
    }
  }, [hasCopied, successDuration]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setHasCopied(true);
      onCopy?.();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('gap-2', className)}
      onClick={handleCopy}
      {...props}
    >
      {hasCopied ? (
        <>
          <Check className='text-chart-2 size-4' />
          <span>{successLabel}</span>
        </>
      ) : (
        <>
          <Copy className='size-4' />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
}

export { CopyButton, CopyButtonWithText };
