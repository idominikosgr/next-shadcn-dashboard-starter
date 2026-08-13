'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';

const cookieKeySchema = z.string().min(1).max(256);
const cookieValueSchema = z.string().max(4096).optional(); // Standard cookie size limit approximation
const cookieOptionsSchema = z.object({
  path: z.string().optional(),
  maxAge: z.int().nonnegative().optional()
});

export async function getValueFromCookie(
  key: string
): Promise<string | undefined> {
  const parsedKey = cookieKeySchema.safeParse(key);
  if (!parsedKey.success) {
    console.error('Invalid cookie key:', parsedKey.error);
    return undefined;
  }

  try {
    const cookieStore = await cookies();
    return cookieStore.get(parsedKey.data)?.value;
  } catch (error) {
    console.error(`Error getting cookie ${parsedKey.data}:`, error);
    return undefined;
  }
}

export async function setValueToCookie(
  key: string,
  value: string,
  options: { path?: string; maxAge?: number } = {}
): Promise<void> {
  const parsedKey = cookieKeySchema.safeParse(key);
  if (!parsedKey.success) {
    console.error('Invalid cookie key:', parsedKey.error);
    return;
  }

  // Note: we allow empty string values
  const parsedValue = z.string().safeParse(value);
  if (!parsedValue.success) {
     console.error('Invalid cookie value:', parsedValue.error);
     return;
  }

  const parsedOptions = cookieOptionsSchema.safeParse(options);
  if (!parsedOptions.success) {
      console.error('Invalid cookie options:', parsedOptions.error);
      return;
  }

  try {
    const cookieStore = await cookies();
    cookieStore.set(parsedKey.data, parsedValue.data, {
      path: parsedOptions.data.path ?? '/',
      maxAge: parsedOptions.data.maxAge ?? 60 * 60 * 24 * 7 // default: 7 days
    });
  } catch (error) {
    console.error(`Error setting cookie ${parsedKey.data}:`, error);
  }
}

export async function getPreference<T extends string>(
  key: string,
  allowed: readonly T[],
  fallback: T
): Promise<T> {
  const parsedKey = cookieKeySchema.safeParse(key);
   if (!parsedKey.success) {
    return fallback;
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.get(parsedKey.data);
  const value = cookie ? cookie.value.trim() : undefined;
  return allowed.includes(value as T) ? (value as T) : fallback;
}
