const faqs = [
  {
    question: "What is Mess Management System?",
    answer:
      "It is a complete platform to manage meals, members, deposits, expenses, and monthly calculations easily.",
  },
  {
    question: "Can multiple members use the same mess account?",
    answer:
      "Yes. You can create a mess workspace and manage multiple members with role-based permissions.",
  },
  {
    question: "Can I track daily meals?",
    answer:
      "Yes. Members can manage meal requests and view their complete meal history.",
  },
  {
    question: "How are monthly calculations handled?",
    answer:
      "The system automatically calculates meal rates, member costs, deposits, and balances.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. The system uses authentication, tenant isolation, and permission-based access control.",
  },
];

export const FAQSection = () => {
  return (
    <section className="px-6 py-20">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-base-content/70">
            Find answers to common questions about our platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
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
      </div>
    </section>
  );
};
