import { Badge } from "@/shared/components/ui/Badge";
import type { TableColumn } from "@/shared/components/ui/Table";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { Button } from "@/shared/components/ui/Button";
import { ROUTES } from "@/shared/constants/routes";
import type { IRice } from "../types/rice.types";
import { canAddRicePayment, formatKg, formatTaka } from "../utils/rice.utils";
import {
  RICE_PAYMENT_STATUS_VARIANT,
  RICE_PURCHASE_TYPE_VARIANT,
} from "./rice.badge";

interface UseRiceSummaryColumnsProps {
  onPay: (rice: IRice) => void;
}

export const useRiceSummaryColumns = ({
  onPay,
}: UseRiceSummaryColumnsProps): TableColumn<IRice>[] => {
  const { can } = useRBAC();
  const canManage = can(PERMISSIONS.EXPENSE_CREATE);

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
          {rice.purchaseType}
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
          {rice.paymentStatus}
        </Badge>
      ),
    },
  ];

  if (canManage) {
    columns.push({
      key: "actions",
      title: "Actions",
      render: (rice) => (
        <div className="flex items-center gap-3">
          {canAddRicePayment(rice) && (
            <Button variant="primary" type="button" onClick={() => onPay(rice)}>
              Pay
            </Button>
          )}

          <ActionLink to={`${ROUTES.EXPENSE}/rice/${rice.id}`}>
            Details
          </ActionLink>
        </div>
      ),
    });
  }

  return columns;
};
