'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Zap, Shield, Clock } from 'lucide-react';
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

interface Feature {
  name: string;
  included: boolean;
  description?: string;
}

const proFeatures: Feature[] = [
  { name: 'Unlimited projects', included: true },
  { name: 'Advanced analytics dashboard', included: true },
  { name: 'Priority email support', included: true },
  { name: 'Custom domains', included: true },
  { name: 'Team collaboration (up to 10 members)', included: true },
  { name: '100 GB storage', included: true },
  { name: 'API access', included: true },
  { name: 'Custom integrations', included: true },
  { name: 'Advanced security features', included: true },
  { name: 'Export all data formats', included: true },
  { name: 'SSO authentication', included: false },
  { name: 'Dedicated account manager', included: false },
  { name: 'Custom SLA', included: false }
];

const benefits = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance for the best user experience'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and security protocols'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock support from our expert team'
  }
];

export default function SinglePricing() {
  const [isYearly, setIsYearly] = useState(false);

  const monthlyPrice = 29;
  const yearlyPrice = 290;
  const price = isYearly ? yearlyPrice : monthlyPrice;
  const savings = Math.round(
    ((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12)) * 100
  );

  return (
    <div className='w-full space-y-12'>
      {/* Header */}
      <div className='space-y-4 text-center'>
        <Badge className='mb-4' variant='secondary'>
          Most Popular Plan
        </Badge>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
          Nexus Pro
        </h1>
        <p className='text-muted-foreground mx-auto max-w-2xl text-lg'>
          Everything you need to grow your business. Start your 14-day free
          trial today.
        </p>
      </div>

      {/* Main Pricing Card */}
      <div className='mx-auto max-w-4xl'>
        <Card className='border-primary shadow-elevation-4'>
          <CardHeader className='pb-8 text-center'>
            {/* Billing Toggle */}
            <div className='mb-6 flex items-center justify-center gap-3'>
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
              {isYearly && (
                <Badge variant='secondary' className='ml-2'>
                  Save {savings}%
                </Badge>
              )}
            </div>

            {/* Price */}
            <div className='space-y-2'>
              <div className='flex items-baseline justify-center gap-2'>
                <span className='text-5xl font-bold tracking-tight'>
                  ${price}
                </span>
                <span className='text-muted-foreground text-lg'>
                  /{isYearly ? 'year' : 'month'}
                </span>
              </div>
              {isYearly && (
                <p className='text-primary text-sm font-medium'>
                  That's only ${(yearlyPrice / 12).toFixed(2)} per month
                </p>
              )}
            </div>
          </CardHeader>

          <CardContent className='space-y-8'>
            {/* Benefits Grid */}
            <div className='grid grid-cols-1 gap-6 border-y py-6 md:grid-cols-3'>
              {benefits.map((benefit) => (
                <div key={benefit.title} className='space-y-2 text-center'>
                  <benefit.icon className='text-primary mx-auto size-8' />
                  <h3 className='font-semibold'>{benefit.title}</h3>
                  <p className='text-muted-foreground text-sm'>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div>
              <h3 className='mb-4 text-lg font-semibold'>
                Everything included:
              </h3>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {proFeatures.map((feature) => (
                  <div
                    key={feature.name}
                    className={cn(
                      'flex items-start gap-3',
                      !feature.included && 'opacity-50'
                    )}
                  >
                    {feature.included ? (
                      <Check className='text-primary mt-0.5 size-5 shrink-0' />
                    ) : (
                      <X className='text-muted-foreground mt-0.5 size-5 shrink-0' />
                    )}
                    <span className='text-sm'>{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className='flex-col gap-4'>
            <Button size='lg' className='w-full text-base'>
              Start Free Trial
              <ArrowRight className='ml-2 size-4' />
            </Button>
            <p className='text-muted-foreground text-center text-sm'>
              No credit card required. Cancel anytime.
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* FAQ or Additional Info */}
      <div className='mx-auto max-w-2xl space-y-4 text-center'>
        <h2 className='text-2xl font-bold'>Frequently Asked Questions</h2>
        <div className='space-y-4 text-left'>
          <div>
            <h3 className='mb-1 font-semibold'>Can I change plans later?</h3>
            <p className='text-muted-foreground text-sm'>
              Yes, you can upgrade or downgrade your plan at any time. Changes
              will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className='mb-1 font-semibold'>
              What payment methods do you accept?
            </h3>
            <p className='text-muted-foreground text-sm'>
              We accept all major credit cards, PayPal, and wire transfers for
              annual plans.
            </p>
          </div>
          <div>
            <h3 className='mb-1 font-semibold'>
              Is there a discount for non-profits?
            </h3>
            <p className='text-muted-foreground text-sm'>
              Yes! We offer a 50% discount for registered non-profit
              organizations.{' '}
              <a
                href='mailto:sales@nexus-dashboard.com'
                className='text-primary hover:underline'
              >
                Contact us
              </a>{' '}
              for more details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
