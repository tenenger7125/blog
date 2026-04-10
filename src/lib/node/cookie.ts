'use server';

import { cookies } from 'next/headers';

export const getCookie = (name: string): Promise<string | null> => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);

  return Promise.resolve(cookie ? cookie.value : null);
};

export const setCookie = (
  name: string,
  value: string,
  options?: { maxAge?: number; httpOnly?: boolean; path?: string },
) => {
  const cookieStore = cookies();
  cookieStore.set(name, value, options);
};

export const deleteCookie = (name: string, options?: { maxAge?: number; httpOnly?: boolean; path?: string }) => {
  const cookieStore = cookies();
  cookieStore.delete({ name, ...options });
};
