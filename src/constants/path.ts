export const PATH = {
  HOME: '/',
  NOT_FOUND: '/not-found',
  REFRESH: '/refresh',
  LOGIN: '/login',
  SIGNUP: '/signup',
  POST: '/post',
  get POST_NEW() {
    return `${this.POST}/new`;
  },
  get POST_EDIT() {
    return (postId: string) => `${this.POST}/${postId}/edit`;
  },
  POSTS: '/posts',
};
