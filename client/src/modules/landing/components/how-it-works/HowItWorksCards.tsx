import { StepCard } from "@/shared/components/ui/StepCard";
import { howItWorksSteps } from "../../configs/how-it-works.config";

export const HowItWorksCards = () => {
  return (
    <div className="grid gap-8 md:grid-cols-4">
      {howItWorksSteps.map((step, index) => {
        const Icon = step.icon;

        return (
          <StepCard
            key={step.title}
            stepNumber={index + 1}
            icon={<Icon size={28} />}
            title={step.title}
            description={step.description}
          />
        );
      })}
    </div>
  );
};
