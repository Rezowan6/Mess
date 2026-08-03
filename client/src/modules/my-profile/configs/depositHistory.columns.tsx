import dayjs from "dayjs";

import type { TableColumn } from "@/shared/components/ui/Table";

interface IDepositHistory {
  id: number;
  amount: number;
  paymentMethod: string;
  createdAt: string;
}

export const useDepositHistoryColumns = (): TableColumn<IDepositHistory>[] => {
  return [
    {
      key: "createdAt",
      title: "Date",
      render: (deposit) => dayjs(deposit.createdAt).format("DD MMM YYYY"),
    },
    {
      key: "amount",
      title: "Amount",
      render: (deposit) => `৳ ${deposit.amount.toLocaleString()}`,
    },
    {
      key: "paymentMethod",
      title: "Payment Method",
      render: (deposit) => (
        <span className="badge badge-outline badge-sm">
          {deposit.paymentMethod}
        </span>
      ),
    },
  ];
};
