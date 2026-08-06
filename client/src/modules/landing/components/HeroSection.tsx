import { Section } from "@/shared/components/layout/sections/Section"; 

import { HeroContent } from "./HeroContent";
import { HeroPreviewCard } from "./HeroPreviewCard";

export const HeroSection = () => {
  return (
    <Section
      id="home"
      className="relative overflow-hidden"
      containerClassName="relative px-4"
    >
      <div className="absolute inset-0 bg-linear-to-br from-success/10 via-background to-info/10" />

      <div className="relative grid items-center gap-12 lg:grid-cols-2">
        <HeroContent />

        <HeroPreviewCard />
      </div>
    </Section>
  );
};
