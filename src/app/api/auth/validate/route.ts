import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { fetchServerWithAuth } from '@/lib/node/fetch-server';
import { ValidateResponseData } from '@/types/auth';

export async function GET() {
  const result = await fetchServerWithAuth<ValidateResponseData>(EXTERNAL_URL_IN_NODE.VALIDATE, {
    method: 'GET',
  });

  return Response.json(result, { status: result.statusCode });
}
