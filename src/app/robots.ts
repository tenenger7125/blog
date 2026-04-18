// app/robots.ts
import { MetadataRoute } from 'next';

import { INTERNAL_URL_IN_NODE } from '@/constants/node/url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/refresh/', '/login/', '/signup/'],
      },
    ],
    sitemap: `${INTERNAL_URL_IN_NODE.BLOG_BASE_URL}/sitemap.xml`,
  };
}
