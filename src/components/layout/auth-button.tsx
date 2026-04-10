import { LogIn } from 'lucide-react';
import Link from 'next/link';

import ActionIconButton from '@/components/shared/action-icon-button';
import { PATH } from '@/constants';
import { COOKIE_KEYS } from '@/constants/cookie';
import { getCookie } from '@/lib/node/cookie';

import LogoutButton from './logout-button';

const AuthButton = async () => {
  const accessToken = await getCookie(COOKIE_KEYS.ACCESS_TOKEN);

  return accessToken ? (
    <LogoutButton />
  ) : (
    <Link href={PATH.LOGIN}>
      <ActionIconButton className="px-4 py-2" label="로그인">
        <LogIn className="dark:text-white" />
      </ActionIconButton>
    </Link>
  );
};

export default AuthButton;

export const revalidate = 0;
