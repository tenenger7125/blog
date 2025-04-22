/* eslint-disable react/no-unknown-property */

'use client';

import { useEffect, useRef } from 'react';

const Comment = () => {
  const count = useRef(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (count.current >= 1) return;

    const script = document.createElement('script');

    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', 'tenenger7125/blog');
    script.setAttribute('issue-term', 'title');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('label', 'blog-comment');

    ref.current.appendChild(script);
    count.current += 1;
  }, []);

  return <div ref={ref} />;
};

export default Comment;
