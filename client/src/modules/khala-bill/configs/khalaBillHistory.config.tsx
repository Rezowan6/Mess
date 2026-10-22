import type { TableColumn } from "@/shared/components/ui/Table";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { formatMonthName } from "@/shared/utils/date.utils";

import { Badge } from "@/shared/components/ui/Badge";
import { formatTaka } from "@/shared/utils/format.utils";
import { formatDateTime } from "@/shared/utils/time";
import { KhalaBillAction } from "../components/KhalaBillAction";
import type { IKhalaBill } from "../types/khalaBill.types";

export const useKhalaBillHistoryColumns = (
  onEdit: (bill: IKhalaBill) => void,
): TableColumn<IKhalaBill>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<IKhalaBill>[] = [
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
      render: (bill) => (
        <span className="text-theme-text-muted text-xs">
          {formatDateTime(bill.createdAt)}
        </span>
      ),
    },
    {
      key: "amount",
      title: "Amount",
      render: (bill) => formatTaka(bill.amount),
    },
    {
      key: "paymentMethod",
      title: "Payment Method",
      render: (bill) => (
        <>
          <Badge size="sm" variant="soft-secondary">
            {bill.paymentMethod}
          </Badge>
        </>
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
    can(PERMISSIONS.KHALA_BILL_UPDATE) ||
    can(PERMISSIONS.KHALA_BILL_DELETE)
  ) {
    columns.push({
      key: "actions",
      title: "Actions",
      className: "w-28",
      render: (bill) => <KhalaBillAction khalaBill={bill} onEdit={onEdit} />,
    });
  }

  return columns;
};
