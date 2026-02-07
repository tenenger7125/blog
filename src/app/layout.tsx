import { metadata } from '@/app/config/metadata';
import { Layout } from '@/components';
import { TooltipProvider } from '@/components/ui/tooltip';

import ClientProvider from './_components/provider/ClientProvider';

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="ko">
    <ClientProvider />
    <TooltipProvider delayDuration={0}>
      <Layout>{children}</Layout>
    </TooltipProvider>
  </html>
);

interface RootLayoutProps {
  children: React.ReactNode;
}

export default RootLayout;

export { metadata };
