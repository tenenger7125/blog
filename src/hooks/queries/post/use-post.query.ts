import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/types/api';
import { PostDataResponse } from '@/types/post';

import { postQueryKey } from './post-query-key';

type Base = ReturnType<typeof postQueryKey.post.one>;
type QueryKeyType = Base extends { queryKey: infer K } ? K : readonly unknown[];

const usePostQuery = (
  postId: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<PostDataResponse>, unknown, ApiResponse<PostDataResponse>, QueryKeyType>,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery({
    ...postQueryKey.post.one({ postId }),
    staleTime: 0,
    ...(options ?? {}),
  });

export default usePostQuery;
