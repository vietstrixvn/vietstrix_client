'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FeaturesBadge } from '../customs/badge.custom';

export default function SolutionCard() {
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const viText =
    'Đừng để website của bạn phụ thuộc hoàn toàn vào một nền tảng. Tụi Mình giúp tái xây dựng và triển khai website với quyền sở hữu rõ ràng, cho phép doanh nghiệp chủ động vận hành, dễ dàng mở rộng và giảm rủi ro khi thay đổi chính sách hoặc ngừng sử dụng dịch vụ của bên thứ ba.';
  const enText =
    "Your website should be an asset you own, not a platform you depend on. We rebuild and deploy websites with full ownership, giving your business greater control, flexibility, and long-term stability.";

  const sentence = locale === 'vi' ? viText : enText;
  const words = sentence.split(' ');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wordElements = textContainerRef.current?.querySelectorAll('.reveal-word');
    if (!wordElements || wordElements.length === 0) return;

    const trigger = gsap.to(wordElements, {
      color: '#063265',
      stagger: 0.1,
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: textContainerRef.current,
        start: 'top 85%',
        end: 'bottom 45%',
        scrub: 0.5,
      },
    });

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-slate-800 overflow-hidden flex flex-col justify-center items-center py-20 lg:py-28 px-6 md:px-12 w-full"
    >
      <FeaturesBadge title="Solution" />

      {/* Studio Ambient Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-500/[0.02] rounded-full blur-[130px] pointer-events-none" />

      {/* Assembly Canvas Bounding Container */}
      <div className="w-full max-w-5xl flex items-center justify-center py-8">
        <div
          ref={textContainerRef}
          className="relative w-full text-center flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.35em] font-extrabold uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.4] tracking-tight"
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="reveal-word inline-block relative select-none will-change-transform text-[#063265]/15 transition-colors duration-300"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
