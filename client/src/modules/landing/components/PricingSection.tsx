import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "৳0",
    description: "For small messes getting started.",
    features: [
      "Basic Meal Management",
      "Member Management",
      "Deposit Tracking",
      "Basic Reports",
    ],
  },
  {
    name: "Standard",
    price: "৳299/month",
    description: "For growing mess communities.",
    popular: true,
    features: [
      "Everything in Free",
      "Expense Management",
      "Monthly Calculation",
      "Advanced Reports",
      "Priority Support",
    ],
  },
  {
    name: "Premium",
    price: "৳699/month",
    description: "For professional mess management.",
    features: [
      "Everything in Standard",
      "Unlimited Members",
      "Advanced Analytics",
      "Payment Integration",
      "Dedicated Support",
    ],
  },
];

export const PricingSection = () => {
  return (
    <section className="bg-base-200 px-6 py-20">
      <div className="container mx-auto">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Simple & Transparent Pricing
          </h2>

          <p className="mt-4 text-base-content/70">
            Choose the plan that fits your mess management needs.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-base-100 p-8 shadow-sm ${
                plan.popular ? "border-primary shadow-lg" : "border-base-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm text-primary-content">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold">{plan.name}</h3>

              <p className="mt-2 text-sm text-base-content/70">
                {plan.description}
              </p>

              <div className="my-6 text-3xl font-bold">{plan.price}</div>

              <button
                className={`btn w-full ${
                  plan.popular ? "btn-primary" : "btn-outline"
                }`}
              >
                Get Started
              </button>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check size={18} className="text-success" />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
