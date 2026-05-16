import { generatePageMetadata } from '@/constants/appInfos';
import { notFound } from 'next/navigation';
import { getPosts } from '@/libs/seo/getPosts';
import { getCategories } from '@/libs/seo/getCategories';
import ProjectList from './data';
import { logError } from '@/utils';

export const metadata = generatePageMetadata({
  title: 'Projects',
  description:
    'A collection of Vietstrix projects — where ideas are turned into real products. From UI/UX to fullstack systems, each project reflects practical execution and scalable thinking.',
  path: '/du-an',
  keywords: [
    // English
    'web development projects',
    'software projects',
    'product development case study',
    'fullstack projects',
    'startup projects',
    'vietstrix portfolio',

    // Vietnamese
    'dự án web',
    'dự án phần mềm',
    'phát triển sản phẩm',
    'case study dự án',
    'dự án startup',
    'portfolio vietstrix',
  ],
});

// ISR: Revalidate mỗi 1 giờ
export const revalidate = 3600;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { locale } = await params;
  const search = await searchParams;
  const page = parseInt(search.page || '1');
  const categoryFilter = search.category;

  try {
    // Fetch posts with projectId type filter using cached helper
    const { posts, pagination } = await getPosts({
      page,
      pageSize: 12,
      type: 'project',
      categoryId: categoryFilter || null,
      lang: locale,
    });

    // Fetch categories with projectId using cached helper
    const categories = await getCategories({ type: 'project', lang: locale });

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
        contactType: 'Customer Support',
        availableLanguage: ['English', 'Vietnamese'],
      },
    };

    // Blog structured data
    const projectsJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Vietstrix Projects',
      description:
        'A collection of real-world projects by Vietstrix, showcasing web development, UI/UX design, and scalable product engineering.',
      url: 'https://vietstrix.com/du-an',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
        />
        <ProjectList
          project={posts}
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
