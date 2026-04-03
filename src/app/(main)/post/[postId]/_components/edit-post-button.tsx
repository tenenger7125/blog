'use client';

import { useEffect, useState } from 'react';

import { FilePenLine } from 'lucide-react';
import Link from 'next/link';

import ActionIconButton from '@/components/shared/action-icon-button';
import { COOKIE_KEYS, PATH } from '@/constants';
import { getCookie as getCookieClient } from '@/lib/cookie';

const EditPostButton = ({ postId }: EditPostButtonProps) => {
  const [cookie, setCookie] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const value = getCookieClient(COOKIE_KEYS.ACCESS_TOKEN);
    setCookie(value);
  }, []);

  return (
    cookie && (
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
