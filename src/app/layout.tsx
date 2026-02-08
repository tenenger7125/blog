import { metadata } from '@/app/config/metadata';
import Layout from '@/components/layout/layout';
import { TooltipProvider } from '@/components/ui/tooltip';

import '@/styles/globals.css';
import 'prismjs/plugins/toolbar/prism-toolbar.min.css';
import 'prismjs/themes/prism-tomorrow.css';

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="ko" suppressHydrationWarning>
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
