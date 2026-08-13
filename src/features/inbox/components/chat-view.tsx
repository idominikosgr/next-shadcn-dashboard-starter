'use client';

import * as React from 'react';
import {
  ArrowLeft,
  ImageIcon,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
  Video
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  type Message,
  type User,
  getConversationName,
  getOtherParticipant,
  mockUsers
} from '../lib/inbox-data';

interface ChatViewProps {
  conversation: Conversation;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack?: () => void;
  currentUserId?: string;
  className?: string;
}

export function ChatView({
  conversation,
  messages,
  onSendMessage,
  onBack,
  currentUserId = 'current-user',
  className
}: ChatViewProps) {
  const [inputValue, setInputValue] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const otherParticipant = getOtherParticipant(conversation, currentUserId);
  const name = getConversationName(conversation, currentUserId);

  // Group messages by sender and time
  const groupedMessages = groupMessagesByTime(messages);

  return (
    <div className={cn('flex h-full flex-col', className)}>
      {/* Header */}
      <div className='flex items-center justify-between border-b px-4 py-3'>
        <div className='flex items-center gap-3'>
          {onBack && (
            <Button
              variant='ghost'
              size='icon'
              onClick={onBack}
              className='md:hidden'
            >
              <ArrowLeft className='size-5' />
            </Button>
          )}
          {conversation.isGroup ? (
            <Avatar className='size-10'>
              <AvatarFallback className='bg-primary/10 text-primary'>
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : otherParticipant ? (
            <Avatar className='size-10'>
              <AvatarImage
                src={otherParticipant.avatar}
                alt={otherParticipant.name}
              />
              <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : null}
          <div>
            <h3 className='font-semibold'>{name}</h3>
            {conversation.isGroup ? (
              <p className='text-muted-foreground text-xs'>
                {conversation.participants.length} members
              </p>
            ) : otherParticipant ? (
              <StatusBadge status={otherParticipant.status} />
            ) : null}
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Phone className='size-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Voice call</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Video className='size-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Video call</TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <MoreVertical className='size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuItem>Search in conversation</DropdownMenuItem>
              <DropdownMenuItem>Mute notifications</DropdownMenuItem>
              <DropdownMenuItem className='text-destructive'>
                Block user
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className='flex-1 p-4'>
        <div className='space-y-6'>
          {groupedMessages.map((group, groupIndex) => (
            <div key={groupIndex} className='space-y-2'>
              {/* Date separator */}
              <div className='flex items-center justify-center'>
                <span className='bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs'>
                  {group.date}
                </span>
              </div>
              {/* Messages in group */}
              <div className='space-y-2'>
                {group.messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={message.senderId === currentUserId}
                    sender={getSender(
                      message.senderId,
                      conversation.participants
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className='border-t p-4'>
        <div className='flex items-center gap-2'>
          <div className='flex gap-1'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' className='size-9'>
                  <Paperclip className='size-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach file</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' className='size-9'>
                  <ImageIcon className='size-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send image</TooltipContent>
            </Tooltip>
          </div>
          <Input
            ref={inputRef}
            placeholder='Type a message...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className='flex-1'
          />
          <div className='flex gap-1'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' className='size-9'>
                  <Smile className='size-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Emoji</TooltipContent>
            </Tooltip>
            <Button
              size='icon'
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              <Send className='size-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  sender?: User;
}

function MessageBubble({ message, isOwn, sender }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        'flex items-end gap-2',
        isOwn ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {!isOwn && sender && (
        <Avatar className='size-7'>
          <AvatarImage src={sender.avatar} alt={sender.name} />
          <AvatarFallback className='text-xs'>
            {sender.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-2',
          isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}
      >
        {!isOwn && sender && (
          <p className='mb-1 text-xs font-medium opacity-70'>{sender.name}</p>
        )}
        <p className='text-sm wrap-break-word whitespace-pre-wrap'>
          {message.content}
        </p>
        <p
          className={cn(
            'mt-1 text-right text-[10px]',
            isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
          )}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: User['status'] }) {
  const variants: Record<
    User['status'],
    'success' | 'warning' | 'error' | 'secondary'
  > = {
    online: 'success',
    away: 'warning',
    busy: 'error',
    offline: 'secondary'
  };

  return (
    <Badge variant={variants[status]} className='text-[10px] capitalize'>
      {status}
    </Badge>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

function getSender(senderId: string, participants: User[]): User | undefined {
  if (senderId === 'current-user') return undefined;
  return (
    participants.find((p) => p.id === senderId) ||
    mockUsers.find((u) => u.id === senderId)
  );
}

interface MessageGroup {
  date: string;
  messages: Message[];
}

function groupMessagesByTime(messages: Message[]): MessageGroup[] {
  const groups: MessageGroup[] = [];
  let currentDate = '';

  for (const message of messages) {
    const date = formatDate(message.timestamp);
    if (date !== currentDate) {
      currentDate = date;
      groups.push({ date, messages: [] });
    }
    groups[groups.length - 1].messages.push(message);
  }

  return groups;
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}
