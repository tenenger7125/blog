import RecentPosts from './_components/recent-posts/recent-posts';
import TerminalIntro from './_components/terminal-summary';

const PAGE = 1;
const PREVIEW_COUNT = 3;

const HOME = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col">
    <TerminalIntro fixedHeight />
    <RecentPosts page={PAGE} pageSize={PREVIEW_COUNT} />
  </div>
);

export default HOME;

export const revalidate = 3600;
