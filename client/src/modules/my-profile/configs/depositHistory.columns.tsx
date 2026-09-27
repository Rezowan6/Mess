import type { TableColumn } from "@/shared/components/ui/Table";
import { formatDate } from "@/shared/utils/date.utils";

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
      render: (deposit) => formatDate(deposit.createdAt),
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
