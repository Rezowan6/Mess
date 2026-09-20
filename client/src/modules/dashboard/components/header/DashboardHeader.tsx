import { Button } from "@/shared/components/ui/Button/Button";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import InteractiveButton from "@/shared/components/ui/InteractiveButton";
import { ArrowRight } from "lucide-react";
import { DashboardWelcome } from "./DashboardWelcome";

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <DashboardWelcome />
      <GradientButton variant="success">Save</GradientButton>
      <Button variant="success">Save</Button>

      <Button variant="success" size="sm" rightIcon={<ArrowRight size={18} />}>
        Continue
      </Button>
      <InteractiveButton variant="glowing" size="lg">
        Get Started Free
      </InteractiveButton>
    </div>
  );
};
