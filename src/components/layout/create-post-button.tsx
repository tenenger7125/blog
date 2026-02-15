'use client';

import { useEffect, useState } from 'react';

import { FilePlusCorner } from 'lucide-react';
import Link from 'next/link';

import { COOKIE_KEYS, PATH } from '@/constants';
import { getCookie as getCookieClient } from '@/lib/cookie';

import ActionIconButton from '../shared/action-icon-button';

const CreatePostButton = () => {
  const [cookie, setCookie] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const value = getCookieClient(COOKIE_KEYS.ACCESS_TOKEN);
    setCookie(value);
  }, []);

  if (cookie === undefined) {
    return null;
  }

  return (
    cookie && (
      <Link href={PATH.POST_NEW}>
        <ActionIconButton className="px-4 py-2" label="새 포스트 작성">
          <FilePlusCorner className="dark:text-white" />
        </ActionIconButton>
      </Link>
    )
  );
};

export default CreatePostButton;
