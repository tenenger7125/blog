import { redirect } from 'next/navigation';

import { PATH } from '../constants';

const HOME = () => {
  redirect(PATH.POSTS);
};

export default HOME;
