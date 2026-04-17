import Footer from '@/components/layout/footer/footer';
import AuthButton from '@/components/layout/header/auth-button';
import CreatePostButton from '@/components/layout/header/create-post-button';
import Header from '@/components/layout/header/header';
import Main from '@/components/layout/main';

const layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header
      slot={
        <>
          <CreatePostButton />
          <AuthButton />
        </>
      }
    />
    <Main>{children}</Main>
    <Footer />
  </>
);

export default layout;
