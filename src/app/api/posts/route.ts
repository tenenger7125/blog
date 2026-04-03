import { EXTERNAL_URL } from '@/constants/node/url';
import { fetchServer } from '@/lib/node/fetch-server';

export const GET = async (_request: Request, { query }: { query: { page?: string; limit?: string } }) => {
  const { page, limit } = query;

  const data = await fetchServer(`${EXTERNAL_URL.POSTS}?page=${page}&limit=${limit}`);

  return Response.json(data, { status: 200 });
};
