import { FilePlusCorner } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

import { COOKIE_KEYS, PATH } from '@/constants';
import { getCookie } from '@/lib/node/cookie';

import ActionIconButton from '../shared/action-icon-button';

const CreatePostButton = async () => {
  noStore();
  const accessToken = await getCookie(COOKIE_KEYS.ACCESS_TOKEN);

  if (!accessToken) return null;

  return (
    <Link href={PATH.POST_NEW}>
      <ActionIconButton className="px-4 py-2" label="새 포스트 작성">
        <FilePlusCorner className="dark:text-white" />
      </ActionIconButton>
    </Link>
  );
};

export default CreatePostButton;
