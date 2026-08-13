'use client';

import React, { useState } from 'react';
import { Check, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  highlighted?: boolean;
  badge?: string;
}

interface FeatureCategory {
  category: string;
  features: {
    name: string;
    free: boolean | string;
    pro: boolean | string;
    enterprise: boolean | string;
    tooltip?: string;
  }[];
}

const plans: Plan[] = [
  {
    name: 'Free',
    description: 'For individuals',
    monthlyPrice: 0,
    yearlyPrice: 0
  },
  {
    name: 'Pro',
    description: 'For professionals',
    monthlyPrice: 29,
    yearlyPrice: 290,
    highlighted: true,
    badge: 'Most Popular'
  },
  {
    name: 'Enterprise',
    description: 'For organizations',
    monthlyPrice: 99,
    yearlyPrice: 990
  }
];

const featureCategories: FeatureCategory[] = [
  {
    category: 'Core Features',
    features: [
      {
        name: 'Projects',
        free: '3 projects',
        pro: 'Unlimited',
        enterprise: 'Unlimited',
        tooltip: 'Number of active projects you can manage'
      },
      {
        name: 'Storage',
        free: '1 GB',
        pro: '50 GB',
        enterprise: 'Unlimited',
        tooltip: 'Total storage space for files and assets'
      },
      {
        name: 'Team members',
        free: '1 user',
        pro: '10 users',
        enterprise: 'Unlimited',
        tooltip: 'Number of team members who can access the workspace'
      },
      {
        name: 'Custom domains',
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: 'API access',
        free: false,
        pro: true,
        enterprise: true
      }
    ]
  },
  {
    category: 'Analytics & Reporting',
    features: [
      {
        name: 'Basic analytics',
        free: true,
        pro: true,
        enterprise: true
      },
      {
        name: 'Advanced analytics',
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: 'Custom reports',
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: 'Data export',
        free: 'CSV only',
        pro: 'All formats',
        enterprise: 'All formats',
        tooltip: 'Export your data in various formats'
      },
      {
        name: 'Real-time updates',
        free: false,
        pro: true,
        enterprise: true
      }
    ]
  },
  {
    category: 'Support & Security',
    features: [
      {
        name: 'Community support',
        free: true,
        pro: true,
        enterprise: true
      },
      {
        name: 'Email support',
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: 'Priority support',
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: '24/7 phone support',
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: 'SSO authentication',
        free: false,
        pro: false,
        enterprise: true,
        tooltip: 'Single Sign-On for enterprise security'
      },
      {
        name: 'Advanced security',
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: 'Custom SLA',
        free: false,
        pro: false,
        enterprise: true,
        tooltip: 'Service Level Agreement with guaranteed uptime'
      }
    ]
  },
  {
    category: 'Advanced Features',
    features: [
      {
        name: 'Custom integrations',
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: 'Webhooks',
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: 'White labeling',
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: 'Dedicated account manager',
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: 'Custom training',
        free: false,
        pro: false,
        enterprise: true
      }
    ]
  }
];

function FeatureCell({
  value,
  tooltip
}: {
  value: boolean | string;
  tooltip?: string;
}) {
  const content = (
    <>
      {typeof value === 'boolean' ? (
        value ? (
          <Check className='text-primary mx-auto size-5' />
        ) : (
          <X className='text-muted-foreground/40 mx-auto size-5' />
        )
      ) : (
        <span className='text-sm font-medium'>{value}</span>
      )}
    </>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='flex cursor-help items-center justify-center gap-1'>
              {content}
              <Info className='text-muted-foreground size-3' />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className='max-w-xs'>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <div className='flex items-center justify-center'>{content}</div>;
}

export default function TablePricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className='w-full space-y-8'>
      {/* Header */}
      <div className='space-y-4 text-center'>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Compare Plans
        </h1>
        <p className='text-muted-foreground mx-auto max-w-2xl text-lg'>
          Choose the plan that best fits your needs. All plans include a 14-day
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

      {/* Pricing Table */}
      <div className='overflow-x-auto'>
        <div className='inline-block min-w-full align-middle'>
          <div className='overflow-hidden rounded-lg border'>
            <table className='min-w-full divide-y'>
              {/* Table Header */}
              <thead className='bg-muted/50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-4 text-left text-sm font-semibold'
                  >
                    Features
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      scope='col'
                      className={cn(
                        'px-6 py-4 text-center',
                        plan.highlighted && 'bg-primary/5'
                      )}
                    >
                      <div className='space-y-2'>
                        {plan.badge && (
                          <Badge className='mb-1'>{plan.badge}</Badge>
                        )}
                        <div className='text-lg font-semibold'>{plan.name}</div>
                        <div className='text-muted-foreground text-xs font-normal'>
                          {plan.description}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
                <tr>
                  <th className='px-6 py-4'></th>
                  {plans.map((plan) => {
                    const price = isYearly
                      ? plan.yearlyPrice
                      : plan.monthlyPrice;
                    return (
                      <th
                        key={`${plan.name}-price`}
                        className={cn(
                          'px-6 py-4 text-center',
                          plan.highlighted && 'bg-primary/5'
                        )}
                      >
                        <div className='space-y-3'>
                          <div className='flex items-baseline justify-center gap-1'>
                            <span className='text-3xl font-bold'>${price}</span>
                            <span className='text-muted-foreground text-sm'>
                              /{isYearly ? 'year' : 'month'}
                            </span>
                          </div>
                          <Button
                            variant={plan.highlighted ? 'default' : 'outline'}
                            size='sm'
                            className='w-full'
                          >
                            {plan.monthlyPrice === 0
                              ? 'Get Started'
                              : 'Start Free Trial'}
                          </Button>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className='bg-card divide-y'>
                {featureCategories.map((category, categoryIndex) => (
                  <React.Fragment key={category.category}>
                    {/* Category Header */}
                    <tr className='bg-muted/30'>
                      <td
                        colSpan={4}
                        className='px-6 py-3 text-sm font-semibold'
                      >
                        {category.category}
                      </td>
                    </tr>
                    {/* Category Features */}
                    {category.features.map((feature, featureIndex) => (
                      <tr
                        key={`${category.category}-${feature.name}`}
                        className={cn(
                          'hover:bg-muted/30 transition-colors',
                          featureIndex % 2 === 0 && 'bg-muted/10'
                        )}
                      >
                        <td className='px-6 py-4 text-sm font-medium'>
                          {feature.name}
                        </td>
                        <td
                          className={cn(
                            'px-6 py-4 text-center',
                            plans[0].highlighted && 'bg-primary/5'
                          )}
                        >
                          <FeatureCell
                            value={feature.free}
                            tooltip={feature.tooltip}
                          />
                        </td>
                        <td
                          className={cn(
                            'px-6 py-4 text-center',
                            plans[1].highlighted && 'bg-primary/5'
                          )}
                        >
                          <FeatureCell
                            value={feature.pro}
                            tooltip={feature.tooltip}
                          />
                        </td>
                        <td
                          className={cn(
                            'px-6 py-4 text-center',
                            plans[2].highlighted && 'bg-primary/5'
                          )}
                        >
                          <FeatureCell
                            value={feature.enterprise}
                            tooltip={feature.tooltip}
                          />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className='space-y-2 pt-4 text-center'>
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
