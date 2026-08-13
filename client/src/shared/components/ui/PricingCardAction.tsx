import { Button } from "@/shared/components/ui/Button";

interface Props {
  isPopular?: boolean;
  label?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const PricingCardAction = ({
  isPopular = false,
  label = "Get Started",
  onClick,
  loading = false,
  disabled = false,
}: Props) => {
  return (
    <Button
      className="w-full"
      variant={isPopular ? "warning" : "outline"}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};
