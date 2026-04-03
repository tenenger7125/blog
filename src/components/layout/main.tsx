const Main = ({ children }: MainProps) => (
  <main className="relative z-[2] mx-auto mt-10 flex h-full w-full flex-1 bg-inherit px-4 pb-10">{children}</main>
);

interface MainProps {
  children: React.ReactNode;
}

export default Main;
