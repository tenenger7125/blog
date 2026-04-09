export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  path: '/',
  // 배포 시에는 HTTPS이므로 true, 로컬은 http이므로 false
  secure: process.env.NODE_ENV === 'production',
  // 크로스 도메인 이슈가 있다면 'none', 같은 도메인 내라면 'lax'
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
} as const;
