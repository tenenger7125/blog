import AuthButton from '@/components/layout/auth-button';
import CreatePostButton from '@/components/layout/create-post-button';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
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
