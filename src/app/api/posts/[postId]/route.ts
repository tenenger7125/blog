import { EXTERNAL_URL } from '@/constants/node/url';
import { fetchServer } from '@/lib/node/fetch-server';

export const GET = async (_request: Request, ctx: { params: { postId: string } }) => {
  const { postId } = ctx.params;

  const data = await fetchServer(`${EXTERNAL_URL.POSTS}/${postId}`);

  return Response.json(data, { status: 200 });
};
