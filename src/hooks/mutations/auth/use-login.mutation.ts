import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { PATH } from '@/constants';
import { INTERNAL_URL_IN_CLIENT } from '@/constants/url';
import { authQueryKey } from '@/hooks/queries/auth/auth-query-key';
import { postQueryKey } from '@/hooks/queries/post/post-query-key';
import { requestHttp } from '@/utils/http/request';

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      requestHttp.post<unknown>(INTERNAL_URL_IN_CLIENT.LOGIN, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authQueryKey.token.validate._def });
      await queryClient.invalidateQueries({ queryKey: postQueryKey.post.list._def });
      toast.success('Login successful!');
      router.push(PATH.HOME);
    },
    onError: () => {
      toast.error('Failed to login. Please try again.');
    },
  });
};

export default useLoginMutation;
