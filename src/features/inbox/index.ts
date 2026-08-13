// Components
export { Inbox } from './components/inbox';
export { ConversationList } from './components/conversation-list';
export { ChatView } from './components/chat-view';

// Hooks
export { useInbox } from './hooks/use-inbox';

// Types and utilities
export type { User, Message, Attachment, Conversation } from './lib/inbox-data';
export {
  mockUsers,
  mockConversations,
  mockMessages,
  getConversationName,
  getOtherParticipant,
  formatMessageTime
} from './lib/inbox-data';
