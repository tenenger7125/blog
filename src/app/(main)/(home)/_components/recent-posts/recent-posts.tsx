import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { PostsDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

import RecentPostCards from './recent-post-cards';
import RecentPostsHeader from './recent-posts-header';

const RecentPosts = async ({ page, pageSize }: RecentPostsProps) => {
  const res = await requestHttp.get<PostsDataResponse>(
    `${EXTERNAL_URL_IN_NODE.POSTS}?page=${page}&pageSize=${pageSize}`,
  );

  return (
    <section className="mt-10">
      <RecentPostsHeader />
      <RecentPostCards initialData={res} page={page} pageSize={pageSize} />
    </section>
  );
};

export default RecentPosts;

interface RecentPostsProps {
  page: number;
  pageSize: number;
}
