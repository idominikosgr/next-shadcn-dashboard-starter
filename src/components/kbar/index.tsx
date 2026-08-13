'use client';
import { navItems } from '@/constants/data';
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
  useRegisterActions,
  type Action
} from 'kbar';
import { useRouter } from 'next/navigation';
import { useMemo, useEffect, useCallback } from 'react';
import { Star, Clock, ArrowRight } from 'lucide-react';
import RenderResults from './render-result';
import useThemeSwitching from './use-theme-switching';

// Local storage keys
const RECENT_ACTIONS_KEY = 'kbar-recent-actions';
const FAVORITE_ACTIONS_KEY = 'kbar-favorite-actions';
const MAX_RECENT_ITEMS = 5;

// Hook to manage recent and favorite actions
function useKBarEnhancements() {
  const router = useRouter();

  // Get recent action IDs from localStorage
  const getRecentIds = useCallback((): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(RECENT_ACTIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  // Get favorite action IDs from localStorage
  const getFavoriteIds = useCallback((): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(FAVORITE_ACTIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  // Save recent action
  const addRecentAction = useCallback((actionId: string) => {
    if (typeof window === 'undefined') return;
    try {
      const recent = JSON.parse(
        localStorage.getItem(RECENT_ACTIONS_KEY) || '[]'
      );
      const filtered = recent.filter((id: string) => id !== actionId);
      const updated = [actionId, ...filtered].slice(0, MAX_RECENT_ITEMS);
      localStorage.setItem(RECENT_ACTIONS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Toggle favorite action
  const toggleFavorite = useCallback((actionId: string) => {
    if (typeof window === 'undefined') return;
    try {
      const favorites = JSON.parse(
        localStorage.getItem(FAVORITE_ACTIONS_KEY) || '[]'
      );
      const isFavorite = favorites.includes(actionId);
      const updated = isFavorite
        ? favorites.filter((id: string) => id !== actionId)
        : [...favorites, actionId];
      localStorage.setItem(FAVORITE_ACTIONS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  }, []);

  return {
    getRecentIds,
    getFavoriteIds,
    addRecentAction,
    toggleFavorite,
    router
  };
}

export default function KBar({ children }: { children: React.ReactNode }) {
  const { getRecentIds, getFavoriteIds, addRecentAction, router } =
    useKBarEnhancements();

  // These action are for the navigation
  const actions = useMemo(() => {
    // Define navigateTo inside the useMemo callback to avoid dependency array issues
    const navigateTo = (url: string, actionId: string) => {
      addRecentAction(actionId);
      router.push(url);
    };

    const navActions = navItems.flatMap((navItem) => {
      // Only include base action if the navItem has a real URL and is not just a container
      const baseAction =
        navItem.url !== '#'
          ? {
              id: `${navItem.title.toLowerCase()}Action`,
              name: navItem.title,
              shortcut: navItem.shortcut,
              keywords: navItem.title.toLowerCase(),
              section: 'Navigation',
              subtitle: `Go to ${navItem.title}`,
              perform: () =>
                navigateTo(navItem.url, `${navItem.title.toLowerCase()}Action`)
            }
          : null;

      // Map child items into actions
      const childActions =
        navItem.items?.map((childItem) => ({
          id: `${childItem.title.toLowerCase()}Action`,
          name: childItem.title,
          shortcut: childItem.shortcut,
          keywords: childItem.title.toLowerCase(),
          section: navItem.title,
          subtitle: `Go to ${childItem.title}`,
          perform: () =>
            navigateTo(childItem.url, `${childItem.title.toLowerCase()}Action`)
        })) ?? [];

      // Return only valid actions (ignoring null base actions for containers)
      return baseAction ? [baseAction, ...childActions] : childActions;
    });

    return navActions;
  }, [router, addRecentAction]);

  return (
    <KBarProvider actions={actions}>
      <KBarComponent
        getRecentIds={getRecentIds}
        getFavoriteIds={getFavoriteIds}
      >
        {children}
      </KBarComponent>
    </KBarProvider>
  );
}

interface KBarComponentProps {
  children: React.ReactNode;
  getRecentIds: () => string[];
  getFavoriteIds: () => string[];
}

const KBarComponent = ({
  children,
  getRecentIds,
  getFavoriteIds
}: KBarComponentProps) => {
  useThemeSwitching();
  useRecentAndFavoriteActions(getRecentIds, getFavoriteIds);

  return (
    <>
      <KBarPortal>
        <KBarPositioner className='bg-surface-overlay fixed inset-0 z-99999 p-0! glass-effect'>
          <KBarAnimator className='bg-card text-card-foreground relative mt-64! w-full max-w-[600px] -translate-y-12! overflow-hidden rounded-lg border shadow-elevation-3'>
            <div className='bg-card border-border sticky top-0 z-10 border-b'>
              <KBarSearch className='bg-card w-full border-none px-6 py-4 text-lg outline-hidden focus:ring-0 focus:ring-offset-0 focus:outline-hidden' />
            </div>
            <div className='max-h-[400px]'>
              <RenderResults />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </>
  );
};

// Hook to register recent and favorite action shortcuts
function useRecentAndFavoriteActions(
  getRecentIds: () => string[],
  getFavoriteIds: () => string[]
) {
  const recentActions: Action[] = useMemo(() => {
    const recentIds = getRecentIds();
    if (recentIds.length === 0) return [];

    return [
      {
        id: 'recent-section',
        name: 'Recent',
        keywords: 'recent history',
        section: 'Quick Access',
        icon: <Clock className='text-muted-foreground size-4' />,
        subtitle: `${recentIds.length} recent items`
      }
    ];
  }, [getRecentIds]);

  const favoriteActions: Action[] = useMemo(() => {
    const favoriteIds = getFavoriteIds();
    if (favoriteIds.length === 0) return [];

    return [
      {
        id: 'favorites-section',
        name: 'Favorites',
        keywords: 'favorites starred pinned',
        section: 'Quick Access',
        icon: <Star className='text-chart-4 size-4' />,
        subtitle: `${favoriteIds.length} favorited items`
      }
    ];
  }, [getFavoriteIds]);

  useRegisterActions(
    [...recentActions, ...favoriteActions],
    [getRecentIds, getFavoriteIds]
  );
}
