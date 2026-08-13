'use client';

import * as React from 'react';
import { MessageSquare } from 'lucide-react';

import { cn } from '@/lib/utils';
import { EmptyState } from '@/components/ui/empty-state';
import { useMediaQuery } from '@/hooks/use-media-query';

import { ConversationList } from './conversation-list';
import { ChatView } from './chat-view';
import { useInbox } from '../hooks/use-inbox';

interface InboxProps {
  className?: string;
  onNewMessage?: () => void;
}

export function Inbox({ className, onNewMessage }: InboxProps) {
  const {
    conversations,
    selectedConversation,
    messages,
    isLoading,
    selectConversation,
    sendMessage,
    archiveConversation,
    deleteConversation,
    markAsRead
  } = useInbox();

  const { isOpen: isMobile } = useMediaQuery();

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  const handleBack = () => {
    selectConversation(null);
  };

  // Sort conversations by updatedAt
  const sortedConversations = [...conversations].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  // Mobile: Show either list or chat
  if (isMobile) {
    if (selectedConversation) {
      return (
        <div className={cn('h-[calc(100vh-8rem)]', className)}>
          <ChatView
            conversation={selectedConversation}
            messages={messages}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
          />
        </div>
      );
    }

    return (
      <div className={cn('h-[calc(100vh-8rem)]', className)}>
        <ConversationList
          conversations={sortedConversations}
          selectedId={undefined}
          onSelect={selectConversation}
          onArchive={archiveConversation}
          onDelete={deleteConversation}
          onMarkRead={markAsRead}
        />
      </div>
    );
  }

  // Desktop: Show both panels
  return (
    <div
      className={cn(
        'bg-card flex h-[calc(100vh-8rem)] rounded-lg border',
        className
      )}
    >
      <ConversationList
        conversations={sortedConversations}
        selectedId={selectedConversation?.id}
        onSelect={selectConversation}
        onArchive={archiveConversation}
        onDelete={deleteConversation}
        onMarkRead={markAsRead}
        className='w-80 shrink-0'
      />
      <div className='flex-1'>
        {selectedConversation ? (
          <ChatView
            conversation={selectedConversation}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className='flex h-full items-center justify-center'>
            <EmptyState
              icon={<MessageSquare className='size-8' />}
              title='Select a conversation'
              description='Choose a conversation from the list to start messaging'
              action={{
                label: 'New message',
                onClick: () => onNewMessage?.()
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
