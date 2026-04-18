import { notFound, redirect } from 'next/navigation';

import { PATH } from '@/constants';
import { INTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { PostsDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

import PostList from './_components/post-list';
import PostPagination from './_components/post-pagination';

const LIMIT_POST = 10;

const POSTS = async ({ params }: PostProps) => {
  const rawPage = params.page?.[0] ?? '1';

  if (params.page && params.page.length > 1) notFound();

  const pageNum = Number(rawPage);

  if (!Number.isInteger(pageNum) || pageNum < 1) notFound();

  const page = pageNum;

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
