'use client';

import { Zap, Layers, Users, Headset } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionTag } from '../customs/section-tag.custom';
import { useTranslations } from 'next-intl';
import { Container } from '../wrappers/container';

export default function OurStrength() {
  const t = useTranslations('Page.Strength');
  const features = [
    {
      name: `${t('title.t1')}`,
      description: `${t('answer.a1')}`,
      icon: Layers,
    },
    {
      name: `${t('title.t2')}`,
      description: `${t('answer.a2')}`,
      icon: Zap,
    },
    {
      name: `${t('title.t3')}`,
      description: `${t('answer.a3')}`,
      icon: Users,
    },
    {
      name: `${t('title.t4')}`,
      description: `${t('answer.a4')}`,
      icon: Headset,
    },
  ];

  return (
    <div className="py-24 relative overflow-hidden" id="features">
      {/* Thay đổi container này để loại bỏ padding hạn chế */}
      <Container className=" w-full mx-auto px-0 relative z-10">
        <div className="lg:text-left">
          {' '}
          {/* Căn trái thay vì căn giữa */}
          <SectionTag title="Our Strength" />
          <motion.p
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {t('headline')}
          </motion.p>
          <motion.p
            className="mt-4 max-w-4xl text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {t('description')}
          </motion.p>
        </div>

        {/* Đảm bảo grid full-width */}
        <div className="mt-20 w-full">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="relative w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <dt className="flex items-start">
                  <motion.div
                    className="flex items-center justify-center h-12 w-12 rounded-md bg-[#013162] text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                  <p className="ml-4 text-lg leading-6 font-medium text-foreground">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-muted-foreground">
                  {feature.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
        <button className="mt-8 bg-main hover:bg-primary-700 text-white  text-xs font-medium tracking-widest uppercase px-7 py-3.5 transition-colors">
          {t('button')} →
        </button>
      </Container>
    </div>
  );
}
