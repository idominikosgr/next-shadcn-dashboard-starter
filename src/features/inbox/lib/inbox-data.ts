export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'file' | 'video';
  size: number;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
  isGroup: boolean;
  name?: string;
}

// Mock data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    status: 'online'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    status: 'away'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    status: 'online'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    status: 'offline'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    status: 'busy'
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: '1',
      content: 'Hey! Are we still meeting tomorrow for the project review?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isRead: false
    },
    unreadCount: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
    isGroup: false
  },
  {
    id: 'conv-2',
    participants: [mockUsers[2], mockUsers[3], mockUsers[4]],
    lastMessage: {
      id: 'msg-2',
      conversationId: 'conv-2',
      senderId: '3',
      content: 'The design mockups are ready for review!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: true
    },
    unreadCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    isGroup: true,
    name: 'Design Team'
  },
  {
    id: 'conv-3',
    participants: [mockUsers[1]],
    lastMessage: {
      id: 'msg-3',
      conversationId: 'conv-3',
      senderId: '2',
      content: 'Thanks for the quick turnaround on that bug fix! 🎉',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: true
    },
    unreadCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isGroup: false
  },
  {
    id: 'conv-4',
    participants: [mockUsers[3]],
    lastMessage: {
      id: 'msg-4',
      conversationId: 'conv-4',
      senderId: '4',
      content: 'Can you share the API documentation?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isRead: false
    },
    unreadCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isGroup: false
  },
  {
    id: 'conv-5',
    participants: [mockUsers[0], mockUsers[2], mockUsers[4]],
    lastMessage: {
      id: 'msg-5',
      conversationId: 'conv-5',
      senderId: '5',
      content: 'Meeting rescheduled to 3pm',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      isRead: true
    },
    unreadCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    isGroup: true,
    name: 'Project Alpha'
  }
];

export const mockMessages: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1-1',
      conversationId: 'conv-1',
      senderId: '2',
      content: 'Hi! How are you doing?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      isRead: true
    },
    {
      id: 'msg-1-2',
      conversationId: 'conv-1',
      senderId: 'current-user',
      content: "I'm doing great, thanks! Working on the new feature.",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      isRead: true
    },
    {
      id: 'msg-1-3',
      conversationId: 'conv-1',
      senderId: '1',
      content: 'That sounds awesome! Can you show me the progress?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: true
    },
    {
      id: 'msg-1-4',
      conversationId: 'conv-1',
      senderId: 'current-user',
      content: "Sure! I'll send you a demo link shortly.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isRead: true
    },
    {
      id: 'msg-1-5',
      conversationId: 'conv-1',
      senderId: '1',
      content: 'Hey! Are we still meeting tomorrow for the project review?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isRead: false
    }
  ],
  'conv-2': [
    {
      id: 'msg-2-1',
      conversationId: 'conv-2',
      senderId: '3',
      content: 'Team, I have uploaded the new design files',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: true
    },
    {
      id: 'msg-2-2',
      conversationId: 'conv-2',
      senderId: '4',
      content: 'Great work! The color scheme looks perfect.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      isRead: true
    },
    {
      id: 'msg-2-3',
      conversationId: 'conv-2',
      senderId: '5',
      content: 'Love the new typography choices!',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      isRead: true
    },
    {
      id: 'msg-2-4',
      conversationId: 'conv-2',
      senderId: '3',
      content: 'The design mockups are ready for review!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: true
    }
  ]
};

export function getConversationName(
  conversation: Conversation,
  currentUserId: string = 'current-user'
): string {
  if (conversation.name) return conversation.name;

  const otherParticipants = conversation.participants.filter(
    (p) => p.id !== currentUserId
  );
  if (otherParticipants.length === 0) return 'Unknown';
  if (otherParticipants.length === 1) return otherParticipants[0].name;

  return `${otherParticipants[0].name} and ${otherParticipants.length - 1} others`;
}

export function getOtherParticipant(
  conversation: Conversation,
  currentUserId: string = 'current-user'
): User | undefined {
  return conversation.participants.find((p) => p.id !== currentUserId);
}

export function formatMessageTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}
