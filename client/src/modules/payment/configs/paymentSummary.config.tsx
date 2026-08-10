import {
  CheckCircle,
  CircleDollarSign,
  Clock3,
  CreditCard,
  XCircle,
} from "lucide-react";

import { IconBox } from "@/shared/components/ui/IconBox";

export const paymentSummaryCards = [
  {
    title: "Total Payments",
    key: "totalPayments",
    icon: (
      <IconBox
        className="bg-info/10 text-info"
        icon={<CreditCard />}
      />
    ),
  },

  {
    title: "Successful Payments",
    key: "successfulPayments",
    icon: (
      <IconBox
        className="bg-success/10 text-success"
        icon={<CheckCircle />}
      />
    ),
  },

  {
    title: "Pending Payments",
    key: "pendingPayments",
    icon: (
      <IconBox
        className="bg-warning/10 text-warning"
        icon={<Clock3 />}
      />
    ),
  },

  {
    title: "Total Paid",
    key: "totalAmount",
    icon: (
      <IconBox
        className="bg-secondary/10 text-secondary"
        icon={<CircleDollarSign />}
      />
    ),
  },

  {
    title: "Failed Payments",
    key: "failedPayments",
    icon: (
      <IconBox
        className="bg-error/10 text-error"
        icon={<XCircle />}
      />
    ),
  },
] as const;