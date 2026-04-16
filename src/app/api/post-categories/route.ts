import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { fetchServer } from '@/lib/node/fetch-server';
import { PostCategoryResponse } from '@/types/post-category';

export const GET = async () => {
  const result = await fetchServer<PostCategoryResponse[]>(EXTERNAL_URL_IN_NODE.POST_CATEGORIES, {
    method: 'GET',
  });

  return Response.json(result, { status: result.statusCode });
};
