import { ActionLink } from "@/shared/components/ui/ActionLink";
import type { TableColumn } from "@/shared/components/ui/Table";
import { ROUTES } from "@/shared/constants/routes";

import { PaymentStatusBadge } from "../components/PaymentStatusBadge";
import type { IPayment } from "../types/payment.types";
import { formatDate } from "@/shared/utils/date.utils";

export const paymentColumns: TableColumn<IPayment>[] = [
  {
    key: "transactionId",
    title: "Transaction ID",
    render: (payment: IPayment) => payment.transactionId ?? "N/A",
  },

  {
    key: "gateway",
    title: "Gateway",
    render: (payment: IPayment) => payment.gateway.toUpperCase(),
  },

  {
    key: "amount",
    title: "Amount",
    render: (payment: IPayment) => `৳${payment.amount}`,
  },

  {
    key: "status",
    title: "Status",
    render: (payment: IPayment) => (
      <PaymentStatusBadge status={payment.status} />
    ),
  },

  {
    key: "paidAt",
    title: "Paid At",
    render: (payment: IPayment) =>
      payment.paidAt
        ? formatDate(payment.paidAt)
        : "N/A",
  },

  {
    key: "action",
    title: "Action",
    render: (payment: IPayment) => (
      <ActionLink to={`${ROUTES.PAYMENT}/${payment.id}`} state={payment}>
        Details
      </ActionLink>
    ),
  },
];
