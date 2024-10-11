import path from 'path';

export const FOLDER_PATH = {
  ROOT: process.env.PWD,
  get POSTS_ROOT() {
    return this.ROOT ? path.join(this.ROOT, '/src/assets/posts') : '';
  },
};
