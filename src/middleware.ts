import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_KEYS, PATH } from './constants';
import { AUTH_EXEMPT_PATHS, AUTH_REQUIRED_PATHS, AUTH_REQUIRED_REGEX_PATHS } from './constants/auth-path';
import { EXTERNAL_URL_IN_NODE } from './constants/node/url';
import { fetchServer } from './lib/node/fetch-server';
import { ReIssueTokenResponseData } from './types/auth';

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();

  if (request.nextUrl.searchParams.get('logout') === 'true') {
    const res = NextResponse.redirect(new URL(PATH.LOGIN, request.url));
    res.cookies.delete(COOKIE_KEYS.ACCESS_TOKEN);
    res.cookies.delete(COOKIE_KEYS.REFRESH_TOKEN);
    return res; // 여기서 끝, 이후 로직 안 탐
  }

  const isAuthRequired = AUTH_REQUIRED_PATHS.some(path => request.nextUrl.pathname.startsWith(path));
  const isAuthRequiredRegex = AUTH_REQUIRED_REGEX_PATHS.some(regex => regex.test(request.nextUrl.pathname));
  const isAuthExcluded = AUTH_EXEMPT_PATHS.some(path => request.nextUrl.pathname.startsWith(path));

  if (!isAuthRequired && !isAuthRequiredRegex && !isAuthExcluded) {
    return response; // 인증이 필요한 경로가 아니면 바로 다음으로
  }

  let valid = true;
  const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
  const validate = await fetchServer(EXTERNAL_URL_IN_NODE.VALIDATE, {
    method: 'GET',
    headers: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
  if (!validate.ok) {
    const refreshToken = request.cookies.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;

    const refreshResult = await fetchServer<ReIssueTokenResponseData>(EXTERNAL_URL_IN_NODE.REFRESH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshResult.ok || !refreshResult.data?.accessToken) {
      response.cookies.delete(COOKIE_KEYS.ACCESS_TOKEN);
      response.cookies.delete(COOKIE_KEYS.REFRESH_TOKEN);
      valid = false;
    } else {
      response.cookies.set(COOKIE_KEYS.ACCESS_TOKEN, refreshResult.data.accessToken);
      response.cookies.set(COOKIE_KEYS.REFRESH_TOKEN, refreshResult.data.refreshToken);
    }
  }

  if ((isAuthRequired || isAuthRequiredRegex) && !valid) {
    const res = NextResponse.redirect(new URL(PATH.LOGIN, request.url));

    res.cookies.delete(COOKIE_KEYS.ACCESS_TOKEN);
    res.cookies.delete(COOKIE_KEYS.REFRESH_TOKEN);

    res.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');

    return res;
  }

  if (isAuthExcluded && valid) {
    return NextResponse.redirect(new URL(PATH.HOME, request.url));
  }

  return response;
};

export const config = {
  matcher: [
    /*
     * 아래로 시작하는 경로를 제외한 모든 경로에 미들웨어 적용:
     * - api (API 라우트)
     * - _next/static (정적 파일: js, css 등)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - public 폴더 안의 이미지 등 (png, jpg, svg 등)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
};
