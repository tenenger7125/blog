import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/types/api';
import { PostsDataResponse } from '@/types/post';

import { postQueryKey } from './post-query-key';

type Base = ReturnType<typeof postQueryKey.post.list>;
type QueryKeyType = Base extends { queryKey: infer K } ? K : readonly unknown[];

const useRecentPostsQuery = (
  page: number,
  pageSize: number,
  options?: Omit<
    UseQueryOptions<ApiResponse<PostsDataResponse>, unknown, ApiResponse<PostsDataResponse>, QueryKeyType>,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery<ApiResponse<PostsDataResponse>, unknown, ApiResponse<PostsDataResponse>, QueryKeyType>({
    ...postQueryKey.post.list({ page, pageSize }),
    ...(options ?? {}),
  });

export default useRecentPostsQuery;
