'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import {
  DevelopmentCard,
  HandoffCard,
  IdeationCard,
} from '@/components/animations/tech.animation';
import Link from 'next/link';
import IntroMarquee from '@/components/sections/intro.section';
import { motion } from 'framer-motion';
import { MeshGradient } from '@paper-design/shaders-react';
import { CustomImage } from '@/components';

interface Card {
  keyword: string;
  card: React.ReactNode;
}

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const t = useTranslations('Page');
  const [hoveredId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cards: Card[] = [
    {
      keyword: 'IDEA',
      card: <IdeationCard isHovered={hoveredId === 1} />,
    },
    {
      keyword: 'BUILD',
      card: <DevelopmentCard isHovered={hoveredId === 1} />,
    },
    {
      keyword: 'COMPLETE',
      card: <HandoffCard isHovered={hoveredId === 1} />,
    },
  ];

  const handleScrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const keyword = cards[currentIndex].keyword;
    let currentChar = 0;
    setDisplayText('');
    setIsTyping(true);
    const typeInterval = setInterval(() => {
      if (currentChar < keyword.length) {
        setDisplayText(keyword.substring(0, currentChar + 1));
        currentChar++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 100);
    return () => clearInterval(typeInterval);
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentCard = cards[currentIndex];

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-white relative overflow-hidden flex flex-col justify-center pb-16 sm:pb-24"
    >
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter
            id="glass-effect"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter
            id="gooey-filter"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient
            id="logo-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#007fff" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#063265" />
          </linearGradient>
          <linearGradient
            id="hero-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#0065d7" />
            <stop offset="70%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Nền sáng hơn: thay #063265 → #aee5ff, giảm opacity lớp 2 từ 50% → 35% */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={['#ffffff', '#d1f0ff', '#0065d7', '#aee5ff', '#e0e7ff']}
        speed={0.3}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-35"
        colors={['#ffffff', '#007fff', '#6366f1', '#d1f0ff']}
        speed={0.2}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 lg:pt-0">
        {/* Mobile layout: stacked, compact */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* LEFT SIDE */}
          <div className="space-y-4 sm:space-y-6 relative z-10">
            <div className="space-y-2 sm:space-y-3">
              {/* Badge */}
              <motion.div
                className="inline-flex space-x-3 items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-white/60 backdrop-blur-sm mb-2 sm:mb-4 relative border border-white/10"
                style={{ filter: 'url(#glass-effect)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent rounded-md" />
                <CustomImage
                  src="/icons/logo.svg"
                  width={16}
                  height={16}
                  alt="logo"
                />
                <span className="text-main text-xs sm:text-sm relative z-10 tracking-wide">
                  Vietstrix Team
                </span>
              </motion.div>

              {/* Heading */}
              <h1 className="uppercase font-black text-main text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[0.9] tracking-tighter flex flex-col">
                {t('Hero.title')}
              </h1>

              {/* Typewriter keyword */}
              <div className="h-10 sm:h-14 lg:h-20 flex items-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
                  <span className="inline-block">
                    {displayText}
                    <span
                      className={`inline-block w-1 h-7 sm:h-10 bg-white ml-1 ${isTyping ? 'animate-pulse' : 'opacity-0'}`}
                    />
                  </span>
                </div>
              </div>

              {/* Description */}
              <motion.p
                className="text-sm sm:text-base font-bold text-main leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {t('Hero.description')}
              </motion.p>
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentIndex(index);
                      setIsTransitioning(false);
                    }, 300);
                  }}
                  className={`h-2 rounded-md transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-main w-8'
                      : 'bg-slate-100 w-2 hover:bg-slate-100'
                  }`}
                  aria-label={`Go to ${cards[index].keyword}`}
                />
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-3">
              <Link
                href="/contact-us"
                className="flex items-center justify-center px-4 py-2.5 bg-main border border-main gap-4 group cursor-pointer flex-1 sm:flex-none"
              >
                <span className="font-bold uppercase tracking-[0.2em] text-xs sm:text-sm text-gray-100 whitespace-nowrap">
                  Contact Us
                </span>
              </Link>
              <div
                className="flex items-center justify-center px-4 py-2.5 bg-main/80 border border-main gap-2 group cursor-pointer flex-1 sm:flex-none"
                onClick={handleScrollToNext}
              >
                <span className="font-bold uppercase tracking-[0.2em] text-xs sm:text-sm text-gray-100 whitespace-nowrap">
                  Explore
                </span>
              </div>
            </div>
          </div>

          {/* Card — mobile: compact inline, desktop: right column */}
          <div className="flex justify-center lg:justify-end relative z-10 mt-6 sm:mt-8 lg:mt-0">
            <div className="relative w-full max-w-[260px] sm:max-w-sm md:max-w-md h-[160px] sm:h-[220px] md:h-[260px] lg:h-[280px]">
              <div className="h-full flex items-center justify-center">
                <div
                  key={`card-${currentIndex}`}
                  className={`w-full ${isTransitioning ? 'card-exit' : 'card-enter'}`}
                >
                  {currentCard.card}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <IntroMarquee />
      </div>
    </section>
  );
}
