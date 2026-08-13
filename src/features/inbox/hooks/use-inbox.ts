'use client';

import * as React from 'react';
import {
  type Conversation,
  type Message,
  type User,
  mockConversations,
  mockMessages,
  mockUsers
} from '../lib/inbox-data';

interface UseInboxOptions {
  onMessageSent?: (message: Message) => void;
  onConversationSelected?: (conversation: Conversation) => void;
}

interface UseInboxReturn {
  // State
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: Error | null;

  // Actions
  selectConversation: (conversation: Conversation | null) => void;
  sendMessage: (content: string, attachments?: File[]) => Promise<Message>;
  markAsRead: (conversationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  archiveConversation: (conversationId: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;
  starConversation: (conversationId: string) => Promise<void>;

  // Conversation actions
  createConversation: (
    participantIds: string[],
    initialMessage?: string
  ) => Promise<Conversation>;
  searchConversations: (query: string) => Conversation[];
  getUnreadCount: () => number;

  // Refresh
  refresh: () => void;
}

// Local storage for mutable data
let conversationsStore = [...mockConversations];
const messagesStore: Record<string, Message[]> = { ...mockMessages };

export function useInbox(options: UseInboxOptions = {}): UseInboxReturn {
  const { onMessageSent, onConversationSelected } = options;

  const [conversations, setConversations] =
    React.useState<Conversation[]>(conversationsStore);
  const [selectedConversation, setSelectedConversation] =
    React.useState<Conversation | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  // Load messages when conversation changes
  React.useEffect(() => {
    if (selectedConversation) {
      const conversationMessages = messagesStore[selectedConversation.id] || [];
      setMessages(conversationMessages);
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  // Fetch conversations
  const fetchConversations = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In real implementation: await api.getConversations()
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Sort by updatedAt
      const sorted = [...conversationsStore].sort(
        (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
      );
      setConversations(sorted);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to fetch conversations')
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  React.useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Select conversation
  const selectConversation = React.useCallback(
    (conversation: Conversation | null) => {
      setSelectedConversation(conversation);
      if (conversation) {
        onConversationSelected?.(conversation);
        // Auto-mark as read
        if (conversation.unreadCount > 0) {
          conversationsStore = conversationsStore.map((c) =>
            c.id === conversation.id ? { ...c, unreadCount: 0 } : c
          );
          setConversations((prev) =>
            prev.map((c) =>
              c.id === conversation.id ? { ...c, unreadCount: 0 } : c
            )
          );
        }
      }
    },
    [onConversationSelected]
  );

  // Send message
  const sendMessage = React.useCallback(
    async (content: string, attachments?: File[]): Promise<Message> => {
      if (!selectedConversation) {
        throw new Error('No conversation selected');
      }

      // In real implementation: await api.sendMessage(conversationId, content, attachments)
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        conversationId: selectedConversation.id,
        senderId: 'current-user',
        content,
        timestamp: new Date(),
        isRead: true,
        attachments: attachments?.map((file, i) => ({
          id: `attachment-${Date.now()}-${i}`,
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type.startsWith('image/') ? 'image' : 'file',
          size: file.size
        }))
      };

      // Update messages store
      if (!messagesStore[selectedConversation.id]) {
        messagesStore[selectedConversation.id] = [];
      }
      messagesStore[selectedConversation.id].push(newMessage);
      setMessages((prev) => [...prev, newMessage]);

      // Update conversation
      conversationsStore = conversationsStore.map((c) =>
        c.id === selectedConversation.id
          ? { ...c, lastMessage: newMessage, updatedAt: new Date() }
          : c
      );
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversation.id
            ? { ...c, lastMessage: newMessage, updatedAt: new Date() }
            : c
        )
      );

      onMessageSent?.(newMessage);
      return newMessage;
    },
    [selectedConversation, onMessageSent]
  );

  // Mark as read
  const markAsRead = React.useCallback(
    async (conversationId: string): Promise<void> => {
      // In real implementation: await api.markAsRead(conversationId)
      conversationsStore = conversationsStore.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      );
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId ? { ...c, unreadCount: 0 } : c
        )
      );
    },
    []
  );

  // Mark all as read
  const markAllAsRead = React.useCallback(async (): Promise<void> => {
    // In real implementation: await api.markAllAsRead()
    conversationsStore = conversationsStore.map((c) => ({
      ...c,
      unreadCount: 0
    }));
    setConversations((prev) => prev.map((c) => ({ ...c, unreadCount: 0 })));
  }, []);

  // Archive conversation
  const archiveConversation = React.useCallback(
    async (conversationId: string): Promise<void> => {
      // In real implementation: await api.archiveConversation(conversationId)
      conversationsStore = conversationsStore.filter(
        (c) => c.id !== conversationId
      );
      setConversations((prev) => prev.filter((c) => c.id !== conversationId));
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(null);
      }
    },
    [selectedConversation]
  );

  // Delete conversation
  const deleteConversation = React.useCallback(
    async (conversationId: string): Promise<void> => {
      // In real implementation: await api.deleteConversation(conversationId)
      conversationsStore = conversationsStore.filter(
        (c) => c.id !== conversationId
      );
      delete messagesStore[conversationId];
      setConversations((prev) => prev.filter((c) => c.id !== conversationId));
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(null);
      }
    },
    [selectedConversation]
  );

  // Star conversation
  const starConversation = React.useCallback(
    async (conversationId: string): Promise<void> => {
      // In real implementation: await api.starConversation(conversationId)
      // Would add starred property to conversation
      console.log(`Starred conversation: ${conversationId}`);
    },
    []
  );

  // Create new conversation
  const createConversation = React.useCallback(
    async (
      participantIds: string[],
      initialMessage?: string
    ): Promise<Conversation> => {
      // In real implementation: await api.createConversation(participantIds, initialMessage)
      const participants = participantIds
        .map((id) => mockUsers.find((u) => u.id === id))
        .filter(Boolean) as User[];

      const newConversation: Conversation = {
        id: `conv-${Date.now()}`,
        participants,
        unreadCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        isGroup: participants.length > 1,
        name: participants.length > 1 ? undefined : undefined
      };

      conversationsStore.push(newConversation);
      messagesStore[newConversation.id] = [];

      if (initialMessage) {
        const message: Message = {
          id: `msg-${Date.now()}`,
          conversationId: newConversation.id,
          senderId: 'current-user',
          content: initialMessage,
          timestamp: new Date(),
          isRead: true
        };
        messagesStore[newConversation.id].push(message);
        newConversation.lastMessage = message;
      }

      await fetchConversations();
      return newConversation;
    },
    [fetchConversations]
  );

  // Search conversations
  const searchConversations = React.useCallback(
    (query: string): Conversation[] => {
      const lowerQuery = query.toLowerCase();
      return conversations.filter((conv) => {
        const name =
          conv.name || conv.participants.map((p) => p.name).join(', ');
        return name.toLowerCase().includes(lowerQuery);
      });
    },
    [conversations]
  );

  // Get unread count
  const getUnreadCount = React.useCallback((): number => {
    return conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  }, [conversations]);

  return {
    conversations,
    selectedConversation,
    messages,
    isLoading,
    error,
    selectConversation,
    sendMessage,
    markAsRead,
    markAllAsRead,
    archiveConversation,
    deleteConversation,
    starConversation,
    createConversation,
    searchConversations,
    getUnreadCount,
    refresh: fetchConversations
  };
}
