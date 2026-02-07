import cookie from 'js-cookie';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { STORAGE_KEYS } from '@/constants';

interface DarkModeState {
  isDarkMode: boolean;
}

interface DarkModeActions {
  setDarkMode: (isDark: boolean) => void;
  toggle: () => void;
  on: () => void;
  off: () => void;
}

export const darkModeStore = create<DarkModeState & DarkModeActions>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      setDarkMode: (isDarkMode: boolean) => {
        set({ isDarkMode });
        document.documentElement.classList.toggle('dark', isDarkMode);
        cookie.set(STORAGE_KEYS.DOTORI_BLOG_DARK_MODE_STORAGE, isDarkMode.toString());
      },
      toggle: () => {
        const isDarkMode = !get().isDarkMode;
        get().setDarkMode(isDarkMode);
      },
      on: () => get().setDarkMode(true),
      off: () => get().setDarkMode(false),
    }),
    {
      name: STORAGE_KEYS.DOTORI_BLOG_DARK_MODE_STORAGE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
