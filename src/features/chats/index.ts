// Export components
export * from './components';

// Export types (excluding MessageAttachment which conflicts with component name)
export type {
  ChatUser,
  ChatMessage,
  ChatConversation,
  LastMessage,
  MessageReaction,
  ChatState,
  ChatActions
} from './utils/types';

// Re-export MessageAttachment type with alias to avoid conflict
export type { MessageAttachment as MessageAttachmentType } from './utils/types';

// Export hooks
export { useChat, useChatStore } from './utils/use-chat';
