import { redirect } from 'next/navigation';

import { PATH } from '@/constants';
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

export const fetchServerWithAuthRedirect = async <ResponseData>(
  input: RequestInfo,
  init?: RequestInit,
  isRetry = false,
): Promise<ApiResponse<ResponseData>> => {
  // // 1. 요청하려는 주소 자체가 'validate'인지 확인 (중요)
  // const urlString = input.toString();
  // const isValidateRequest = urlString.includes('/auth/validate');

  const accessToken = await getCookie(COOKIE_KEYS.ACCESS_TOKEN);
  const result = await fetchServer<ResponseData>(input, {
    ...init,
    headers: { ...init?.headers, ...(accessToken && { Authorization: `Bearer ${accessToken}` }) },
  });

  if (result.statusCode === 401) {
    // // 이미 재시도 중이거나 리프레시 토큰이 없으면 로그인으로
    // const refreshToken = await getCookie(COOKIE_KEYS.REFRESH_TOKEN);
    // if (isRetry || !refreshToken) {
    //   redirect(PATH.LOGIN);
    // }

    // // [방어막] validate 요청에서 401이 났을 때 리다이렉트할 callbackUrl 설정 주의
    // const headerList = headers();
    // const referer = headerList.get('referer');

    // // 만약 referer가 없거나 자기 자신이면 무한 루프 방지를 위해 / 로 고정
    // let callbackPath = '/';
    // if (referer) {
    //   try {
    //     const url = new URL(referer);
    //     callbackPath = url.pathname;
    //     // 리프레시 페이지에서 또 리프레시로 가는 것 방지
    //     if (callbackPath.includes(PATH.REFRESH)) callbackPath = '/';
    //   } catch (e) {
    //     callbackPath = '/';
    //   }
    // }

    // validate API 자체가 실패한 거라면 referer를 믿지 말고 현재 페이지로 가야함
    redirect(`${PATH.REFRESH}`);
    // redirect(`${PATH.REFRESH}?callbackUrl=${encodeURIComponent(callbackPath)}`);
  }

  // const accessToken = await getCookie(COOKIE_KEYS.ACCESS_TOKEN);
  // const result = await fetchServer<ResponseData>(input, {
  //   ...init,
  //   headers: { ...init?.headers, ...(accessToken && { Authorization: `Bearer ${accessToken}` }) },
  // });

  // //* 재갱신 요청도 토큰 만료시 / 로그인 페이지 리다이렉트.
  // if (result.statusCode === 401 && isRetry) {
  //   redirect(PATH.LOGIN);
  // }

  // //* 토큰 만료 시 / 재갱신 페이지 리다이렉트.
  // if (result.statusCode === 401) {
  //   const headerList = headers();
  //   const referer = headerList.get('referer');

  //   // 현재 referer가 이미 refresh 페이지라면 더 이상 리다이렉트 하지 않음
  //   if (referer?.includes(PATH.REFRESH)) {
  //     redirect(PATH.LOGIN);
  //   }

  //   const currentPath = referer ? new URL(referer).pathname : '/';
  //   redirect(`${PATH.REFRESH}?callbackUrl=${encodeURIComponent(currentPath)}`);
  // }
  // // if (result.statusCode === 401) {
  // //   const headerList = headers();
  // //   const referer = headerList.get('referer');
  // //   const currentPath = referer ? new URL(referer).pathname : '/';

  // //   redirect(`${PATH.REFRESH}?callbackUrl=${encodeURIComponent(currentPath)}`);
  // // }

  return result;
};
