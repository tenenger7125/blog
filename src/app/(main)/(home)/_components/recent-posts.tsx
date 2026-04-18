import { Calendar } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PATH } from '@/constants';
import { INTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { PostsDataResponse } from '@/types/post';
import { formatRelativeDate } from '@/utils/date';
import { requestHttp } from '@/utils/http/request';
import { excludeImageTag } from '@/utils/sanitize';

const PREVIEW_COUNT = 3;

export const RecentPostsSkeleton = () => (
  <section className="mt-10">
    <div className="mb-4 flex items-center justify-between">
      <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-5 w-14 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
    </div>
    <div className="flex flex-col gap-2">
      {Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-white p-4 dark:bg-gray-900">
          <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-3 h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  </section>
);

const RecentPosts = async () => {
  const res = await requestHttp.get<PostsDataResponse>(
    `${INTERNAL_URL_IN_NODE.POSTS}?page=1&pageSize=${PREVIEW_COUNT}`,
  );

  const posts = res.data?.posts ?? [];

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold dark:text-gray-0">최근 게시글</h3>
        <Link
          className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
          href={PATH.POSTS}>
          더보기 →
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {posts.map(post => (
          <Link key={post.id} className="w-full" href={`${PATH.POST}/${post.id}`}>
            <Card className="bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-black">
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1 text-base">
                  {post.category?.name && `[${post.category.name}] `}
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div
                  className="line-clamp-2 h-10 text-sm"
                  dangerouslySetInnerHTML={{ __html: excludeImageTag(post.content) }}
                />
              </CardContent>
              <CardFooter>
                <span className="flex items-center gap-1 text-xs">
                  <Calendar className="size-4" />
                  <span>{formatRelativeDate(post.createdAt)}</span>
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
