export const BLOG_SERVER_BASE_URL = process.env.BLOG_SERVER;

export const EXTERNAL_URL_IN_NODE = {
  LOGIN: `${BLOG_SERVER_BASE_URL}/api/auth/login`,
  SIGNUP: `${BLOG_SERVER_BASE_URL}/api/auth/signup`,
  LOGOUT: `${BLOG_SERVER_BASE_URL}/api/auth/logout`,
  IMAGE_UPLOAD: `${BLOG_SERVER_BASE_URL}/api/images/upload`,
  STATIC_IMAGE: `${BLOG_SERVER_BASE_URL}/api/static/images`,
  POSTS: `${BLOG_SERVER_BASE_URL}/api/posts`,
} as const;

export const INTERNAL_URL_IN_NODE = {
  BLOG_BASE_URL: process.env.NEXT_PUBLIC_BLOG_URL || 'http://localhost:3000',
  get POSTS() {
    return `${this.BLOG_BASE_URL}/api/posts`;
  },
};
