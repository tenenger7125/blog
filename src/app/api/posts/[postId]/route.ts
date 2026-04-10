import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { fetchServerWithAuth } from '@/lib/node/fetch-server';

export const GET = async (_request: Request, ctx: { params: { postId: string } }) => {
  const { postId } = ctx.params;

  const data = await fetchServerWithAuth(`${EXTERNAL_URL_IN_NODE.POSTS}/${postId}`);

  return Response.json(data, { status: data.statusCode });
};

export const PUT = async (request: Request, ctx: { params: { postId: string } }) => {
  const { postId } = ctx.params;

  const result = await fetchServerWithAuth(`${EXTERNAL_URL_IN_NODE.POSTS}/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(await request.json()),
  });

  return Response.json(result, { status: result.statusCode });
};
