'use client';

import * as React from 'react';

export type NotificationType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'message';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  avatar?: string;
  data?: Record<string, unknown>;
}

interface UseNotificationsOptions {
  /** Initial notifications */
  initialNotifications?: Notification[];
  /** Max notifications to keep */
  maxNotifications?: number;
  /** Callback when notification is clicked */
  onNotificationClick?: (notification: Notification) => void;
  /** Enable browser notifications */
  enableBrowserNotifications?: boolean;
  /** Storage key for persistence */
  storageKey?: string;
}

interface UseNotificationsReturn {
  // State
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;

  // Actions
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
  ) => Notification;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;

  // Utilities
  getUnreadNotifications: () => Notification[];
  getNotificationsByType: (type: NotificationType) => Notification[];
}

const STORAGE_KEY = 'app-notifications';

export function useNotifications(
  options: UseNotificationsOptions = {}
): UseNotificationsReturn {
  const {
    initialNotifications = [],
    maxNotifications = 50,
    onNotificationClick,
    enableBrowserNotifications = false,
    storageKey = STORAGE_KEY
  } = options;

  const [notifications, setNotifications] = React.useState<Notification[]>(
    () => {
      if (typeof window === 'undefined') return initialNotifications;

      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          return parsed.map((n: Notification) => ({
            ...n,
            timestamp: new Date(n.timestamp)
          }));
        }
      } catch {
        // Ignore localStorage errors
      }
      return initialNotifications;
    }
  );

  const [isLoading, setIsLoading] = React.useState(false);

  // Persist to localStorage
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(notifications));
    } catch {
      // Ignore localStorage errors
    }
  }, [notifications, storageKey]);

  // Request browser notification permission
  React.useEffect(() => {
    if (
      enableBrowserNotifications &&
      typeof window !== 'undefined' &&
      'Notification' in window
    ) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, [enableBrowserNotifications]);

  // Unread count
  const unreadCount = React.useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  // Add notification
  const addNotification = React.useCallback(
    (
      notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
    ): Notification => {
      const newNotification: Notification = {
        ...notification,
        id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        timestamp: new Date(),
        read: false
      };

      setNotifications((prev) => {
        const updated = [newNotification, ...prev];
        // Limit to max notifications
        if (updated.length > maxNotifications) {
          updated.splice(maxNotifications);
        }
        return updated;
      });

      // Show browser notification
      if (
        enableBrowserNotifications &&
        typeof window !== 'undefined' &&
        'Notification' in window
      ) {
        if (Notification.permission === 'granted') {
          new Notification(newNotification.title, {
            body: newNotification.description,
            icon: newNotification.avatar
          });
        }
      }

      return newNotification;
    },
    [maxNotifications, enableBrowserNotifications]
  );

  // Mark as read
  const markAsRead = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  // Mark all as read
  const markAllAsRead = React.useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // Remove notification
  const removeNotification = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Clear all
  const clearAll = React.useCallback(() => {
    setNotifications([]);
  }, []);

  // Get unread notifications
  const getUnreadNotifications = React.useCallback((): Notification[] => {
    return notifications.filter((n) => !n.read);
  }, [notifications]);

  // Get notifications by type
  const getNotificationsByType = React.useCallback(
    (type: NotificationType): Notification[] => {
      return notifications.filter((n) => n.type === type);
    },
    [notifications]
  );

  return {
    notifications,
    unreadCount,
    isLoading,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    getUnreadNotifications,
    getNotificationsByType
  };
}

// Context for app-wide notifications
interface NotificationsContextType extends UseNotificationsReturn {}

const NotificationsContext =
  React.createContext<NotificationsContextType | null>(null);

export function NotificationsProvider({
  children,
  ...options
}: UseNotificationsOptions & { children: React.ReactNode }) {
  const notifications = useNotifications(options);

  return (
    <NotificationsContext.Provider value={notifications}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotificationsContext(): NotificationsContextType {
  const context = React.useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      'useNotificationsContext must be used within NotificationsProvider'
    );
  }
  return context;
}
