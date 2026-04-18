import TerminalIntro from './_components/terminal-summary';

const HOME = () => {
  console.log();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col justify-between">
      <TerminalIntro fixedHeight />
    </div>
  );
};

export default HOME;
