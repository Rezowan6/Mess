import { DollarSign } from "lucide-react";

export const depositFields = [
  {
    name: "memberId" as const,
    label: "Member ID",
    type: "number",
    placeholder: "Enter member id",
    valueAsNumber: true,
  },
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
    name: "note" as const,
    label: "Note (Optional)",
    type: "text",
    placeholder: "Deposit note",
  },
];