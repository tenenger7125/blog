import { INTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { PostDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

import PostEditor from './_components/post-editor';

const EditPostPage = async ({ params: { postId } }: { params: { postId: string } }) => {
  const res = await requestHttp.get<PostDataResponse>(`${INTERNAL_URL_IN_NODE.POSTS}/${postId}`);

  const post = res.data;

  if (!post) {
    return null;
  }

  return <PostEditor post={post} />;
};

export default EditPostPage;
