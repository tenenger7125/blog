'use client';

import { cn } from 'dotori-utils';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

import DarkModeButton from '@/components/shared/dark-mode-button';
import { PATH } from '@/constants';
import useScroll from '@/hooks/use-scroll';

import ActionIconButton from '../shared/action-icon-button';

const Header = () => {
  const scroll = useScroll();

  return (
    <header className={headerStyle({ hidden: scroll.isScrollDown })}>
      <div className="max-w-8xl m-auto flex justify-between">
        <div className="flex items-center gap-10">
          <h2 className="inline-block font-yOnepickBold text-2xl font-bold">
            <Link href={PATH.HOME}>동그라미</Link>
          </h2>
          <ol className="flex items-center gap-5 text-lg font-bold">
            <li>
              <Link href={PATH.POSTS}>포스트</Link>
            </li>
          </ol>
        </div>

        <div className="flex items-center gap-4">
          <Link href={PATH.LOGIN}>
            <ActionIconButton className="px-4 py-2" label="로그인">
              <LogIn className="dark:text-white" />
            </ActionIconButton>
          </Link>
          <DarkModeButton />
        </div>
      </div>
    </header>
  );
};

const headerStyle = cn(
  'sticky z-[3] w-full border-b dark:border-gray-900 border-gray-100 bg-gray-0 transition-all px-3 py-4 dark:bg-gray-900 dark:text-gray-100',
  {
    variants: {
      hidden: {
        true: '-top-full',
        false: 'top-0',
      },
    },
  },
);

export default Header;
