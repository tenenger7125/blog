import { NextRequest } from 'next/server';

import { COOKIE_KEYS } from '@/constants';
import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { getCookie } from '@/lib/node/cookie';
import { fetchServer } from '@/lib/node/fetch-server';

export const POST = async (request: NextRequest) => {
  const accessToken = (await getCookie(COOKIE_KEYS.ACCESS_TOKEN)) || '';
  const formData = await request.formData();

  const result = await fetchServer(EXTERNAL_URL_IN_NODE.IMAGE_UPLOAD, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  return Response.json(result, { status: result.statusCode });
};
