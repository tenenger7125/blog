import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Header'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

const Layout = ({ children }: LayoutProps) => (
  <div className="m-auto max-w-5xl">
    <Header className="px-3 py-4" />
    <main className="px-4">{children}</main>
    <Footer className="w-full max-w-5xl px-3 py-4" />
  </div>
);

interface LayoutProps {
  children: React.ReactNode;
}

export default Layout;
