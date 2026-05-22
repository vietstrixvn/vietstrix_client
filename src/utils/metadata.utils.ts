import { Metadata } from 'next';
import { endpoints } from '@/apis';
import { handleAPI } from '@/apis/handler';
import { logError } from './logger.util';

interface PostMetadataOptions {
  slug: string;
  baseUrl?: string;
  siteName?: string;
  defaultImage?: string;
}

/**
 * Generate metadata for post detail pages
 * @param options - Configuration options for metadata generation
 * @returns Metadata object for Next.js
 */
export async function generatePostMetadata(
  options: PostMetadataOptions
): Promise<Metadata> {
  const {
    slug,
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://client1.com',
    siteName = 'Your Site Name',
    defaultImage = '/imgs/vsv.webp',
  } = options;

  if (!slug || slug === '[slug]' || slug === '%5Bslug%5D') {
    return {
      title: 'Post Not Found',
    };
  }

  try {
    const response = await handleAPI<any>(
      endpoints.cms.portfolios.slug(slug),
      'GET'
    );
    const post = response?.data;

    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    return {
      title: post.title,
      description: post.excerpt || post.description,
      keywords: post.tags?.map((tag: any) => tag.name) || [],
      authors: [{ name: post.author?.name || 'Admin' }],
      openGraph: {
        title: post.title,
        description: post.excerpt || post.description,
        url: `${baseUrl}/posts/${post.slug}`,
        siteName,
        images: [
          {
            url: post.thumbnail || defaultImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: 'vi_VN',
        type: 'article',
        publishedTime: post.created_at,
        modifiedTime: post.updated_at,
        authors: [post.author?.name || 'Admin'],
        tags: post.tags?.map((tag: any) => tag.name) || [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || post.description,
        images: [post.thumbnail || defaultImage],
      },
      alternates: {
        canonical: `${baseUrl}/posts/${post.slug}`,
      },
    };
  } catch (error) {
    logError('Metadata fetch error:', error);

    return {
      title: 'Error loading post',
    };
  }
}

/**
 * Generate JSON-LD structured data for article
 * @param post - Post data object
 * @returns JSON-LD object
 */
export function generateArticleJsonLd(post: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.description,
    image: post.thumbnail,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Admin',
    },
  };
}
