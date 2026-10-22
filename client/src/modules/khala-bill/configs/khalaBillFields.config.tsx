import { DollarSign } from "lucide-react";

export const khalaBillFields = [
  {
    name: "amount" as const,
    label: "Amount",
    type: "number",
    placeholder: "Enter amount",
    leftIcon: <DollarSign size={18} />,
  },
];
