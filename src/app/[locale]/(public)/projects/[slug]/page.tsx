import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { endpoints } from '@/apis';
import { handleAPI } from '@/apis/handler';
import { generatePostMetadata } from '@/utils/metadata.utils';
import ArticleDetail from './data';
import { logError } from '@/utils';

// Generate static params for ISR
export async function generateStaticParams() {
  try {
    const response = await handleAPI<any>(
      `${endpoints.cms.portfolios.list}?page_size=100&status=show&type=project`,
      'GET'
    );

    // API returns { pagination, results }
    const posts = response?.data?.results || [];

    return posts.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (error) {
    logError('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generatePostMetadata({ slug });
}

// Revalidate every 1 hour
export const revalidate = 3600;

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!slug || slug === '[slug]' || slug === '%5Bslug%5D') {
    notFound();
  }

  try {
    const response = await handleAPI<any>(
      `${endpoints.cms.portfolios.slug(slug)}?populate=category,images,tags,creator&lang=${locale}`,
      'GET'
    );

    const post = response?.data;

    if (!post) {
      notFound();
    }

    const { generateArticleJsonLd } = await import('@/utils/metadata.utils');
    const jsonLd = generateArticleJsonLd(post);
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ArticleDetail post={post} />
      </>
    );
  } catch (error) {
    logError('[Project Detail] Error:', error);
    notFound();
  }
}
