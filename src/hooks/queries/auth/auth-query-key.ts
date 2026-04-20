import { createQueryKeyStore } from '@lukemorales/query-key-factory';

import { INTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { PostsDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

export const authQueryKey = createQueryKeyStore({
  token: {
    validate: () => ({
      queryKey: [''],
      queryFn: () => requestHttp.get<PostsDataResponse>(INTERNAL_URL_IN_NODE.VALIDATE),
    }),
  },
});
