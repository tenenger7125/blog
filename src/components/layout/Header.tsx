'use client';

import { cn } from 'dotori-utils';
import Link from 'next/link';

import { PATH } from '@/constants';
import { useScroll } from '@/hooks';

const Header = () => {
  const scroll = useScroll();

  return (
    <header className={headerStyle({ hidden: scroll.isScrollDown })}>
      <div className="m-auto max-w-8xl">
        <h2 className="font-yOnepickBold text-2xl font-bold">
          <Link href={PATH.HOME}>동그라미</Link>
        </h2>
      </div>
    </header>
  );
};

const headerStyle = cn('sticky z-[3] w-full border-b border-gray-100 bg-white transition-all px-3 py-4', {
  variants: {
    hidden: {
      true: '-top-full',
      false: 'top-0',
    },
  },
});

export default Header;
