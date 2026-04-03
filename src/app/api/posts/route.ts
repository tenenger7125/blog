import { EXTERNAL_URL } from '@/constants/node/url';
import { fetchServer } from '@/lib/node/fetch-server';

import { COOKIE_KEYS } from '../../../constants';
import { getCookie } from '../../../lib/node/cookie';

export const GET = async (_request: Request, { query }: { query: { page?: string; limit?: string } }) => {
  const { page, limit } = query;

  const data = await fetchServer(`${EXTERNAL_URL.POSTS}?page=${page}&limit=${limit}`);

  return Response.json(data, { status: 200 });
};

export async function POST(request: Request) {
  const accessToken = (await getCookie(COOKIE_KEYS.ACCESS_TOKEN)) || '';

  const result = await fetchServer(EXTERNAL_URL.POSTS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(await request.json()),
  });

  return Response.json(result, { status: result.statusCode });
}
