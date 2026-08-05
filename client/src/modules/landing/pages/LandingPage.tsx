import { ContactSection } from "../components/ContactSection";
import { FAQSection } from "../components/FAQSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { HeroSection } from "../components/HeroSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { PricingSection } from "../components/PricingSection";

export const LandingPage = () => {
  return (
    <>
      <HeroSection />

      <FeaturesSection />

      <HowItWorksSection />

      <PricingSection />

      <FAQSection />

      <ContactSection />
    </>
  );
};
