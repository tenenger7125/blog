import { COOKIE_KEYS } from '@/constants';
import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { setCookie } from '@/lib/node/cookie';
import { fetchServer } from '@/lib/node/fetch-server';
import { LoginResponseData } from '@/types/auth';

export async function POST(request: Request) {
  const result = await fetchServer<LoginResponseData>(EXTERNAL_URL_IN_NODE.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(await request.json()),
  });

  if (result.data?.accessToken) {
    setCookie(COOKIE_KEYS.ACCESS_TOKEN, result.data.accessToken, { httpOnly: true });
    setCookie(COOKIE_KEYS.REFRESH_TOKEN, result.data.refreshToken || '', { httpOnly: true });
  }

  return Response.json(result, { status: result.statusCode });
}
