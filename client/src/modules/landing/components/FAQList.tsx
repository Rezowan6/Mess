import { faqItems } from "../configs/faq.config";

export const FAQList = () => {
  return (
    <div className="space-y-4">
      {faqItems.map((faq) => (
        <div
          key={faq.question}
          className="collapse collapse-plus border border-base-300 bg-base-100"
        >
          <input type="checkbox" />

          <div className="collapse-title text-lg font-semibold">
            {faq.question}
          </div>

          <div className="collapse-content text-sm text-base-content/70">
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
