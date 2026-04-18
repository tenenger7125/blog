export const BLOG_SERVER_BASE_URL = process.env.BLOG_SERVER;

export const EXTERNAL_URL_IN_NODE = {
  BLOG_SERVER_BASE_URL: process.env.BLOG_SERVER,
  get VALIDATE() {
    return `${this.BLOG_SERVER_BASE_URL}/api/auth/validate`;
  },
  get LOGIN() {
    return `${this.BLOG_SERVER_BASE_URL}/api/auth/login`;
  },
  get SIGNUP() {
    return `${this.BLOG_SERVER_BASE_URL}/api/auth/signup`;
  },
  get LOGOUT() {
    return `${this.BLOG_SERVER_BASE_URL}/api/auth/logout`;
  },
  get REFRESH() {
    return `${this.BLOG_SERVER_BASE_URL}/api/auth/refresh`;
  },
  get IMAGE_UPLOAD() {
    return `${this.BLOG_SERVER_BASE_URL}/api/images/upload`;
  },
  get STATIC_IMAGE() {
    return `${this.BLOG_SERVER_BASE_URL}/api/static/images`;
  },
  get POSTS() {
    return `${this.BLOG_SERVER_BASE_URL}/api/posts`;
  },
  get POST_CATEGORIES() {
    return `${this.BLOG_SERVER_BASE_URL}/api/post-categories`;
  },
} as const;

export const INTERNAL_URL_IN_NODE = {
  BLOG_BASE_URL: process.env.NEXT_PUBLIC_BLOG_URL || 'http://localhost:3000',
  get POSTS() {
    return `${this.BLOG_BASE_URL}/api/posts`;
  },
  get POSTS_SITEMAP() {
    return `${this.BLOG_BASE_URL}/api/posts/sitemap`;
  },
  get VALIDATE() {
    return `${this.BLOG_BASE_URL}/api/auth/validate`;
  },
  get CLEAR_EXPIRED_TOKEN() {
    return `${this.BLOG_BASE_URL}/api/auth/clear-expired-token`;
  },
  get LOGOUT() {
    return `${this.BLOG_BASE_URL}/api/auth/logout`;
  },
};
