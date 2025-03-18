import { pretendardFont, yOnepickBoldFont } from '@/app/config/font';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: LayoutProps) => (
  <>
    <body
      className={`${pretendardFont.className} ${yOnepickBoldFont.variable} flex min-h-screen flex-col bg-white text-gray-900`}>
      <Header />
      <main className="relative z-[2] mx-auto mt-10 flex h-full max-w-8xl flex-1 bg-white px-4 pb-10">{children}</main>
      <Footer />
    </body>
  </>
);

interface LayoutProps {
  children: React.ReactNode;
}

export default Layout;
