import { redirect } from 'next/navigation';

import { PATH } from '@/constants';

const Redirect = () => {
  redirect(`${PATH.POST}/1`);
};

export default Redirect;
