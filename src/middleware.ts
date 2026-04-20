import { NextRequest, NextResponse } from 'next/server';

import { PATH } from './constants';
import { AUTH_EXEMPT_PATHS, AUTH_REQUIRED_PATHS, AUTH_REQUIRED_REGEX_PATHS } from './constants/auth-path';
import { INTERNAL_URL_IN_NODE } from './constants/node/url';
import { requestHttp } from './utils/http/request';

export const middleware = async (request: NextRequest) => {
  const { pathname, search } = request.nextUrl; // 현재 경로와 쿼리스트링 추출

  const isAuthRequired = AUTH_REQUIRED_PATHS.some(path => request.nextUrl.pathname.startsWith(path));
  const isAuthRequiredRegex = AUTH_REQUIRED_REGEX_PATHS.some(regex => regex.test(request.nextUrl.pathname));
  if (isAuthRequired || isAuthRequiredRegex) {
    const vadliate = await requestHttp.get(INTERNAL_URL_IN_NODE.VALIDATE);

    if (!vadliate.ok) {
      // [수정] 가려던 주소를 callbackUrl에 담아서 리다이렉트
      const refreshUrl = new URL(PATH.REFRESH, request.url);
      refreshUrl.searchParams.set('callbackUrl', `${pathname}${search}`);

      return NextResponse.redirect(refreshUrl);
    }
  }

  const isAuthExcluded = AUTH_EXEMPT_PATHS.some(path => request.nextUrl.pathname.startsWith(path));
  if (isAuthExcluded) {
    const vadliate = await requestHttp.get(INTERNAL_URL_IN_NODE.VALIDATE);
    if (vadliate.ok) {
      return NextResponse.redirect(new URL(PATH.HOME, request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/login', '/signup', '/post/new', '/post/:path*/edit'],
};
