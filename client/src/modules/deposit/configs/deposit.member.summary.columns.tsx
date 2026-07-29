import type { TableColumn } from "@/shared/components/ui/Table";

import type { IDeposit } from "../types/deposit.types";

export const useDepositMemberSummaryColumns = (): TableColumn<IDeposit>[] => {
  const columns: TableColumn<IDeposit>[] = [
    {
      key: "member",
      title: "Member",
      render: (deposit) => deposit.member.name,
    },
    {
      key: "amount",
      title: "Total Amount",
      render: (deposit) => deposit.totalDeposit,
    },
  ];

  return columns;
};
