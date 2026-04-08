import { LogIn } from 'lucide-react';
import Link from 'next/link';

import ActionIconButton from '@/components/shared/action-icon-button';
import { PATH } from '@/constants';
import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { fetchServerWithAuth } from '@/lib/node/fetch-server';

import LogoutButton from './logout-button';

const AuthButton = async () => {
  const validate = await fetchServerWithAuth(EXTERNAL_URL_IN_NODE.VALIDATE, { method: 'GET' });

  return validate.ok ? (
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
