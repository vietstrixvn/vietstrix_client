'use client';

import { formatSmartDate } from '@/utils';
import { useEffect } from 'react';
import { Icons } from '@/assets';
import Link from 'next/link';
import { RichTextContent } from '@/components/tiptap/RichTextContent';
import { PostResponse } from '@/types/portfolio';
import { Container } from '@/components/wrappers/container';
import { CustomImage } from '@/components';
import TableOfContents from '@/components/cards/toc.card';

interface ArticleDetailProps {
  post: PostResponse;
}

export default function ArticleDetail({ post }: ArticleDetailProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-main mb-4">
            {'Post not found'}
          </h2>
          <Link
            href="/project"
            className="text-primary font-bold hover:underline"
          >
            Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Container className="pt-20 mx-auto pb-32 bg-white">
      {/* Article Hero Image */}
      <section className="h-[60vh] overflow-hidden">
        <CustomImage
          src={post.images?.[0]?.url || '/imgs/vsv.webp'}
          alt={post.title}
          className="rounded-none object-cover w-full h-full"
          width={1200}
          height={600}
        />
      </section>

      {/* Article Header */}
      <section className="mt-6 md:mt-12">
        <div className="w-full">
          <span className="inline-block text-[0.65rem] font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-md bg-secondary-100 shadow-sm text-main">
            {post?.category?.title || 'Tin tức'}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-black text-secondary-800 leading-[1.15] mb-4 break-words hyphens-auto">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.85rem] text-secondary-700">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-beige flex items-center justify-center text-xs font-bold text-primary shrink-0">
                <CustomImage
                  src="/icons/logo-cricle.svg"
                  alt="logo"
                  width={22}
                  height={44}
                />
              </div>
              <span className="font-bold text-main">
                {post?.creator?.first_name || 'Admin'}{' '}
                {post?.creator?.last_name || ''}
              </span>
            </div>
            <span className="text-secondary-400">•</span>
            <time>{formatSmartDate(post?.created_at)}</time>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="mt-8 space-y-4">
        {/* Share Section */}
        <div className="mt-16 pt-10 border-t border-divider flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold uppercase tracking-wider text-secondary-700">
              Share:
            </span>
            <button
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url).then(() => {});
              }}
              className="flex text-main items-center gap-2 px-4 py-2 rounded-md border border-divider hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <Icons.Link />
              <span className="text-sm font-medium">Copy link</span>
            </button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="mt-8">
        <div className="grid lg:grid-cols-12 gap-20">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <TableOfContents htmlContent={post.description} />
            </div>
          </aside>
          <div className="lg:col-span-9">
            <div className="max-w-none prose prose-lg prose-primary">
              <RichTextContent
                html={post.description}
                className="prose rich-text-content prose-sm max-w-none"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-secondary-700">
                Tags:
              </span>
              {post.tags?.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block px-3 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
