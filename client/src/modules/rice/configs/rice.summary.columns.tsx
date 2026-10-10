import { Badge } from "@/shared/components/ui/Badge";
import type { TableColumn } from "@/shared/components/ui/Table";

import { formatKg, formatTaka, toTitleCase } from "@/shared/utils/format.utils";
import { RiceSummaryActions } from "../components/RiceSummaryActions";
import { type IRice } from "../types/rice.types";
import {
  RICE_PAYMENT_STATUS_VARIANT,
  RICE_PURCHASE_TYPE_VARIANT,
} from "./rice.badge";
import { useRiceTablePermissions } from "./rice.columns.permission";
import { formatDate } from "@/shared/utils/date.utils";

interface UseRiceSummaryColumnsProps {
  onPay: (rice: IRice) => void;
  onEdit: (rice: IRice) => void;
}

export const useRiceSummaryColumns = ({
  onPay,
  onEdit,
}: UseRiceSummaryColumnsProps): TableColumn<IRice>[] => {
  const { canManage } = useRiceTablePermissions();

  const columns: TableColumn<IRice>[] = [
    {
      key: "supplier",
      title: "Supplier",
      render: (rice) => (
        <div className="flex flex-col">
          <span className="font-medium">{rice.supplierName ?? "—"}</span>
          {rice.supplierPhone && (
            <span className="text-xs opacity-60">{rice.supplierPhone}</span>
          )}
        </div>
      ),
    },
    {
      key: "purchaseDate",
      title: "Date",
      render: (rice) => formatDate(rice.purchaseDate),
    },
    {
      key: "quantity",
      title: "Quantity",
      render: (rice) => formatKg(rice.quantity),
    },
    {
      key: "totalAmount",
      title: "Total",
      render: (rice) => formatTaka(rice.totalAmount),
    },
    {
      key: "totalPaid",
      title: "Paid",
      render: (rice) => formatTaka(rice.totalPaid),
    },
    {
      key: "remainingDue",
      title: "Due",
      render: (rice) => (
        <span className={Number(rice.remainingDue) > 0 ? "text-error" : ""}>
          {formatTaka(rice.remainingDue)}
        </span>
      ),
    },
    {
      key: "purchaseType",
      title: "Type",
      render: (rice) => (
        <Badge
          size="sm"
          variant={RICE_PURCHASE_TYPE_VARIANT[rice.purchaseType]}
        >
          {toTitleCase(rice.purchaseType)}
        </Badge>
      ),
    },
    {
      key: "paymentStatus",
      title: "Status",
      render: (rice) => (
        <Badge
          size="sm"
          variant={RICE_PAYMENT_STATUS_VARIANT[rice.paymentStatus]}
        >
          {toTitleCase(rice.paymentStatus)}
        </Badge>
      ),
    },
  ];

  if (canManage) {
    columns.push({
      key: "actions",
      title: "Actions",
      render: (rice) => (
        <RiceSummaryActions rice={rice} onPay={onPay} onEdit={onEdit} />
      ),
    });
  }
  return columns;
};
