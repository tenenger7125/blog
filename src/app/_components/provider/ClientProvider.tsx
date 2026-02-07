'use client';

import { useEffect } from 'react';

import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
// eslint-disable-next-line import/order
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import { darkModeStore } from '@/store/dark-mode-store';

import '@/styles/globals.css';
import 'prismjs/plugins/toolbar/prism-toolbar.min.css';
import 'prismjs/themes/prism-tomorrow.css';

const ClientProvider = () => {
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkModeStore.getState().isDarkMode);
  }, []);

  return null;
};

export default ClientProvider;
