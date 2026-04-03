import { fetchServer } from '@/lib/node/fetch-server';

export const POST = async (request: Request) => {
  const formData = await request.formData();

  const result = await fetchServer(`${process.env.BLOG_SERVER}/images/upload`, {
    method: 'POST',
    body: formData,
  });

  return Response.json(result, { status: 200 });
};
