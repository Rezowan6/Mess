import { DollarSign } from "lucide-react";

export const currentBillFields = [
  {
    name: "amount" as const,
    label: "Amount",
    type: "number",
    placeholder: "Enter amount",
    leftIcon: <DollarSign size={18} />,
    valueAsNumber: true,
  },
  {
    name: "paymentMethod" as const,
    label: "Payment Method",
    type: "text",
    placeholder: "Cash, bKash...",
  },
  {
    name: "month" as const,
    label: "Month",
    type: "number",
    placeholder: "Enter month",
  },
  {
    name: "year" as const,
    label: "Year",
    type: "year",
    placeholder: "Enter year",
  },
];
