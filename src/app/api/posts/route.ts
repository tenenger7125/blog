import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { fetchServer, fetchServerWithAuth } from '@/lib/node/fetch-server';
import { PostsDataResponse } from '@/types/post';

import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page');
  const pageSize = req.nextUrl.searchParams.get('pageSize');

  const result = await fetchServer<PostsDataResponse>(
    `${EXTERNAL_URL_IN_NODE.POSTS}?page=${page}&pageSize=${pageSize}`,
  );

  return Response.json(result, { status: 200 });
}

export async function POST(request: Request) {
  const result = await fetchServerWithAuth(EXTERNAL_URL_IN_NODE.POSTS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(await request.json()),
  });

  return Response.json(result, { status: result.statusCode });
}
