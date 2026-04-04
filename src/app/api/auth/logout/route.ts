import { COOKIE_KEYS } from '@/constants';
import { setCookie } from '@/lib/node/cookie';

export function POST() {
  setCookie(COOKIE_KEYS.ACCESS_TOKEN, '', { maxAge: 0 });
  setCookie(COOKIE_KEYS.REFRESH_TOKEN, '', { maxAge: 0 });

  return Response.json({ ok: true }, { status: 200 });
}
