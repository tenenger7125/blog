import { COOKIE_KEYS } from '@/constants/cookie';
import { ApiResponse } from '@/types/api';

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
