import { INTERNAL_URL } from '@/constants/url';
import { PostsDataResponse } from '@/types/post';
import { httpClient } from '@/utils/http/client';

import PostList from './_components/post-list';
import PostPagination from './_components/post-pagination';

const LIMIT_POST = 10;

const POSTS = async ({ params }: PostProps) => {
  const page = +params.page;

  const res = await httpClient.get<PostsDataResponse>(`${INTERNAL_URL.POSTS}?page=${page}&pageSize=${LIMIT_POST}`);

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
  params: { page: string };
}

export default POSTS;
