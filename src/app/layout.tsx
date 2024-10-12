import { metadata } from '@/app/config/metadata';
import { Layout } from '@/components';

import '@/styles/globals.css';

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="ko">
    <Layout>{children}</Layout>
  </html>
);

interface RootLayoutProps {
  children: React.ReactNode;
}

export default RootLayout;

export { metadata };
