import { COOKIE_KEYS } from '@/constants/cookie';
import { deleteCookie } from '@/lib/node/cookie';

export function POST() {
  deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
  deleteCookie(COOKIE_KEYS.REFRESH_TOKEN);

  return Response.json({ ok: true }, { status: 200 });
}
