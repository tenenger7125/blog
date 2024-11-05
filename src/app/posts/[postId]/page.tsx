import { markdown } from '@/utils/node/files';

import Side from './_components/Side';

import 'prismjs/themes/prism-tomorrow.css';

const Post = async ({ params: { postId } }: { params: { postId: string } }) => {
  const { component, headings } = await markdown.readFile({ id: postId });

  return (
    <div className="flex gap-5">
      <div className="post prism prose max-w-full">{component}</div>
      <Side>
        <div className="flex flex-col gap-2">
          {headings.map(({ depth, title, link }) => (
            <a key={title} className="block cursor-pointer py-1 hover:text-blue-300" href={link}>
              {'-'.repeat(depth)} {title}
            </a>
          ))}
        </div>
      </Side>
    </div>
  );
};

export async function generateStaticParams() {
  const files = await markdown.readFiles();

  return files.map(({ id }) => ({ postId: id }));
}

export async function generateMetadata({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const { metaData } = await markdown.readFile({ id: postId });

  return {
    title: metaData.title,
    description: metaData.description,
  };
}

export const dynamicParams = false;

export default Post;
