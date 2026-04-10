import { COOKIE_KEYS, COOKIE_OPTIONS } from '@/constants/cookie';
import { deleteCookie } from '@/lib/node/cookie';

export function POST() {
  deleteCookie(COOKIE_KEYS.ACCESS_TOKEN, COOKIE_OPTIONS);
  deleteCookie(COOKIE_KEYS.REFRESH_TOKEN, COOKIE_OPTIONS);

  return Response.json({ ok: true }, { status: 200 });
}
