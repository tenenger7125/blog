import { fetchServer } from '@/lib/node/fetch-server';
import { PostDataResponse } from '@/types/post';

import PostEditor from './_components/post-editor';

const EditPostPage = async ({ params: { postId } }: { params: { postId: string } }) => {
  const { data: post } = await fetchServer<PostDataResponse>(`${process.env.BLOG_SERVER}/posts/${postId}`, {
    method: 'GET',
  });

  if (!post) {
    return null;
  }

  return <PostEditor post={post} />;
};

export default EditPostPage;
