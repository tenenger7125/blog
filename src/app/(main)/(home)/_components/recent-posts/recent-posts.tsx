import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { PostsDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

import RecentPostCards from './recent-post-cards';
import RecentPostsHeader from './recent-posts-header';

const RecentPosts = async ({ previewCount }: { previewCount: number }) => {
  const res = await requestHttp.get<PostsDataResponse>(
    `${EXTERNAL_URL_IN_NODE.POSTS}?page=${1}&pageSize=${previewCount}`,
  );

  return (
    <section className="mt-10">
      <RecentPostsHeader />
      <RecentPostCards initialData={res} previewCount={previewCount} />
    </section>
  );
};

export default RecentPosts;
