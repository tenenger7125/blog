'use client';

import { STORAGE_KEYS } from '@/constants';
import { Theme } from '@/constants/theme';
import { createSafeContext } from '@/services/create-safe-context';
import { themeLocalStorage } from '@/utils/local-storage';

const contextValue = { theme: Theme.Light };

const scriptString = `
    (function() {
      try {
        const stored = localStorage.getItem('${STORAGE_KEYS.THEME}');

        if (stored) {
          const themeData = JSON.parse(stored);
          const theme = themeData.theme;

          if (!['${Theme.Light}', '${Theme.Dark}'].includes(theme)) {
            throw new Error('Invalid theme value', theme);
          }

          document.documentElement.classList.remove('${Theme.Light}', '${Theme.Dark}');
          console.log('✅ ThemeScript 적용:', theme);
          document.documentElement.classList.add(theme);
        }
      } catch (e) {
        console.error('❌ ThemeScript 에러:', e);
        localStorage.setItem('${STORAGE_KEYS.THEME}', '${JSON.stringify(contextValue)}');
        document.documentElement.classList.remove('${Theme.Light}', '${Theme.Dark}');
        document.documentElement.classList.add('${Theme.Light}');
      }
    })();
  `;

const [ThemeProvider, useThemeContext] = createSafeContext(contextValue, {
  storage: themeLocalStorage,
  scriptString,
  onChange: value => {
    document.documentElement.classList.remove(Theme.Light, Theme.Dark);
    document.documentElement.classList.add(value.theme);
  },
});

export { ThemeProvider, useThemeContext };
