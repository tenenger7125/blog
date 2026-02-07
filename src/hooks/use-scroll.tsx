'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const useScroll = () => {
  const [scroll, setScroll] = useState(defaultScroll);
  const prev = useRef(scroll);

  const onScroll = useCallback(() => {
    prev.current = scroll;

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
  }, [scroll]);

  useEffect(() => {
    setScroll(p => ({ ...p, ...getScrollPosition() }));
    onScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return scroll;
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

export default useScroll;
