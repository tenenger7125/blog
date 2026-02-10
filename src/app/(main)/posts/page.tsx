import { redirect } from 'next/navigation';

import { PATH } from '@/constants';

const Redirect = () => {
  redirect(`${PATH.POSTS}/1`);
};

export default Redirect;
