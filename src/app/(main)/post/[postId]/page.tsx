import { metadata } from '@/app/config/metadata';
import { Separator } from '@/components/ui/separator';
import { INTERNAL_URL } from '@/constants/url';
import { PostDataResponse } from '@/types/post';
import { httpClient } from '@/utils/http/client';
import { markdown } from '@/utils/node/files';

import Comment from './_components/comment';
import EditPostButton from './_components/edit-post-button';
import PostBreadcrumb from './_components/post-breadcrumb';
import ScrollRestoration from './_components/scroll-restoration';

const Post = async ({ params: { postId } }: { params: { postId: string } }) => {
  const res = await httpClient.get<PostDataResponse>(`${INTERNAL_URL.POSTS}/${postId}`);

  const post = res.data;

  if (!post) {
    return null;
  }

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col justify-center gap-5">
      <div className="post prism prose min-h-screen w-full max-w-full dark:text-gray-300">
        <div className="flex justify-end">
          <EditPostButton postId={postId} />
        </div>
        <PostBreadcrumb postId={post.id.toString()} />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <Separator />
      <Comment />

      {/* <TableOfContent headings={headings} /> */}
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
