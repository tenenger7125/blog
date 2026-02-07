import { pretendardFont, yOnepickBoldFont } from '@/app/config/font';
import { STORAGE_KEYS } from '@/constants';

import Footer from './footer';
import Header from './header';

const Layout = ({ children }: LayoutProps) => (
  <body
    className={`${pretendardFont.className} ${yOnepickBoldFont.variable} flex min-h-screen flex-col overflow-x-hidden bg-white text-gray-900 dark:bg-gray-800`}>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const parsed = JSON.parse(localStorage.getItem('${STORAGE_KEYS.DOTORI_BLOG_DARK_MODE_STORAGE}'));

              const saved = parsed && parsed.state && typeof parsed.state.isDarkMode === 'boolean'
                ? parsed.state.isDarkMode
                : null;
              const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches ?? false;

              const isDarkMode = saved ?? systemDark ?? false;
              
              document.documentElement.classList.toggle('dark', isDarkMode);
              localStorage.setItem('${STORAGE_KEYS.DOTORI_BLOG_DARK_MODE_STORAGE}', JSON.stringify({
                state: { isDarkMode },
                version: 0,
              }));
            } catch (e) {}
          })();
        `,
      }}
      defer
    />
    <Header />
    <main className="max-w-8xl relative z-[2] mx-auto mt-10 flex h-full w-full flex-1 bg-inherit px-4 pb-10">
      {children}
    </main>
    <Footer />
  </body>
);

interface LayoutProps {
  children: React.ReactNode;
}

export default Layout;
