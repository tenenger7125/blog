import Footer from '@/components/layout/footer/footer';
import Header from '@/components/layout/header/header';
import Main from '@/components/layout/main';

const layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </>
);

export default layout;
