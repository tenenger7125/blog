import { FilePenLine } from 'lucide-react';
import Link from 'next/link';

import ActionIconButton from '@/components/shared/action-icon-button';
import { PATH } from '@/constants';
import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { fetchServerWithAuth } from '@/lib/node/fetch-server';

const EditPostButton = async ({ postId }: EditPostButtonProps) => {
  const validate = await fetchServerWithAuth(EXTERNAL_URL_IN_NODE.VALIDATE, { method: 'GET' });

  return (
    validate.ok && (
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
