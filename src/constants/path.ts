export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  POSTS: '/posts',
  POST: '/post',
  POST_EDIT: (postId: string) => `/post/${postId}/edit`,
  POST_NEW: '/post/new',
};
