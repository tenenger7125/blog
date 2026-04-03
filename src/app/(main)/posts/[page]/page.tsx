import { fetchServer } from '@/lib/node/fetch-server';
import { PostDataResponse } from '@/types/post';

import PostList from './_components/post-list';
import PostPagination from './_components/post-pagination';

const LIMIT_POST = 10;

const POSTS = async ({ params }: PostProps) => {
  const page = +params.page;

  // const files = await markdown.readFiles({ page, limit: LIMIT_POST });
  const res = await fetchServer<PostDataResponse>(
    `${process.env.BLOG_SERVER}/posts?page=${page}&pageSize=${LIMIT_POST}`,
  );
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
