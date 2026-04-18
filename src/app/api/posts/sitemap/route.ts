import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { fetchServer } from '@/lib/node/fetch-server';
import { PostsSitemapDataResonse } from '@/types/post';

export async function GET() {
  const result = await fetchServer<PostsSitemapDataResonse[]>(EXTERNAL_URL_IN_NODE.POSTS_SITEMAP);

  return Response.json(result, { status: result.statusCode });
}
