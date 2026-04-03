import { EXTERNAL_URL } from '@/constants/node/url';
import { fetchServer } from '@/lib/node/fetch-server';

export const POST = async (request: Request) => {
  const formData = await request.formData();

  const result = await fetchServer(EXTERNAL_URL.IMAGE_UPLOAD, {
    method: 'POST',
    body: formData,
  });

  return Response.json(result, { status: 200 });
};
