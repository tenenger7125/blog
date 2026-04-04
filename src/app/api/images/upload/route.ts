import { NextRequest } from 'next/server';

import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { fetchServerWithAuth } from '@/lib/node/fetch-server';

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const result = await fetchServerWithAuth(EXTERNAL_URL_IN_NODE.IMAGE_UPLOAD, {
    method: 'POST',
    body: formData,
  });

  return Response.json(result, { status: result.statusCode });
};
