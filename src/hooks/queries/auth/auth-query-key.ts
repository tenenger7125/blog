import { createQueryKeyStore } from '@lukemorales/query-key-factory';

import { INTERNAL_URL_IN_CLIENT } from '@/constants/url';
import { PostsDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

export const authQueryKey = createQueryKeyStore({
  token: {
    validate: () => ({
      queryKey: ['validate'],
      queryFn: () => requestHttp.get<PostsDataResponse>(INTERNAL_URL_IN_CLIENT.VALIDATE),
    }),
  },
});
