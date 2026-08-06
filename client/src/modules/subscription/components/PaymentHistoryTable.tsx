import { Table } from "@/shared/components/ui/Table";

import { paymentHistoryColumns } from "../configs/paymentHistory.columns";

const payments = [
  {
    id: "TXN-1001",
    date: "01 Aug 2026",
    amount: "৳299",
    gateway: "bKash",
    status: "success",
  },
  {
    id: "TXN-1002",
    date: "01 Jul 2026",
    amount: "৳299",
    gateway: "rocket",
    status: "success",
  },
];

export const PaymentHistoryTable = () => {
  return <Table columns={paymentHistoryColumns} data={payments} />;
};
