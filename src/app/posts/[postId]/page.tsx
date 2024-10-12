import { markdown } from '@/utils/node/files';

import 'prismjs/themes/prism-tomorrow.css';

const Post = async ({ params: { postId } }: { params: { postId: string } }) => {
  const { component } = await markdown.readFile({ id: postId });

  return <div className="post prism prose max-w-full">{component}</div>;
};

export async function generateStaticParams() {
  const files = await markdown.readFiles();

  return files.map(({ id }) => ({ postId: id }));
}

export default Post;
