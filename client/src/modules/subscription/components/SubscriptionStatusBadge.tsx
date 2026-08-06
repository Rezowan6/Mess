import { Badge } from "@/shared/components/ui/Badge";
import clsx from "clsx";

interface Props {
  status: "FREE" | "ACTIVE" | "PENDING" | "EXPIRED" | "CANCELLED";
}

const statusStyles = {
  FREE: "badge-info",
  ACTIVE: "badge-success",
  PENDING: "badge-warning",
  EXPIRED: "badge-error",
  CANCELLED: "badge-error",
};

export const SubscriptionStatusBadge = ({ status }: Props) => {
  return (
    <Badge className={clsx("badge px-4 py-3", statusStyles[status])}>
      {status}
    </Badge>
  );
};
