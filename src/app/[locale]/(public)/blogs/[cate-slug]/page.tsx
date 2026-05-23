import { generatePageMetadata } from '@/constants/appInfos';
import { notFound } from 'next/navigation';
import { getPosts } from '@/libs/seo/getPosts';
import { getCategories } from '@/libs/seo/getCategories';
import BlogList from './data';
import { logError } from '@/utils';

import { setRequestLocale } from 'next-intl/server';

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

// Page uses searchParams, so it must be dynamically rendered.

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; 'cate-slug': string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale, 'cate-slug': cateSlug } = await params;
  setRequestLocale(locale);

  if (
    !cateSlug ||
    cateSlug === '[cate-slug]' ||
    cateSlug === '%5Bcate-slug%5D'
  ) {
    notFound();
  }

  const search = await searchParams;
  const page = parseInt(search.page || '1');

  try {
    // Fetch categories first to get category ID from slug
    const allCategories = await getCategories({ type: 'blogs', lang: locale });

    // Filter categories by locale
    const categories = allCategories.filter(
      (cat: any) => cat.lang === locale || cat.locale === locale
    );

    // Find the category by slug
    const currentCategory = categories.find(
      (cat: any) => cat.slug === cateSlug
    );

    // If category not found, return 404
    if (!currentCategory) {
      notFound();
    }

    // Fetch posts using cached helper with category ID from slug
    const { posts, pagination } = await getPosts({
      page,
      pageSize: 12,
      type: 'blogs',
      categoryId: currentCategory.id,
      lang: locale,
    });

    // Fetch recent posts for sidebar with category filter
    const { posts: recentPosts } = await getPosts({
      page: 1,
      pageSize: 5,
      categoryId: currentCategory.id,
      type: 'blogs',
      lang: locale,
    });

    // Organization structured data for SEO
    const organizationJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Vietstrix',
      url: 'https://www.vietstrix.com',
      logo: 'https://www.vietstrix.com/icons/logo-cricle.svg',
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
      url: 'https://www.vietstrix.com/blogs',
      publisher: {
        '@type': 'Organization',
        name: 'Vietstrix',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.vietstrix.com/icons/logo-cricle.svg',
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
        />
      </>
    );
  } catch (error) {
    logError('Error fetching posts:', error);
    notFound();
  }
}
