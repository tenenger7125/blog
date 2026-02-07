import { NextRequest, NextResponse } from 'next/server';

import { STORAGE_KEYS } from './constants';

export const middleware = (request: NextRequest) => {
  const res = NextResponse.next();

  const darkModeCookie = request.cookies.get(STORAGE_KEYS.DOTORI_BLOG_DARK_MODE_STORAGE)?.value;

  if (darkModeCookie === undefined || darkModeCookie === null) {
    res.cookies.set(STORAGE_KEYS.DOTORI_BLOG_DARK_MODE_STORAGE, 'false');
  }
  return res;
};
