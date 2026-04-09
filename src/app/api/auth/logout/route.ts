import { COOKIE_KEYS } from '@/constants/cookie';
import { deleteCookie } from '@/lib/node/cookie';

export function POST() {
  deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
  deleteCookie(COOKIE_KEYS.REFRESH_TOKEN);
  console.log('쿠키삭제3');

  return Response.json({ ok: true }, { status: 200 });
}
