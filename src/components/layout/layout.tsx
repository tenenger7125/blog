import { headers } from 'next/headers';

import { ThemeProvider } from '@/contexts/theme-context';

import { TooltipProvider } from '../ui/tooltip';

import Footer from './footer';
import Header from './header';

const Layout = ({ children }: LayoutProps) => {
  const nonce = headers().get('x-nonce');

  return (
    <ThemeProvider nonce={nonce}>
      <TooltipProvider delayDuration={0}>
        <Header />
        <main className="max-w-8xl relative z-[2] mx-auto mt-10 flex h-full w-full flex-1 bg-inherit px-4 pb-10">
          {children}
        </main>
        <Footer />
      </TooltipProvider>
    </ThemeProvider>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

export default Layout;
