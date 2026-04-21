'use client';

import { LogIn, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import ActionIconButton from '@/components/shared/action-icon-button';
import { PATH } from '@/constants';
import useLogoutMutation from '@/hooks/mutations/auth/use-logout.mutation';
import useTokenValidateQuery from '@/hooks/queries/auth/use-token-validate.query';

const AuthButton = () => {
  const router = useRouter();

  const { data, isLoading } = useTokenValidateQuery();
  const isLogin = !!data?.ok;

  const { mutateAsync: logoutMutateAsync } = useLogoutMutation();

  const logout = async () => {
    await logoutMutateAsync();
    router.refresh();
  };

  const login = () => {
    router.push(PATH.LOGIN);
  };

  return (
    <ActionIconButton
      className="px-4 py-2"
      label={isLogin ? '로그아웃' : '로그인'}
      loading={isLoading}
      onClick={isLogin ? logout : login}>
      {isLogin ? <LogOut className="dark:text-white" /> : <LogIn className="dark:text-white" />}
    </ActionIconButton>
  );
};

export default AuthButton;
