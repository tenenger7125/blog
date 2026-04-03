export const INTERNAL_URL = {
  LOGIN: '/api/auth/login',
  SIGNUP: '/api/auth/signup',
  LOGOUT: '/api/auth/logout',
  IMAGE_UPLOAD: '/api/image/upload',
  POSTS: `${process.env.NEXT_PUBLIC_API_URL}/api/posts`,
} as const;
