'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Eye, Star, TrendingUp } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Premium Dashboard',
    sales: 2847,
    revenue: '$142,350',
    growth: '+23%',
    rating: 4.8,
    stock: 145,
    category: 'Software'
  },
  {
    id: 2,
    name: 'Analytics Pro',
    sales: 1923,
    revenue: '$96,150',
    growth: '+18%',
    rating: 4.6,
    stock: 67,
    category: 'Tools'
  },
  {
    id: 3,
    name: 'Mobile App Suite',
    sales: 1456,
    revenue: '$72,800',
    growth: '+12%',
    rating: 4.9,
    stock: 234,
    category: 'Mobile'
  },
  {
    id: 4,
    name: 'Enterprise License',
    sales: 892,
    revenue: '$178,400',
    growth: '+8%',
    rating: 4.7,
    stock: 12,
    category: 'Enterprise'
  },
  {
    id: 5,
    name: 'Basic Subscription',
    sales: 3421,
    revenue: '$68,420',
    growth: '+31%',
    rating: 4.4,
    stock: 999,
    category: 'Subscription'
  }
];

export function TopProducts() {
  return (
    <Card className='via-background to-background border-border/50 cursor-pointer bg-linear-to-br from-fuchsia-500/5 shadow-elevation-1 transition-shadow hover:shadow-elevation-2'>
      <CardHeader className='flex flex-col items-start justify-between gap-4 pb-4 sm:flex-row sm:items-center sm:space-y-0'>
        <div>
          <CardTitle>Top Products</CardTitle>
          <CardDescription>Best performing products this month</CardDescription>
        </div>
        <Button
          variant='outline'
          size='sm'
          className='w-full cursor-pointer sm:w-auto'
        >
          <Eye className='mr-2 h-4 w-4' />
          View All
        </Button>
      </CardHeader>
      <CardContent className='space-y-4'>
        {products.map((product, index) => (
          <div
            key={product.id}
            className='flex flex-col items-start gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:gap-2'
          >
            <div className='bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold'>
              #{index + 1}
            </div>
            <div className='flex w-full min-w-0 flex-1 flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-2'>
              <div className='min-w-0 flex-1'>
                <div className='flex flex-wrap items-center gap-2'>
                  <p className='truncate text-sm font-medium'>{product.name}</p>
                  <Badge variant='outline' className='shrink-0 text-xs'>
                    {product.category}
                  </Badge>
                </div>
                <div className='mt-1 flex items-center space-x-2'>
                  <div className='flex items-center space-x-1'>
                    <Star className='h-3 w-3 shrink-0 fill-yellow-400 text-yellow-400' />
                    <span className='text-muted-foreground text-xs'>
                      {product.rating}
                    </span>
                  </div>
                  <span className='text-muted-foreground text-xs'>•</span>
                  <span className='text-muted-foreground text-xs'>
                    {product.sales} sales
                  </span>
                </div>
              </div>
              <div className='flex w-full flex-col gap-2 sm:w-auto sm:items-end sm:space-y-1'>
                <div className='flex flex-wrap items-center gap-2'>
                  <p className='text-sm font-medium'>{product.revenue}</p>
                  <Badge
                    variant='outline'
                    className='shrink-0 cursor-pointer border-green-200 text-green-600'
                  >
                    <TrendingUp className='mr-1 h-3 w-3' />
                    {product.growth}
                  </Badge>
                </div>
                <div className='flex w-full items-center gap-2 sm:w-auto'>
                  <span className='text-muted-foreground shrink-0 text-xs'>
                    Stock: {product.stock}
                  </span>
                  <Progress
                    value={
                      product.stock > 100 ? 100 : (product.stock / 100) * 100
                    }
                    className='h-1 flex-1 sm:w-12'
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
