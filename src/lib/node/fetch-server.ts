import { COOKIE_KEYS, COOKIE_OPTIONS } from '@/constants/cookie';
import { ApiResponse } from '@/types/api';

import { EXTERNAL_URL_IN_NODE } from '../../constants/node/url';
import { ReIssueTokenResponseData } from '../../types/auth';

import { deleteCookie, getCookie, setCookie } from './cookie';

let refreshPromise: Promise<ReIssueTokenResponseData | null> | null = null;

const refreshToken = async () => {
  if (refreshPromise) return refreshPromise; // 이미 진행 중이면 같은 Promise 반환

  refreshPromise = fetchServer<ReIssueTokenResponseData>(EXTERNAL_URL_IN_NODE.REFRESH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: await getCookie(COOKIE_KEYS.REFRESH_TOKEN) }),
  }).then(result => {
    refreshPromise = null; // 완료 후 초기화
    return result.data ?? null;
  });

  return refreshPromise;
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

const stack: Array<(token: string) => void> = [];
const isRefreshing = false;

export const fetchServerWithAuth = async <ResponseData>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<ApiResponse<ResponseData>> => {
  // 시작 지점에서 refresh 중이면 대기
  if (isRefreshing) {
    return new Promise(resolve => {
      stack.push((newToken: string) => {
        resolve(
          fetchServer<ResponseData>(input, {
            ...init,
            headers: { ...init?.headers, Authorization: `Bearer ${newToken}` },
          }),
        );
      });
    });
  }

  const accessToken = await getCookie(COOKIE_KEYS.ACCESS_TOKEN);

  const result = await fetchServer<ResponseData>(input, {
    ...init,
    headers: { ...init?.headers, ...(accessToken && { Authorization: `Bearer ${accessToken}` }) },
  });

  if (typeof window === 'undefined' && result.statusCode === 401) {
    const newTokenData = await refreshToken(); // 동시 요청도 같은 Promise 공유

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
