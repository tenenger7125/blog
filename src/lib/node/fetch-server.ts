import { COOKIE_KEYS } from '@/constants/cookie';
import { ApiResponse } from '@/types/api';

import { getCookie } from './cookie';

export const fetchServer = async <ResponseData>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<ApiResponse<ResponseData>> => {
  // try {
  const res = await fetch(input, { cache: 'no-store', ...init });
  const data = (await res.json()) as ApiResponse<ResponseData>;
  return data;
};

export const fetchServerWithAuth = async <ResponseData>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<ApiResponse<ResponseData>> => {
  const accessToken = await getCookie(COOKIE_KEYS.ACCESS_TOKEN);
  const result = await fetchServer<ResponseData>(input, {
    ...init,
    headers: { ...init?.headers, ...(accessToken && { Authorization: `Bearer ${accessToken}` }) },
  });

  return result;
};
