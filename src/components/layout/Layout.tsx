import { pretendardFont, yOnepickBoldFont } from '@/app/config/font';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: LayoutProps) => (
  <>
    <body className={`${pretendardFont.className} ${yOnepickBoldFont.variable} bg-white text-gray-900`}>
      <Header />
      <main className="relative z-[2] m-auto min-h-screen max-w-8xl bg-white px-4">{children}</main>
      <Footer />
    </body>
  </>
);

interface LayoutProps {
  children: React.ReactNode;
}

export default Layout;
