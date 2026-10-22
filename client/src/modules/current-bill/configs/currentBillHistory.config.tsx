import type { TableColumn } from "@/shared/components/ui/Table";

import { Badge } from "@/shared/components/ui/Badge";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { formatTaka } from "@/shared/utils/format.utils";
import { formatDateTime } from "@/shared/utils/time";

import { CurrentBillAction } from "../components/currentBillAction";
import type { ICurrentBill } from "../types/currentBill.types";
import { formatMonthName } from "@/shared/utils/date.utils";

export const useCurrentBillHistoryColumns = (
  onEdit: (currentBill: ICurrentBill) => void,
): TableColumn<ICurrentBill>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<ICurrentBill>[] = [
    {
      key: "sl",
      title: "#",
      render: (_, index) => index + 1,
    },
    {
      key: "month",
      title: "Billing Month",
      render: (bill) => <span>{formatMonthName(bill.month)}</span>,
    },
    {
      key: "date",
      title: "Created At",
      render: (currentBill) => (
        <span className="text-theme-text-muted text-xs">
          {formatDateTime(currentBill.createdAt)}
        </span>
      ),
    },
    {
      key: "amount",
      title: "Amount",
      render: (currentBill) => formatTaka(currentBill.amount),
    },
    {
      key: "paymentMethod",
      title: "Payment Method",
      render: (currentBill) => (
        <Badge size="sm" variant="soft-secondary">
          {currentBill.paymentMethod}
        </Badge>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (bill) => (
        <>
          <Badge size="sm" variant="soft-success">
            {bill.status.replace("_", " ")}
          </Badge>
        </>
      ),
    },
  ];

  if (
    can(PERMISSIONS.CURRENT_BILL_UPDATE) ||
    can(PERMISSIONS.CURRENT_BILL_DELETE)
  ) {
    columns.push({
      key: "actions",
      title: "Actions",
      className: "w-28",
      render: (currentBill) => (
        <CurrentBillAction currentBill={currentBill} onEdit={onEdit} />
      ),
    });
  }

  return columns;
};
