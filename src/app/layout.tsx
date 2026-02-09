import Layout from '@/components/layout/layout';

import { pretendardFont, yOnepickBoldFont } from './config/font';

import '@/styles/globals.css';
import 'prismjs/plugins/toolbar/prism-toolbar.min.css';
import 'prismjs/themes/prism-tomorrow.css';

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="ko" suppressHydrationWarning>
    <body
      className={`${pretendardFont.className} ${yOnepickBoldFont.variable} flex min-h-screen flex-col overflow-x-hidden bg-white text-gray-900 dark:bg-gray-800`}>
      <Layout>{children}</Layout>
    </body>
  </html>
);

interface RootLayoutProps {
  children: React.ReactNode;
}

export default RootLayout;

export { metadata } from '@/app/config/metadata';
