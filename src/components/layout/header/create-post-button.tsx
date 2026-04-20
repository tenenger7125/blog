'use client';

import { FilePlusCorner } from 'lucide-react';
import { useRouter } from 'next/navigation';

import ActionIconButton from '@/components/shared/action-icon-button';
import { PATH } from '@/constants';
import useTokenValidateQuery from '@/hooks/queries/auth/use-token-validate.query';

const CreatePostButton = () => {
  const router = useRouter();

  const { data, isLoading } = useTokenValidateQuery();
  const isLogin = !!data?.ok;

  const handleCreatePostButtonClick = () => {
    router.push(PATH.POST_NEW);
  };

  return (
    isLogin && (
      <ActionIconButton
        className="px-4 py-2"
        label="새 포스트 작성"
        loading={isLoading}
        onClick={handleCreatePostButtonClick}>
        <FilePlusCorner className="dark:text-white" />
      </ActionIconButton>
    )
  );
};

export default CreatePostButton;
