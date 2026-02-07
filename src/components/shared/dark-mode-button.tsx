import { useEffect } from 'react';

import { cn } from 'dotori-utils';
import cookie from 'js-cookie';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { STORAGE_KEYS } from '@/constants';
import { darkModeStore } from '@/store/dark-mode-store';

const DarkModeButton = () => {
  const darkModeHandler = darkModeStore();

  useEffect(() => {
    if (darkModeHandler.isDarkMode) {
      cookie.set(STORAGE_KEYS.DOTORI_BLOG_DARK_MODE_STORAGE, JSON.stringify(darkModeHandler.isDarkMode));
    }
  }, [darkModeHandler.isDarkMode]);

  return (
    <Button
      className={darkModeButtonStyle({ isDarkMode: darkModeHandler.isDarkMode })}
      onClick={darkModeHandler.toggle}>
      {darkModeHandler.isDarkMode ? <Moon className="text-yellow-600" /> : <Sun className="text-red-600" />}
    </Button>
  );
};

export default DarkModeButton;

const darkModeButtonStyle = cn('', {
  variants: {
    isDarkMode: {
      true: 'bg-gray-800 hover:bg-gray-100',
      false: 'bg-white hover:bg-gray-100',
    },
  },
});
