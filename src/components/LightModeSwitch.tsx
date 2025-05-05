'use client';

import { useEffect } from 'react';

import dynamic from 'next/dynamic';

import useDisClosure from '../hooks/useDisclosure';

const DotoriSwitch = dynamic(() => import('dotori-components').then(mod => mod.Switch), { ssr: false });

const systemLightMode =
  typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: light)').matches : undefined;
const localLightMode = typeof window !== 'undefined' ? localStorage.getItem('lightMode') === 'true' : undefined;
const isLightMode =
  localLightMode === undefined ? (systemLightMode === undefined ? false : systemLightMode) : localLightMode;

const LightModeSwitch = () => {
  const { isOpen: isLight, open: lightOn, close: lightOff } = useDisClosure(false);

  useEffect(() => {
    if (isLightMode) lightOn();
    else lightOff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', isLight);
    document.documentElement.classList.toggle('dark', !isLight);

    localStorage.setItem('lightMode', `${isLight}`);
  }, [isLight]);

  return (
    <>
      <DotoriSwitch checked={isLight} off={lightOff} on={lightOn} />
    </>
  );
};

export default LightModeSwitch;
