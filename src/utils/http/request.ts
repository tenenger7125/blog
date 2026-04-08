import { redirect } from 'next/navigation';

import { PATH } from '@/constants';
import { INTERNAL_URL_IN_CLIENT } from '@/constants/url';
import { ApiResponse } from '@/types/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class AuthError extends Error {
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'AuthError';
  }
}

const request = async <Data, Body = unknown>(method: HttpMethod, url: string, body?: Body, init?: RequestInit) => {
  const isFormData = body instanceof FormData;

  // 기본 헤더: init에 들어온 헤더를 기반으로 Content-Type을 필요한 경우에만 추가
  const baseHeaders: Record<string, string> = { ...(init?.headers ?? {}) } as Record<string, string>;
  if (!isFormData && method !== 'GET' && method !== 'DELETE') {
    baseHeaders['Content-Type'] = 'application/json';
  }

  // 서버 사이드에서 동작할 때(SSR/route 등) 클라이언트로부터 전달된 쿠키를 포워딩
  if (typeof window === 'undefined') {
    try {
      const { headers: nextHeaders } = await import('next/headers');
      const cookieHeader = nextHeaders().get('cookie');
      if (cookieHeader) {
        baseHeaders.cookie = cookieHeader;
      }
    } catch (err) {
      // ignore if next/headers isn't available
    }
  }

  const finalHeaders: HeadersInit | undefined = Object.keys(baseHeaders).length ? baseHeaders : undefined;

  const response = await fetch(url, {
    cache: 'no-store',
    method,
    headers: finalHeaders,
    body: method === 'GET' || method === 'DELETE' ? undefined : body instanceof FormData ? body : JSON.stringify(body),
    ...init,
  });

  if (response.status === 401) {
    throw new AuthError('토근 만료');
  }

  return response.json() as Promise<ApiResponse<Data>>;
};

const baseHttp = {
  get<Data>(url: string, init?: RequestInit) {
    return request<Data>('GET', url, undefined, init);
  },
  post<Data, Body = unknown>(url: string, body?: Body, init?: RequestInit) {
    return request<Data, Body>('POST', url, body, init);
  },
  postFormData<Data, Body = FormData>(url: string, body?: Body, init?: RequestInit) {
    return request<Data, Body>('POST', url, body, init);
  },
  put<Data, Body = unknown>(url: string, body?: Body, init?: RequestInit) {
    return request<Data, Body>('PUT', url, body, init);
  },
  patch<Data, Body = unknown>(url: string, body?: Body, init?: RequestInit) {
    return request<Data, Body>('PATCH', url, body, init);
  },
  delete<Data>(url: string, init?: RequestInit) {
    return request<Data>('DELETE', url, undefined, init);
  },
};

async function withAuthRedirect<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof AuthError) {
      if (typeof window === 'undefined') {
        redirect(`${PATH.LOGIN}?logout=true`);
      } else {
        await fetch(INTERNAL_URL_IN_CLIENT.LOGOUT, { method: 'POST' });
        window.location.href = PATH.LOGIN;
      }
    }
    throw err;
  }
}

export const requestHttp = {
  get<Data>(url: string, init?: RequestInit) {
    return withAuthRedirect(() => baseHttp.get<Data>(url, init));
  },
  post<Data, Body = unknown>(url: string, body?: Body, init?: RequestInit) {
    return withAuthRedirect(() => baseHttp.post<Data, Body>(url, body, init));
  },
  postFormData<Data, Body = FormData>(url: string, body?: Body, init?: RequestInit) {
    return withAuthRedirect(() => baseHttp.postFormData<Data, Body>(url, body, init));
  },
  put<Data, Body = unknown>(url: string, body?: Body, init?: RequestInit) {
    return withAuthRedirect(() => baseHttp.put<Data, Body>(url, body, init));
  },
  patch<Data, Body = unknown>(url: string, body?: Body, init?: RequestInit) {
    return withAuthRedirect(() => baseHttp.patch<Data, Body>(url, body, init));
  },
  delete<Data>(url: string, init?: RequestInit) {
    return withAuthRedirect(() => baseHttp.delete<Data>(url, init));
  },
};
