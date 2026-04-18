import { Suspense } from 'react';

import RecentPosts, { RecentPostsSkeleton } from './_components/recent-posts';
import TerminalIntro from './_components/terminal-summary';

const HOME = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col justify-between">
    <TerminalIntro fixedHeight />
    <Suspense fallback={<RecentPostsSkeleton />}>
      <RecentPosts />
    </Suspense>
  </div>
);

export default HOME;
