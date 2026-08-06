import { Section } from "@/shared/components/layout/sections/Section";
import { InfoCard } from "@/shared/components/ui/InfoCard";
import { features } from "../configs/features.config";

export const FeaturesSection = () => {
  return (
    <Section
      id="features"
      className="bg-success/10"
      title="Everything You Need to Manage Your Mess"
      description="A complete solution to manage meals, members, expenses, and monthly calculations in one place."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <InfoCard
              key={feature.title}
              icon={<Icon size={24} />}
              value={feature.title}
              description={feature.description}
              iconClassName="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
            />
          );
        })}
      </div>
    </Section>
  );
};
