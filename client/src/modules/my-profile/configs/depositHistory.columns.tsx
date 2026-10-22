import { Badge } from "@/shared/components/ui/Badge";
import type { TableColumn } from "@/shared/components/ui/Table";
import { formatDate } from "@/shared/utils/date.utils";
import { formatTaka } from "@/shared/utils/format.utils";

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
  ];
};
