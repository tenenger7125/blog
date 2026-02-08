import { pretendardFont, yOnepickBoldFont } from '@/app/config/font';

import { ThemeProvider } from '../../contexts/theme-context';

import Footer from './footer';
import Header from './header';

const Layout = ({ children }: LayoutProps) => (
  <body
    className={`${pretendardFont.className} ${yOnepickBoldFont.variable} flex min-h-screen flex-col overflow-x-hidden bg-white text-gray-900 dark:bg-gray-800`}>
    <ThemeProvider>
      <Header />
      <main className="max-w-8xl relative z-[2] mx-auto mt-10 flex h-full w-full flex-1 bg-inherit px-4 pb-10">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  </body>
);

interface LayoutProps {
  children: React.ReactNode;
}

export default Layout;
