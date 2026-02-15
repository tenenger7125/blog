import { fetchServer } from '@/lib/node/fetch-server';

export async function POST(request: Request) {
  const result = await fetchServer(`${process.env.BLOG_SERVER}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(await request.json()),
  });

  return Response.json(result, { status: result.statusCode });
}
