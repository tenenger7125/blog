import { COOKIE_KEYS } from '@/constants/cookie';
import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { ApiResponse } from '@/types/api';
import { ReIssueTokenResponseData } from '@/types/auth';

import { getCookie } from './cookie';

export const fetchServer = async <ResponseData>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<ApiResponse<ResponseData>> => {
  try {
    const res = await fetch(input, { cache: 'no-store', ...init });

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();

      if (!res.ok) {
        return {
          ok: false,
          statusCode: res.status,
          message: text,
          data: null,
          detail: text,
        };
      }

      return {
        ok: true,
        statusCode: res.status,
        message: text,
        data: text as ResponseData,
        detail: text,
      };
    }

    const body = (await res.json()) as ApiResponse<ResponseData>;

    if (!res.ok) {
      return {
        ok: false,
        statusCode: body.statusCode,
        message: body.message,
        data: null,
        detail: body.detail,
      };
    }

    return { ok: true, statusCode: body.statusCode, message: body.message, data: body.data, detail: body.detail };
  } catch (err) {
    return {
      ok: false,
      statusCode: 500,
      message: 'External service unreachable',
      data: null,
      detail: JSON.stringify(err, null, 2),
    };
  }
};

// 변경: Map<string, Promise> (진행 중인 Promise 자체를 저장)
const refreshingTokens = new Map<string, Promise<{ accessToken: string; refreshToken: string } | null>>();

export const fetchServerWithAuth = async <ResponseData>(
  input: RequestInfo,
  init?: RequestInit,
  isRetry = false,
  issuedAccessToken?: string,
): Promise<ApiResponse<ResponseData> & { isRetry: boolean }> => {
  const accessToken = isRetry ? issuedAccessToken : await getCookie(COOKIE_KEYS.ACCESS_TOKEN);
  const result = await fetchServer<ResponseData>(input, {
    ...init,
    headers: { ...init?.headers, ...(accessToken && { Authorization: `Bearer ${accessToken}` }) },
  });

  //* 정상 응답 / 토큰 갱신 후 재시도 일 시 반환. 종료.
  if (result.statusCode !== 401 || isRetry) {
    return { ...result, isRetry };
  }

  //* 401 Unauthorized → 토큰 갱신 시도
  const refreshToken = await getCookie(COOKIE_KEYS.REFRESH_TOKEN);
  if (!refreshToken) {
    return { ...result, isRetry };
  }

  // 갱신 중이면 → 완료까지 대기 후 새 토큰으로 내 요청 재시도
  if (refreshingTokens.has(refreshToken)) {
    const newTokens = await refreshingTokens.get(refreshToken)!;

    // 갱신 실패 시 401 그대로 반환
    if (!newTokens) return { ...result, isRetry };

    // ✅ 새 토큰으로 내 요청 재시도
    return fetchServerWithAuth<ResponseData>(input, init, true, newTokens.accessToken);
  }

  const refreshPromise = (async () => {
    try {
      const refreshResponse = await fetchServer<ReIssueTokenResponseData>(EXTERNAL_URL_IN_NODE.REFRESH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshResponse.ok || !refreshResponse.data) {
        return null;
      }

      return { accessToken: refreshResponse.data.accessToken, refreshToken: refreshResponse.data.refreshToken };
    } catch {
      return null;
    } finally {
      refreshingTokens.delete(refreshToken);
    }
  })();

  // 갱신 시작 -> 이후 요청들 동일한 refreshToken으로 대기
  refreshingTokens.set(refreshToken, refreshPromise);

  const tokens = await refreshPromise;

  if (!tokens) {
    const retryResult = await fetchServer<ResponseData>(input, init);
    return { ...retryResult, isRetry: true };
  }

  return fetchServerWithAuth<ResponseData>(input, init, true, tokens.accessToken);
};
