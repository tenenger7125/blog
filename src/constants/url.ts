export const INTERNAL_URL_IN_CLIENT = {
  BLOG_BASE_URL: process.env.NEXT_PUBLIC_BLOG_URL || 'http://localhost:3000',
  LOGIN: '/api/auth/login',
  SIGNUP: '/api/auth/signup',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh',
  IMAGE_UPLOAD: `/api/images/upload`,
  STATIC_IMAGE: `/api/images/static`,
  POSTS: `/api/posts`,
  POST_CATEGORIES: `/api/post-categories`,
} as const;
