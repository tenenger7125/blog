'use client';

import { useEffect, useMemo, useState } from 'react';

import { cn } from 'dotori-utils';

import IndexSheet from './index-sheet';

interface TableOfContentProps {
  headings: { depth: number; title: string; link: string }[];
}

const TableOfContent = ({ headings }: TableOfContentProps) => {
  const [active, setActive] = useState<string>('');

  const targets = useMemo(() => headings.map(h => h.link).filter(Boolean), [headings]);

  useEffect(() => {
    if (!targets.length) return undefined;

    // 현재 뷰포트에 있는 헤딩들을 추적
    const visibleSections = new Set<string>();

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const { id } = entry.target as HTMLElement;
          if (!id) return;

          const selector = `#${id}`;

          if (entry.isIntersecting) {
            visibleSections.add(selector);
          } else {
            visibleSections.delete(selector);
          }
        });

        // 가장 위에 있는 visible 섹션을 활성화
        if (visibleSections.size > 0) {
          const firstVisible = targets.find(target => visibleSections.has(target));
          if (firstVisible) {
            setActive(firstVisible);
          }
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1], // 더 세밀한 감지
      },
    );

    const observed: Element[] = [];

    targets.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    });

    return () => {
      observed.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, [targets]);

  return (
    <IndexSheet>
      {headings.map(({ depth, title, link }) => (
        <a
          key={link}
          className={linkTextStyle({ isActive: active === link })}
          href={link}
          style={{ paddingLeft: `${depth * 10}px` }}>
          {title}
        </a>
      ))}
    </IndexSheet>
  );
};

export default TableOfContent;

const linkTextStyle = cn('block cursor-pointer break-all border-l-2 py-1 transition-colors', {
  variants: {
    isActive: {
      true: 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-300',
      false:
        'border-transparent text-gray-600 hover:border-blue-400 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-300',
    },
  },
});
