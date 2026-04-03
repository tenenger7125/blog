import { ApiResponse } from '@/types/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const request = async <Data, Body = unknown>(method: HttpMethod, url: string, body?: Body, init?: RequestInit) => {
  const isFormData = body instanceof FormData;

  const headers: HeadersInit = isFormData
    ? { ...(init?.headers ?? {}) } // FormData: Content-Type 제외
    : {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      };

  const response = await fetch(url, {
    method,
    headers: method === 'GET' || method === 'DELETE' ? undefined : headers,
    body: method === 'GET' || method === 'DELETE' ? undefined : body instanceof FormData ? body : JSON.stringify(body),
    ...init,
  });

  return response.json() as Promise<ApiResponse<Data>>;
};

export const httpClient = {
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
