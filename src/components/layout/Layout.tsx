import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Header'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <main className="relative z-[2] m-auto max-w-5xl bg-white px-4">{children}</main>
    <Footer />
  </>
);

interface LayoutProps {
  children: React.ReactNode;
}

export default Layout;
