import { NextRequest, NextResponse } from 'next/server';

import { PATH } from './constants';
import { AUTH_EXEMPT_PATHS, AUTH_REQUIRED_PATHS } from './constants/auth-path';

export const middleware = (request: NextRequest) => {
  const response = NextResponse.next();

  const isAuthRequired = AUTH_REQUIRED_PATHS.some(path => request.nextUrl.pathname.startsWith(path));

  if (isAuthRequired) {
    const accessToken = request.cookies.get('accessToken')?.value;
    if (!accessToken) {
      return NextResponse.redirect(new URL(PATH.LOGIN, request.url));
    }
  }

  const isAuthExcluded = AUTH_EXEMPT_PATHS.some(path => request.nextUrl.pathname.startsWith(path));

  if (isAuthExcluded) {
    const accessToken = request.cookies.get('accessToken')?.value;
    if (accessToken) {
      return NextResponse.redirect(new URL(PATH.HOME, request.url));
    }
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
