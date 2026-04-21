import { ApiResponse } from '@/types/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const request = async <Data, Body = unknown>(method: HttpMethod, url: string, body?: Body, init?: RequestInit) => {
  const isFormData = body instanceof FormData;

  // 기본 헤더: init에 들어온 헤더를 기반으로 Content-Type을 필요한 경우에만 추가
  const baseHeaders: Record<string, string> = { ...(init?.headers ?? {}) } as Record<string, string>;
  if (!isFormData && method !== 'GET' && method !== 'DELETE') {
    baseHeaders['Content-Type'] = 'application/json';
  }

  const finalHeaders: HeadersInit | undefined = Object.keys(baseHeaders).length ? baseHeaders : undefined;

  const response = await fetch(url, {
    method,
    headers: finalHeaders,
    body: method === 'GET' || method === 'DELETE' ? undefined : body instanceof FormData ? body : JSON.stringify(body),
    ...init,
  });

  const data = (await response.json()) as ApiResponse<Data>;

  if (!response.ok) {
    throw data;
  }

  return data;
};

export const requestHttp = {
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
