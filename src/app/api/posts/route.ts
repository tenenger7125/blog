import { COOKIE_KEYS } from '@/constants';
import { EXTERNAL_URL } from '@/constants/node/url';
import { getCookie } from '@/lib/node/cookie';
import { fetchServer } from '@/lib/node/fetch-server';
import { PostsDataResponse } from '@/types/post';

import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page');
  const pageSize = req.nextUrl.searchParams.get('pageSize');

  const result = await fetchServer<PostsDataResponse>(`${EXTERNAL_URL.POSTS}?page=${page}&pageSize=${pageSize}`);

  return Response.json(result, { status: 200 });
}

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
