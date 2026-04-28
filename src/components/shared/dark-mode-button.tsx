'use client';

import { LoaderCircle, Moon, Sun } from 'lucide-react';

import { Theme } from '@/constants/theme';
import { useThemeContext } from '@/contexts/theme-context';

import ActionIconButton from './action-icon-button';

const DarkModeButton = () => {
  const [{ theme }, setTheme, mounted] = useThemeContext();

  if (!mounted) {
    return (
      <ActionIconButton className="px-4 py-2" label="다크모드">
        <LoaderCircle className="animate-spin dark:text-white" />
      </ActionIconButton>
    );
  }

  return (
    <ActionIconButton
      className="px-4 py-2"
      label="다크모드"
      onClick={() => setTheme({ theme: theme === Theme.Dark ? Theme.Light : Theme.Dark })}>
      {theme === Theme.Dark ? <Moon className="text-yellow-600" /> : <Sun className="text-red-800" />}
    </ActionIconButton>
  );
};

export default DarkModeButton;
