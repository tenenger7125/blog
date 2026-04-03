import { EXTERNAL_URL } from '@/constants/node/url';
import { fetchServer } from '@/lib/node/fetch-server';

export async function POST(request: Request) {
  const result = await fetchServer(EXTERNAL_URL.SIGNUP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(await request.json()),
  });

  return Response.json(result, { status: result.statusCode });
}
