'use client';

import {
  Filter,
  Hash,
  MoreVertical,
  Pin,
  Search,
  Settings,
  UserPlus,
  Users,
  VolumeX
} from 'lucide-react';

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
import { formatMessageTime } from '@/lib/helpers/format-message-time';
import { cn } from '@/lib/utils';
import type { ChatConversation, ChatUser } from '../utils/types';
import { useChat } from '../utils/use-chat';

interface ConversationListProps {
  conversations: ChatConversation[];
  users: ChatUser[];
  selectedConversation: string | null;
  onSelectConversation: (conversationId: string) => void;
}

export function ChatConversationList({
  conversations,
  users,
  selectedConversation,
  onSelectConversation
}: ConversationListProps) {
  const { searchQuery, setSearchQuery } = useChat();

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedConversations = filteredConversations.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    return (
      new Date(b.lastMessage.timestamp).getTime() -
      new Date(a.lastMessage.timestamp).getTime()
    );
  });

  const getOnlineStatus = (conversation: ChatConversation) => {
    if (
      conversation.type === 'direct' &&
      conversation.participants.length >= 1
    ) {
      const participantId = conversation.participants[0];
      const user = users.find((u) => u.id === participantId);
      return user?.status === 'online';
    }
    return false;
  };

  return (
    <div className='flex h-full flex-col overflow-hidden'>
      <div className='hidden h-16 shrink-0 items-center justify-between border-b px-4 lg:flex'>
        <h2 className='text-lg font-semibold'>Messages</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='h-8 w-8 cursor-pointer p-0'
            >
              <MoreVertical className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem className='cursor-pointer'>
              <UserPlus className='mr-2 h-4 w-4' />
              New Chat
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              <Filter className='mr-2 h-4 w-4' />
              Filter Messages
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer'>
              <Settings className='mr-2 h-4 w-4' />
              Chat Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search */}
      <div className='shrink-0 border-b px-4 py-3'>
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform' />
          <Input
            type='text'
            placeholder='Search conversations...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='cursor-text pl-9'
          />
        </div>
      </div>

      {/* Conversations */}
      <ScrollArea className='h-0 min-h-0 flex-1'>
        <div className='space-y-1 p-2'>
          {sortedConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                'relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-xl p-3 transition-all duration-200',
                selectedConversation === conversation.id
                  ? 'bg-primary/10 text-accent-foreground shadow-elevation-1'
                  : 'hover:bg-accent/50'
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              {/* Avatar with online indicator */}
              <div className='relative shrink-0'>
                <Avatar
                  className={cn(
                    'h-12 w-12 transition-all',
                    selectedConversation === conversation.id &&
                      'ring-primary ring-offset-background ring-2 ring-offset-2'
                  )}
                >
                  <AvatarImage
                    src={conversation.avatar}
                    alt={conversation.name}
                  />
                  <AvatarFallback className='from-primary/20 to-primary/10 bg-linear-to-br text-sm'>
                    {conversation.type === 'group' ? (
                      <Users className='text-primary h-5 w-5' />
                    ) : (
                      conversation.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                    )}
                  </AvatarFallback>
                </Avatar>

                {/* Online indicator for direct messages */}
                {conversation.type === 'direct' &&
                  getOnlineStatus(conversation) && (
                    <div className='border-background absolute right-0 bottom-0 h-3.5 w-3.5 animate-pulse rounded-full border-2 bg-green-500' />
                  )}

                {/* Group indicator */}
                {conversation.type === 'group' && (
                  <div className='border-background absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-blue-500'>
                    <Hash className='h-2 w-2 text-white' />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className='min-w-0 flex-1 overflow-hidden'>
                <div className='mb-1 flex min-w-0 items-center justify-between'>
                  <div className='flex min-w-0 flex-1 items-center gap-1 overflow-hidden pr-2'>
                    <h3 className='max-w-[160px] min-w-0 truncate font-medium lg:max-w-[180px]'>
                      {conversation.name}
                    </h3>
                    {conversation.isPinned && (
                      <Pin className='text-muted-foreground h-3 w-3 shrink-0' />
                    )}
                    {conversation.isMuted && (
                      <VolumeX className='text-muted-foreground h-3 w-3 shrink-0' />
                    )}
                  </div>
                  <span className='text-muted-foreground shrink-0 text-xs whitespace-nowrap'>
                    {formatMessageTime(conversation.lastMessage.timestamp)}
                  </span>
                </div>

                <div className='flex min-w-0 items-center justify-between gap-2'>
                  <p className='text-muted-foreground max-w-[180px] min-w-0 flex-1 truncate pr-2 text-sm lg:max-w-[200px]'>
                    {conversation.lastMessage.content}
                  </p>

                  {/* Unread count */}
                  {conversation.unreadCount > 0 && (
                    <Badge
                      variant='default'
                      className='h-5 min-w-[20px] shrink-0 cursor-pointer text-xs'
                    >
                      {conversation.unreadCount > 99
                        ? '99+'
                        : conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
