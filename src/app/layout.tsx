import 'prismjs';

import { metadata } from '@/app/config/metadata';
import { Layout } from '@/components';
import { TooltipProvider } from '@/components/ui/tooltip';
import { STORAGE_KEYS } from '@/constants';
import { getCookie } from '@/lib/node/cookie';

import ClientProvider from './_components/provider/ClientProvider';

import '@/styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';

const RootLayout = async ({ children }: RootLayoutProps) => {
  const isDarkMode = await getCookie(STORAGE_KEYS.DOTORI_BLOG_DARK_MODE_STORAGE);

  return (
    <html className={isDarkMode === 'true' ? 'dark' : ''} lang="ko">
      <ClientProvider />
      <TooltipProvider delayDuration={0}>
        <Layout>{children}</Layout>
      </TooltipProvider>
    </html>
  );
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default RootLayout;

export { metadata };
