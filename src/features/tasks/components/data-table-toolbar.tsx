'use client';

import type { Table } from '@tanstack/react-table';
import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from '@/components/ui/table/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/ui/table/data-table-view-options';

import type { Task } from '../utils/schema';
import { priorities, statuses } from '../utils/task-data';
import { AddTaskModal } from './add-task-modal';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onAddTask?: (task: Task) => void;
}

export function DataTableToolbar<TData>({
  table,
  onAddTask
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2' />
          <Input
            placeholder='Search tasks...'
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('title')?.setFilterValue(event.target.value)
            }
            className='h-9 w-[200px] pl-8 lg:w-[280px]'
          />
        </div>
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title='Status'
            options={statuses}
            multiple
          />
        )}
        {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title='Priority'
            options={priorities}
            multiple
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-9 px-3'
          >
            Reset
            <X className='ml-1 size-4' />
          </Button>
        )}
      </div>
      <div className='flex items-center gap-2'>
        <DataTableViewOptions table={table} />
        <AddTaskModal onAddTask={onAddTask} />
      </div>
    </div>
  );
}
