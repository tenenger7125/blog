export const BLOG_SERVER_BASE_URL = process.env.BLOG_SERVER;

export const EXTERNAL_URL = {
  LOGIN: `${BLOG_SERVER_BASE_URL}/api/auth/login`,
  SIGNUP: `${BLOG_SERVER_BASE_URL}/api/auth/signup`,
  LOGOUT: `${BLOG_SERVER_BASE_URL}/api/auth/logout`,
  IMAGE_UPLOAD: `${BLOG_SERVER_BASE_URL}/api/images/upload`,
  POSTS: `${BLOG_SERVER_BASE_URL}/api/posts`,
} as const;
