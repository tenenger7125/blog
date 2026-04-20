export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  path: '/',
  // secure: process.env.NODE_ENV === 'production',
  secure: process.env.SECURE_COOKIE === 'true',
  sameSite: 'lax',
} as const;
