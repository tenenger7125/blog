'use client';

import { cn } from 'dotori-utils';
import Link from 'next/link';

import DarkModeButton from '@/components/shared/dark-mode-button';
import { PATH } from '@/constants';
import useScroll from '@/hooks/use-scroll';

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

        <DarkModeButton />
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
