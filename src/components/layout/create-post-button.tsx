import { FilePlusCorner } from 'lucide-react';
import Link from 'next/link';

import { PATH } from '@/constants';
import { COOKIE_KEYS } from '@/constants/cookie';
import { getCookie } from '@/lib/node/cookie';

import ActionIconButton from '../shared/action-icon-button';

const CreatePostButton = async () => {
  const accessToken = await getCookie(COOKIE_KEYS.ACCESS_TOKEN);

  return (
    accessToken && (
      <Link href={PATH.POST_NEW}>
        <ActionIconButton className="px-4 py-2" label="새 포스트 작성">
          <FilePlusCorner className="dark:text-white" />
        </ActionIconButton>
      </Link>
    )
  );
};

export default CreatePostButton;

export const revalidate = 0;
