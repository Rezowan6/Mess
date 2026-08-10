import { Badge, type IBadgeVariant } from "@/shared/components/ui/Badge";
import type { SubscriptionStatusType } from "../types/subscription.types";

interface Props {
  status: SubscriptionStatusType | string;
}

const statusConfig: Record<
  SubscriptionStatusType,
  {
    label: string;
    variant: IBadgeVariant;
  }
> = {
  active: {
    label: "Active",
    variant: "success",
  },
  pending: {
    label: "Pending",
    variant: "warning",
  },
  cancelled: {
    label: "Cancelled",
    variant: "error",
  },
  expired: {
    label: "Expired",
    variant: "neutral",
  },
};

export const SubscriptionStatusBadge = ({ status }: Props) => {
  const config = statusConfig[status?.toLowerCase() as SubscriptionStatusType] ?? {
    label: status,
    variant: "error"  as IBadgeVariant,
  };

  return (
    <Badge size="sm" className="w-fit" variant={config.variant}>
      {config.label}
    </Badge>
  );
};
