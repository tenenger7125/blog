// app/sitemap.ts
import { MetadataRoute } from 'next';

import { PATH } from '@/constants';
import { EXTERNAL_URL_IN_NODE, INTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { PostsSitemapDataResonse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await requestHttp.get<PostsSitemapDataResonse[]>(EXTERNAL_URL_IN_NODE.POSTS_SITEMAP);
  const posts = res.data ?? [];

  const postUrls = posts.map(post => ({
    url: `${INTERNAL_URL_IN_NODE.BLOG_BASE_URL}${PATH.POST}/${post.id}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: INTERNAL_URL_IN_NODE.BLOG_BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${INTERNAL_URL_IN_NODE.BLOG_BASE_URL}${PATH.POSTS}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postUrls,
  ];
}
