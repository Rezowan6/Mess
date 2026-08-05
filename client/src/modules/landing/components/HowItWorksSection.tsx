import { Section } from "@/shared/components/layout/sections/Section";
import { HowItWorksCards } from "./HowItWorksCards";

export const HowItWorksSection = () => {
  return (
    <Section
      id="how-it-works"
      title="How It Works"
      description="Start managing your mess in a few simple steps."
    >
      <HowItWorksCards />
    </Section>
  );
};
