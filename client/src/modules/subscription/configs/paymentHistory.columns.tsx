import { Badge } from "@/shared/components/ui/Badge";
import type { TableColumn } from "@/shared/components/ui/Table";

interface IPaymentHistory {
  id: string;
  date: string;
  amount: string;
  gateway: string;
  status: string;
}

export const paymentHistoryColumns: TableColumn<IPaymentHistory>[] = [
  {
    key: "id",
    title: "Transaction ID",
    render: (payment) => payment.id,
  },

  {
    key: "date",
    title: "Date",
    render: (payment) => payment.date,
  },

  {
    key: "amount",
    title: "Amount",
    render: (payment) => payment.amount,
  },

  {
    key: "gateway",
    title: "Gateway",
    render: (payment) => payment.gateway,
  },

  {
    key: "status",
    title: "Status",
    render: (payment) => (
      <Badge variant="success" className="w-fit">{payment.status}</Badge>
    ),
  },
];
