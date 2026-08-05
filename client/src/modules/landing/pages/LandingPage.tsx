import { ContactSection } from "../components/ContactSection";
import { FAQSection } from "../components/FAQSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { HeroSection } from "../components/HeroSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { PricingSection } from "../components/PricingSection";

export const LandingPage = () => {
  return (
    <>
      <section id="home">
        <HeroSection />
      </section>

      <section id="features">
        <FeaturesSection />
      </section>

      <section id="how-it-works">
        <HowItWorksSection />
      </section>

      <section id="pricing">
        <PricingSection />
      </section>

      <section id="faq">
        <FAQSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>
    </>
  );
};
