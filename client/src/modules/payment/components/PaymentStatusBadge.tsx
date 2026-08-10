import { Badge, type IBadgeVariant } from "@/shared/components/ui/Badge";

import type { PaymentStatusType } from "../types/payment.types";

interface Props {
  status: PaymentStatusType;
}

const statusConfig: Record<
  PaymentStatusType,
  {
    label: string;
    variant: IBadgeVariant;
  }
> = {
  pending: {
    label: "Pending",
    variant: "warning",
  },

  processing: {
    label: "processing",
    variant: "accent",
  },

  success: {
    label: "Success",
    variant: "success",
  },

  failed: {
    label: "Failed",
    variant: "error",
  },

  cancelled: {
    label: "Cancelled",
    variant: "neutral",
  },

  refunded: {
    label: "Refunded",
    variant: "info",
  },
};

export const PaymentStatusBadge = ({ status }: Props) => {
  const normalizedStatus = status.toLowerCase() as PaymentStatusType;

  const config = statusConfig[normalizedStatus];

  if (!config) {
    return (
      <Badge variant="neutral" size="sm">
        {status}
      </Badge>
    );
  }

  return (
    <Badge variant={config.variant} size="sm">
      {config.label}
    </Badge>
  );
};