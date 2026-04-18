import { redirect } from 'next/navigation';

import { PATH } from '@/constants';
import { INTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { PostsDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

import PostList from './_components/post-list';
import PostPagination from './_components/post-pagination';

const LIMIT_POST = 10;

const POSTS = async ({ params }: PostProps) => {
  const page = +(params.page?.[0] ?? 1);

  const res = await requestHttp.get<PostsDataResponse>(
    `${INTERNAL_URL_IN_NODE.POSTS}?page=${page}&pageSize=${LIMIT_POST}`,
  );

  if (res.statusCode === 401) {
    redirect(`${PATH.REFRESH}?callbackUrl=/posts`);
  }

  const posts = res.data?.posts || [];
  const totalPage = res.data?.totalPage || 0;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col justify-between">
      <PostList posts={posts} />
      <PostPagination page={page} totalPage={totalPage} />
    </div>
  );
};

interface PostProps {
  params: { page?: string[] };
}

export default POSTS;
