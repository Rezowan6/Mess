import type { TableColumn } from "@/shared/components/ui/Table";

import type { IDeposit } from "../types/deposit.types";

import { DepositActions } from "../components/DepositActions";

import { Badge } from "@/shared/components/ui/Badge";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { formatTaka } from "@/shared/utils/format.utils";
import { formatDateTime } from "@/shared/utils/time";

export const useDepositHistoryColumns = (
  onEdit: (deposit: IDeposit) => void,
): TableColumn<IDeposit>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<IDeposit>[] = [
    {
      key: "sl",
      title: "#",
      render: (_, index) => index + 1,
    },
    {
      key: "created",
      title: "Created",
      render: (deposit) => (
        <span className="text-xs text-theme-text-muted">
          {formatDateTime(deposit.createdAt)}
        </span>
      ),
    },
    {
      key: "amount",
      title: "Amount",
      render: (deposit) => formatTaka(deposit.amount),
    },
    {
      key: "paymentMethod",
      title: "Payment Method",
      render: (deposit) => (
        <>
          <Badge size="sm" variant="soft-secondary">
            {deposit.paymentMethod}
          </Badge>
        </>
      ),
    },
    {
      key: "note",
      title: "Note",
      render: (deposit) => deposit.note || "-",
    },
  ];

  if (can(PERMISSIONS.DEPOSIT_UPDATE) || can(PERMISSIONS.DEPOSIT_DELETE)) {
    columns.push({
      key: "actions",
      title: "Actions",
      className: "w-28",
      render: (deposit) => <DepositActions deposit={deposit} onEdit={onEdit} />,
    });
  }

  return columns;
};
