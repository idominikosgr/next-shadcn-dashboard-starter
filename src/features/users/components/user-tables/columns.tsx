'use client';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { User } from '@/features/users/utils/schema';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Mail, Text } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';
import {
  BILLING_OPTIONS,
  PLAN_OPTIONS,
  ROLE_OPTIONS,
  STATUS_OPTIONS
} from './options';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => {
      return (
        <div className='relative h-10 w-10'>
          <Image
            src={row.getValue('avatar')}
            alt={row.getValue('name')}
            fill
            className='rounded-full object-cover'
          />
        </div>
      );
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ cell }) => (
      <div className='font-medium'>{cell.getValue<User['name']>()}</div>
    ),
    meta: {
      label: 'Name',
      placeholder: 'Search by name...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ cell }) => (
      <div className='text-muted-foreground text-sm'>
        {cell.getValue<User['email']>()}
      </div>
    ),
    meta: {
      label: 'Email',
      placeholder: 'Search by email...',
      variant: 'text',
      icon: Mail
    },
    enableColumnFilter: true
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ cell }) => {
      const role = cell.getValue<User['role']>();
      return (
        <Badge variant='outline' className='capitalize'>
          {role}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'Role',
      variant: 'multiSelect',
      options: ROLE_OPTIONS
    }
  },
  {
    id: 'plan',
    accessorKey: 'plan',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Plan' />
    ),
    cell: ({ cell }) => {
      const plan = cell.getValue<User['plan']>();
      return (
        <Badge
          variant={
            plan === 'Enterprise'
              ? 'default'
              : plan === 'Professional'
                ? 'secondary'
                : 'outline'
          }
          className='capitalize'
        >
          {plan}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'Plan',
      variant: 'multiSelect',
      options: PLAN_OPTIONS
    }
  },
  {
    id: 'billing',
    accessorKey: 'billing',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Billing' />
    ),
    cell: ({ cell }) => {
      const billing = cell.getValue<User['billing']>();
      return <div className='text-sm'>{billing}</div>;
    },
    enableColumnFilter: true,
    meta: {
      label: 'Billing',
      variant: 'multiSelect',
      options: BILLING_OPTIONS
    }
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<User['status']>();
      const variant =
        status === 'Active'
          ? 'default'
          : status === 'Pending'
            ? 'secondary'
            : status === 'Inactive'
              ? 'outline'
              : 'destructive';

      return (
        <Badge variant={variant} className='capitalize'>
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'Status',
      variant: 'multiSelect',
      options: STATUS_OPTIONS
    }
  },
  {
    accessorKey: 'joinedDate',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Joined Date' />
    ),
    cell: ({ cell }) => {
      const date = new Date(cell.getValue<string>());
      return <div className='text-sm'>{date.toLocaleDateString()}</div>;
    }
  },
  {
    accessorKey: 'lastLogin',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Last Login' />
    ),
    cell: ({ cell }) => {
      const date = new Date(cell.getValue<string>());
      return (
        <div className='text-muted-foreground text-sm'>
          {date.toLocaleDateString()}
        </div>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
