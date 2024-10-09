'use client';

import { Title } from 'dotori-components';
import { cn } from 'dotori-utils';
import Link from 'next/link';

import { PATH } from '@/constants';

const Header = ({ className }: HeaderProps) => (
  <div className={headerStyle({ className })}>
    <Title order={2}>
      <Link href={PATH.HOME}>Home</Link>
    </Title>
  </div>
);

interface HeaderProps {
  className?: string;
}

const headerStyle = cn('');

export default Header;
