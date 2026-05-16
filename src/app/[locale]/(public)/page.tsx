import { getPosts } from '@/libs/seo/getPosts';
import type { Metadata } from 'next';
import HomePage from './data';

export const metadata: Metadata = {
  title: 'Vietstrix',
  description:
    'Vietstrix is a product-driven team building scalable web apps, helping startups turn ideas into reliable digital products from design to deployment.',
  keywords: [
    'web development',
    'freelance developer',
    'outsourcing web',
    'frontend development',
    'backend development',
    'fullstack development',
    'reactjs',
    'nextjs',
    'web app development',
    'software outsourcing',
    'fullstack developer',
    'web developer',
    'Next.js',
    'React',
    'NestJS',
    'Node.js',
    'TypeScript',
    'UI/UX',
    'designer',
    'cloud',
    'database',
    'frontend',
    'backend',
    'portfolio',
    'personal website',
    'developer profile',
  ],
  openGraph: {
    title: 'Vietstrix - Build every thing',
    description:
      'Vietstrix is a product-driven team building scalable web apps, helping startups turn ideas into reliable digital products from design to deployment.',
    url: 'https://vietstrix.com',
    type: 'website',
  },
};

// ISR: Revalidate mỗi 1 giờ
export const revalidate = 3600;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const { posts } = await getPosts({
    type: 'blogs',
    pageSize: 4,
    lang: locale,
  });
  const { posts: projects } = await getPosts({
    type: 'project',
    pageSize: 4,
    lang: locale,
  });

  // Organization structured data for SEO
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cơm Lành',
    url: 'https://gaolanh.com',
    logo: 'https://gaolanh.com/logo.svg',
    description:
      'Cơm Lành đồng hành cùng chủ quán tìm ra loại gạo phù hợp nhất cho nồi cơm kinh doanh thông qua chương trình thử mẫu nhỏ - nấu mẫu lớn.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'VN',
      addressLocality: 'Việt Nam',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Vietnamese'],
    },
    sameAs: ['https://facebook.com/gaolanh', 'https://instagram.com/gaolanh'],
  };

  // WebSite structured data for homepage
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cơm Lành',
    url: 'https://gaolanh.com',
    description:
      'Đối tác tin cậy của hàng nghìn quán ăn - Gạo sạch, chất lượng cao',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://gaolanh.com/san-pham?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomePage posts={posts} projects={projects} />
    </>
  );
}
