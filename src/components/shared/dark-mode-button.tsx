'use client';

import { LoaderCircle, Moon, Sun } from 'lucide-react';

import { Theme } from '@/constants/theme';
import { useThemeContext } from '@/contexts/theme-context';

import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

import ActionIconButton from './action-icon-button';

const DarkModeButton = () => {
  const [{ theme }, setTheme, mounted] = useThemeContext();

  if (!mounted) {
    return (
      <ActionIconButton className="px-4 py-2" label="로그인">
        <LoaderCircle className="animate-spin dark:text-white" />
      </ActionIconButton>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="white" onClick={() => setTheme({ theme: theme === Theme.Dark ? Theme.Light : Theme.Dark })}>
          {theme === Theme.Dark ? <Moon className="text-yellow-600" /> : <Sun className="text-red-800" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>다크모드</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default DarkModeButton;
