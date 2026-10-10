import { DollarSign } from "lucide-react";

export const expenseFields = [
  {
    name: "amount" as const,
    label: "Amount",
    type: "number",
    placeholder: "Enter amount",
    leftIcon: <DollarSign size={18} />,
    valueAsNumber: true,
  },
  {
    name: "signature" as const,
    label: "Signature",
    type: "text",
    placeholder: "Expense signature",
  },
  {
    name: "category" as const,
    label: "Category (Optional)",
    type: "text",
    placeholder: "Food, Rent, Utility...",
  },
  {
    name: "description" as const,
    label: "Description (Optional)",
    type: "text",
    placeholder: "Expense description",
  },
];
