'use client';

import { cn } from 'dotori-utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PATH } from '@/constants';
import useScroll from '@/hooks/use-scroll';

import FeatureButtonGroup from './feature-button-group';

const Header = () => {
  const pathname = usePathname();
  const scroll = useScroll();

  const isHome = pathname === PATH.HOME;
  const isPost = pathname.includes(PATH.POSTS);

  return (
    <header className={headerStyle({ hidden: scroll.isScrollDown })}>
      <div className="max-w-8xl m-auto flex justify-between">
        <div className="flex items-center gap-6">
          <h2 className="inline-block text-nowrap font-yOnepickBold text-xl sm:text-2xl">
            <Link className={buttonStyle({ active: isHome })} href={PATH.HOME}>
              동그라미
            </Link>
          </h2>
          <ol className="flex items-center gap-5 text-nowrap font-yOnepickBold text-sm sm:text-lg">
            <li className="h-full">
              <Link className={buttonStyle({ active: isPost })} href={PATH.POSTS}>
                게시글
              </Link>
            </li>
          </ol>
        </div>

        <FeatureButtonGroup />
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

const buttonStyle = cn('rounded-lg px-3 hover:bg-gray-300 dark:hover:bg-black', {
  variants: {
    active: {
      true: 'bg-gray-300 dark:bg-black',
      flase: '',
    },
  },
});
