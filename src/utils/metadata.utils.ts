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
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vietstrix.com',
    siteName = 'Vietstrix',
    defaultImage = '/imgs/vsv.webp',
  } = options;

  if (!slug || slug === '[slug]' || slug === '%5Bslug%5D') {
    return {
      title: 'Post Not Found',
    };
  }

  try {
    const response = await handleAPI<any>(
      `${endpoints.cms.portfolios.slug(slug)}?populate=category,images,tags,creator`,
      'GET'
    );
    const post = response?.data;

    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    const creatorName = post.creator
      ? `${post.creator.first_name || ''} ${post.creator.last_name || ''}`.trim()
      : (post.author?.name || 'Hoang Pham Minh');
    const categorySlug = post.category?.slug || 'tin-tuc';
    const articleUrl = `${baseUrl}/blogs/${categorySlug}/${post.slug}`;

    // Helper to ensure OG Image is always an absolute URL (Facebook/LinkedIn require absolute URLs)
    const getAbsoluteImageUrl = (url?: string): string => {
      if (!url) return `${baseUrl}${defaultImage}`;
      if (url.startsWith('http://') || url.startsWith('https://')) return url;
      return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    const ogImageUrl = getAbsoluteImageUrl(post.thumbnail || post.images?.[0]?.url);

    return {
      title: post.title,
      description: post.excerpt || post.description,
      keywords: post.tags?.map((tag: any) => tag.name) || [],
      authors: [{ name: creatorName }],
      openGraph: {
        title: post.title,
        description: post.excerpt || post.description,
        url: articleUrl,
        siteName,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: 'vi_VN',
        type: 'article',
        publishedTime: post.created_at,
        modifiedTime: post.updated_at,
        authors: [creatorName],
        tags: post.tags?.map((tag: any) => tag.name) || [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || post.description,
        images: [ogImageUrl],
      },
      alternates: {
        canonical: articleUrl,
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vietstrix.com';

  const creatorName = post?.creator
    ? `${post.creator.first_name || ''} ${post.creator.last_name || ''}`.trim()
    : 'Hoang Pham Minh';

  const image = post.thumbnail || post.images?.[0]?.url || `${baseUrl}/imgs/vsv.webp`;

  const authorUrl = post.creator?.social_links?.linkedin
    || post.creator?.social_links?.github
    || post.creator?.social_links?.facebook
    || baseUrl;

  // Clean description for schema: remove html tags and limit length
  const cleanDescription = (post.excerpt || post.description || '')
    .replace(/<[^>]*>/g, '')
    .slice(0, 160)
    .trim();

  const categorySlug = post.category?.slug || 'tin-tuc';
  const articleUrl = `${baseUrl}/blogs/${categorySlug}/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${articleUrl}#article`,
    isPartOf: {
      '@type': 'WebPage',
      '@id': articleUrl,
      url: articleUrl,
      name: post.title,
    },
    headline: post.title,
    description: cleanDescription,
    image: image,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    mainEntityOfPage: articleUrl,
    author: {
      '@type': 'Person',
      name: creatorName,
      jobTitle: post.creator?.role_title || 'Software Engineer',
      image: post.creator?.avatar_url || `${baseUrl}/icons/logo-cricle.svg`,
      sameAs: [authorUrl].filter(Boolean),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vietstrix',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icons/logo-cricle.svg`,
      },
      sameAs: [
        'https://www.facebook.com/VietStrix.dev',
        'https://github.com/vietstrixvn',
        'https://www.linkedin.com/company/vietstrix',
        'https://www.instagram.com/vietstrix',
      ],
    },
  };
}
