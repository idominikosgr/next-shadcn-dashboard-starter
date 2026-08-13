'use client';

import * as React from 'react';

export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export interface UseAsyncOptions<T> {
  /** Initial data */
  initialData?: T;
  /** Whether to fetch immediately on mount */
  immediate?: boolean;
  /** Dependencies that trigger refetch */
  deps?: unknown[];
  /** Callback on success */
  onSuccess?: (data: T) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

export interface UseAsyncReturn<T, Args extends unknown[]>
  extends AsyncState<T> {
  /** Execute the async function */
  execute: (...args: Args) => Promise<T | undefined>;
  /** Reset state to initial */
  reset: () => void;
  /** Set data manually */
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

/**
 * Generic hook for async operations with loading/error states
 */
export function useAsync<T, Args extends unknown[] = []>(
  asyncFn: (...args: Args) => Promise<T>,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T, Args> {
  const {
    initialData = null,
    immediate = false,
    deps = [],
    onSuccess,
    onError
  } = options;

  const [data, setData] = React.useState<T | null>(initialData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  // Track if component is mounted
  const isMountedRef = React.useRef(true);

  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = React.useCallback(
    async (...args: Args): Promise<T | undefined> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFn(...args);

        if (isMountedRef.current) {
          setData(result);
          onSuccess?.(result);
        }

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));

        if (isMountedRef.current) {
          setError(error);
          onError?.(error);
        }

        return undefined;
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [asyncFn, onSuccess, onError]
  );

  const reset = React.useCallback(() => {
    setData(initialData);
    setIsLoading(false);
    setError(null);
  }, [initialData]);

  // Auto-execute on mount if immediate is true
  React.useEffect(() => {
    if (immediate) {
      execute(...([] as unknown as Args));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, ...deps]);

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
    setData
  };
}

/**
 * Hook for paginated async data
 */
export interface PaginatedData<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface UsePaginatedAsyncOptions<T>
  extends Omit<UseAsyncOptions<PaginatedData<T>>, 'initialData'> {
  /** Items per page */
  limit?: number;
  /** Initial page */
  initialPage?: number;
}

export interface UsePaginatedAsyncReturn<T, Args extends unknown[]>
  extends Omit<UseAsyncReturn<PaginatedData<T>, Args>, 'data'> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
  setLimit: (limit: number) => void;
}

export function usePaginatedAsync<T, Args extends unknown[] = []>(
  asyncFn: (
    page: number,
    limit: number,
    ...args: Args
  ) => Promise<PaginatedData<T>>,
  options: UsePaginatedAsyncOptions<T> = {}
): UsePaginatedAsyncReturn<T, Args> {
  const {
    limit: initialLimit = 10,
    initialPage = 1,
    ...asyncOptions
  } = options;

  const [page, setPage] = React.useState(initialPage);
  const [limit, setLimit] = React.useState(initialLimit);

  const wrappedFn = React.useCallback(
    async (...args: Args) => asyncFn(page, limit, ...args),
    [asyncFn, page, limit]
  );

  const asyncResult = useAsync(wrappedFn, {
    ...asyncOptions,
    initialData: {
      items: [],
      page: initialPage,
      limit: initialLimit,
      total: 0,
      hasMore: false
    }
  });

  const { data, execute } = asyncResult;

  const nextPage = React.useCallback(async () => {
    if (data?.hasMore) {
      setPage((p) => p + 1);
    }
  }, [data?.hasMore]);

  const prevPage = React.useCallback(async () => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  }, [page]);

  const goToPage = React.useCallback(async (newPage: number) => {
    if (newPage >= 1) {
      setPage(newPage);
    }
  }, []);

  // Refetch when page or limit changes
  React.useEffect(() => {
    execute(...([] as unknown as Args));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return {
    items: data?.items ?? [],
    page: data?.page ?? page,
    limit: data?.limit ?? limit,
    total: data?.total ?? 0,
    hasMore: data?.hasMore ?? false,
    isLoading: asyncResult.isLoading,
    error: asyncResult.error,
    execute,
    reset: asyncResult.reset,
    setData: asyncResult.setData,
    nextPage,
    prevPage,
    goToPage,
    setLimit
  };
}

/**
 * Hook for mutations (create, update, delete operations)
 */
export interface UseMutationOptions<T, Args extends unknown[]> {
  onSuccess?: (data: T, args: Args) => void;
  onError?: (error: Error, args: Args) => void;
  onSettled?: (data: T | undefined, error: Error | null, args: Args) => void;
}

export interface UseMutationReturn<T, Args extends unknown[]> {
  mutate: (...args: Args) => Promise<T | undefined>;
  mutateAsync: (...args: Args) => Promise<T>;
  isLoading: boolean;
  error: Error | null;
  data: T | null;
  reset: () => void;
}

export function useMutation<T, Args extends unknown[] = []>(
  mutationFn: (...args: Args) => Promise<T>,
  options: UseMutationOptions<T, Args> = {}
): UseMutationReturn<T, Args> {
  const { onSuccess, onError, onSettled } = options;

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [data, setData] = React.useState<T | null>(null);

  const mutateAsync = React.useCallback(
    async (...args: Args): Promise<T> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await mutationFn(...args);
        setData(result);
        onSuccess?.(result, args);
        onSettled?.(result, null, args);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        onError?.(error, args);
        onSettled?.(undefined, error, args);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, onSuccess, onError, onSettled]
  );

  const mutate = React.useCallback(
    async (...args: Args): Promise<T | undefined> => {
      try {
        return await mutateAsync(...args);
      } catch {
        return undefined;
      }
    },
    [mutateAsync]
  );

  const reset = React.useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    mutate,
    mutateAsync,
    isLoading,
    error,
    data,
    reset
  };
}
