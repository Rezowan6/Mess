import { Button } from "@/shared/components/ui/Button";

interface Props {
  isPopular: boolean;
}

export const PricingCardAction = ({ isPopular }: Props) => {
  return (
    <Button className="w-full" variant={isPopular ? "primary" : "outline"}>
      Get Started
    </Button>
  );
};
