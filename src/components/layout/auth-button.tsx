'use client';

import { useEffect, useState } from 'react';

import { LoaderCircle, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';

import { COOKIE_KEYS, PATH } from '@/constants';
import { getCookie as getCookieClient } from '@/lib/cookie';
import { setCookie as setCookieClient } from '@/lib/node/cookie';

import ActionIconButton from '../shared/action-icon-button';

const AuthButton = () => {
  const [cookie, setCookie] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const value = getCookieClient(COOKIE_KEYS.ACCESS_TOKEN);
    setCookie(value);
  }, []);

  const logout = () => {
    setCookieClient(COOKIE_KEYS.ACCESS_TOKEN, '', { maxAge: 0 });
    setCookieClient(COOKIE_KEYS.REFRESH_TOKEN, '', { maxAge: 0 });
    setCookie(null);
  };

  if (cookie === undefined) {
    return (
      <ActionIconButton className="px-4 py-2" label="로딩 중">
        <LoaderCircle className="animate-spin dark:text-white" />
      </ActionIconButton>
    );
  }

  return (
    <>
      {cookie ? (
        <ActionIconButton className="px-4 py-2" label="로그아웃" onClick={logout}>
          <LogOut className="dark:text-white" />
        </ActionIconButton>
      ) : (
        <Link href={PATH.LOGIN}>
          <ActionIconButton className="px-4 py-2" label="로그인">
            <LogIn className="dark:text-white" />
          </ActionIconButton>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
