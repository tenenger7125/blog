import { COOKIE_KEYS } from '@/constants/key';
import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { ApiResponse } from '@/types/api';
import { ReIssueTokenResponseData } from '@/types/auth';

import { getCookie, setCookie } from './cookie';

type Result<ResponseData> = {
  ok: boolean;
  statusCode: number;
  message: string | object | null;
  data: ResponseData | null;
};

export const fetchServer = async <ResponseData>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Result<ResponseData>> => {
  try {
    const res = await fetch(input, { cache: 'no-store', ...init });
    const body = (await res.json()) as ApiResponse<ResponseData>;

    if (!res.ok) {
      return {
        ok: false,
        statusCode: body.statusCode,
        message: body.message,
        data: null,
      };
    }

    return { ok: true, statusCode: body.statusCode, message: body.message, data: body.data };
  } catch (err) {
    return {
      ok: false,
      statusCode: 500,
      message: 'External service unreachable',
      data: null,
    };
  }
};

export const fetchServerWithAuth = async <ResponseData>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Result<ResponseData>> => {
  const accessToken = (await getCookie(COOKIE_KEYS.ACCESS_TOKEN)) ?? '';

  const result = await fetchServer<ResponseData>(input, {
    ...init,
    headers: {
      ...init?.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  if (result.statusCode !== 401) {
    return result;
  }

  const refreshToken = (await getCookie(COOKIE_KEYS.REFRESH_TOKEN)) ?? '';

  const refreshResult = await fetchServer<ReIssueTokenResponseData>(EXTERNAL_URL_IN_NODE.REFRESH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!refreshResult.ok || !refreshResult.data?.accessToken) {
    // refresh 실패 시 Authorization 없이 재시도 → 공개 데이터는 그대로 반환
    return fetchServer<ResponseData>(input, {
      ...init,
      headers: { ...init?.headers },
    });
  }

  // Route Handler 컨텍스트에서는 쿠키 저장 가능, Server Component에서는 불가
  try {
    setCookie(COOKIE_KEYS.ACCESS_TOKEN, refreshResult.data.accessToken);
    setCookie(COOKIE_KEYS.REFRESH_TOKEN, refreshResult.data.refreshToken);
  } catch {
    // Server Component 컨텍스트: cookies().set() 불가 — 미들웨어에서 처리 필요
  }

  return fetchServer<ResponseData>(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${refreshResult.data.accessToken}`,
    },
  });
};
