'use client';

import { ActionIcon, Entity, Tooltip } from 'dotori-components';
import { cn, getNowMonthDate } from 'dotori-utils';

const Footer = ({ className }: FooterProps) => {
  const { year } = getNowMonthDate();

  return (
    <footer className="relative h-48 w-full py-4 text-xs shadow-inner">
      <div className={footerStyle({ className })}>
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-2">
            <h4 className="typo-xs700">
              <span>마크다운 블로그</span>
            </h4>
            <div>
              <Entity className="mr-1" symbol="©" />
              <span>{year} LEE_DONG_GYU, All rights reserved.</span>
            </div>
          </div>
          <div>
            <a href="https://github.com/tenenger7125/blog" rel="noopener noreferrer">
              <Tooltip label="github">
                <ActionIcon className="p-1" icon="github" size="xl" withoutPadding />
              </Tooltip>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterProps {
  className?: string;
}

const footerStyle = cn('fixed mx-auto flex h-inherit flex-wrap items-center justify-between gap-4');

export default Footer;
