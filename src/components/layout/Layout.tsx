import dynamic from 'next/dynamic';

import { pretendardFont, yOnepickBoldFont } from '@/app/config/font';

import Footer from './Footer';
import Header from './Header';

const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), { ssr: false });

const Layout = ({ children }: LayoutProps) => (
  <>
    <body
      className={`${pretendardFont.className} ${yOnepickBoldFont.variable} flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-800`}>
      <Header />
      <main className="relative z-[2] mx-auto mt-10 flex h-full max-w-8xl flex-1 bg-inherit px-4 pb-10">
        {children}
      </main>
      <ScrollToTop />
      <Footer />
    </body>
  </>
);

interface LayoutProps {
  children: React.ReactNode;
}

export default Layout;
