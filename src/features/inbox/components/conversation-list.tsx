'use client';

import * as React from 'react';
import {
  Archive,
  CircleDot,
  Mail,
  MailOpen,
  MoreVertical,
  Search,
  Star,
  Trash2,
  Users
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

import {
  type Conversation,
  type User,
  getConversationName,
  getOtherParticipant,
  formatMessageTime
} from '../lib/inbox-data';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (conversation: Conversation) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMarkRead?: (id: string) => void;
  className?: string;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  onArchive,
  onDelete,
  onMarkRead,
  className
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filter, setFilter] = React.useState<'all' | 'unread' | 'starred'>(
    'all'
  );

  const filteredConversations = conversations.filter((conv) => {
    const name = getConversationName(conv);
    const matchesSearch = name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (filter === 'unread') return matchesSearch && conv.unreadCount > 0;
    return matchesSearch;
  });

  return (
    <div className={cn('flex h-full flex-col border-r', className)}>
      {/* Header */}
      <div className='border-b p-4'>
        <h2 className='mb-4 text-lg font-semibold'>Messages</h2>
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
          <Input
            placeholder='Search conversations...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-9'
          />
        </div>
        {/* Filter tabs */}
        <div className='mt-3 flex gap-1'>
          <Button
            variant={filter === 'all' ? 'secondary' : 'ghost'}
            size='sm'
            onClick={() => setFilter('all')}
          >
            <Mail className='mr-1.5 size-3.5' />
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'secondary' : 'ghost'}
            size='sm'
            onClick={() => setFilter('unread')}
          >
            <MailOpen className='mr-1.5 size-3.5' />
            Unread
          </Button>
          <Button
            variant={filter === 'starred' ? 'secondary' : 'ghost'}
            size='sm'
            onClick={() => setFilter('starred')}
          >
            <Star className='mr-1.5 size-3.5' />
            Starred
          </Button>
        </div>
      </div>

      {/* Conversation list */}
      <ScrollArea className='flex-1'>
        <div className='divide-y'>
          {filteredConversations.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12 text-center'>
              <Mail className='text-muted-foreground/50 mb-3 size-12' />
              <p className='text-muted-foreground text-sm'>
                No conversations found
              </p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedId === conversation.id}
                onSelect={() => onSelect(conversation)}
                onArchive={onArchive}
                onDelete={onDelete}
                onMarkRead={onMarkRead}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMarkRead?: (id: string) => void;
}

function ConversationItem({
  conversation,
  isSelected,
  onSelect,
  onArchive,
  onDelete,
  onMarkRead
}: ConversationItemProps) {
  const otherParticipant = getOtherParticipant(conversation);
  const name = getConversationName(conversation);

  return (
    <div
      className={cn(
        'group hover:bg-muted/50 relative flex cursor-pointer items-start gap-3 p-4 transition-colors',
        isSelected && 'bg-muted',
        conversation.unreadCount > 0 && 'bg-primary/5'
      )}
      onClick={onSelect}
    >
      {/* Avatar */}
      <div className='relative'>
        {conversation.isGroup ? (
          <div className='bg-muted flex size-10 items-center justify-center rounded-full'>
            <Users className='text-muted-foreground size-5' />
          </div>
        ) : otherParticipant ? (
          <>
            <Avatar className='size-10'>
              <AvatarImage
                src={otherParticipant.avatar}
                alt={otherParticipant.name}
              />
              <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <StatusIndicator status={otherParticipant.status} />
          </>
        ) : (
          <Avatar className='size-10'>
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        )}
      </div>

      {/* Content */}
      <div className='min-w-0 flex-1'>
        <div className='flex items-start justify-between gap-2'>
          <span
            className={cn(
              'truncate text-sm',
              conversation.unreadCount > 0 ? 'font-semibold' : 'font-medium'
            )}
          >
            {name}
          </span>
          <span className='text-muted-foreground shrink-0 text-xs'>
            {conversation.lastMessage
              ? formatMessageTime(conversation.lastMessage.timestamp)
              : ''}
          </span>
        </div>
        {conversation.lastMessage && (
          <p
            className={cn(
              'mt-1 truncate text-sm',
              conversation.unreadCount > 0
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            {conversation.lastMessage.content}
          </p>
        )}
        {/* Badges */}
        <div className='mt-2 flex items-center gap-2'>
          {conversation.isGroup && (
            <Badge variant='outline' className='text-xs'>
              Group
            </Badge>
          )}
          {conversation.unreadCount > 0 && (
            <Badge variant='default' className='text-xs'>
              {conversation.unreadCount} new
            </Badge>
          )}
        </div>
      </div>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='size-8 opacity-0 group-hover:opacity-100'
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {conversation.unreadCount > 0 && onMarkRead && (
            <DropdownMenuItem onClick={() => onMarkRead(conversation.id)}>
              <MailOpen className='mr-2 size-4' />
              Mark as read
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Star className='mr-2 size-4' />
            Star conversation
          </DropdownMenuItem>
          {onArchive && (
            <DropdownMenuItem onClick={() => onArchive(conversation.id)}>
              <Archive className='mr-2 size-4' />
              Archive
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {onDelete && (
            <DropdownMenuItem
              className='text-destructive'
              onClick={() => onDelete(conversation.id)}
            >
              <Trash2 className='mr-2 size-4' />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function StatusIndicator({ status }: { status: User['status'] }) {
  const statusColors = {
    online: 'bg-(--chart-2)',
    away: 'bg-(--chart-4)',
    busy: 'bg-(--chart-1)',
    offline: 'bg-muted-foreground'
  };

  const statusLabels = {
    online: 'Online',
    away: 'Away',
    busy: 'Busy',
    offline: 'Offline'
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            'border-background absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2',
            statusColors[status]
          )}
        />
      </TooltipTrigger>
      <TooltipContent side='right'>{statusLabels[status]}</TooltipContent>
    </Tooltip>
  );
}
