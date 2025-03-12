import 'prismjs';

import { metadata } from '@/app/config/metadata';
import { Layout } from '@/components';

import ClientProvider from './_components/provider/ClientProvider';

import '@/styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="ko">
    <ClientProvider />
    <Layout>{children}</Layout>
  </html>
);

interface RootLayoutProps {
  children: React.ReactNode;
}

export default RootLayout;

export { metadata };
