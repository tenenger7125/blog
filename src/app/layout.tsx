import { pretendardFont } from '@/app/config/font';
import { metadata } from '@/app/config/metadata';
import { Layout } from '@/components';

import '@/styles/globals.css';

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="ko">
    <body className={pretendardFont.className}>
      <Layout>{children}</Layout>
    </body>
  </html>
);

interface RootLayoutProps {
  children: React.ReactNode;
}

export default RootLayout;

export { metadata };
