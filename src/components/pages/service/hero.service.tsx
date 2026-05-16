'use client';

import { ServiceCard } from '@/components/animations/tech.animation';
import { FeaturesBadge } from '@/components/customs/badge.custom';
import { Container } from '@/components/wrappers/container';
import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';

export const ServiceHeroSetion = () => {
  const t = useTranslations('Service');

  const sectionRef = useRef(null);
  return (
    <section
      ref={sectionRef}
      className="w-full py-16 bg-white md:py-24 relative overflow-hidden pt-20 sm:pt-24"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #495057 1px, transparent 1px), linear-gradient(to bottom, #495057 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <Container className="mx-auto">
        <div className="mx-auto w-full flex justify-center">
          <FeaturesBadge title="OUR_MISSION" />
        </div>
        <div className="flex gap-8 items-center">
          <div className="flex-1">
            <h1 className="uppercase font-black text-main text-3xl sm:text-3xl md:text-4xl lg:text-8xl leading-[0.85] tracking-tighter flex flex-col">
              <span className="text-main">{t('Hero.title.t1')}</span>
              <span className="ml-[40px] sm:ml-[80px] md:ml-[120px] text-outline-navy py-2 sm:py-3 md:py-4">
                {t('Hero.title.t2')}
              </span>
              <span className="text-primary-main">{t('Hero.title.t3')}</span>
            </h1>
          </div>
          <div className="flex-1">
            <ServiceCard />
          </div>
        </div>
      </Container>
    </section>
  );
};
