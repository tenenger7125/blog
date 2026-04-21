import { createQueryKeyStore } from '@lukemorales/query-key-factory';

import { INTERNAL_URL_IN_CLIENT } from '@/constants/url';
import { PostDataResponse, PostsDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

export const postQueryKey = createQueryKeyStore({
  post: {
    one: (payload: { postId: string }) => ({
      queryKey: [payload],
      queryFn: () => requestHttp.get<PostDataResponse>(`${INTERNAL_URL_IN_CLIENT.POSTS}/${payload.postId}`),
    }),
    list: (payload: { page: number; pageSize: number }) => ({
      queryKey: [payload],
      queryFn: () =>
        requestHttp.get<PostsDataResponse>(
          `${INTERNAL_URL_IN_CLIENT.POSTS}?page=${payload.page}&pageSize=${payload.pageSize}`,
        ),
    }),
  },
});
