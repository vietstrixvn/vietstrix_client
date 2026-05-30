import { AboutHeroSetion } from '@/components/pages/about/hero.about';
import StorySection from '@/components/pages/about/story.about';
import { OurValuesSection } from '@/components/pages/about/values.about';
import { WorkflowSection } from '@/components/pages/about/workflow.about';
import CTASection from '@/components/sections/cta.section';
import MentionsSection from '@/components/sections/mention.section';
import OurStrength from '@/components/sections/our-strength.section';
import { MentionResponse } from '@/types/portfolio/post/responses';
import React from 'react';

interface HomePageProps {
  mentions?: MentionResponse[];
}

export default async function AboutUsSection({ mentions }: HomePageProps) {
  return (
    <main className="relative bg-white">
      <AboutHeroSetion />

      <StorySection />
      <OurStrength />
      <WorkflowSection />
      <OurValuesSection />
      <MentionsSection mentions={mentions} />
      <CTASection />
    </main>
  );
}
