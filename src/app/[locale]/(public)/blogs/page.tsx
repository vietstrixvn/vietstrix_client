import { generatePageMetadata } from '@/constants/appInfos';
import { notFound } from 'next/navigation';
import { getPosts } from '@/libs/seo/getPosts';
import { getCategories } from '@/libs/seo/getCategories';
import BlogList from './data';
import { logError } from '@/utils';

export const metadata = generatePageMetadata({
  title: 'Blogs',
  description:
    'Vietstrix shares real-world insights on coding, product building, and scaling ideas into actual products. No fluff — just practical knowledge, optimization, and execution.',
  path: '/blogs',
  keywords: [
    'development blog',
    'web development',
    'software engineering',
    'product development',
    'ui ux design',
    'fullstack development',
    'startup journey',
    'vietstrix blog',
  ],
});

// ISR: Revalidate mỗi 1 giờ
export const revalidate = 3600;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; category?: string; search?: string }>;
}) {
  const { locale } = await params;

  const search = await searchParams;
  const page = parseInt(search.page || '1');
  const categoryFilter = search.category;
  const searchQuery = search.search || null;

  try {
    // Fetch posts using cached helper with blogId filter
    const { posts, pagination } = await getPosts({
      page,
      pageSize: 12,
      type: 'blogs',
      categoryId: categoryFilter || null,
      lang: locale,
      search: searchQuery,
    });

    // Fetch recent posts for sidebar with blogId filter
    const { posts: recentPosts } = await getPosts({
      page: 1,
      pageSize: 5,
      ...(categoryFilter && { category_id: categoryFilter }),

      type: 'blogs',
    });

    // Fetch categories with blogId using cached helper
    const allCategories = await getCategories({ type: 'blogs', lang: locale });

    // Filter categories by locale (in case API doesn't filter properly)
    const categories = allCategories.filter(
      (cat: any) => cat.lang === locale || cat.locale === locale
    );

    // Organization structured data for SEO
    const organizationJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Vietstrix',
      url: 'https://vietstrix.com',
      logo: 'https://vietstrix.com/logo.svg',
      description:
        'Vietstrix is a product-focused development team specializing in web applications, UI/UX design, and scalable system architecture.',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'VN',
        addressLocality: 'Ho Chi Minh City',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        availableLanguage: ['English', 'Vietnamese'],
      },
      sameAs: [
        'https://facebook.com/yourpage',
        'https://linkedin.com/company/vietstrix',
      ],
    };

    // Blog structured data
    const blogJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Vietstrix Blog',
      description:
        'Insights on web development, product building, UI/UX, and real-world engineering. Practical knowledge, system optimization, and lessons from building scalable products.',
      url: 'https://vietstrix.com/blogs',
      publisher: {
        '@type': 'Organization',
        name: 'Vietstrix',
        logo: {
          '@type': 'ImageObject',
          url: 'https://vietstrix.com/logo.svg',
        },
      },
      inLanguage: ['en', 'vi'],
    };
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <BlogList
          post={posts}
          recentPosts={recentPosts}
          categories={categories}
          pagination={pagination}
          currentPage={page}
          initialSearch={searchQuery || ''}
        />
      </>
    );
  } catch (error) {
    logError('Error fetching posts:', error);
    notFound();
  }
}
