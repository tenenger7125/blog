import { NextRequest } from 'next/server';

import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { fetchServerWithAuth } from '@/lib/node/fetch-server';
import { ValidateResponseData } from '@/types/auth';

export async function GET(request: NextRequest) {
  console.log('validate route invoked', {
    referer: request.headers.get('referer'),
    ua: request.headers.get('user-agent'),
    host: request.headers.get('host'),
  });
  const result = await fetchServerWithAuth<ValidateResponseData>(EXTERNAL_URL_IN_NODE.VALIDATE, {
    method: 'GET',
  });

  return Response.json(result, { status: result.statusCode });
}
