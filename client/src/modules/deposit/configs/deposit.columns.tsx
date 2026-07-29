import type { TableColumn } from "@/shared/components/ui/Table";

import type { IDeposit } from "../types/deposit.types";

import { DepositActions } from "../components/DepositActions";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

export const useDepositColumns = (
  onEdit: (deposit: IDeposit) => void,
): TableColumn<IDeposit>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<IDeposit>[] = [
    {
      key: "member",
      title: "Member",
      render: (deposit) => deposit.member.name,
    },
    {
      key: "amount",
      title: "Amount",
      render: (deposit) => deposit.amount,
    },
    {
      key: "paymentMethod",
      title: "Payment",
      hideOnMobile: true,
      render: (deposit) => deposit.paymentMethod,
    },
    {
      key: "depositDate",
      title: "Date",
      render: (deposit) =>
        new Date(deposit.depositDate).toLocaleDateString(),
    },
  ];

  if (can(PERMISSIONS.DEPOSIT_UPDATE) || can(PERMISSIONS.DEPOSIT_DELETE)) {
    columns.push({
      key: "actions",
      title: "Actions",
      className: "w-24",
      render: (deposit) => (
        <DepositActions deposit={deposit} onEdit={onEdit} />
      ),
    });
  }

  return columns;
};