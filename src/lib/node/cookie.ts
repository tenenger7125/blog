'use server';

import { cookies } from 'next/headers';

export const getCookie = (name: string): Promise<string | null> => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);

  return Promise.resolve(cookie ? cookie.value : null);
};
