import { Accordion } from "@/shared/components/ui/Accordion";
import { faqItems } from "../configs/faq.config";

export const FAQList = () => {
  return (
    <div className="space-y-4">
      {faqItems.map((faq) => (
        <Accordion key={faq.question} title={faq.question}>
          <p>{faq.answer}</p>
        </Accordion>
      ))}
    </div>
  );
};
