import { revalidateTag } from 'next/cache';

import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { fetchServerWithAuth } from '@/lib/node/fetch-server';
import { PostsDataResponse } from '@/types/post';

import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page');
  const pageSize = req.nextUrl.searchParams.get('pageSize');

  const url = `${EXTERNAL_URL_IN_NODE.POSTS}?page=${page}&pageSize=${pageSize}`;

  const result = await fetchServerWithAuth<PostsDataResponse>(url);

  return Response.json(result, { status: result.statusCode });
}

export async function POST(request: Request) {
  const result = await fetchServerWithAuth(EXTERNAL_URL_IN_NODE.POSTS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(await request.json()),
  });

  revalidateTag('posts');

  return Response.json(result, { status: result.statusCode });
}
