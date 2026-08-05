import {
  Calculator,
  CreditCard,
  FileText,
  Users,
  Utensils,
  Wallet,
} from "lucide-react";

export const features = [
  {
    title: "Meal Management",
    description:
      "Track daily meals, meal requests, cutoff times, and member meal history easily.",
    icon: Utensils,
  },
  {
    title: "Deposit Management",
    description:
      "Manage member deposits with complete transaction history and transparency.",
    icon: Wallet,
  },
  {
    title: "Expense Tracking",
    description:
      "Record mess expenses and keep financial activities organized.",
    icon: CreditCard,
  },
  {
    title: "Monthly Calculation",
    description:
      "Automatically calculate meal rates, member costs, and monthly balances.",
    icon: Calculator,
  },
  {
    title: "Member Management",
    description:
      "Manage members, roles, permissions, and tenant activities securely.",
    icon: Users,
  },
  {
    title: "Notice Management",
    description: "Share important announcements and updates with mess members.",
    icon: FileText,
  },
];
