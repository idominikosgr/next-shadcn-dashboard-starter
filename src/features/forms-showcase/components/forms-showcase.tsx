'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  FileText,
  Package,
  Bell,
  Copy,
  CheckCircle2,
  AlertCircle,
  Clock,
  Info,
  Users,
  Mail,
  Settings,
  Inbox
} from 'lucide-react';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Form components
import { FormInput } from '@/components/forms/form-input';
import { FormTextarea } from '@/components/forms/form-textarea';
import { FormSelect } from '@/components/forms/form-select';
import { FormSwitch } from '@/components/forms/form-switch';
import { FormDatePicker } from '@/components/forms/form-date-picker';

// UI components to showcase
import { Badge } from '@/components/ui/badge';
import { CopyButton, CopyButtonWithText } from '@/components/ui/copy-button';
import {
  MultiSelect,
  type MultiSelectOption
} from '@/components/ui/multi-select';
import { EmptyState, EmptyStateCompact } from '@/components/ui/empty-state';
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime
} from '@/components/ui/timeline';
import {
  Stepper,
  Step,
  StepTitle,
  StepDescription
} from '@/components/ui/stepper';
import { FileUpload } from '@/components/ui/file-upload';
import {
  NotificationCenter,
  type Notification
} from '@/components/ui/notification-center';

// Form schema for the demo
const demoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  priority: z.string().min(1, 'Please select a priority'),
  notify: z.boolean(),
  date: z.date().optional()
});

type DemoFormData = z.infer<typeof demoSchema>;

// Multi-select options
const tagOptions: MultiSelectOption[] = [
  { value: 'react', label: 'React', icon: Package },
  { value: 'nextjs', label: 'Next.js', icon: Package },
  { value: 'typescript', label: 'TypeScript', icon: FileText },
  { value: 'tailwind', label: 'Tailwind CSS', icon: Package },
  { value: 'shadcn', label: 'shadcn/ui', icon: Package }
];

// Sample notifications
const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'New message received',
    description:
      'You have a new message from John Doe regarding the project update.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    type: 'message',
    category: 'Messages'
  },
  {
    id: '2',
    title: 'Task completed',
    description: 'The deployment task has been completed successfully.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    type: 'success',
    category: 'Tasks'
  },
  {
    id: '3',
    title: 'Warning: Storage limit',
    description:
      'You are approaching your storage limit. Consider upgrading your plan.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
    type: 'warning',
    category: 'System'
  },
  {
    id: '4',
    title: 'Scheduled maintenance',
    description: 'System maintenance is scheduled for tomorrow at 2:00 AM UTC.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    type: 'info',
    category: 'System'
  }
];

