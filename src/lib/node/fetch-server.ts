import { COOKIE_KEYS, COOKIE_OPTIONS } from '@/constants/cookie';
import { ApiResponse } from '@/types/api';

import { EXTERNAL_URL_IN_NODE } from '../../constants/node/url';
import { ReIssueTokenResponseData } from '../../types/auth';

import { deleteCookie, getCookie, setCookie } from './cookie';

const refreshPromiseMap = new Map<string, Promise<ReIssueTokenResponseData | null>>();

const issueTokenByRefreshToken = async (refreshToken: string | null) => {
  if (!refreshToken) return null;

  if (refreshPromiseMap.has(refreshToken)) {
    return refreshPromiseMap.get(refreshToken)!;
  }

  const promise = fetchServer<ReIssueTokenResponseData>(EXTERNAL_URL_IN_NODE.REFRESH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })
    .then(result => result.data ?? null)
    .catch(() => null)
    .finally(() => {
      refreshPromiseMap.delete(refreshToken);
    });

  refreshPromiseMap.set(refreshToken, promise);
  return promise;
};

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

  if (typeof window === 'undefined' && result.statusCode === 401) {
    const userRefreshToken = await getCookie(COOKIE_KEYS.REFRESH_TOKEN);
    const newTokenData = await issueTokenByRefreshToken(userRefreshToken); // 동시 요청도 같은 Promise 공유

    if (!newTokenData) {
      deleteCookie(COOKIE_KEYS.ACCESS_TOKEN, COOKIE_OPTIONS);
      deleteCookie(COOKIE_KEYS.REFRESH_TOKEN, COOKIE_OPTIONS);
      return result;
    }

    setCookie(COOKIE_KEYS.ACCESS_TOKEN, newTokenData.accessToken, COOKIE_OPTIONS);
    setCookie(COOKIE_KEYS.REFRESH_TOKEN, newTokenData.refreshToken, COOKIE_OPTIONS);

    return fetchServer<ResponseData>(input, {
      ...init,
      headers: { ...init?.headers, Authorization: `Bearer ${newTokenData.accessToken}` },
    });
  }

  return result;
};
