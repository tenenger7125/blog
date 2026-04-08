import { FilePenLine } from 'lucide-react';
import Link from 'next/link';

import ActionIconButton from '@/components/shared/action-icon-button';
import { COOKIE_KEYS, PATH } from '@/constants';
import { getCookie } from '@/lib/node/cookie';

const EditPostButton = async ({ postId }: EditPostButtonProps) => {
  const accessToken = await getCookie(COOKIE_KEYS.ACCESS_TOKEN);

  return (
    accessToken && (
      <Link href={PATH.POST_EDIT(postId)}>
        <ActionIconButton className="px-4 py-2" label="포스트 수정">
          <FilePenLine className="dark:text-white" />
        </ActionIconButton>
      </Link>
    )
  );
};

export default EditPostButton;

interface EditPostButtonProps {
  postId: string;
}
