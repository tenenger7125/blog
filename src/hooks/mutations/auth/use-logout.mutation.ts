import { useMutation, useQueryClient } from '@tanstack/react-query';

import { INTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { authQueryKey } from '@/hooks/queries/auth/auth-query-key';
import { postQueryKey } from '@/hooks/queries/post/post-query-key';
import { requestHttp } from '@/utils/http/request';

const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requestHttp.post(INTERNAL_URL_IN_NODE.LOGOUT),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authQueryKey.token.validate().queryKey });
      await queryClient.invalidateQueries({ queryKey: postQueryKey.post.list._def });
    },
  });
};

export default useLogoutMutation;
