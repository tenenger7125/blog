import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { PostDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

import PostEditor from './_components/post-editor';

const EditPostPage = async ({ params: { postId } }: { params: { postId: string } }) => {
  const res = await requestHttp.get<PostDataResponse>(`${EXTERNAL_URL_IN_NODE.POSTS}/${postId}`, {
    next: { tags: ['post', `post-${postId}`] },
  });

  return <PostEditor initialData={res} postId={postId} />;
};

export default EditPostPage;

export const revalidate = 3600;
