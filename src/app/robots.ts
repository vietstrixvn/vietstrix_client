import { MetadataRoute } from 'next';
import { siteBaseUrl } from '../constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
    ],
    sitemap: `${siteBaseUrl}/sitemap.xml`,
  };
}
