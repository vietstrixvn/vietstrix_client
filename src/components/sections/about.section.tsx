'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Container } from '../wrappers/container';
import { InteractiveClean } from '../customs/interactive-clean.custom';
import PartnersSection from './partner.section';

export default function AboutUsSection() {
  const t = useTranslations('Page');

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      <Container className="relative mx-auto  px-6 md:px-12 overflow-hidden flex-1 flex items-center py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          <div className="flex flex-col justify-center items-start lg:items-end lg:pr-12 order-2 lg:order-1">
            <div className="relative">
              {/* Large decorative quote */}
              <div
                className="absolute -left-16 -top-20 lg:-left-24 lg:-top-32 text-main opacity-30 text-[200px] lg:text-[280px] leading-none pointer-events-none select-none simteste"
                style={{ fontFamily: 'var(--font-alex-brush), cursive' }}
              >
                &ldquo;
              </div>

              {/* Main quote with improved spacing and hierarchy */}
              <blockquote className="relative z-10 max-w-xl text-main">
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-lorenzo-text-light leading-[1.1] tracking-tight mb-8">
                  {t('Slogan')}
                </p>
              </blockquote>

              {/* Author attribution */}
              <div className="mt-4">
                <p className="text-base font-medium font-mono md:text-lg text-primary-800">
                  - Hoang Pham
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative w-full aspect-4/5 md:aspect-square max-w-lg mx-auto lg:mx-0 order-1 lg:order-2"
            style={{ touchAction: 'pan-y' }}
          >
            <div className="hidden md:block absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-main rounded-tl-3xl z-20" />
            <div className="hidden md:block absolute -top-4 -right-4 w-16 h-16 border-t-4 border-r-4 border-main rounded-tr-3xl z-20" />
            <div className="hidden md:block absolute -bottom-4 -left-4 w-16 h-16 border-b-4 border-l-4 border-main rounded-bl-3xl z-20" />
            <div className="hidden md:block absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-main rounded-br-3xl z-20" />
            <InteractiveClean />
          </motion.div>
        </div>
      </Container>
      <PartnersSection />
    </div>
  );
}
