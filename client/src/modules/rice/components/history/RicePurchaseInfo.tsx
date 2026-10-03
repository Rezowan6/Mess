import { CalendarDays, Phone, Store } from "lucide-react";

import { formatDate } from "@/shared/utils/date.utils";

import type { IRiceWithSummary } from "../../types/rice.types";

interface Props {
  rice: IRiceWithSummary;
  hasDue: boolean;
}

export const RicePurchaseInfo = ({ rice, hasDue }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div className="flex items-center gap-2">
        <Store size={16} className="opacity-60" />
        <span>{rice.supplierName ?? "—"}</span>
      </div>

      <div className="flex items-center gap-2">
        <Phone size={16} className="opacity-60" />
        <span>{rice.supplierPhone ?? "—"}</span>
      </div>

      <div className="flex items-center gap-2">
        <CalendarDays size={16} className="opacity-60" />
        <span>Bought: {formatDate(rice.purchaseDate)}</span>
      </div>

      {rice.dueDate && (
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="opacity-60" />

          <span>
            Due by:{" "}
            <span className={hasDue ? "text-error" : ""}>
              {formatDate(rice.dueDate)}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};
