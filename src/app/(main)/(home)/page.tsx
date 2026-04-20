import { Suspense } from 'react';

import RecentPosts from './_components/recent-posts/recent-posts';
import RecentPostsSkeleton from './_components/recent-posts/recent-posts-skeleton';
import TerminalIntro from './_components/terminal-summary';

const PREVIEW_COUNT = 3;

const HOME = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col justify-between">
    <TerminalIntro fixedHeight />
    <Suspense fallback={<RecentPostsSkeleton previewCount={PREVIEW_COUNT} />}>
      <RecentPosts previewCount={PREVIEW_COUNT} />
    </Suspense>
  </div>
);

export default HOME;

export const revalidate = 60;
