import { AboutHeroSetion } from '@/components/pages/about/hero.about';
import StorySection from '@/components/pages/about/story.about';
import { OurValuesSection } from '@/components/pages/about/values.about';
import { WorkflowSection } from '@/components/pages/about/workflow.about';
import CTASection from '@/components/sections/cta.section';
import OurStrength from '@/components/sections/our-strength.section';
import React from 'react';

export default async function AboutUsSection() {
  return (
    <main className="relative bg-white">
      <AboutHeroSetion />

      <StorySection />
      <OurStrength />
      <WorkflowSection />
      <OurValuesSection />

      <CTASection />
    </main>
  );
}
