import { Badge } from "@/shared/components/ui/Badge";

interface Props {
  isActive: boolean;
}

export const PlanStatusBadge = ({ isActive }: Props) => {
  return (
    <Badge variant={isActive ? "success" : "neutral"} size="sm">
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
};
