import { headers } from 'next/headers';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/contexts/theme-context';

import { pretendardFont, yOnepickBoldFont } from './config/font';

import '@/styles/globals.css';

const RootLayout = ({ children }: RootLayoutProps) => {
  const nonce = headers().get('x-nonce');

  return (
    <html lang="ko" style={{ height: 'auto' }} suppressHydrationWarning>
      <body
        className={`${pretendardFont.className} ${yOnepickBoldFont.variable} flex min-h-screen flex-col overflow-x-hidden bg-white text-gray-900 dark:bg-gray-800`}>
        <Toaster position="top-center" />
        <ThemeProvider nonce={nonce}>
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default RootLayout;

export { metadata } from '@/app/config/metadata';
