import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { PostsDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

import PostCards from './_components/post-cards';
import PostPagination from './_components/post-pagination';

const LIMIT_POST = 10;

const POSTS = async ({ params }: PostProps) => {
  const page = Number(params.page || 1);

  const res = await requestHttp.get<PostsDataResponse>(
    `${EXTERNAL_URL_IN_NODE.POSTS}?page=${page}&pageSize=${LIMIT_POST}`,
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col justify-between">
      <PostCards initialData={res} page={page} pageSize={LIMIT_POST} />
      <PostPagination initialData={res} page={page} pageSize={LIMIT_POST} />
    </div>
  );
};

interface PostProps {
  params: { page?: string };
}

export default POSTS;

export const revalidate = 60;
