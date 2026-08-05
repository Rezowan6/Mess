import { Section } from "@/shared/components/layout/sections/Section";
import { FAQList } from "./FAQList";

export const FAQSection = () => {
  return (
    <Section
      id="faq"
      title="Frequently Asked Questions"
      description="Find answers to common questions about our platform."
      containerClassName="max-w-4xl"
    >
      <FAQList />
    </Section>
  );
};
