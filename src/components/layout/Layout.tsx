import dynamic from 'next/dynamic';

import { pretendardFont, yOnepickBoldFont } from '@/app/config/font';

import Footer from './Footer';
import Header from './Header';

const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), { ssr: false });

const Layout = ({ children }: LayoutProps) => (
  <>
    <body
      className={`${pretendardFont.className} ${yOnepickBoldFont.variable} flex min-h-screen flex-col overflow-x-hidden bg-white text-gray-900 dark:bg-gray-800`}>
      <Header />
      <main className="relative z-[2] mx-auto mt-10 flex h-full w-full flex-1 bg-inherit px-4 pb-10">{children}</main>
      <ScrollToTop />
      <Footer />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('lightMode');
                  if (mode === 'true') {
                    document.documentElement.classList.add('light');
                  } else if (mode === 'false') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
        }}
        defer
      />
    </body>
  </>
);

interface LayoutProps {
  children: React.ReactNode;
}

export default Layout;
