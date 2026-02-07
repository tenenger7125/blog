'use client';

import { useEffect } from 'react';

import { darkModeStore } from '@/store/dark-mode-store';

const ClientProvider = () => {
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkModeStore.getState().isDarkMode);
  }, []);

  return null;
};

export default ClientProvider;
