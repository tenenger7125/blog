'use client';

import { useEffect } from 'react';

const ScrollRestoration = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'; // 브라우저가 자동으로 scroll 복구하지 않도록
    }
  }, []);

  return null;
};

export default ScrollRestoration;
