import { markdown } from '@/utils/node/files';

import { PostPagination, PostList } from './_components';

const LIMIT_POST = 12;

const POSTS = async ({ params }: PostProps) => {
  const page = +params.page;

  const files = await markdown.readFiles({ page, limit: LIMIT_POST });

  return (
    <div className="flex w-full flex-col justify-between">
      <PostList posts={files.contents} />
      <PostPagination page={page} totalPage={files.totalPage} />
    </div>
  );
};

interface PostProps {
  params: { page: string };
}

export async function generateStaticParams() {
  const files = await markdown.readFiles({ limit: LIMIT_POST });

  return Array.from({ length: files.totalPage }).map((_, index) => ({ page: `${index + 1}` }));
}

export default POSTS;
