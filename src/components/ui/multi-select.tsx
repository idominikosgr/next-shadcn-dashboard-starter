'use client';

import * as React from 'react';
import { X, Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

export interface MultiSelectOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  badgeVariant?: 'default' | 'secondary' | 'outline';
  maxDisplayedItems?: number;
  disabled?: boolean;
}

function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select items...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No items found.',
  className,
  badgeVariant = 'secondary',
  maxDisplayedItems = 3,
  disabled = false
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const handleRemove = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter((item) => item !== value));
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const selectedOptions = options.filter((option) =>
    selected.includes(option.value)
  );
  const displayedOptions = selectedOptions.slice(0, maxDisplayedItems);
  const remainingCount = selectedOptions.length - maxDisplayedItems;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'h-auto min-h-9 w-full justify-between px-3 py-2',
            selected.length > 0 ? 'h-auto' : 'h-9',
            className
          )}
        >
          <div className='flex flex-1 flex-wrap gap-1'>
            {selected.length === 0 ? (
              <span className='text-muted-foreground font-normal'>
                {placeholder}
              </span>
            ) : (
              <>
                {displayedOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant={badgeVariant}
                    className='shrink-0'
                  >
                    {option.icon && <option.icon className='mr-1 size-3' />}
                    {option.label}
                    <span
                      role='button'
                      tabIndex={0}
                      className='ring-offset-background focus:ring-ring ml-1 cursor-pointer rounded-full outline-none focus:ring-2 focus:ring-offset-2'
                      onClick={(e) => handleRemove(option.value, e)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleRemove(
                            option.value,
                            e as unknown as React.MouseEvent
                          );
                        }
                      }}
                    >
                      <X className='text-muted-foreground hover:text-foreground size-3' />
                      <span className='sr-only'>Remove {option.label}</span>
                    </span>
                  </Badge>
                ))}
                {remainingCount > 0 && (
                  <Badge variant='secondary' className='shrink-0'>
                    +{remainingCount} more
                  </Badge>
                )}
              </>
            )}
          </div>
          <div className='flex shrink-0 items-center gap-1 self-stretch pl-2'>
            {selected.length > 0 && (
              <span
                role='button'
                tabIndex={0}
                className='ring-offset-background focus:ring-ring cursor-pointer rounded-sm opacity-50 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none'
                onClick={handleClear}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClear(e as unknown as React.MouseEvent);
                  }
                }}
              >
                <X className='size-4' />
                <span className='sr-only'>Clear all</span>
              </span>
            )}
            <ChevronsUpDown className='size-4 shrink-0 opacity-50' />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-(--radix-popover-trigger-width) p-0'
        align='start'
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    disabled={option.disabled}
                    className='cursor-pointer'
                  >
                    <div
                      className={cn(
                        'border-primary mr-2 flex size-4 items-center justify-center rounded-sm border',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <Check className='size-3' />
                    </div>
                    {option.icon && (
                      <option.icon className='text-muted-foreground mr-2 size-4' />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
