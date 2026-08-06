import { Button } from "@/shared/components/ui/Button";

interface Props {
  isPopular?: boolean;
  label?: string;
}

export const PricingCardAction = ({
  isPopular = false,
  label = "Get Started",
}: Props) => {
  return (
    <Button className="w-full" variant={isPopular ? "warning" : "outline"}>
      {label}
    </Button>
  );
};