export default function FormsShowcase() {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([
    'react',
    'nextjs'
  ]);
  const [activeStep, setActiveStep] = React.useState(1);
  const [files, setFiles] = React.useState<File[]>([]);
  const [notifications, setNotifications] = React.useState(sampleNotifications);

  const form = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      priority: '',
      notify: false
    }
  });

  const onSubmit = (data: DemoFormData) => {
    console.log('Form submitted:', data);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <PageContainer>
      <div className='space-y-6'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Component Showcase'
            description='Explore all available UI components and form elements'
          />
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onDelete={handleDeleteNotification}
            onClearAll={() => setNotifications([])}
          />
        </div>

        <Tabs defaultValue='badges' className='space-y-6'>
          <TabsList className='flex-wrap'>
            <TabsTrigger value='badges'>Badges</TabsTrigger>
            <TabsTrigger value='buttons'>Buttons</TabsTrigger>
            <TabsTrigger value='multi-select'>Multi-Select</TabsTrigger>
            <TabsTrigger value='timeline'>Timeline</TabsTrigger>
            <TabsTrigger value='stepper'>Stepper</TabsTrigger>
            <TabsTrigger value='empty-states'>Empty States</TabsTrigger>
            <TabsTrigger value='file-upload'>File Upload</TabsTrigger>
            <TabsTrigger value='forms'>Forms</TabsTrigger>
          </TabsList>

          {/* Badges */}
          <TabsContent value='badges'>
            <Card>
              <CardHeader>
                <CardTitle>Status Badges</CardTitle>
                <CardDescription>
                  Badge variants for different states and statuses
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div>
                  <h4 className='mb-3 text-sm font-medium'>Solid Variants</h4>
                  <div className='flex flex-wrap gap-2'>
                    <Badge variant='default'>Default</Badge>
                    <Badge variant='secondary'>Secondary</Badge>
                    <Badge variant='destructive'>Destructive</Badge>
                    <Badge variant='outline'>Outline</Badge>
                    <Badge variant='success'>Success</Badge>
                    <Badge variant='warning'>Warning</Badge>
                    <Badge variant='error'>Error</Badge>
                    <Badge variant='pending'>Pending</Badge>
                    <Badge variant='info'>Info</Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className='mb-3 text-sm font-medium'>Outline Variants</h4>
                  <div className='flex flex-wrap gap-2'>
                    <Badge variant='success-outline'>Success</Badge>
                    <Badge variant='warning-outline'>Warning</Badge>
                    <Badge variant='error-outline'>Error</Badge>
                    <Badge variant='pending-outline'>Pending</Badge>
                    <Badge variant='info-outline'>Info</Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className='mb-3 text-sm font-medium'>With Icons</h4>
                  <div className='flex flex-wrap gap-2'>
                    <Badge variant='success'>
                      <CheckCircle2 /> Completed
                    </Badge>
                    <Badge variant='warning'>
                      <AlertCircle /> Warning
                    </Badge>
                    <Badge variant='pending'>
                      <Clock /> Pending
                    </Badge>
                    <Badge variant='info'>
                      <Info /> Info
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Copy Button */}
          <TabsContent value='buttons'>
            <Card>
              <CardHeader>
                <CardTitle>Copy Button</CardTitle>
                <CardDescription>
                  Copy to clipboard with visual feedback
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='flex items-center gap-4'>
                  <code className='bg-muted rounded px-2 py-1 text-sm'>
                    npm install @shadcn/ui
                  </code>
                  <CopyButton value='npm install @shadcn/ui' />
                </div>
                <Separator />
                <div className='flex items-center gap-4'>
                  <span className='text-muted-foreground text-sm'>
                    API Key:
                  </span>
                  <code className='bg-muted rounded px-2 py-1 text-sm'>
                    sk-xxxx-xxxx-xxxx-xxxx
                  </code>
                  <CopyButtonWithText
                    value='sk-xxxx-xxxx-xxxx-xxxx'
                    label='Copy Key'
                    successLabel='Copied!'
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Multi-Select */}
          <TabsContent value='multi-select'>
            <Card>
              <CardHeader>
                <CardTitle>Multi-Select Combobox</CardTitle>
                <CardDescription>
                  Searchable multi-select for tags and filters
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='max-w-md space-y-2'>
                  <label className='text-sm font-medium'>
                    Select Technologies
                  </label>
                  <MultiSelect
                    options={tagOptions}
                    selected={selectedTags}
                    onChange={setSelectedTags}
                    placeholder='Choose technologies...'
                    searchPlaceholder='Search technologies...'
                  />
                  <p className='text-muted-foreground text-sm'>
                    Selected: {selectedTags.join(', ') || 'None'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline */}
          <TabsContent value='timeline'>
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
                <CardDescription>
                  Activity feed and audit log display
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Timeline>
                  <TimelineItem status='success'>
                    <TimelineDot status='success' icon={<CheckCircle2 />} />
                    <TimelineConnector status='success' />
                    <TimelineContent>
                      <TimelineTitle>Deployment successful</TimelineTitle>
                      <TimelineDescription>
                        Application deployed to production environment
                      </TimelineDescription>
                      <TimelineTime>2 hours ago</TimelineTime>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem status='warning'>
                    <TimelineDot status='warning' icon={<AlertCircle />} />
                    <TimelineConnector status='warning' />
                    <TimelineContent>
                      <TimelineTitle>Build warning</TimelineTitle>
                      <TimelineDescription>
                        Some dependencies are outdated and should be updated
                      </TimelineDescription>
                      <TimelineTime>5 hours ago</TimelineTime>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem status='pending'>
                    <TimelineDot status='pending' icon={<Clock />} />
                    <TimelineConnector status='pending' />
                    <TimelineContent>
                      <TimelineTitle>Review pending</TimelineTitle>
                      <TimelineDescription>
                        Pull request #42 is awaiting code review
                      </TimelineDescription>
                      <TimelineTime>1 day ago</TimelineTime>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineDot icon={<Users />} />
                    <TimelineContent>
                      <TimelineTitle>Team meeting</TimelineTitle>
                      <TimelineDescription>
                        Weekly standup with the development team
                      </TimelineDescription>
                      <TimelineTime>2 days ago</TimelineTime>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stepper */}
          <TabsContent value='stepper'>
            <Card>
              <CardHeader>
                <CardTitle>Stepper</CardTitle>
                <CardDescription>Multi-step form navigation</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <Stepper activeStep={activeStep} orientation='horizontal'>
                  <Step>
                    <StepTitle>Account</StepTitle>
                    <StepDescription>Create your account</StepDescription>
                  </Step>
                  <Step>
                    <StepTitle>Profile</StepTitle>
                    <StepDescription>Set up your profile</StepDescription>
                  </Step>
                  <Step>
                    <StepTitle>Settings</StepTitle>
                    <StepDescription>Configure preferences</StepDescription>
                  </Step>
                  <Step>
                    <StepTitle>Complete</StepTitle>
                    <StepDescription>You're all set!</StepDescription>
                  </Step>
                </Stepper>
                <div className='flex justify-center gap-2'>
                  <Button
                    variant='outline'
                    onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                    disabled={activeStep === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setActiveStep((s) => Math.min(3, s + 1))}
                    disabled={activeStep === 3}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Empty States */}
          <TabsContent value='empty-states'>
            <div className='grid gap-6 md:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Full Empty State</CardTitle>
                </CardHeader>
                <CardContent>
                  <EmptyState
                    icon={<Inbox className='size-8' />}
                    title='No messages yet'
                    description="When you receive messages, they'll appear here. Start a conversation to get going."
                    action={{
                      label: 'Compose Message',
                      onClick: () => console.log('Compose clicked')
                    }}
                    secondaryAction={{
                      label: 'Learn More',
                      onClick: () => console.log('Learn more clicked')
                    }}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Compact Empty State</CardTitle>
                </CardHeader>
                <CardContent>
                  <EmptyStateCompact
                    icon={<Mail className='size-4' />}
                    message='No results found'
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* File Upload */}
          <TabsContent value='file-upload'>
            <Card>
              <CardHeader>
                <CardTitle>File Upload</CardTitle>
                <CardDescription>
                  Advanced file upload with preview and progress
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <h4 className='text-sm font-medium'>Grid Variant</h4>
                  <FileUpload
                    value={files}
                    onValueChange={setFiles}
                    variant='grid'
                    maxFiles={6}
                    accept={{
                      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forms */}
          <TabsContent value='forms'>
            <Card>
              <CardHeader>
                <CardTitle>Form Components</CardTitle>
                <CardDescription>
                  Reusable form components with validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
                >
                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormInput
                      control={form.control}
                      name='name'
                      label='Name'
                      placeholder='Enter your name'
                      required
                    />
                    <FormInput
                      control={form.control}
                      name='email'
                      type='email'
                      label='Email'
                      placeholder='Enter your email'
                      required
                    />
                  </div>
                  <FormTextarea
                    control={form.control}
                    name='message'
                    label='Message'
                    placeholder='Enter your message'
                    config={{ rows: 4, maxLength: 500, showCharCount: true }}
                    required
                  />
                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormSelect
                      control={form.control}
                      name='priority'
                      label='Priority'
                      placeholder='Select priority'
                      options={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' }
                      ]}
                      required
                    />
                    <FormDatePicker
                      control={form.control}
                      name='date'
                      label='Due Date'
                    />
                  </div>
                  <FormSwitch
                    control={form.control}
                    name='notify'
                    label='Send notification'
                    description='Receive email when submitted'
                  />
                  <div className='flex gap-2 pt-4'>
                    <Button type='submit'>Submit</Button>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => form.reset()}
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
