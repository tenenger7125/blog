'use client';

import { cn } from 'dotori-utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import DarkModeButton from '@/components/shared/dark-mode-button';
import { PATH } from '@/constants';
import useScroll from '@/hooks/use-scroll';

import AuthButton from './auth-button';
import CreatePostButton from './create-post-button';

const Header = () => {
  const pathname = usePathname();
  const scroll = useScroll();

  const isMatch = [PATH.LOGIN, PATH.SIGNUP].some(path => pathname.includes(path));

  return (
    <header className={headerStyle({ hidden: scroll.isScrollDown })}>
      <div className="max-w-8xl m-auto flex justify-between">
        <div className="flex items-center gap-6">
          <h2 className="inline-block font-yOnepickBold text-2xl">
            <Link className="rounded-lg px-3 hover:bg-gray-300 dark:hover:bg-black" href={PATH.HOME}>
              동그라미
            </Link>
          </h2>
          <ol className="flex items-center gap-5 font-yOnepickBold text-lg">
            <li className="h-full">
              <Link className="h-full rounded-lg px-3 hover:bg-gray-300 dark:hover:bg-black" href={PATH.POSTS}>
                게시글
              </Link>
            </li>
          </ol>
        </div>

        <div className="flex items-center gap-4">
          {!isMatch && <CreatePostButton />}
          {!isMatch && <AuthButton />}
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
