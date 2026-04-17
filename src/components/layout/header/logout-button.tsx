'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import ActionIconButton from '@/components/shared/action-icon-button';
import { INTERNAL_URL_IN_CLIENT } from '@/constants/url';

const LogoutButton = () => {
  const router = useRouter();
  const logout = async () => {
    await fetch(INTERNAL_URL_IN_CLIENT.LOGOUT, { method: 'POST' });
    router.refresh();
  };

  return (
    <ActionIconButton className="px-4 py-2" label="로그아웃" onClick={logout}>
      <LogOut className="dark:text-white" />
    </ActionIconButton>
  );
};

export default LogoutButton;
