import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { postQueryKey } from '@/hooks/queries/post/post-query-key';
import { PostsDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

import RecentPostCards from './recent-post-cards';
import RecentPostsHeader from './recent-posts-header';

const RecentPosts = async ({ page, pageSize }: RecentPostsProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: postQueryKey.post.list({ page, pageSize }).queryKey,
    queryFn: async () =>
      requestHttp.get<PostsDataResponse>(`${EXTERNAL_URL_IN_NODE.POSTS}?page=${page}&pageSize=${pageSize}`, {
        next: { tags: ['posts', `posts-${page}-${pageSize}`] },
      }),
  });

  return (
    <section className="mt-10">
      <RecentPostsHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RecentPostCards page={page} pageSize={pageSize} />
      </HydrationBoundary>
    </section>
  );
};

export default RecentPosts;

interface RecentPostsProps {
  page: number;
  pageSize: number;
}
