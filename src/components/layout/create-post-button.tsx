import { FilePlusCorner } from 'lucide-react';
import Link from 'next/link';

import { PATH } from '@/constants';
import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { fetchServerWithAuth } from '@/lib/node/fetch-server';

import ActionIconButton from '../shared/action-icon-button';

const CreatePostButton = async () => {
  const validate = await fetchServerWithAuth(EXTERNAL_URL_IN_NODE.VALIDATE, { method: 'GET' });

  return (
    validate.ok && (
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
