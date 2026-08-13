'use client';

import * as React from 'react';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  MessageSquare,
  AlertCircle,
  Info,
  CheckCircle2,
  Calendar
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface Notification {
  id: string;
  title: string;
  description?: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error' | 'message' | 'event';
  category?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDelete?: (id: string) => void;
  onClearAll?: () => void;
  onSettingsClick?: () => void;
  className?: string;
}

const notificationIcons: Record<Notification['type'], React.ReactNode> = {
  info: <Info className='text-chart-1 size-4' />,
  success: <CheckCircle2 className='text-chart-2 size-4' />,
  warning: <AlertCircle className='text-chart-4 size-4' />,
  error: <AlertCircle className='text-destructive size-4' />,
  message: <MessageSquare className='text-chart-3 size-4' />,
  event: <Calendar className='text-chart-5 size-4' />
};

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll,
  onSettingsClick,
  className
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const [activeTab, setActiveTab] = React.useState<string>('all');

  const filteredNotifications = React.useMemo(() => {
    if (activeTab === 'all') return notifications;
    if (activeTab === 'unread') return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.type === activeTab);
  }, [notifications, activeTab]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className={cn('relative', className)}
        >
          <Bell className='size-5' />
          {unreadCount > 0 && (
            <span className='bg-destructive absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-medium text-white'>
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
          <span className='sr-only'>
            {unreadCount > 0
              ? `${unreadCount} unread notifications`
              : 'No unread notifications'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[380px] p-0' align='end' sideOffset={8}>
        <div className='flex items-center justify-between border-b px-4 py-3'>
          <div className='flex items-center gap-2'>
            <h4 className='font-semibold'>Notifications</h4>
            {unreadCount > 0 && (
              <Badge variant='secondary' className='text-xs'>
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div className='flex items-center gap-1'>
            {onMarkAllAsRead && unreadCount > 0 && (
              <Button
                variant='ghost'
                size='icon'
                className='size-8'
                onClick={onMarkAllAsRead}
              >
                <CheckCheck className='size-4' />
                <span className='sr-only'>Mark all as read</span>
              </Button>
            )}
            {onSettingsClick && (
              <Button
                variant='ghost'
                size='icon'
                className='size-8'
                onClick={onSettingsClick}
              >
                <Settings className='size-4' />
                <span className='sr-only'>Notification settings</span>
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='grid w-full grid-cols-3 rounded-none border-b bg-transparent p-0'>
            <TabsTrigger
              value='all'
              className='data-[state=active]:border-primary rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent'
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value='unread'
              className='data-[state=active]:border-primary rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent'
            >
              Unread
            </TabsTrigger>
            <TabsTrigger
              value='message'
              className='data-[state=active]:border-primary rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent'
            >
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className='m-0'>
            <ScrollArea className='h-[300px]'>
              {filteredNotifications.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-12 text-center'>
                  <Bell className='text-muted-foreground/50 mb-2 size-10' />
                  <p className='text-muted-foreground text-sm'>
                    No notifications
                  </p>
                </div>
              ) : (
                <div className='flex flex-col'>
                  {filteredNotifications.map((notification, index) => (
                    <React.Fragment key={notification.id}>
                      <NotificationItem
                        notification={notification}
                        onMarkAsRead={onMarkAsRead}
                        onDelete={onDelete}
                      />
                      {index < filteredNotifications.length - 1 && (
                        <Separator />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {notifications.length > 0 && onClearAll && (
          <>
            <Separator />
            <div className='p-2'>
              <Button
                variant='ghost'
                size='sm'
                className='text-muted-foreground w-full'
                onClick={onClearAll}
              >
                <Trash2 className='mr-2 size-4' />
                Clear all notifications
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete
}: NotificationItemProps) {
  return (
    <div
      className={cn(
        'group hover:bg-muted/50 relative flex gap-3 px-4 py-3 transition-colors',
        !notification.read && 'bg-primary/5'
      )}
    >
      <div className='bg-muted flex size-8 shrink-0 items-center justify-center rounded-full'>
        {notificationIcons[notification.type]}
      </div>
      <div className='flex min-w-0 flex-1 flex-col gap-1'>
        <div className='flex items-start justify-between gap-2'>
          <p className={cn('text-sm', !notification.read && 'font-medium')}>
            {notification.title}
          </p>
          {!notification.read && (
            <div className='bg-primary mt-1.5 size-2 shrink-0 rounded-full' />
          )}
        </div>
        {notification.description && (
          <p className='text-muted-foreground line-clamp-2 text-xs'>
            {notification.description}
          </p>
        )}
        <div className='flex items-center gap-2'>
          <span className='text-muted-foreground text-xs'>
            {formatRelativeTime(notification.timestamp)}
          </span>
          {notification.category && (
            <>
              <span className='text-muted-foreground'>•</span>
              <span className='text-muted-foreground text-xs'>
                {notification.category}
              </span>
            </>
          )}
        </div>
        {notification.action && (
          <Button
            variant='link'
            size='sm'
            className='h-auto w-fit p-0 text-xs'
            onClick={notification.action.onClick}
          >
            {notification.action.label}
          </Button>
        )}
      </div>
      <div className='absolute top-2 right-2 flex opacity-0 transition-opacity group-hover:opacity-100'>
        {onMarkAsRead && !notification.read && (
          <Button
            variant='ghost'
            size='icon'
            className='size-6'
            onClick={() => onMarkAsRead(notification.id)}
          >
            <Check className='size-3' />
            <span className='sr-only'>Mark as read</span>
          </Button>
        )}
        {onDelete && (
          <Button
            variant='ghost'
            size='icon'
            className='text-muted-foreground hover:text-destructive size-6'
            onClick={() => onDelete(notification.id)}
          >
            <Trash2 className='size-3' />
            <span className='sr-only'>Delete</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export { NotificationCenter, NotificationItem };
