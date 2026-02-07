import Image from 'next/image';

import { metadata } from '@/app/config/metadata';
import { markdown } from '@/utils/node/files';

import Comment from './_components/Comment';
import PostBreadcrumb from './_components/PostBreadcrumb';
import ScrollRestoration from './_components/scroll-restoration';
import TableOfContent from './_components/table-of-content';

const Post = async ({ params: { postId } }: { params: { postId: string } }) => {
  const { component, headings, metaData } = await markdown.readFile({ id: postId });

  return (
    <div className="relative flex w-full max-w-full justify-center gap-5">
      <div className="post prism prose max-w-full dark:text-gray-300 lg:max-w-[70%]">
        <PostBreadcrumb postId={postId} />

        {metaData.thumbnail && (
          <div className="relative my-4 h-96 w-full">
            <Image
              alt="thumbnail"
              className="m-0 object-contain"
              sizes="(max-width: 768px) 100vw, 1200px"
              src={metaData.thumbnail}
              fill
            />
          </div>
        )}
        {component}
        <Comment />
      </div>
      <TableOfContent headings={headings} />
      <ScrollRestoration />
    </div>
  );
};

export const revalidate = 60;

export async function generateStaticParams() {
  const files = await markdown.readFiles();

  return files.contents.map(({ id }) => ({ postId: id }));
}

export async function generateMetadata({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const { metaData } = await markdown.readFile({ id: postId });

  return {
    ...metadata,
    title: metaData.title,
    description: metaData.description,
  };
}

export default Post;
