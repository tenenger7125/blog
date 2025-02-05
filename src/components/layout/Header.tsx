'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from 'dotori-utils';
import Link from 'next/link';

import { PATH } from '@/constants';

const Header = () => {
  const [scroll, setScroll] = useState(defaultScroll);
  const prev = useRef(scroll);

  useEffect(() => {
    setScroll(p => ({ ...p, ...getScrollPosition() }));
  }, []);

  useEffect(() => {
    prev.current = scroll;

    const onScroll = () => {
      const prevScroll = prev.current;

      const scrollPosition = getScrollPosition();
      const newIsScrollDown =
        scrollPosition.y === prevScroll.y ? prevScroll.isScrollDown : scrollPosition.y > prevScroll.y;
      const newIsScrollUp = scrollPosition.y === prevScroll.y ? prevScroll.isScrollUp : scrollPosition.y < prevScroll.y;

      const newScroll = {
        ...scrollPosition,
        isScrollDown: newIsScrollDown,
        isScrollUp: newIsScrollUp,
      };

      setScroll(newScroll);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [scroll]);

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

const getScrollPosition = () => ({
  x: window.scrollX,
  y: window.scrollY,
});

const defaultScroll = {
  x: 0,
  y: 0,
  isScrollDown: false,
  isScrollUp: false,
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
