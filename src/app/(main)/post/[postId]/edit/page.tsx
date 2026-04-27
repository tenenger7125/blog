import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { postQueryKey } from '@/hooks/queries/post/post-query-key';
import { PostDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

import PostEditor from './_components/post-editor';

const EditPostPage = async ({ params: { postId } }: { params: { postId: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: postQueryKey.post.one({ postId }).queryKey,
    queryFn: async () =>
      requestHttp.get<PostDataResponse>(`${EXTERNAL_URL_IN_NODE.POSTS}/${postId}`, {
        next: { tags: ['post', `post-${postId}`] },
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostEditor postId={postId} />
    </HydrationBoundary>
  );
};

export default EditPostPage;
