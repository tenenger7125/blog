import { redirect } from 'next/navigation';

import { PATH } from '@/constants';

const page = () => redirect(`${PATH.POSTS}/1`);

export default page;
