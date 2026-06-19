import { getPosts } from '@/libs/seo/getPosts';
import type { Metadata } from 'next';
import HomePage from './data';
import { getMentions } from '@/libs/seo/getMentions';

export const metadata: Metadata = {
  title: 'Vietstrix: Build everything custom',
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
    title: 'Vietstrix | Web & MVP Development Agency - Build everything custom',
    description:
      'Vietstrix is a product-driven team building scalable web apps, helping startups turn ideas into reliable digital products from design to deployment.',
    url: 'https://www.vietstrix.com',
    type: 'website',
    images: [
      {
        url: 'https://www.vietstrix.com/imgs/OG-Image.png',
        width: 1200,
        height: 630,
        alt: 'Vietstrix',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vietstrix | Web & MVP Development Agency - Build everything custom',
    description:
      'Vietstrix is a product-driven team building scalable web apps, helping startups turn ideas into reliable digital products from design to deployment.',
    images: ['https://www.vietstrix.com/imgs/OG-Image.png'],
    creator: '@vietstrix',
  },
  alternates: {
    canonical: 'https://www.vietstrix.com',
    languages: {
      en: 'https://www.vietstrix.com',
      vi: 'https://www.vietstrix.com/vi',
      'x-default': 'https://www.vietstrix.com',
    },
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
  const { mentions } = await getMentions({
    pageSize: 12,
  });

  return (
    <>
      <HomePage posts={posts} projects={projects} mentions={mentions} />
    </>
  );
}
