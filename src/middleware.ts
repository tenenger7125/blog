import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_KEYS, COOKIE_OPTIONS } from '@/constants/cookie';

import { PATH } from './constants';
import { AUTH_EXEMPT_PATHS, AUTH_REQUIRED_PATHS, AUTH_REQUIRED_REGEX_PATHS } from './constants/auth-path';
import { EXTERNAL_URL_IN_NODE } from './constants/node/url';
import { fetchServer } from './lib/node/fetch-server';
import { ReIssueTokenResponseData } from './types/auth';

export const middleware = async (request: NextRequest) => {
  // ✅ 1. RSC 요청(Prefetch 등)인 경우 인증 로직을 수행하지 않고 통과
  // Next.js가 내부적으로 데이터를 미리 가져올 때 사용하는 헤더와 파라미터를 체크합니다.
  if (request.headers.get('x-nextjs-data') || request.nextUrl.searchParams.has('_rsc')) {
    return NextResponse.next();
  }

  const allCookies = request.cookies.getAll();
  console.log('모든 쿠키:', allCookies);
  if (request.nextUrl.searchParams.get('logout') === 'true') {
    const response = NextResponse.redirect(new URL(PATH.LOGIN, request.url));
    response.cookies.delete(COOKIE_KEYS.ACCESS_TOKEN);
    response.cookies.delete(COOKIE_KEYS.REFRESH_TOKEN);
    console.log('쿠키삭제1');
    return response; // 여기서 끝, 이후 로직 안 탐
  }

  const isAuthRequired = AUTH_REQUIRED_PATHS.some(path => request.nextUrl.pathname.startsWith(path));
  const isAuthRequiredRegex = AUTH_REQUIRED_REGEX_PATHS.some(regex => regex.test(request.nextUrl.pathname));
  if (isAuthRequired || isAuthRequiredRegex) {
    const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
    console.log('isAuthRequired || isAuthRequiredRegex 액세스 토큰:', accessToken);
    const validate = await fetchServer(EXTERNAL_URL_IN_NODE.VALIDATE, {
      method: 'GET',
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });

    console.log('isAuthRequired || isAuthRequiredRegex validate:', validate);
    if (validate.ok) {
      return NextResponse.next();
    }

    const refreshToken = request.cookies.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;
    console.log('isAuthRequired || isAuthRequiredRegex refreshToken 토큰:', refreshToken);
    const refreshResult = await fetchServer<ReIssueTokenResponseData>(EXTERNAL_URL_IN_NODE.REFRESH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    console.log('isAuthRequired || isAuthRequiredRegex refreshResult:', refreshResult);

    if (refreshResult.ok && refreshResult.data?.accessToken && refreshResult.data.refreshToken) {
      const response = NextResponse.next();
      response.cookies.set(COOKIE_KEYS.ACCESS_TOKEN, refreshResult.data.accessToken, COOKIE_OPTIONS);
      response.cookies.set(COOKIE_KEYS.REFRESH_TOKEN, refreshResult.data.refreshToken, COOKIE_OPTIONS);
      return response;
    }

    console.log('isAuthRequired || isAuthRequiredRegex 쿠키삭제2');
    const response = NextResponse.redirect(new URL(PATH.LOGIN, request.url));
    response.cookies.delete(COOKIE_KEYS.ACCESS_TOKEN);
    response.cookies.delete(COOKIE_KEYS.REFRESH_TOKEN);
    return response;
  }

  const isAuthExcluded = AUTH_EXEMPT_PATHS.some(path => request.nextUrl.pathname.startsWith(path));
  if (isAuthExcluded) {
    const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
    console.log('isAuthExcluded 액세스 토큰:', accessToken);
    const validate = await fetchServer(EXTERNAL_URL_IN_NODE.VALIDATE, {
      method: 'GET',
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });

    console.log('isAuthExcluded validate:', validate);
    if (validate.ok) {
      return NextResponse.redirect(new URL(PATH.HOME, request.url));
    }

    const refreshToken = request.cookies.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;
    console.log('isAuthExcluded refreshToken 토큰:', refreshToken);
    const refreshResult = await fetchServer<ReIssueTokenResponseData>(EXTERNAL_URL_IN_NODE.REFRESH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    console.log('isAuthExcluded refreshResult:', refreshResult);

    if (refreshResult.ok && refreshResult.data?.accessToken && refreshResult?.data.refreshToken) {
      console.log('isAuthExcluded refreshResult:', refreshResult);
      const response = NextResponse.redirect(new URL(PATH.HOME, request.url));
      response.cookies.set(COOKIE_KEYS.ACCESS_TOKEN, refreshResult.data.accessToken, COOKIE_OPTIONS);
      response.cookies.set(COOKIE_KEYS.REFRESH_TOKEN, refreshResult.data.refreshToken, COOKIE_OPTIONS);
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
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
