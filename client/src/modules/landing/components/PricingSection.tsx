import { Section } from "@/shared/components/layout/sections/Section";

import { PricingCards } from "./PricingCards";

export const PricingSection = () => {
  return (
    <Section
      id="pricing"
      title="Simple & Transparent Pricing"
      description="Choose the perfect plan for your mess. Upgrade anytime as your community grows."
      className="bg-info/10"
    >
      <PricingCards />
    </Section>
  );
};
