import { MetadataRoute } from 'next';
import { siteBaseUrl } from '../constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteBaseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // {
    //   url: `${siteBaseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${siteBaseUrl}/fouder`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${siteBaseUrl}/news`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.9,
    // },
    // {
    //   url: `${siteBaseUrl}/blogs`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // },
    // {
    //   url: `${siteBaseUrl}/documents`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // },
  ];
}
