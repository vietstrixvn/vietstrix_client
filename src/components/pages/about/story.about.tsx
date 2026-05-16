'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FeaturesBadge } from '@/components/customs/badge.custom';
import { Container } from '@/components/wrappers/container';
import { useTranslations } from 'next-intl';
import { CustomImage } from '@/components/media/image.component';

export default function StorySection() {
  const t = useTranslations('About');

  return (
    <Container className="mx-auto min-h-screen flex flex-col justify-center">
      <div className="flex flex-col ">
        <div className="max-w-xl">
          <FeaturesBadge title="Our_strory" />
          <h2 className="text-8xl font-bold text-main mt-4 mb-4">
            {t('Introduce.title')}
          </h2>
          <p className="text-xl text-secondary-600">
            {t('Introduce.description')}
          </p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"
      >
        <div className="flex flex-col gap-8 mt-6">
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-none space-y-4"
          >
            {[
              {
                question: `${t('Accordion.q1')}`,
                answer: (
                  <>
                    <p className="mb-3">{t('Accordion.a1.intro')}</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong className="text-secondary-800">
                          {t('Accordion.a1.t1')}
                        </strong>{' '}
                        {t('Accordion.a1.a1')}
                      </li>
                      <li>
                        <strong className="text-secondary-800">
                          {t('Accordion.a1.t2')}
                        </strong>{' '}
                        {t('Accordion.a1.a2')}
                      </li>
                    </ul>
                  </>
                ),
              },
              {
                question: `${t('Accordion.q2')}`,
                answer: (
                  <>
                    <p className="mb-3">{t('Accordion.a2.intro')}</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong className="text-secondary-800">
                          {t('Accordion.a2.t1')}
                        </strong>{' '}
                        {t('Accordion.a2.a1')}.
                      </li>
                      <li>
                        <strong className="text-secondary-800">
                          {t('Accordion.a2.t2')}
                        </strong>{' '}
                        {t('Accordion.a2.a2')}.
                      </li>
                    </ul>
                  </>
                ),
              },
              {
                question: `${t('Accordion.q3')}`,
                answer: (
                  <>
                    <p className="mb-3">{t('Accordion.a3.intro')}</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong className="text-secondary-800">
                          {t('Accordion.a3.t1')}
                        </strong>{' '}
                        {t('Accordion.a3.a1')}.
                      </li>
                      <li>
                        <strong className="text-secondary-800">
                          {t('Accordion.a2.t2')}
                        </strong>{' '}
                        {t('Accordion.a3.a2')}.
                      </li>
                      <li>
                        <strong className="text-secondary-800">
                          {t('Accordion.a2.t3')}
                        </strong>{' '}
                        {t('Accordion.a3.a3')}.
                      </li>
                    </ul>
                  </>
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="px-6 py-2 bg-white hover:shadow-md transition-shadow group"
                >
                  <AccordionTrigger className="text-left text-4xl font-semibold text-main hover:text-secondary-800 py-4 hover:no-underline flex justify-between items-center w-full">
                    <span>{item.question}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base pt-2 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
        <div className="flex flex-col mx-auto">
          <CustomImage
            src={`/imgs/vsv.webp`}
            alt="Vietstrix Team"
            width={400}
            height={500}
          />
        </div>
      </motion.div>
    </Container>
  );
}
