import { useQuery } from '@tanstack/react-query';

import { authQueryKey } from './auth-query-key';

const useTokenValidateQuery = () =>
  useQuery({
    ...authQueryKey.token.validate(),
  });

export default useTokenValidateQuery;
