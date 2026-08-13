'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Bell, Mail, MessageSquare, Users, Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

type NotificationSettings = {
  email: {
    marketing: boolean;
    updates: boolean;
    comments: boolean;
    mentions: boolean;
    weeklyDigest: boolean;
  };
  push: {
    comments: boolean;
    mentions: boolean;
    messages: boolean;
    meetings: boolean;
  };
  inApp: {
    comments: boolean;
    mentions: boolean;
    messages: boolean;
    meetings: boolean;
    updates: boolean;
  };
};

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      marketing: false,
      updates: true,
      comments: true,
      mentions: true,
      weeklyDigest: true
    },
    push: {
      comments: true,
      mentions: true,
      messages: true,
      meetings: true
    },
    inApp: {
      comments: true,
      mentions: true,
      messages: true,
      meetings: true,
      updates: true
    }
  });

  const [emailFrequency, setEmailFrequency] = useState('immediate');

  const handleToggle = (category: keyof NotificationSettings, key: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key as keyof (typeof prev)[typeof category]]
      }
    }));
  };

  const handleSave = () => {
    toast.success('Notification preferences updated', {
      description: 'Your changes have been saved successfully.'
    });
    console.log(
      'Notification settings:',
      settings,
      'Frequency:',
      emailFrequency
    );
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Mail className='h-5 w-5' />
            <CardTitle>Email Notifications</CardTitle>
          </div>
          <CardDescription>
            Manage how you receive email notifications from the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between space-x-2'>
              <Label
                htmlFor='email-comments'
                className='flex flex-col space-y-1'
              >
                <span>Comments</span>
                <span className='text-muted-foreground text-sm font-normal'>
                  Receive emails when someone comments on your posts
                </span>
              </Label>
              <Switch
                id='email-comments'
                checked={settings.email.comments}
                onCheckedChange={() => handleToggle('email', 'comments')}
              />
            </div>
            <Separator />
            <div className='flex items-center justify-between space-x-2'>
              <Label
                htmlFor='email-mentions'
                className='flex flex-col space-y-1'
              >
                <span>Mentions</span>
                <span className='text-muted-foreground text-sm font-normal'>
                  Receive emails when someone mentions you
                </span>
              </Label>
              <Switch
                id='email-mentions'
                checked={settings.email.mentions}
                onCheckedChange={() => handleToggle('email', 'mentions')}
              />
            </div>
            <Separator />
            <div className='flex items-center justify-between space-x-2'>
              <Label
                htmlFor='email-updates'
                className='flex flex-col space-y-1'
              >
                <span>Product Updates</span>
                <span className='text-muted-foreground text-sm font-normal'>
                  Receive emails about new features and improvements
                </span>
              </Label>
              <Switch
                id='email-updates'
                checked={settings.email.updates}
                onCheckedChange={() => handleToggle('email', 'updates')}
              />
            </div>
            <Separator />
            <div className='flex items-center justify-between space-x-2'>
              <Label
                htmlFor='email-marketing'
                className='flex flex-col space-y-1'
              >
                <span>Marketing Emails</span>
                <span className='text-muted-foreground text-sm font-normal'>
                  Receive emails about tips, promotions, and content
                </span>
              </Label>
              <Switch
                id='email-marketing'
                checked={settings.email.marketing}
                onCheckedChange={() => handleToggle('email', 'marketing')}
              />
            </div>
            <Separator />
            <div className='flex items-center justify-between space-x-2'>
              <Label htmlFor='email-digest' className='flex flex-col space-y-1'>
                <span>Weekly Digest</span>
                <span className='text-muted-foreground text-sm font-normal'>
                  Receive a weekly summary of activity
                </span>
              </Label>
              <Switch
                id='email-digest'
                checked={settings.email.weeklyDigest}
                onCheckedChange={() => handleToggle('email', 'weeklyDigest')}
              />
            </div>
          </div>

          <div className='pt-4'>
            <Label className='text-sm font-medium'>Email Frequency</Label>
            <p className='text-muted-foreground mb-3 text-sm'>
              How often should we send you email notifications?
            </p>
            <Select value={emailFrequency} onValueChange={setEmailFrequency}>
              <SelectTrigger className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='immediate'>Immediate</SelectItem>
                <SelectItem value='hourly'>Hourly digest</SelectItem>
                <SelectItem value='daily'>Daily digest</SelectItem>
                <SelectItem value='weekly'>Weekly digest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Bell className='h-5 w-5' />
            <CardTitle>Push Notifications</CardTitle>
          </div>
          <CardDescription>
            Manage push notifications sent to your devices.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between space-x-2'>
            <Label htmlFor='push-comments' className='flex flex-col space-y-1'>
              <span>Comments</span>
              <span className='text-muted-foreground text-sm font-normal'>
                Get notified when someone comments on your posts
              </span>
            </Label>
            <Switch
              id='push-comments'
              checked={settings.push.comments}
              onCheckedChange={() => handleToggle('push', 'comments')}
            />
          </div>
          <Separator />
          <div className='flex items-center justify-between space-x-2'>
            <Label htmlFor='push-mentions' className='flex flex-col space-y-1'>
              <span>Mentions</span>
              <span className='text-muted-foreground text-sm font-normal'>
                Get notified when someone mentions you
              </span>
            </Label>
            <Switch
              id='push-mentions'
              checked={settings.push.mentions}
              onCheckedChange={() => handleToggle('push', 'mentions')}
            />
          </div>
          <Separator />
          <div className='flex items-center justify-between space-x-2'>
            <Label htmlFor='push-messages' className='flex flex-col space-y-1'>
              <span>Messages</span>
              <span className='text-muted-foreground text-sm font-normal'>
                Get notified when you receive a new message
              </span>
            </Label>
            <Switch
              id='push-messages'
              checked={settings.push.messages}
              onCheckedChange={() => handleToggle('push', 'messages')}
            />
          </div>
          <Separator />
          <div className='flex items-center justify-between space-x-2'>
            <Label htmlFor='push-meetings' className='flex flex-col space-y-1'>
              <span>Meeting Reminders</span>
              <span className='text-muted-foreground text-sm font-normal'>
                Get notified about upcoming meetings
              </span>
            </Label>
            <Switch
              id='push-meetings'
              checked={settings.push.meetings}
              onCheckedChange={() => handleToggle('push', 'meetings')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <MessageSquare className='h-5 w-5' />
            <CardTitle>In-App Notifications</CardTitle>
          </div>
          <CardDescription>
            Control which notifications appear in the application.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between space-x-2'>
            <Label htmlFor='inapp-comments' className='flex flex-col space-y-1'>
              <span>Comments</span>
              <span className='text-muted-foreground text-sm font-normal'>
                Show notifications for new comments
              </span>
            </Label>
            <Switch
              id='inapp-comments'
              checked={settings.inApp.comments}
              onCheckedChange={() => handleToggle('inApp', 'comments')}
            />
          </div>
          <Separator />
          <div className='flex items-center justify-between space-x-2'>
            <Label htmlFor='inapp-mentions' className='flex flex-col space-y-1'>
              <span>Mentions</span>
              <span className='text-muted-foreground text-sm font-normal'>
                Show notifications when you're mentioned
              </span>
            </Label>
            <Switch
              id='inapp-mentions'
              checked={settings.inApp.mentions}
              onCheckedChange={() => handleToggle('inApp', 'mentions')}
            />
          </div>
          <Separator />
          <div className='flex items-center justify-between space-x-2'>
            <Label htmlFor='inapp-messages' className='flex flex-col space-y-1'>
              <span>Messages</span>
              <span className='text-muted-foreground text-sm font-normal'>
                Show notifications for new messages
              </span>
            </Label>
            <Switch
              id='inapp-messages'
              checked={settings.inApp.messages}
              onCheckedChange={() => handleToggle('inApp', 'messages')}
            />
          </div>
          <Separator />
          <div className='flex items-center justify-between space-x-2'>
            <Label htmlFor='inapp-meetings' className='flex flex-col space-y-1'>
              <span>Meeting Reminders</span>
              <span className='text-muted-foreground text-sm font-normal'>
                Show notifications for upcoming meetings
              </span>
            </Label>
            <Switch
              id='inapp-meetings'
              checked={settings.inApp.meetings}
              onCheckedChange={() => handleToggle('inApp', 'meetings')}
            />
          </div>
          <Separator />
          <div className='flex items-center justify-between space-x-2'>
            <Label htmlFor='inapp-updates' className='flex flex-col space-y-1'>
              <span>System Updates</span>
              <span className='text-muted-foreground text-sm font-normal'>
                Show notifications about system updates
              </span>
            </Label>
            <Switch
              id='inapp-updates'
              checked={settings.inApp.updates}
              onCheckedChange={() => handleToggle('inApp', 'updates')}
            />
          </div>
        </CardContent>
      </Card>

      <div className='flex justify-end'>
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
}
