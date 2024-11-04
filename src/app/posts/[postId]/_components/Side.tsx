'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

const ActionIcon = dynamic(() => import('dotori-components').then(mod => mod.ActionIcon), { ssr: false });
const Drawer = dynamic(() => import('dotori-components').then(mod => mod.Drawer), { ssr: false });

const Side = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <div className="relative">
        <ActionIcon
          className="sticky right-0 top-4 rounded-lg bg-white lg:hidden"
          icon="hamburger"
          size="xl"
          onClick={open}
        />
        <div className="sticky right-0 top-4 min-w-40 max-lg:hidden">{children}</div>
      </div>
      <Drawer close={close} isOpen={isOpen}>
        <div className="px-2 py-1">{children}</div>
      </Drawer>
    </>
  );
};

export default Side;
