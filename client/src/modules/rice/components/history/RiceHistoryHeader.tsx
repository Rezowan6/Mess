import { Badge } from "@/shared/components/ui/Badge";
import { toTitleCase } from "@/shared/utils/format.utils";

import {
  RICE_PAYMENT_STATUS_VARIANT,
  RICE_PURCHASE_TYPE_VARIANT,
} from "../../configs/rice.badge";
import type { IRiceWithSummary } from "../../types/rice.types";

interface Props {
  rice: IRiceWithSummary;
}

export const RiceHistoryHeader = ({ rice }: Props) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-60">Purchase Type</span>

          <Badge
            size="sm"
            variant={RICE_PURCHASE_TYPE_VARIANT[rice.purchaseType]}
          >
            {toTitleCase(rice.purchaseType)}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs opacity-60">Payment Status</span>

          <Badge
            size="sm"
            variant={RICE_PAYMENT_STATUS_VARIANT[rice.paymentStatus]}
          >
            {toTitleCase(rice.paymentStatus)}
          </Badge>
        </div>
      </div>

      <p className="text-sm opacity-70">
        {rice.creator?.name ? `${rice.creator.name} · ` : ""}
        {Number(rice.quantity)} kg × ৳{Number(rice.unitPrice)}
      </p>
    </div>
  );
};
