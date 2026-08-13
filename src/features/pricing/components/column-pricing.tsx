'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    description: 'Perfect for getting started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Up to 3 projects',
      '1 GB storage',
      'Basic analytics',
      'Community support',
      'Export data'
    ]
  },
  {
    name: 'Pro',
    description: 'Best for professionals',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      'Unlimited projects',
      '50 GB storage',
      'Advanced analytics',
      'Priority support',
      'Export data',
      'Custom domains',
      'Team collaboration'
    ],
    highlighted: true,
    badge: 'Most Popular'
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      'Unlimited projects',
      'Unlimited storage',
      'Advanced analytics',
      '24/7 dedicated support',
      'Export data',
      'Custom domains',
      'Advanced team features',
      'SSO authentication',
      'Custom integrations',
      'SLA guarantee'
    ]
  }
];

export default function ColumnPricing() {
  const [isYearly, setIsYearly] = useState(false);

  const calculateSavings = (monthly: number, yearly: number) => {
    const yearlyTotal = monthly * 12;
    const savings = yearlyTotal - yearly;
    return Math.round((savings / yearlyTotal) * 100);
  };

  return (
    <div className='w-full space-y-8'>
      {/* Header */}
      <div className='space-y-4 text-center'>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Choose Your Plan
        </h1>
        <p className='text-muted-foreground mx-auto max-w-2xl text-lg'>
          Select the perfect plan for your needs. All plans include a 14-day
          free trial.
        </p>

        {/* Billing Toggle */}
        <div className='flex items-center justify-center gap-3 pt-4'>
          <span
            className={cn(
              'text-sm font-medium transition-colors',
              !isYearly ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            aria-label='Toggle yearly billing'
          />
          <span
            className={cn(
              'text-sm font-medium transition-colors',
              isYearly ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            Yearly
          </span>
          <Badge variant='secondary' className='ml-2'>
            Save up to 20%
          </Badge>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {pricingTiers.map((tier) => {
          const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
          const savings =
            isYearly && tier.monthlyPrice > 0
              ? calculateSavings(tier.monthlyPrice, tier.yearlyPrice)
              : 0;

          return (
            <Card
              key={tier.name}
              className={cn(
                'relative flex flex-col',
                tier.highlighted &&
                  'border-primary scale-105 shadow-elevation-3 lg:scale-110'
              )}
            >
              {tier.badge && (
                <div className='absolute -top-4 left-1/2 -translate-x-1/2'>
                  <Badge className='px-3 py-1'>{tier.badge}</Badge>
                </div>
              )}

              <CardHeader className='text-center'>
                <CardTitle className='text-2xl'>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>

              <CardContent className='flex-1 space-y-6'>
                {/* Price */}
                <div className='space-y-1 text-center'>
                  <div className='flex items-baseline justify-center gap-1'>
                    <span className='text-4xl font-bold tracking-tight'>
                      ${price}
                    </span>
                    <span className='text-muted-foreground text-sm'>
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  {savings > 0 && (
                    <p className='text-primary text-sm font-medium'>
                      Save {savings}% with yearly billing
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className='space-y-3'>
                  {tier.features.map((feature) => (
                    <li key={feature} className='flex items-start gap-3'>
                      <Check className='text-primary mt-0.5 size-5 shrink-0' />
                      <span className='text-sm'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className='w-full'
                  variant={tier.highlighted ? 'default' : 'outline'}
                  size='lg'
                >
                  {tier.monthlyPrice === 0 ? 'Get Started' : 'Start Free Trial'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className='space-y-2 pt-8 text-center'>
        <p className='text-muted-foreground text-sm'>
          All plans include a 14-day free trial. No credit card required.
        </p>
        <p className='text-muted-foreground text-sm'>
          Need a custom plan?{' '}
          <a
            href='mailto:sales@nexus-dashboard.com'
            className='text-primary font-medium hover:underline'
          >
            Contact sales
          </a>
        </p>
      </div>
    </div>
  );
}
