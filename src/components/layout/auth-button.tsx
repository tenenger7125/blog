import { LogIn } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

import ActionIconButton from '@/components/shared/action-icon-button';
import { COOKIE_KEYS, PATH } from '@/constants';
import { getCookie } from '@/lib/node/cookie';

import LogoutButton from './logout-button';

const AuthButton = async () => {
  noStore();
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
