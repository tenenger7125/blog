import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <main className="relative z-[2] m-auto min-h-screen max-w-5xl bg-white px-4">{children}</main>
    <Footer />
  </>
);

interface LayoutProps {
  children: React.ReactNode;
}

export default Layout;
