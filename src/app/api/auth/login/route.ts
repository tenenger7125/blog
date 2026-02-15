import { COOKIE_KEYS } from '@/constants';
import { setCookie } from '@/lib/node/cookie';
import { fetchServer } from '@/lib/node/fetch-server';
import { LoginResponseData } from '@/types/auth';

export async function POST(request: Request) {
  const result = await fetchServer<LoginResponseData>(`${process.env.BLOG_SERVER}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(await request.json()),
  });

  setCookie(COOKIE_KEYS.ACCESS_TOKEN, result.data?.accessToken || '');
  setCookie(COOKIE_KEYS.REFRESH_TOKEN, result.data?.refreshToken || '');

  return Response.json(result, { status: result.statusCode });
}
