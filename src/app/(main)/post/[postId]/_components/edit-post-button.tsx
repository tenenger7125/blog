'use client';

import { FilePenLine } from 'lucide-react';
import Link from 'next/link';

import ActionIconButton from '@/components/shared/action-icon-button';
import { PATH } from '@/constants';
import useTokenValidateQuery from '@/hooks/queries/auth/use-token-validate.query';

const EditPostButton = ({ postId }: EditPostButtonProps) => {
  const { data } = useTokenValidateQuery();
  const isLogin = !!data?.ok;

  return (
    isLogin && (
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
