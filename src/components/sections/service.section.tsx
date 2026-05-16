'use client';

import { useState } from 'react';
import { Container } from '../wrappers/container';
import { useTranslations } from 'next-intl';

import {
  SystemCard,
  UxUiCard,
  DevelopmentCard,
  MvpCard,
  RedesignCard,
} from '../animations/tech.animation';
import { SectionTag } from '../customs/section-tag.custom';

export default function ServicesSection() {
  const t = useTranslations('Service');

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      title: 'End-to-End Web Development',
      description: `${t('Services.step.q1')}`,
      card: <DevelopmentCard isHovered={hoveredId === 1} />,
    },
    {
      id: 2,
      title: 'Product Design & UI/UX',
      description: `${t('Services.step.q2')}`,
      card: <UxUiCard isHovered={hoveredId === 2} />,
    },
    {
      id: 3,
      title: 'Web Systems & Optimization',
      description: `${t('Services.step.q3')}`,
      card: <SystemCard isHovered={hoveredId === 3} />,
    },
    {
      id: 4,
      title: 'MVP Development for Startups',
      description: `${t('Services.step.q4')}`,
      card: <MvpCard isHovered={hoveredId === 4} />,
    },
    {
      id: 5,
      title: 'Website Redesign & Revamp',
      description: `${t('Services.step.q5')}`,
      card: <RedesignCard isHovered={hoveredId === 5} />,
    },
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <Container className="mx-auto">
        <SectionTag title="Our Services" />
        {/* Header */}
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            {/* Main Title */}
            <h2 className="text-4xl font-bold leading-tight text-main lg:text-5xl">
              Our services
            </h2>
          </div>

          {/* Description */}
          <div className="flex-1 lg:pl-8">
            <p className="text-base leading-relaxed text-black">
              {t('Services.description')}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top 2 services - wider cards */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            {services.slice(0, 1).map((service) => (
              <div
                key={service.id}
                className="group flex h-full flex-col overflow-hidden rounded-sm bg-gray-100"
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative h-48 w-full flex-shrink-0 sm:h-56">
                  {service.card}
                </div>
                <div className="relative flex flex-1 flex-col justify-end p-6 sm:p-8 min-h-[120px]">
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-main transition-transform duration-500 group-hover:-translate-y-10">
                      {service.title}
                    </h3>
                    <p className="absolute bottom-0 left-0 right-0 text-base text-foreground/70 opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 lg:col-span-1">
            {services.slice(1, 2).map((service) => (
              <div
                key={service.id}
                className="group flex h-full flex-col overflow-hidden rounded-sm bg-gray-100"
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative h-48 w-full flex-shrink-0 sm:h-56">
                  {service.card}
                </div>
                <div className="relative flex flex-1 flex-col justify-end p-4 sm:p-6 min-h-[120px]">
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-main transition-transform duration-500 group-hover:-translate-y-10.5">
                      {service.title}
                    </h3>
                    <p className="absolute bottom-0 left-0 right-0 text-base text-foreground/70 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 3 services */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {services.slice(2).map((service) => (
            <div
              key={service.id}
              className="group flex h-full flex-col overflow-hidden rounded-sm bg-gray-100"
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-48 w-full flex-shrink-0 sm:h-56">
                {service.card}
              </div>
              <div className="relative flex flex-1 flex-col justify-end p-6 sm:p-8 min-h-[120px]">
                <div className="relative">
                  <h3 className="text-lg font-bold text-main transition-transform duration-500 group-hover:-translate-y-10">
                    {service.title}
                  </h3>
                  <p className="absolute bottom-0 left-0 right-0 text-sm text-foreground/70 opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
