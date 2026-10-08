import { ContactSection } from "../components/contact/ContactSection";
import { FAQSection } from "../components/faq/FAQSection";
import { FeaturesSection } from "../components/features/FeaturesSection";
import { HeroSection } from "../components/hero/HeroSection";
import { HowItWorksSection } from "../components/how-it-works/HowItWorksSection";
import { PricingSection } from "../components/pricing/PricingSection";


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
