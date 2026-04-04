import { redirect } from 'next/navigation';

import { PATH } from '@/constants/path';

import { AuthError, baseHttp } from './request';

async function withAuthRedirect<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof AuthError) redirect(PATH.LOGIN);
    throw err;
  }
}

export const serverHttp = {
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
