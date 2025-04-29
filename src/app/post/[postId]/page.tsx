import { NextImage } from '@/components';
import { markdown } from '@/utils/node/files';

import Comment from './_components/Comment';
import PostBreadcrumb from './_components/PostBreadcrumb';
import Side from './_components/Side';

const Post = async ({ params: { postId } }: { params: { postId: string } }) => {
  const { component, headings, metaData } = await markdown.readFile({ id: postId });

  return (
    <div className="relative flex w-full max-w-full justify-center gap-5">
      <div className="post prism prose max-w-full dark:text-gray-300 lg:max-w-[70%]">
        <PostBreadcrumb postId={postId} />

        {metaData.thumbnail && (
          <div className="relative my-4 h-96 w-full">
            <NextImage alt="thumbnail" className="m-0 object-contain" src={metaData.thumbnail} fill />
          </div>
        )}
        {component}
        <Comment />
      </div>
      <Side>
        <div className="flex flex-col gap-2 border-l-2 border-gray-200 dark:text-gray-600">
          {headings.map(({ depth, title, link }) => (
            <a
              key={link}
              className="block cursor-pointer break-all border-l-2 border-transparent py-1 hover:border-blue-600 hover:text-blue-300"
              href={link}
              style={{ paddingLeft: depth * 10 }}>
              {title}
            </a>
          ))}
        </div>
      </Side>
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
    title: metaData.title,
    description: metaData.description,
  };
}

export default Post;
