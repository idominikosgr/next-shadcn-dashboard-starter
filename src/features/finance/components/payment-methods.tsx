'use client';

import { siPaypal, siStripe, siVisa, siMastercard } from 'simple-icons';
import { Plus, MoreHorizontal } from 'lucide-react';

import { SimpleIcon } from '@/components/simple-icon';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const paymentMethods = [
  {
    id: 1,
    name: 'Visa ending in 4242',
    type: 'card',
    icon: siVisa,
    default: true,
    expiryDate: '12/25'
  },
  {
    id: 2,
    name: 'Mastercard ending in 8888',
    type: 'card',
    icon: siMastercard,
    default: false,
    expiryDate: '06/26'
  },
  {
    id: 3,
    name: 'PayPal Account',
    type: 'paypal',
    icon: siPaypal,
    default: false,
    email: 'demo@example.com'
  },
  {
    id: 4,
    name: 'Stripe Account',
    type: 'stripe',
    icon: siStripe,
    default: false,
    email: 'demo@example.com'
  }
];

export function PaymentMethods() {
  return (
    <Card className='shadow-elevation-1'>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>
          Manage your saved payment methods and add new ones.
        </CardDescription>
        <CardAction>
          <Button size='sm' variant='outline'>
            <Plus className='mr-2 size-4' />
            Add Method
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className='hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors'
            >
              <div className='flex items-center gap-3'>
                <div className='bg-muted flex size-10 shrink-0 items-center justify-center rounded-full'>
                  <SimpleIcon icon={method.icon} className='size-5' />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm font-medium'>{method.name}</p>
                    {method.default && (
                      <Badge variant='secondary' className='text-xs'>
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className='text-muted-foreground text-xs'>
                    {method.type === 'card'
                      ? `Expires ${method.expiryDate}`
                      : method.email}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  {!method.default && (
                    <DropdownMenuItem>Set as Default</DropdownMenuItem>
                  )}
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem className='text-destructive'>
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
