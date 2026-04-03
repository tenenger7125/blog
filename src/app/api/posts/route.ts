import { fetchServer } from '@/lib/node/fetch-server';

export const GET = async (_request: Request, { query }: { query: { page?: string; limit?: string } }) => {
  const { page, limit } = query;

  if (!process.env.BLOG_SERVER) {
    return new Response('Blog server not configured', { status: 500 });
  }

  const data = await fetchServer(`${process.env.BLOG_SERVER}/posts?page=${page}&limit=${limit}`);

  return Response.json(data, { status: 200 });
};
