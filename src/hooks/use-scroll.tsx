import { useEffect, useRef, useState } from 'react';

const defaultScroll = {
  x: 0,
  y: 0,
  isScrollDown: false,
  isScrollUp: false,
};

const useScroll = () => {
  const [scroll, setScroll] = useState(defaultScroll);
  const prevY = useRef(0); // ref로 이전값 관리 (클로저 문제 없음)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScroll({
        x: window.scrollX,
        y: currentY,
        isScrollDown: currentY > prevY.current,
        isScrollUp: currentY < prevY.current,
      });
      prevY.current = currentY;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []); // ← 마운트 시 1회만 등록

  return scroll;
};

export default useScroll;
