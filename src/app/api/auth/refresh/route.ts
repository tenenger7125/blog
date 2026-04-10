import { COOKIE_KEYS, COOKIE_OPTIONS } from '@/constants/cookie';
import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { deleteCookie, getCookie, setCookie } from '@/lib/node/cookie';
import { fetchServer } from '@/lib/node/fetch-server';
import { ReIssueTokenResponseData } from '@/types/auth';

export const POST = async () => {
  const refreshToken = await getCookie(COOKIE_KEYS.REFRESH_TOKEN);
  const result = await fetchServer<ReIssueTokenResponseData>(EXTERNAL_URL_IN_NODE.REFRESH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (result.statusCode === 401) {
    deleteCookie(COOKIE_KEYS.ACCESS_TOKEN, COOKIE_OPTIONS);
    deleteCookie(COOKIE_KEYS.REFRESH_TOKEN, COOKIE_OPTIONS);
  }

  if (result.data) {
    setCookie(COOKIE_KEYS.ACCESS_TOKEN, result.data.accessToken, COOKIE_OPTIONS);
    setCookie(COOKIE_KEYS.REFRESH_TOKEN, result.data.refreshToken, COOKIE_OPTIONS);
  }

  return Response.json(result, { status: result.statusCode });
};
