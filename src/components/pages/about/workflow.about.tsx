import { FeaturesBadge } from '@/components/customs/badge.custom';
import { Container } from '@/components/wrappers/container';
import { useTranslations } from 'next-intl';

export function WorkflowSection() {
  const t = useTranslations('About');

  const steps = [
    {
      id: '01',
      title: `${t('Workflow.step.q1')}`,
      desc: `${t('Workflow.step.a1')}`,
    },
    {
      id: '02',
      title: `${t('Workflow.step.q2')}`,
      desc: `${t('Workflow.step.a2')}`,
    },
    {
      id: '03',
      title: `${t('Workflow.step.q3')}`,
      desc: `${t('Workflow.step.a3')}`,
    },
    {
      id: '04',
      title: `${t('Workflow.step.q4')}`,
      desc: `${t('Workflow.step.a4')}`,
    },
  ];
  return (
    <section className="flex flex-col items-center py-16 px-4 text-center">
      {/* Badge */}
      <FeaturesBadge title="WORKFLOW" />

      {/* Heading */}
      <h2 className="text-4xl mt-8 text-gray-900 mb-10">
        {t('Workflow.title')}
      </h2>

      {/* Step cards */}
      <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {steps.map((step) => (
          <div
            key={step.id}
            className="relative p-6 group border border-primary-200 transition-all duration-300 hover:bg-main"
          >
            <div className="text-left">
              {/* Corner crosses */}
              <span className="absolute top-2 left-2 text-primary-200 transition-colors group-hover:text-primary-200 text-xs">
                +
              </span>
              <span className="absolute top-2 right-2 text-primary-200 transition-colors group-hover:text-primary-200 text-xs">
                +
              </span>
              <span className="absolute bottom-2 left-2 text-primary-200 transition-colors group-hover:text-primary-200 text-xs">
                +
              </span>
              <span className="absolute bottom-2 right-2 text-primary-200 transition-colors group-hover:text-primary-200 text-xs">
                +
              </span>

              {/* Number box */}
              <div className="inline-flex items-center justify-center w-12 h-12 border border-primary-200  text-base font-medium text-main transition-all group-hover:text-white group-hover:font-bold mb-5">
                {step.id}
              </div>

              <p className="text-lg transition-colors group-hover:text-white group-hover:font-bold text-main mb-2">
                {step.title}
              </p>
              <p className="text-sm transition-colors group-hover:text-secondary-100 text-secondary-800 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </Container>

      {/* CTA */}
      <button className="mt-8 bg-main hover:bg-primary-700 text-white  text-xs font-medium tracking-widest uppercase px-7 py-3.5 transition-colors">
        {t('Workflow.title')} →
      </button>
    </section>
  );
}
