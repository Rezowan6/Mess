import { BarChart3, Settings, UserPlus, Utensils } from "lucide-react";

const steps = [
  {
    title: "Create Your Account",
    description: "Register your mess and create your workspace within minutes.",
    icon: UserPlus,
  },
  {
    title: "Setup Your Mess",
    description: "Add members, assign roles, and configure your meal settings.",
    icon: Settings,
  },
  {
    title: "Manage Daily Activities",
    description:
      "Track meals, deposits, expenses, and member activities easily.",
    icon: Utensils,
  },
  {
    title: "Get Smart Reports",
    description:
      "View monthly calculations, balances, and financial summaries.",
    icon: BarChart3,
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="px-6 py-20">
      <div className="container mx-auto">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">How It Works</h2>

          <p className="mt-4 text-base-content/70">
            Start managing your mess in a few simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm"
              >
                <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
                  {index + 1}
                </div>

                <div className="mx-auto mb-5 mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={28} />
                </div>

                <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>

                <p className="text-sm leading-6 text-base-content/70">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
