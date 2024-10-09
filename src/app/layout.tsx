import { pretendardFont } from '@/app/config/font';
import { metadata } from '@/app/config/metadata';

import '@/styles/globals.css';

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="ko">
    <body className={pretendardFont.className}>{children}</body>
  </html>
);

interface RootLayoutProps {
  children: React.ReactNode;
}

export default RootLayout;

export { metadata };
