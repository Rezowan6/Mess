import type { TableColumn } from "@/shared/components/ui/Table";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { formatDate } from "@/shared/utils/date.utils";

import { Badge } from "@/shared/components/ui/Badge";
import { RiceHistoryAction } from "../components/RiceHistoryAction";
import type {
  IRice,
  RicePaymentStatusValue,
  RicePurchaseTypeValue,
} from "../types/rice.types";

export const riceHistoryColumns = (
  onEdit: (rice: IRice) => void,
): TableColumn<IRice>[] => {
  const { can } = useRBAC();

  const column: TableColumn<IRice>[] = [
    {
      key: "purchaseDate",
      title: "Date",
      render: (rice) => formatDate(rice?.purchaseDate),
    },
    {
      key: "quantity",
      title: "Rice Quantity",
      render: (rice) => `${Number(rice.quantity).toFixed(2)} kg`,
    },
    {
      key: "unitPrice",
      title: "Unit Price",
      render: (rice) => `৳${Number(rice.unitPrice).toFixed(2)}`,
    },
    {
      key: "totalAmount",
      title: "Total Amount",
      render: (rice) => `৳${Number(rice.totalAmount).toFixed(2)}`,
    },
    {
      key: "purchaseType",
      title: "Purchase Type",
      render: (rice) => {
        const variantMap: Record<RicePurchaseTypeValue, "success" | "warning"> =
          {
            PAID: "success",
            CREDIT: "warning",
          };

        return (
          <Badge size="sm" variant={variantMap[rice.purchaseType]}>
            {rice.purchaseType}
          </Badge>
        );
      },
    },
    {
      key: "paymentStatus",
      title: "Payment Status",
      render: (rice) => {
        const variantMap: Record<
          RicePaymentStatusValue,
          "success" | "warning" | "error" | "info"
        > = {
          PAID: "success",
          DUE: "error",
          PARTIAL: "warning",
          SETTLED: "info",
        };

        return (
          <Badge size="sm" variant={variantMap[rice.paymentStatus]}>
            {rice.paymentStatus}
          </Badge>
        );
      },
    },
  ];

  if (can(PERMISSIONS.EXPENSE_CREATE)) {
    column.push({
      key: "action",
      title: "Action",
      render: (rice) => <RiceHistoryAction rice={rice} onEdit={onEdit} />,
    });
  }

  return column;
};
