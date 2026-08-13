'use client';

import * as React from 'react';
import { AlertCircle, CheckCircle, Info, Loader2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CopyButton, CopyButtonWithText } from '@/components/ui/copy-button';
import { EmptyState, EmptyStateCompact } from '@/components/ui/empty-state';
import { ErrorBoundary, ErrorFallback } from '@/components/ui/error-boundary';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import {
  MultiSelect,
  type MultiSelectOption
} from '@/components/ui/multi-select';
import {
  NotificationCenter,
  type Notification
} from '@/components/ui/notification-center';
import { Separator } from '@/components/ui/separator';
import {
  SkeletonForm,
  SkeletonTable,
  SkeletonCard,
  SkeletonList
} from '@/components/ui/skeleton-patterns';
import { Spinner } from '@/components/ui/spinner';
import {
  Step,
  StepDescription,
  Stepper,
  StepTitle
} from '@/components/ui/stepper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineItem,
  TimelineTitle
} from '@/components/ui/timeline';
import { MiniCalendar } from '@/components/ui/mini-calendar';
import {
  UpcomingEvents,
  type CalendarEvent
} from '@/components/ui/upcoming-events';

// Demo error component that returns a ReactNode
function BuggyComponent(): React.ReactNode {
  throw new Error('This is a demo error to showcase ErrorBoundary!');
}

const multiSelectOptions: MultiSelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt' }
];

const demoNotifications: Notification[] = [
  {
    id: '1',
    title: 'New message received',
    description: 'John Doe sent you a message',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    type: 'message'
  },
  {
    id: '2',
    title: 'Payment successful',
    description: 'Your subscription has been renewed',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: false,
    type: 'success'
  },
  {
    id: '3',
    title: 'System update',
    description: 'New features have been deployed',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    type: 'info'
  }
];

const demoEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 2.5 * 60 * 60 * 1000),
    color: 'var(--chart-1)'
  },
  {
    id: '2',
    title: 'Product Review',
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 25 * 60 * 60 * 1000),
    color: 'var(--chart-2)'
  },
  {
    id: '3',
    title: 'Client Call',
    startTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 49 * 60 * 60 * 1000),
    color: 'var(--chart-3)'
  }
];

// Convert events to mini-calendar format
const miniCalendarEvents = demoEvents.map((e) => ({
  date: e.startTime,
  color: e.color
}));

