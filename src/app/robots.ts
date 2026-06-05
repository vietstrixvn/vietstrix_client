import { MetadataRoute } from 'next';
import { siteBaseUrl } from '../constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: cho phép tất cả bot
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/login'],
      },

      // === Search Engines ===
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/login'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/login'],
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/login'],
      },

      // === Social Media Bots (link preview / OG crawling) ===
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Facebot',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      {
        userAgent: 'Pinterestbot',
        allow: '/',
      },

      // === Cho phép AI Search Crawlers (Để hiển thị kết quả trên ChatGPT/Claude Search) ===
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/login'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/login'],
      },

      // === Chặn AI Training Crawlers (Chỉ cào để huấn luyện, không đem lại Traffic) ===
      {
        userAgent: 'anthropic-ai',
        disallow: ['/'],
      },
      {
        userAgent: 'CCBot',
        disallow: ['/'],
      },
      {
        userAgent: 'Google-Extended',
        disallow: ['/'],
      },
      {
        userAgent: 'Bytespider',
        disallow: ['/'],
      },
    ],
    sitemap: `${siteBaseUrl}/sitemap.xml`,
  };
}
