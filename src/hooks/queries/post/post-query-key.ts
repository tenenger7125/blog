import { createQueryKeyStore } from '@lukemorales/query-key-factory';

import { INTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { PostsDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

export const postQueryKey = createQueryKeyStore({
  post: {
    list: (payload: { page: number; pageSize: number }) => ({
      queryKey: [payload],
      queryFn: () =>
        requestHttp.get<PostsDataResponse>(
          `${INTERNAL_URL_IN_NODE.POSTS}?page=${payload.page}&pageSize=${payload.pageSize}`,
        ),
    }),
  },
});
