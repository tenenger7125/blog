'use client';

import { useQuery } from '@tanstack/react-query';

import { authQueryKey } from './auth-query-key';

const useTokenValidateQuery = () =>
  useQuery({
    ...authQueryKey.token.validate(),
    staleTime: 0,
  });

export default useTokenValidateQuery;
