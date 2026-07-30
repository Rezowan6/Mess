import type { TableColumn } from "@/shared/components/ui/Table";

import type { IDeposit } from "../types/deposit.types";

import { DepositActions } from "../components/DepositActions";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

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
      key: "depositDate",
      title: "Date",
      render: (deposit) => new Date(deposit.depositDate).toLocaleDateString(),
    },
    {
      key: "amount",
      title: "Amount",
      render: (deposit) => `৳ ${deposit.amount}`,
    },
    {
      key: "paymentMethod",
      title: "Payment Method",
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
