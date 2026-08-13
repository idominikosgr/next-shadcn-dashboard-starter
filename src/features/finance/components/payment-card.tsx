'use client';

import { Plus } from 'lucide-react';
import { siApple } from 'simple-icons';

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
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function ChipSVG() {
  return (
    <svg
      enableBackground='new 0 0 132 92'
      viewBox='0 0 132 92'
      xmlns='http://www.w3.org/2000/svg'
      className='w-14'
    >
      <title>Chip</title>
      <rect
        x='0.5'
        y='0.5'
        width='131'
        height='91'
        rx='15'
        className='fill-accent stroke-accent'
      />
      <rect
        x='9.5'
        y='9.5'
        width='48'
        height='21'
        rx='10.5'
        className='fill-accent stroke-accent-foreground'
      />
      <rect
        x='9.5'
        y='61.5'
        width='48'
        height='21'
        rx='10.5'
        className='fill-accent stroke-accent-foreground'
      />
      <rect
        x='9.5'
        y='35.5'
        width='48'
        height='21'
        rx='10.5'
        className='fill-accent stroke-accent-foreground'
      />
      <rect
        x='74.5'
        y='9.5'
        width='48'
        height='21'
        rx='10.5'
        className='fill-accent stroke-accent-foreground'
      />
      <rect
        x='74.5'
        y='61.5'
        width='48'
        height='21'
        rx='10.5'
        className='fill-accent stroke-accent-foreground'
      />
      <rect
        x='74.5'
        y='35.5'
        width='48'
        height='21'
        rx='10.5'
        className='fill-accent stroke-accent-foreground'
      />
    </svg>
  );
}

export function PaymentCard() {
  return (
    <Card className='shadow-elevation-1'>
      <CardHeader className='items-center'>
        <CardTitle>Payment Cards</CardTitle>
        <CardDescription>
          Manage your virtual and physical payment cards.
        </CardDescription>
        <CardAction>
          <Button size='icon' variant='outline'>
            <Plus className='size-4' />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Tabs className='gap-4' defaultValue='virtual'>
          <TabsList className='w-full'>
            <TabsTrigger value='virtual'>Virtual</TabsTrigger>
            <TabsTrigger value='physical' disabled>
              Physical
            </TabsTrigger>
          </TabsList>
          <TabsContent value='virtual'>
            <div className='space-y-4'>
              <div className='bg-primary relative aspect-8/5 w-full max-w-96 overflow-hidden rounded-xl perspective-distant'>
                <div className='absolute top-6 left-6'>
                  <SimpleIcon
                    icon={siApple}
                    className='fill-primary-foreground size-8'
                  />
                </div>
                <div className='absolute top-1/2 w-full -translate-y-1/2'>
                  <div className='flex items-end justify-between px-6'>
                    <span className='text-accent font-mono text-lg leading-none font-medium tracking-wide uppercase'>
                      Demo User
                    </span>
                    <ChipSVG />
                  </div>
                </div>
              </div>

              <div className='space-y-2 text-sm'>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Card Number</span>
                  <span className='font-medium tabular-nums'>
                    •••• •••• 5416
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Expiry Date</span>
                  <span className='font-medium tabular-nums'>06/09</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>CVC</span>
                  <span className='font-medium'>•••</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Spending Limit</span>
                  <span className='font-medium tabular-nums'>$62,000.00</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>
                    Available Balance
                  </span>
                  <span className='font-medium tabular-nums'>$13,100.06</span>
                </div>
              </div>

              <div className='flex gap-2'>
                <Button className='flex-1' variant='outline' size='sm'>
                  Freeze Card
                </Button>
                <Button className='flex-1' variant='outline' size='sm'>
                  Set Limit
                </Button>
                <Button className='flex-1' variant='outline' size='sm'>
                  More
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='physical'>
            Physical card details are currently unavailable
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
