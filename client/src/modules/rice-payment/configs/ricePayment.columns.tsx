import { Badge } from "@/shared/components/ui/Badge";
import type { TableColumn } from "@/shared/components/ui/Table";

import type { IRicePayment } from "../types/ricePayment.types";
import { formatTaka } from "@/modules/rice/utils/rice.utils";

export const useRicePaymentColumns = (): TableColumn<IRicePayment>[] => [
  {
    key: "paymentDate",
    title: "Date",
    render: (payment) => new Date(payment.paymentDate).toLocaleDateString(),
  },
  {
    key: "amount",
    title: "Amount",
    render: (payment) => formatTaka(payment.amount),
  },
  {
    key: "paymentMethod",
    title: "Method",
    render: (payment) => (
      <Badge size="sm" variant="info">
        {payment.paymentMethod}
      </Badge>
    ),
  },
  {
    key: "note",
    title: "Note",
    render: (payment) => payment.note || "—",
  },
];
