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
      <div className="fixed right-0 top-20 rounded-lg bg-white lg:hidden">
        <ActionIcon
          className="bg-white dark:bg-gray-700 dark:hover:bg-gray-900"
          icon="hamburger"
          size="xl"
          onClick={open}
        />
        <Drawer close={close} isOpen={isOpen}>
          <div className="px-2 py-1">{children}</div>
        </Drawer>
      </div>

      <div className="sticky right-0 top-20 max-h-128 min-w-72 overflow-y-auto max-lg:hidden">{children}</div>
    </>
  );
};

export default Side;