export function ComponentShowcase() {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [showLoadingOverlay, setShowLoadingOverlay] = React.useState(false);
  const [notifications, setNotifications] = React.useState(demoNotifications);
  const [showError, setShowError] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <h1 className='text-3xl font-bold'>Component Showcase</h1>
        <p className='text-muted-foreground mt-2'>
          A gallery of robust, reusable UI components in our design system.
        </p>
      </div>

      <Tabs defaultValue='feedback' className='w-full'>
        <TabsList className='grid w-full grid-cols-5'>
          <TabsTrigger value='feedback'>Feedback</TabsTrigger>
          <TabsTrigger value='data-display'>Data Display</TabsTrigger>
          <TabsTrigger value='inputs'>Inputs</TabsTrigger>
          <TabsTrigger value='loading'>Loading</TabsTrigger>
          <TabsTrigger value='calendar'>Calendar</TabsTrigger>
        </TabsList>

        {/* Feedback Components */}
        <TabsContent value='feedback' className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            {/* Empty States */}
            <Card>
              <CardHeader>
                <CardTitle>Empty State</CardTitle>
                <CardDescription>
                  Display when no content is available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyState
                  icon={<Info className='size-8' />}
                  title='No results found'
                  description='Try adjusting your search or filters'
                  action={{ label: 'Clear filters', onClick: () => {} }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Empty State Compact</CardTitle>
                <CardDescription>
                  Smaller variant for tight spaces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyStateCompact
                  icon={<AlertCircle className='size-4' />}
                  message='No items yet - Add your first item to get started'
                />
              </CardContent>
            </Card>

            {/* Error Boundary */}
            <Card className='md:col-span-2'>
              <CardHeader>
                <CardTitle>Error Boundary</CardTitle>
                <CardDescription>
                  Gracefully handle component errors
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <Button
                    variant={showError ? 'destructive' : 'outline'}
                    onClick={() => setShowError(!showError)}
                  >
                    {showError ? 'Hide Error' : 'Trigger Error'}
                  </Button>
                  <span className='text-muted-foreground text-sm'>
                    Click to demonstrate error handling
                  </span>
                </div>
                <ErrorBoundary
                  fallback={
                    <ErrorFallback
                      error={new Error('Demo error')}
                      onReset={() => setShowError(false)}
                    />
                  }
                >
                  {showError ? (
                    <BuggyComponent />
                  ) : (
                    <div className='bg-muted/50 rounded-lg border p-4'>
                      <p className='text-sm'>Normal component content</p>
                    </div>
                  )}
                </ErrorBoundary>
              </CardContent>
            </Card>

            {/* Notification Center */}
            <Card className='md:col-span-2'>
              <CardHeader>
                <CardTitle>Notification Center</CardTitle>
                <CardDescription>Manage user notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex items-center gap-4'>
                  <NotificationCenter
                    notifications={notifications}
                    onMarkAsRead={(id) => {
                      setNotifications((prev) =>
                        prev.map((n) =>
                          n.id === id ? { ...n, read: true } : n
                        )
                      );
                    }}
                    onMarkAllAsRead={() => {
                      setNotifications((prev) =>
                        prev.map((n) => ({ ...n, read: true }))
                      );
                    }}
                    onDelete={(id) => {
                      setNotifications((prev) =>
                        prev.filter((n) => n.id !== id)
                      );
                    }}
                    onClearAll={() => setNotifications([])}
                  />
                  <span className='text-muted-foreground text-sm'>
                    Click the bell icon to view notifications
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Data Display Components */}
        <TabsContent value='data-display' className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
                <CardDescription>Display chronological events</CardDescription>
              </CardHeader>
              <CardContent>
                <Timeline>
                  <TimelineItem status='success'>
                    <TimelineDot
                      status='success'
                      icon={<CheckCircle className='size-3' />}
                    />
                    <TimelineConnector status='success' />
                    <TimelineContent>
                      <TimelineTitle>Order placed</TimelineTitle>
                      <TimelineDescription>2 hours ago</TimelineDescription>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem status='warning'>
                    <TimelineDot
                      status='warning'
                      icon={<Loader2 className='size-3 animate-spin' />}
                    />
                    <TimelineConnector status='warning' />
                    <TimelineContent>
                      <TimelineTitle>Processing</TimelineTitle>
                      <TimelineDescription>In progress</TimelineDescription>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem status='pending'>
                    <TimelineDot status='pending' />
                    <TimelineContent>
                      <TimelineTitle>Delivered</TimelineTitle>
                      <TimelineDescription>Pending</TimelineDescription>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </CardContent>
            </Card>

            {/* Stepper */}
            <Card>
              <CardHeader>
                <CardTitle>Stepper</CardTitle>
                <CardDescription>Multi-step progress indicator</CardDescription>
              </CardHeader>
              <CardContent>
                <Stepper activeStep={1} orientation='vertical'>
                  <Step>
                    <StepTitle>Account Details</StepTitle>
                    <StepDescription>
                      Enter your email and password
                    </StepDescription>
                  </Step>
                  <Step>
                    <StepTitle>Personal Info</StepTitle>
                    <StepDescription>Tell us about yourself</StepDescription>
                  </Step>
                  <Step>
                    <StepTitle>Confirmation</StepTitle>
                    <StepDescription>Review and submit</StepDescription>
                  </Step>
                </Stepper>
              </CardContent>
            </Card>

            {/* Copy Button */}
            <Card>
              <CardHeader>
                <CardTitle>Copy Button</CardTitle>
                <CardDescription>One-click copy to clipboard</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <code className='bg-muted rounded px-2 py-1 text-sm'>
                    npm install @shadcn/ui
                  </code>
                  <CopyButton value='npm install @shadcn/ui' />
                </div>
                <Separator />
                <CopyButtonWithText
                  value='https://example.com/api/v1'
                  label='API Endpoint'
                />
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Badge Variants</CardTitle>
                <CardDescription>Status and label indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  <Badge>Default</Badge>
                  <Badge variant='secondary'>Secondary</Badge>
                  <Badge variant='outline'>Outline</Badge>
                  <Badge variant='destructive'>Destructive</Badge>
                  <Badge variant='success'>Success</Badge>
                  <Badge variant='warning'>Warning</Badge>
                  <Badge variant='info'>Info</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Input Components */}
        <TabsContent value='inputs' className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            {/* Multi-Select */}
            <Card>
              <CardHeader>
                <CardTitle>Multi-Select</CardTitle>
                <CardDescription>
                  Select multiple options with search
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <MultiSelect
                  options={multiSelectOptions}
                  selected={selectedValues}
                  onChange={setSelectedValues}
                  placeholder='Select frameworks...'
                />
                {selectedValues.length > 0 && (
                  <div className='flex flex-wrap gap-1'>
                    {selectedValues.map((value) => (
                      <Badge key={value} variant='secondary'>
                        {
                          multiSelectOptions.find((o) => o.value === value)
                            ?.label
                        }
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Loading Components */}
        <TabsContent value='loading' className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            {/* Spinner */}
            <Card>
              <CardHeader>
                <CardTitle>Spinner Variants</CardTitle>
                <CardDescription>
                  Loading indicators in different sizes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex items-center gap-6'>
                  <Spinner size='sm' />
                  <Spinner size='default' />
                  <Spinner size='lg' />
                  <Spinner size='xl' />
                </div>
              </CardContent>
            </Card>

            {/* Loading Overlay */}
            <Card>
              <CardHeader>
                <CardTitle>Loading Overlay</CardTitle>
                <CardDescription>Full container loading state</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    setShowLoadingOverlay(true);
                    setTimeout(() => setShowLoadingOverlay(false), 2000);
                  }}
                >
                  Show Loading (2s)
                </Button>
                <div className='relative mt-4 h-32 rounded-lg border'>
                  <LoadingOverlay
                    isLoading={showLoadingOverlay}
                    text='Processing...'
                  >
                    <div className='flex h-full items-center justify-center'>
                      <p className='text-muted-foreground text-sm'>
                        Content area
                      </p>
                    </div>
                  </LoadingOverlay>
                </div>
              </CardContent>
            </Card>

            {/* Skeleton Patterns */}
            <Card className='md:col-span-2'>
              <CardHeader>
                <CardTitle>Skeleton Patterns</CardTitle>
                <CardDescription>
                  Pre-built loading placeholders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue='form'>
                  <TabsList>
                    <TabsTrigger value='form'>Form</TabsTrigger>
                    <TabsTrigger value='table'>Table</TabsTrigger>
                    <TabsTrigger value='cards'>Cards</TabsTrigger>
                    <TabsTrigger value='list'>List</TabsTrigger>
                  </TabsList>
                  <TabsContent value='form' className='mt-4'>
                    <SkeletonForm />
                  </TabsContent>
                  <TabsContent value='table' className='mt-4'>
                    <SkeletonTable rows={3} columns={4} />
                  </TabsContent>
                  <TabsContent value='cards' className='mt-4'>
                    <div className='grid gap-4 md:grid-cols-3'>
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </div>
                  </TabsContent>
                  <TabsContent value='list' className='mt-4'>
                    <SkeletonList items={4} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Calendar Components */}
        <TabsContent value='calendar' className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            {/* Mini Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Mini Calendar</CardTitle>
                <CardDescription>Compact date picker widget</CardDescription>
              </CardHeader>
              <CardContent className='flex justify-center'>
                <MiniCalendar
                  value={selectedDate}
                  onChange={setSelectedDate}
                  events={miniCalendarEvents}
                />
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Event list widget</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingEvents
                  events={demoEvents}
                  onEventClick={(event) => console.log('Clicked:', event)}
                  maxEvents={5}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
