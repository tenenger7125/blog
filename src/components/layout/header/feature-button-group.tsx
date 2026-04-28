'use client';

import { FilePlusCorner, LogIn, LogOut, Menu, Moon, Sun } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import ActionIconButton from '@/components/shared/action-icon-button';
import DarkModeButton from '@/components/shared/dark-mode-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PATH } from '@/constants';
import { Theme } from '@/constants/theme';
import { useThemeContext } from '@/contexts/theme-context';
import useLogoutMutation from '@/hooks/mutations/auth/use-logout.mutation';
import useTokenValidateQuery from '@/hooks/queries/auth/use-token-validate.query';

import AuthButton from './auth-button';
import CreatePostButton from './create-post-button';

const FeatureButtonGroup = () => {
  const pathname = usePathname();
  const [{ theme }, setTheme, mounted] = useThemeContext();
  const { data, isLoading } = useTokenValidateQuery();
  const isLogin = !!data?.ok;
  const isMatch = [PATH.LOGIN, PATH.SIGNUP].some(path => pathname.includes(path));

  const router = useRouter();
  const handleCreatePostButtonClick = () => {
    router.push(PATH.POST_NEW);
  };

  const { mutateAsync: logoutMutateAsync } = useLogoutMutation();

  const logout = async () => {
    await logoutMutateAsync();
    router.refresh();
  };

  const login = () => {
    router.push(PATH.LOGIN);
  };

  return (
    <>
      <div className="hidden items-center gap-4 sm:flex">
        {!isMatch && <CreatePostButton />}
        {!isMatch && <AuthButton />}
        <DarkModeButton />
      </div>

      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ActionIconButton className="px-4 py-2" label="기능 버튼 열기" loading={isLoading || !mounted}>
              <Menu className="dark:text-white" />
            </ActionIconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuGroup>
              {!isMatch && isLogin && (
                <DropdownMenuItem onClick={handleCreatePostButtonClick}>
                  <FilePlusCorner className="dark:text-white" />
                  <DropdownMenuShortcut>새 포스트 작성</DropdownMenuShortcut>
                </DropdownMenuItem>
              )}
              {!isMatch && (
                <DropdownMenuItem onClick={isLogin ? logout : login}>
                  {isLogin ? <LogOut className="dark:text-white" /> : <LogIn className="dark:text-white" />}
                  <DropdownMenuShortcut>{isLogin ? '로그아웃' : '로그인'}</DropdownMenuShortcut>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => setTheme({ theme: theme === Theme.Dark ? Theme.Light : Theme.Dark })}>
                {theme === Theme.Dark ? <Moon className="text-yellow-600" /> : <Sun className="text-red-800" />}
                <DropdownMenuShortcut>다크모드</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default FeatureButtonGroup;
